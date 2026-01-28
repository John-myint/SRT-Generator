/**
 * AI Providers Service
 * Handles optional AI-powered subtitle enhancement and translation
 * 
 * IMPORTANT: This is completely optional. All core features work without AI.
 */

/**
 * AI Provider Types
 */
export const AI_PROVIDERS = {
    NONE: 'none',
    OPENAI: 'openai',
    GEMINI: 'gemini'
};

/**
 * AI Service Configuration
 */
export const AI_CONFIG = {
    // Character limits per request for cost safety
    MAX_CHARS_PER_REQUEST: 2000,
    
    // Batch size for subtitle processing
    MAX_BATCH_SIZE: 10,
    
    // Timeout for API requests (ms)
    REQUEST_TIMEOUT: 30000
};

/**
 * Burmese Translation System Prompt
 * Carefully designed for natural, subtitle-friendly Burmese translation
 */
const BURMESE_TRANSLATION_PROMPT = `You are a professional translator specializing in English to Burmese (Myanmar) translation for subtitles.

CRITICAL RULES:
1. Use Myanmar Unicode ONLY (NOT Zawgyi encoding)
2. Translate to natural spoken Burmese, not literal word-for-word
3. Preserve the original meaning, tone, and politeness level
4. Keep sentences concise and suitable for subtitles (max 2 lines)
5. Avoid overly formal or literary language - use conversational style
6. Maintain proper Burmese grammar and sentence structure
7. Do not transliterate English words unnecessarily
8. Preserve numbers, names, and proper nouns appropriately

OUTPUT FORMAT:
- Return ONLY the translated text
- No explanations, no notes, no additional commentary
- Preserve line breaks if present in the original`;

/**
 * Abstract AI Provider Class
 */
export class AIProvider {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.provider = AI_PROVIDERS.NONE;
    }

    /**
     * Translate text to target language
     * @param {string} text - Text to translate
     * @param {string} targetLanguage - Target language code
     * @returns {Promise<string>} Translated text
     */
    async translate(text, targetLanguage) {
        throw new Error('translate() must be implemented by subclass');
    }

    /**
     * Improve text quality (grammar, punctuation, flow)
     * @param {string} text - Text to improve
     * @param {string} language - Language code
     * @returns {Promise<string>} Improved text
     */
    async improve(text, language) {
        throw new Error('improve() must be implemented by subclass');
    }

    /**
     * Batch process multiple subtitles
     * @param {Array} subtitles - Array of subtitle objects
     * @param {string} operation - 'translate' or 'improve'
     * @param {string} targetLanguage - Target language (for translation)
     * @returns {Promise<Array>} Processed subtitles
     */
    async batchProcess(subtitles, operation, targetLanguage) {
        const results = [];
        
        // Process in batches to avoid rate limits
        for (let i = 0; i < subtitles.length; i += AI_CONFIG.MAX_BATCH_SIZE) {
            const batch = subtitles.slice(i, i + AI_CONFIG.MAX_BATCH_SIZE);
            
            const batchResults = await Promise.all(
                batch.map(async (subtitle) => {
                    try {
                        // Check character limit
                        if (subtitle.text.length > AI_CONFIG.MAX_CHARS_PER_REQUEST) {
                            console.warn(`Subtitle too long, skipping AI: ${subtitle.text.substring(0, 50)}...`);
                            return { ...subtitle, aiProcessed: false };
                        }

                        let processedText;
                        if (operation === 'translate') {
                            processedText = await this.translate(subtitle.text, targetLanguage);
                        } else if (operation === 'improve') {
                            processedText = await this.improve(subtitle.text, targetLanguage);
                        } else {
                            throw new Error(`Unknown operation: ${operation}`);
                        }

                        return {
                            ...subtitle,
                            text: processedText,
                            aiProcessed: true
                        };
                    } catch (error) {
                        console.error(`AI processing failed for subtitle ${subtitle.number || i}:`, error);
                        return { ...subtitle, aiProcessed: false, aiError: error.message };
                    }
                })
            );

            results.push(...batchResults);
        }

        return results;
    }

    /**
     * Validate API key format
     * @returns {boolean} True if valid
     */
    validateApiKey() {
        return this.apiKey && this.apiKey.length > 10;
    }
}

/**
 * Get the appropriate system prompt for a language
 * @param {string} operation - 'translate' or 'improve'
 * @param {string} targetLanguage - Target language code
 * @returns {string} System prompt
 */
export function getSystemPrompt(operation, targetLanguage) {
    if (operation === 'translate') {
        if (targetLanguage === 'my' || targetLanguage === 'myanmar' || targetLanguage === 'burmese') {
            return BURMESE_TRANSLATION_PROMPT;
        }
        
        return `You are a professional translator. Translate the following text to natural, conversational ${targetLanguage} suitable for subtitles. Keep it concise (max 2 lines). Return ONLY the translated text, no explanations.`;
    }
    
    if (operation === 'improve') {
        return `You are a professional subtitle editor. Improve the following text by fixing grammar, punctuation, and flow while preserving the original meaning. Keep it concise and natural. Return ONLY the improved text, no explanations.`;
    }
    
    return '';
}

/**
 * Calculate estimated cost for processing
 * @param {number} characterCount - Total characters to process
 * @param {string} provider - AI provider
 * @returns {Object} Cost estimation
 */
export function estimateCost(characterCount, provider) {
    // Rough estimates (as of 2026)
    const costPer1kChars = {
        [AI_PROVIDERS.OPENAI]: 0.002,  // GPT-4 Turbo pricing
        [AI_PROVIDERS.GEMINI]: 0.00025 // Gemini Pro pricing
    };

    const costPerChar = costPer1kChars[provider] || 0;
    const estimatedCost = (characterCount / 1000) * costPerChar;

    return {
        characterCount,
        estimatedCost: estimatedCost.toFixed(4),
        currency: 'USD',
        provider
    };
}

/**
 * Check if text is within safe limits
 * @param {string} text - Text to check
 * @returns {Object} Validation result
 */
export function validateTextLength(text) {
    const length = text.length;
    
    if (length === 0) {
        return { valid: false, reason: 'Text is empty' };
    }
    
    if (length > AI_CONFIG.MAX_CHARS_PER_REQUEST) {
        return { 
            valid: false, 
            reason: `Text too long (${length} chars). Maximum: ${AI_CONFIG.MAX_CHARS_PER_REQUEST}`,
            recommendation: 'Split into smaller chunks'
        };
    }
    
    return { valid: true };
}

/**
 * Get language display name
 * @param {string} code - Language code
 * @returns {string} Display name
 */
export function getLanguageName(code) {
    const languages = {
        'en': 'English',
        'my': 'Burmese (Myanmar)',
        'zh': 'Chinese',
        'es': 'Spanish',
        'fr': 'French',
        'de': 'German',
        'ja': 'Japanese',
        'ko': 'Korean',
        'th': 'Thai',
        'vi': 'Vietnamese',
        'ar': 'Arabic',
        'hi': 'Hindi'
    };
    
    return languages[code] || code;
}

export default {
    AI_PROVIDERS,
    AIProvider,
    getSystemPrompt,
    estimateCost,
    validateTextLength,
    getLanguageName,
    AI_CONFIG
};
