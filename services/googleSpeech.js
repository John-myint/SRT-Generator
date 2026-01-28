/**
 * Google Cloud Speech-to-Text Service
 * Provides fast, accurate speech-to-text transcription for audio files
 * 
 * Free Tier: 60 minutes per month
 * Pricing: $0.006-0.024 per minute after free tier
 */

import { createSubtitle } from '../utils/srtUtils.js';

/**
 * Google Cloud Speech-to-Text Provider
 */
export class GoogleSpeechProvider {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiUrl = 'https://speech.googleapis.com/v1/speech:recognize';
        this.provider = 'google-speech';
    }

    /**
     * Convert audio file to base64
     * @param {File} file - Audio/video file
     * @returns {Promise<string>} Base64 encoded audio
     */
    async fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                // Remove data URL prefix
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }

    /**
     * Detect audio format from file
     * @param {File} file - Audio/video file
     * @returns {string} Google Cloud encoding format
     */
    detectEncoding(file) {
        const type = file.type.toLowerCase();
        
        if (type.includes('mp3') || type.includes('mpeg')) {
            return 'MP3';
        } else if (type.includes('wav')) {
            return 'LINEAR16';
        } else if (type.includes('flac')) {
            return 'FLAC';
        } else if (type.includes('ogg')) {
            return 'OGG_OPUS';
        } else if (type.includes('webm')) {
            return 'WEBM_OPUS';
        }
        
        // Default to MP3 for video files
        return 'MP3';
    }

    /**
     * Transcribe audio file
     * @param {File} file - Audio/video file
     * @param {string} languageCode - Language code (e.g., 'en-US', 'my-MM')
     * @param {Function} onProgress - Progress callback
     * @returns {Promise<Array>} Array of subtitle objects
     */
    async transcribe(file, languageCode = 'en-US', onProgress = null) {
        try {
            console.log('🎤 Starting Google Cloud Speech-to-Text transcription...');
            console.log('File:', file.name, 'Size:', (file.size / 1024 / 1024).toFixed(2), 'MB');
            
            if (onProgress) onProgress(10, 'Encoding audio...');
            
            // Convert file to base64
            const audioContent = await this.fileToBase64(file);
            
            if (onProgress) onProgress(20, 'Sending to Google Cloud...');
            
            // Prepare request
            const encoding = this.detectEncoding(file);
            const request = {
                config: {
                    encoding: encoding,
                    languageCode: languageCode,
                    enableAutomaticPunctuation: true,
                    enableWordTimeOffsets: true,
                    model: 'default',
                    useEnhanced: true
                },
                audio: {
                    content: audioContent
                }
            };

            // Make API request
            const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(this.parseError(error, response.status));
            }

            if (onProgress) onProgress(80, 'Processing results...');

            const data = await response.json();
            
            // Parse results into subtitles
            const subtitles = this.parseResults(data);
            
            if (onProgress) onProgress(100, 'Complete!');
            
            console.log('✅ Transcription complete:', subtitles.length, 'subtitles');
            return subtitles;

        } catch (error) {
            console.error('❌ Google Speech API error:', error);
            throw error;
        }
    }

    /**
     * Parse Google Cloud Speech results into subtitles
     * @param {Object} data - API response data
     * @returns {Array} Array of subtitle objects
     */
    parseResults(data) {
        const subtitles = [];
        
        if (!data.results || data.results.length === 0) {
            return subtitles;
        }

        let subtitleIndex = 0;
        
        for (const result of data.results) {
            if (!result.alternatives || result.alternatives.length === 0) {
                continue;
            }

            const alternative = result.alternatives[0];
            
            if (!alternative.words || alternative.words.length === 0) {
                // No word timing, create subtitle from transcript
                const text = alternative.transcript.trim();
                if (text) {
                    subtitles.push(createSubtitle(
                        subtitleIndex * 3000, // Estimate timing
                        (subtitleIndex + 1) * 3000,
                        text
                    ));
                    subtitleIndex++;
                }
                continue;
            }

            // Group words into subtitle chunks (every ~5-7 words or by punctuation)
            let currentChunk = [];
            let chunkStartTime = null;
            let lastEndTime = null;

            for (let i = 0; i < alternative.words.length; i++) {
                const word = alternative.words[i];
                const startTime = this.parseTime(word.startTime);
                const endTime = this.parseTime(word.endTime);

                if (chunkStartTime === null) {
                    chunkStartTime = startTime;
                }

                currentChunk.push(word.word);
                lastEndTime = endTime;

                // Create subtitle if:
                // - Chunk has 7+ words, OR
                // - Word ends with punctuation, OR
                // - Last word in results
                const isPunctuation = /[.!?,;:]$/.test(word.word);
                const isChunkFull = currentChunk.length >= 7;
                const isLastWord = i === alternative.words.length - 1;

                if (isPunctuation || isChunkFull || isLastWord) {
                    const text = currentChunk.join(' ').trim();
                    
                    if (text) {
                        subtitles.push(createSubtitle(
                            chunkStartTime,
                            lastEndTime,
                            text
                        ));
                    }

                    // Reset chunk
                    currentChunk = [];
                    chunkStartTime = null;
                }
            }
        }

        return subtitles;
    }

    /**
     * Parse time string to milliseconds
     * @param {string} timeString - Time string like "1.500s"
     * @returns {number} Time in milliseconds
     */
    parseTime(timeString) {
        if (!timeString) return 0;
        
        // Remove 's' and convert to milliseconds
        const seconds = parseFloat(timeString.replace('s', ''));
        return Math.round(seconds * 1000);
    }

    /**
     * Parse API error
     * @param {Object} error - Error object
     * @param {number} status - HTTP status code
     * @returns {string} User-friendly error message
     */
    parseError(error, status) {
        if (status === 400) {
            return 'Invalid request. Check your audio file format and language code.';
        } else if (status === 401 || status === 403) {
            return 'Invalid API key. Please check your Google Cloud API key.';
        } else if (status === 429) {
            return 'Rate limit exceeded. Please wait a moment and try again.';
        } else if (status === 413) {
            return 'File too large. Google Cloud Speech supports files up to 10MB for synchronous requests.';
        }
        
        const message = error?.error?.message || error?.message || 'Unknown error';
        return `Google Speech API error: ${message}`;
    }

    /**
     * Estimate cost for transcription
     * @param {number} durationSeconds - Audio duration in seconds
     * @returns {Object} Cost estimate
     */
    static estimateCost(durationSeconds) {
        const minutes = Math.ceil(durationSeconds / 60);
        const freeTierMinutes = 60; // Per month
        
        // Assume user might have used some of free tier
        const estimatedCost = minutes <= freeTierMinutes 
            ? 0 
            : (minutes - freeTierMinutes) * 0.006;

        return {
            minutes,
            estimatedCost: estimatedCost.toFixed(3),
            message: minutes <= freeTierMinutes 
                ? `${minutes} minutes - Likely FREE (within 60 min/month free tier)`
                : `${minutes} minutes - ~$${estimatedCost.toFixed(3)} (after free tier)`
        };
    }
}

export default GoogleSpeechProvider;
