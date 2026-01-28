/**
 * Speech Recognition Module
 * Handles Web Speech API for audio transcription
 */

import { createSubtitle, segmentText, estimateDuration } from './srtUtils.js';

/**
 * Checks if Web Speech API is supported in the browser
 * @returns {boolean} True if supported
 */
export function isSpeechRecognitionSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
}

/**
 * Gets the appropriate SpeechRecognition constructor
 * @returns {Function|null} SpeechRecognition constructor or null
 */
function getSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        return window.webkitSpeechRecognition;
    }
    if ('SpeechRecognition' in window) {
        return window.SpeechRecognition;
    }
    return null;
}

/**
 * Creates and configures a speech recognition instance
 * @param {string} language - Language code (e.g., 'en-US', 'my-MM')
 * @param {Object} options - Configuration options
 * @returns {Object|null} Configured recognition instance
 */
function createRecognition(language = 'en-US', options = {}) {
    const SpeechRecognition = getSpeechRecognition();
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    
    // Configuration
    recognition.continuous = options.continuous !== undefined ? options.continuous : true;
    recognition.interimResults = options.interimResults !== undefined ? options.interimResults : true;
    recognition.maxAlternatives = options.maxAlternatives || 1;
    recognition.lang = language;

    return recognition;
}

/**
 * Main class for handling speech-to-text transcription
 */
export class SpeechTranscriber {
    constructor(language = 'en-US', options = {}) {
        this.language = language;
        this.options = options;
        this.recognition = null;
        this.audioElement = null;
        this.subtitles = [];
        this.currentStartTime = 0;
        this.isTranscribing = false;
        this.callbacks = {
            onProgress: null,
            onResult: null,
            onError: null,
            onComplete: null
        };
    }

    /**
     * Sets up event listeners for the recognition instance
     */
    setupRecognitionEvents() {
        if (!this.recognition) return;

        let lastResultTime = 0;

        // Handle speech recognition results
        this.recognition.onresult = (event) => {
            const currentTime = this.audioElement ? this.audioElement.currentTime * 1000 : Date.now();
            
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const result = event.results[i];
                const transcript = result[0].transcript;

                if (result.isFinal) {
                    // Calculate timing
                    const start = lastResultTime;
                    const duration = estimateDuration(transcript);
                    const end = start + duration;

                    // Create subtitle
                    const subtitle = createSubtitle(start, end, transcript);
                    this.subtitles.push(subtitle);

                    // Update last result time
                    lastResultTime = end;

                    // Callback
                    if (this.callbacks.onResult) {
                        this.callbacks.onResult(subtitle, this.subtitles.length);
                    }

                    console.log('Final transcript:', transcript);
                } else {
                    // Interim result (optional callback)
                    if (this.callbacks.onProgress) {
                        this.callbacks.onProgress({
                            text: transcript,
                            interim: true,
                            confidence: result[0].confidence
                        });
                    }
                }
            }
        };

        // Handle errors
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            
            if (this.callbacks.onError) {
                this.callbacks.onError(event.error);
            }

