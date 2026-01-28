/**
 * Translation Utilities Module
 * Provides translation helpers and language utilities for Burmese and other languages
 */

/**
 * Language information database
 */
export const LANGUAGES = {
    'en': { 
        name: 'English', 
        nativeName: 'English',
        direction: 'ltr',
        font: 'Inter, sans-serif'
    },
    'my': { 
        name: 'Burmese', 
        nativeName: 'မြန်မာ',
        direction: 'ltr', // Burmese is left-to-right
        font: 'Padauk, Myanmar Text, Noto Sans Myanmar, sans-serif'
    },
    'zh': { 
        name: 'Chinese', 
        nativeName: '中文',
        direction: 'ltr',
        font: 'Noto Sans SC, SimSun, sans-serif'
    },
    'es': { 
        name: 'Spanish', 
        nativeName: 'Español',
        direction: 'ltr',
        font: 'Inter, sans-serif'
    },
    'fr': { 
        name: 'French', 
        nativeName: 'Français',
        direction: 'ltr',
        font: 'Inter, sans-serif'
    },
    'de': { 
        name: 'German', 
        nativeName: 'Deutsch',
        direction: 'ltr',
        font: 'Inter, sans-serif'
    },
    'ja': { 
        name: 'Japanese', 
        nativeName: '日本語',
        direction: 'ltr',
        font: 'Noto Sans JP, Meiryo, sans-serif'
    },
    'ko': { 
        name: 'Korean', 
        nativeName: '한국어',
        direction: 'ltr',
        font: 'Noto Sans KR, Malgun Gothic, sans-serif'
    },
    'th': { 
        name: 'Thai', 
        nativeName: 'ไทย',
        direction: 'ltr',
        font: 'Noto Sans Thai, Tahoma, sans-serif'
    },
    'vi': { 
        name: 'Vietnamese', 
        nativeName: 'Tiếng Việt',
        direction: 'ltr',
        font: 'Inter, sans-serif'
    },
    'ar': { 
        name: 'Arabic', 
        nativeName: 'العربية',
        direction: 'rtl',
        font: 'Noto Sans Arabic, Tahoma, sans-serif'
    },
    'hi': { 
        name: 'Hindi', 
        nativeName: 'हिन्दी',
        direction: 'ltr',
        font: 'Noto Sans Devanagari, Mangal, sans-serif'
    }
};

/**
 * Gets language information
 * @param {string} code - Language code (e.g., 'en', 'my')
 * @returns {Object} Language information
 */
export function getLanguageInfo(code) {
    return LANGUAGES[code] || LANGUAGES['en'];
}

/**
 * Checks if a language uses a complex script (requires special font support)
 * @param {string} code - Language code
 * @returns {boolean} True if complex script
 */
export function isComplexScript(code) {
    const complexScripts = ['my', 'th', 'ar', 'hi', 'zh', 'ja', 'ko'];
    return complexScripts.includes(code);
}

/**
 * Gets appropriate font family for a language
 * @param {string} code - Language code
 * @returns {string} CSS font-family value
 */
export function getLanguageFont(code) {
    const info = getLanguageInfo(code);
    return info.font;
}

/**
 * Gets text direction for a language
 * @param {string} code - Language code
 * @returns {string} 'ltr' or 'rtl'
 */
export function getTextDirection(code) {
    const info = getLanguageInfo(code);
    return info.direction;
}

/**
 * Common Burmese phrases for subtitle editing assistance
 */
export const BURMESE_PHRASES = {
    // Greetings
    'hello': 'မင်္ဂလာပါ',
    'goodbye': 'သွားတော့မယ်',
    'thank you': 'ကျေးဇူးတင်ပါတယ်',
    'sorry': 'တောင်းပန်ပါတယ်',
    'excuse me': 'ခွင့်ပြုပါ',
    
    // Common words
    'yes': 'ဟုတ်ကဲ့',
    'no': 'မဟုတ်ပါ',
    'please': 'ကျေးဇူးပြု၍',
    'okay': 'အိုကေ',
    'good': 'ကောင်းတယ်',
    'bad': 'မကောင်းဘူး',
    
    // Questions
    'what': 'ဘာ',
    'when': 'ဘယ်တုန်းက',
    'where': 'ဘယ်မှာ',
    'who': 'ဘယ်သူ',
    'why': 'ဘာကြောင့်',
    'how': 'ဘယ်လို'
};

/**
 * Gets Burmese translation suggestion for common English phrases
 * @param {string} englishText - English text
 * @returns {string|null} Burmese suggestion or null
 */
export function getBurmeseSuggestion(englishText) {
    const normalized = englishText.toLowerCase().trim();
    return BURMESE_PHRASES[normalized] || null;
}

/**
 * Validates if text contains valid Burmese Unicode characters
 * @param {string} text - Text to validate
 * @returns {boolean} True if contains Burmese characters
 */
export function containsBurmese(text) {
    // Burmese Unicode range: U+1000 to U+109F
    const burmeseRegex = /[\u1000-\u109F]/;
    return burmeseRegex.test(text);
}

/**
 * Validates if text contains only valid Burmese Unicode characters
 * @param {string} text - Text to validate
 * @returns {boolean} True if valid Burmese text
 */
