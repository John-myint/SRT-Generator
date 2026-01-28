/**
 * Google Gemini Provider
 * Handles Google Gemini API integration for subtitle enhancement
 */

import { AIProvider, getSystemPrompt, AI_CONFIG } from './aiProviders.js';

export class GeminiProvider extends AIProvider {
    constructor(apiKey) {
        super(apiKey);
        this.provider = 'gemini';
        this.apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
    }

    /**
     * Make API request to Google Gemini
     * @param {string} systemPrompt - System instruction
     * @param {string} userMessage - User message
     * @returns {Promise<string>} API response
     */
    async makeRequest(systemPrompt, userMessage) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), AI_CONFIG.REQUEST_TIMEOUT);

        try {
            const url = `${this.apiUrl}?key=${this.apiKey}`;
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `${systemPrompt}\n\n${userMessage}`
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 1000,
                        topP: 0.8,
                        topK: 10
                    }
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(this.parseError(response.status, errorData));
            }

            const data = await response.json();
            
            if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
                throw new Error('Invalid response format from Gemini');
            }

            const text = data.candidates[0].content.parts[0].text;
            return text.trim();
        } catch (error) {
            clearTimeout(timeoutId);
            
            if (error.name === 'AbortError') {
                throw new Error('Request timeout. Please try again.');
            }
            
            throw error;
        }
    }

    /**
     * Parse Gemini error responses
     * @param {number} status - HTTP status code
     * @param {Object} errorData - Error data from API
     * @returns {string} User-friendly error message
     */
    parseError(status, errorData) {
        const errorMessage = errorData.error?.message || 'Unknown error';
        
        switch (status) {
            case 400:
                if (errorMessage.includes('API key')) {
                    return 'Invalid API key. Please check your Gemini API key.';
                }
                return `Invalid request: ${errorMessage}`;
            case 429:
                return 'Rate limit exceeded. Please try again later.';
            case 500:
            case 502:
            case 503:
                return 'Gemini service temporarily unavailable. Please try again.';
            default:
                return `Gemini API error: ${errorMessage}`;
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
            throw new Error('Invalid Gemini API key');
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
            throw new Error('Invalid Gemini API key');
        }

        const systemPrompt = getSystemPrompt('improve', language);
        return await this.makeRequest(systemPrompt, text);
    }

    /**
     * Validate API key format
     * @returns {boolean} True if valid
     */
    validateApiKey() {
        // Gemini keys are typically 39 characters
        return this.apiKey && this.apiKey.length > 20;
    }
}

export default GeminiProvider;