            // Don't stop on 'no-speech' error, continue listening
            if (event.error !== 'no-speech') {
                this.isTranscribing = false;
            }
        };

        // Handle recognition end
        this.recognition.onend = () => {
            if (this.isTranscribing && this.audioElement && !this.audioElement.paused) {
                // Restart recognition if audio is still playing
                try {
                    this.recognition.start();
                } catch (e) {
                    console.log('Recognition restart failed:', e);
                }
            } else {
                this.isTranscribing = false;
                if (this.callbacks.onComplete) {
                    this.callbacks.onComplete(this.subtitles);
                }
            }
        };

        // Handle recognition start
        this.recognition.onstart = () => {
            console.log('Speech recognition started');
        };
    }

    /**
     * Transcribes an audio/video file
     * @param {File} file - Audio or video file
     * @param {Object} callbacks - Event callbacks
     * @returns {Promise<Array>} Array of subtitle objects
     */
    async transcribeFile(file, callbacks = {}) {
        if (!isSpeechRecognitionSupported()) {
            throw new Error('Speech recognition is not supported in this browser');
        }

        // Set callbacks
        this.callbacks = { ...this.callbacks, ...callbacks };

        // Reset state
        this.subtitles = [];
        this.isTranscribing = true;

        // Create audio element
        this.audioElement = document.createElement('audio');
        this.audioElement.src = URL.createObjectURL(file);
        
        // For speech recognition to work, audio needs to play
        // We can mute it or keep volume low
        this.audioElement.volume = 0.0; // Muted
        
        // Create recognition instance
        this.recognition = createRecognition(this.language, {
            continuous: true,
            interimResults: true,
            maxAlternatives: 1
        });

        this.setupRecognitionEvents();

        return new Promise((resolve, reject) => {
            // Setup audio event listeners
            this.audioElement.onloadedmetadata = () => {
                console.log('Audio duration:', this.audioElement.duration, 'seconds');
            };

            this.audioElement.onplay = () => {
                try {
                    this.recognition.start();
                    console.log('Starting transcription...');
                } catch (e) {
                    console.error('Failed to start recognition:', e);
                    reject(e);
                }
            };

            this.audioElement.onended = () => {
                console.log('Audio playback ended');
                this.isTranscribing = false;
                
                // Stop recognition
                if (this.recognition) {
                    try {
                        this.recognition.stop();
                    } catch (e) {
                        console.log('Recognition already stopped');
                    }
                }

                // Cleanup
                URL.revokeObjectURL(this.audioElement.src);
                
                resolve(this.subtitles);
            };

            this.audioElement.onerror = (e) => {
                console.error('Audio error:', e);
                this.isTranscribing = false;
                reject(new Error('Failed to load audio file'));
            };

            // Start playback (muted)
            this.audioElement.play().catch(reject);
        });
    }

    /**
     * Stops the transcription process
     */
    stop() {
        this.isTranscribing = false;
        
        if (this.recognition) {
            try {
                this.recognition.stop();
            } catch (e) {
                console.log('Recognition already stopped');
            }
        }

        if (this.audioElement) {
            this.audioElement.pause();
            this.audioElement.currentTime = 0;
        }
    }

    /**
     * Gets the current transcription progress
     * @returns {Object} Progress information
     */
    getProgress() {
        if (!this.audioElement) {
            return { current: 0, total: 0, percentage: 0 };
        }

        const current = this.audioElement.currentTime;
        const total = this.audioElement.duration || 0;
        const percentage = total > 0 ? (current / total) * 100 : 0;

        return {
            current: Math.floor(current),
            total: Math.floor(total),
            percentage: Math.floor(percentage)
        };
    }

    /**
     * Gets all transcribed subtitles
     * @returns {Array} Array of subtitle objects
     */
    getSubtitles() {
        return this.subtitles;
    }
}

/**
 * Utility function to transcribe a file with simple API
 * @param {File} file - Audio/video file
 * @param {string} language - Language code
 * @param {Object} callbacks - Event callbacks
 * @returns {Promise<Array>} Array of subtitles
 */
export async function transcribeFile(file, language = 'en-US', callbacks = {}) {
    const transcriber = new SpeechTranscriber(language);
    return await transcriber.transcribeFile(file, callbacks);
}

/**
 * Gets list of supported languages for speech recognition
 * @returns {Array} Array of language objects {code, name}
 */
export function getSupportedLanguages() {
    return [
        { code: 'en-US', name: 'English (US)' },
        { code: 'en-GB', name: 'English (UK)' },
        { code: 'my-MM', name: 'Burmese (Myanmar)' },
        { code: 'zh-CN', name: 'Chinese (Mandarin)' },
        { code: 'es-ES', name: 'Spanish (Spain)' },
        { code: 'fr-FR', name: 'French (France)' },
        { code: 'de-DE', name: 'German (Germany)' },
        { code: 'ja-JP', name: 'Japanese' },
        { code: 'ko-KR', name: 'Korean' },
        { code: 'th-TH', name: 'Thai' },
        { code: 'vi-VN', name: 'Vietnamese' },
        { code: 'id-ID', name: 'Indonesian' },
        { code: 'ar-SA', name: 'Arabic (Saudi Arabia)' },
        { code: 'hi-IN', name: 'Hindi (India)' },
        { code: 'pt-BR', name: 'Portuguese (Brazil)' },
        { code: 'ru-RU', name: 'Russian' },
        { code: 'it-IT', name: 'Italian' },
        { code: 'nl-NL', name: 'Dutch' },
        { code: 'tr-TR', name: 'Turkish' },
        { code: 'pl-PL', name: 'Polish' }
    ];
}

/**
 * Gets browser information for speech recognition support
 * @returns {Object} Browser support information
 */
export function getBrowserInfo() {
    const isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    const isEdge = /Edg/.test(navigator.userAgent);
    const isOpera = /OPR/.test(navigator.userAgent);
    const isBrave = navigator.brave !== undefined;
    
    return {
        isSupported: isSpeechRecognitionSupported(),
        isRecommended: isChrome || isEdge || isOpera || isBrave,
        browserName: isChrome ? 'Chrome' : isEdge ? 'Edge' : isOpera ? 'Opera' : 'Unknown',
        vendor: navigator.vendor
    };
}

export default {
    isSpeechRecognitionSupported,
    SpeechTranscriber,
    transcribeFile,
    getSupportedLanguages,
    getBrowserInfo
};