export function isValidBurmese(text) {
    // Burmese Unicode range plus common punctuation and spaces
    const burmeseRegex = /^[\u1000-\u109F\s.,!?;:'"()-]+$/;
    return burmeseRegex.test(text);
}

/**
 * Cleans and normalizes Burmese text
 * @param {string} text - Burmese text
 * @returns {string} Cleaned text
 */
export function cleanBurmeseText(text) {
    return text
        .trim()
        .replace(/\s+/g, ' ')  // Normalize spaces
        .replace(/[\u200B-\u200D\uFEFF]/g, ''); // Remove zero-width characters
}

/**
 * Counts characters in text (Unicode-aware)
 * @param {string} text - Text to count
 * @returns {number} Character count
 */
export function countCharacters(text) {
    // Use Array.from to handle multi-byte Unicode characters correctly
    return Array.from(text).length;
}

/**
 * Estimates reading time for text based on language
 * @param {string} text - Text to analyze
 * @param {string} languageCode - Language code
 * @returns {number} Estimated reading time in seconds
 */
export function estimateReadingTime(text, languageCode = 'en') {
    const charCount = countCharacters(text);
    
    // Reading speed varies by language (characters per second)
    const readingSpeeds = {
        'en': 15,   // English: ~15 chars/sec
        'my': 10,   // Burmese: slower due to complexity
        'zh': 12,   // Chinese: moderate
        'ja': 12,   // Japanese: moderate
        'ko': 13,   // Korean: moderate
        'th': 11,   // Thai: slower
        'ar': 13,   // Arabic: moderate
        'default': 14
    };
    
    const speed = readingSpeeds[languageCode] || readingSpeeds['default'];
    const minTime = 1; // Minimum 1 second
    const estimatedTime = Math.max(minTime, charCount / speed);
    
    return Math.round(estimatedTime);
}

/**
 * Applies language-specific font to an element
 * @param {HTMLElement} element - DOM element
 * @param {string} languageCode - Language code
 */
export function applyLanguageFont(element, languageCode) {
    if (!element) return;
    
    const font = getLanguageFont(languageCode);
    element.style.fontFamily = font;
    
    const direction = getTextDirection(languageCode);
    element.dir = direction;
}

/**
 * Creates a translation placeholder text
 * @param {string} sourceText - Original text
 * @param {string} targetLanguage - Target language name
 * @returns {string} Placeholder text
 */
export function createTranslationPlaceholder(sourceText, targetLanguage) {
    return `[Translate to ${targetLanguage}]: ${sourceText}`;
}

/**
 * Detects the language of a text (simple heuristic)
 * @param {string} text - Text to analyze
 * @returns {string} Detected language code
 */
export function detectLanguage(text) {
    // Simple Unicode range detection
    if (/[\u1000-\u109F]/.test(text)) return 'my'; // Burmese
    if (/[\u4E00-\u9FFF]/.test(text)) return 'zh'; // Chinese
    if (/[\u0E00-\u0E7F]/.test(text)) return 'th'; // Thai
    if (/[\u0600-\u06FF]/.test(text)) return 'ar'; // Arabic
    if (/[\u0900-\u097F]/.test(text)) return 'hi'; // Hindi
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) return 'ja'; // Japanese
    if (/[\uAC00-\uD7AF]/.test(text)) return 'ko'; // Korean
    
    return 'en'; // Default to English
}

/**
 * Formats text for display with proper line breaks for subtitles
 * @param {string} text - Text to format
 * @param {number} maxLineLength - Maximum characters per line
 * @returns {string} Formatted text with line breaks
 */
export function formatSubtitleText(text, maxLineLength = 42) {
    const words = text.split(/\s+/);
    const lines = [];
    let currentLine = '';
    
    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        
        if (testLine.length > maxLineLength && currentLine.length > 0) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    
    if (currentLine) {
        lines.push(currentLine);
    }
    
    // Limit to 2 lines for standard subtitles
    return lines.slice(0, 2).join('\n');
}

/**
 * Translation assistance info message
 * @returns {string} Help message
 */
export function getTranslationHelp() {
    return `
Manual Translation Guide:

1. After generating subtitles, edit the text in each subtitle box
2. For Burmese text, use a Burmese keyboard or copy-paste
3. The editor supports Unicode text entry
4. Verify Burmese characters display correctly
5. Adjust timing if needed for longer translations

Common Challenges:
- Automatic translation APIs require payment or authentication
- Free translation quality varies significantly
- Manual translation ensures accuracy and context
- Consider using online dictionaries or translation tools separately

Recommended Tools:
- Google Translate (copy-paste workflow)
- Myanmar-English dictionaries
- Native speaker review for quality
    `.trim();
}

/**
 * Checks if browser supports proper font rendering for a language
 * @param {string} languageCode - Language code
 * @returns {Promise<boolean>} True if fonts are available
 */
export async function checkFontSupport(languageCode) {
    if (!document.fonts || !document.fonts.check) {
        return true; // Assume support if Font Loading API not available
    }
    
    const testStrings = {
        'my': 'မြန်မာ',
        'th': 'ไทย',
        'ar': 'العربية',
        'zh': '中文',
        'ja': '日本語',
        'ko': '한국어'
    };
    
    const testString = testStrings[languageCode];
    if (!testString) return true;
    
    const font = getLanguageFont(languageCode);
    const fonts = font.split(',')[0].trim().replace(/['"]/g, '');
    
    try {
        return document.fonts.check(`12px ${fonts}`, testString);
    } catch (e) {
        return true; // Assume support if check fails
    }
}

export default {
    LANGUAGES,
    BURMESE_PHRASES,
    getLanguageInfo,
    isComplexScript,
    getLanguageFont,
    getTextDirection,
    getBurmeseSuggestion,
    containsBurmese,
    isValidBurmese,
    cleanBurmeseText,
    countCharacters,
    estimateReadingTime,
    applyLanguageFont,
    createTranslationPlaceholder,
    detectLanguage,
    formatSubtitleText,
    getTranslationHelp,
    checkFontSupport
};
