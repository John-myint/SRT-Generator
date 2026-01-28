/**
 * OpenAI Provider
 * Handles OpenAI GPT API integration for subtitle enhancement
 */

import { AIProvider, getSystemPrompt, AI_CONFIG } from './aiProviders.js';

export class OpenAIProvider extends AIProvider {
    constructor(apiKey) {
        super(apiKey);
        this.provider = 'openai';
        this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        this.model = 'gpt-4o-mini'; // Cost-effective model
    }

    /**
     * Make API request to OpenAI
     * @param {string} systemPrompt - System instruction
     * @param {string} userMessage - User message
     * @returns {Promise<string>} API response
     */
    async makeRequest(systemPrompt, userMessage) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.REQUEST_TIMEOUT);

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'system',
                            content: systemPrompt
                        },
                        {
                            role: 'user',
                            content: userMessage
                        }
                    ],
                    temperature: 0.3, // Lower temperature for more consistent translations
                    max_tokens: 1000
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(this.parseError(response.status, errorData));
            }

            const data = await response.json();
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                throw new Error('Invalid response format from OpenAI');
            }

            return data.choices[0].message.content.trim();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }
            
            throw error;
        }
    }

    /**
     * Parse OpenAI error responses
     * @param {number} status - HTTP status code
     * @param {Object} errorData - Error data from API
     * @returns {string} User-friendly error message
     */
    parseError(status, errorData) {
        const errorMessage = errorData.error?.message || 'Unknown error';
        
        switch (status) {
            case 401:
                return 'Invalid API key. Please check your OpenAI API key.';
            case 429:
                return 'Rate limit exceeded or quota reached. Please try again later.';
            case 500:
            case 502:
            case 503:
                return 'OpenAI service temporarily unavailable. Please try again.';
            default:
                return `OpenAI API error: ${errorMessage}`;
        }
    }

    /**
     * Translate text to target language
     * @param {string} text - Text to translate
     * @param {string} targetLanguage - Target language code
     * @returns {Promise<string>} Translated text
     */
    async translate(text, targetLanguage) {
        if (!this.validateApiKey()) {
            throw new Error('Invalid OpenAI API key');
        }

        const systemPrompt = getSystemPrompt('translate', targetLanguage);
        return await this.makeRequest(systemPrompt, text);
    }

    /**
     * Improve text quality
     * @param {string} text - Text to improve
     * @param {string} language - Language code
     * @returns {Promise<string>} Improved text
     */
    async improve(text, language) {
        if (!this.validateApiKey()) {
            throw new Error('Invalid OpenAI API key');
        }

        const systemPrompt = getSystemPrompt('improve', language);
        return await this.makeRequest(systemPrompt, text);
    }

    /**
     * Validate API key format
     * @returns {boolean} True if valid
     */
    validateApiKey() {
        // OpenAI keys start with 'sk-'
        return this.apiKey && this.apiKey.startsWith('sk-') && this.apiKey.length > 20;
    }
}

export default OpenAIProvider;
