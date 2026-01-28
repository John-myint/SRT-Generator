/**
 * SRT Utilities Module
 * Handles SRT file format generation, parsing, and validation
 */

/**
 * Formats a timestamp in milliseconds to SRT format (HH:MM:SS,mmm)
 * @param {number} ms - Timestamp in milliseconds
 * @returns {string} Formatted timestamp
 */
export function formatTimestamp(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor(ms % 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);

    const pad = (num, size = 2) => String(num).padStart(size, '0');

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(milliseconds, 3)}`;
}

/**
 * Parses an SRT timestamp to milliseconds
 * @param {string} timestamp - SRT timestamp (HH:MM:SS,mmm)
 * @returns {number} Timestamp in milliseconds
 */
export function parseTimestamp(timestamp) {
    const [time, ms] = timestamp.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    return (hours * 3600 + minutes * 60 + seconds) * 1000 + Number(ms);
}

/**
 * Generates an SRT file content from subtitle entries
 * @param {Array} subtitles - Array of subtitle objects {start, end, text}
 * @returns {string} SRT file content
 */
export function generateSRT(subtitles) {
    if (!subtitles || subtitles.length === 0) {
        return '';
    }

    return subtitles
        .map((subtitle, index) => {
            const number = index + 1;
            const startTime = formatTimestamp(subtitle.start);
            const endTime = formatTimestamp(subtitle.end);
            const text = subtitle.text.trim();

            return `${number}\n${startTime} --> ${endTime}\n${text}\n`;
        })
        .join('\n');
}

/**
 * Parses SRT file content into subtitle entries
 * @param {string} srtContent - SRT file content
 * @returns {Array} Array of subtitle objects
 */
export function parseSRT(srtContent) {
    const subtitles = [];
    const blocks = srtContent.trim().split('\n\n');

    for (const block of blocks) {
        const lines = block.trim().split('\n');
        
        if (lines.length < 3) continue;

        // Parse subtitle number (first line)
        const number = parseInt(lines[0], 10);
        if (isNaN(number)) continue;

        // Parse timestamps (second line)
        const timeMatch = lines[1].match(/(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})/);
        if (!timeMatch) continue;

        const start = parseTimestamp(timeMatch[1]);
        const end = parseTimestamp(timeMatch[2]);

        // Parse text (remaining lines)
        const text = lines.slice(2).join('\n');

        subtitles.push({ start, end, text, number });
    }

    return subtitles;
}

/**
 * Validates SRT subtitle entries
 * @param {Array} subtitles - Array of subtitle objects
 * @returns {Object} Validation result {valid, errors}
 */
export function validateSRT(subtitles) {
    const errors = [];

    if (!Array.isArray(subtitles)) {
        return { valid: false, errors: ['Subtitles must be an array'] };
    }

    if (subtitles.length === 0) {
        return { valid: false, errors: ['No subtitles to validate'] };
    }

    subtitles.forEach((subtitle, index) => {
        // Check required fields
        if (typeof subtitle.start !== 'number') {
            errors.push(`Subtitle ${index + 1}: Missing or invalid start time`);
        }
        if (typeof subtitle.end !== 'number') {
            errors.push(`Subtitle ${index + 1}: Missing or invalid end time`);
        }
        if (!subtitle.text || subtitle.text.trim() === '') {
            errors.push(`Subtitle ${index + 1}: Missing text`);
        }

        // Check timing logic
        if (subtitle.start >= subtitle.end) {
            errors.push(`Subtitle ${index + 1}: Start time must be before end time`);
        }

        // Check overlap with next subtitle
        if (index < subtitles.length - 1) {
            const nextSubtitle = subtitles[index + 1];
            if (subtitle.end > nextSubtitle.start) {
                errors.push(`Subtitle ${index + 1}: Overlaps with next subtitle`);
            }
        }
    });

    return {
        valid: errors.length === 0,
        errors
    };
}

/**
 * Segments text into subtitle-sized chunks
 * @param {string} text - Text to segment
 * @param {number} maxCharsPerLine - Maximum characters per line (default: 42)
 * @param {number} maxLines - Maximum lines per subtitle (default: 2)
 * @returns {Array} Array of text segments
 */
export function segmentText(text, maxCharsPerLine = 42, maxLines = 2) {
    const words = text.split(/\s+/);
    const segments = [];
    let currentSegment = [];
    let currentLine = '';
    let lineCount = 0;

    for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;

        if (testLine.length > maxCharsPerLine) {
            // Current line is full, start a new line
            if (currentLine) {
                currentSegment.push(currentLine);
                lineCount++;
            }

            // Check if we've reached max lines per subtitle
            if (lineCount >= maxLines) {
                segments.push(currentSegment.join('\n'));
                currentSegment = [];
                lineCount = 0;
            }

            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }

    // Add remaining text
    if (currentLine) {
        currentSegment.push(currentLine);
    }
    if (currentSegment.length > 0) {
        segments.push(currentSegment.join('\n'));
    }

    return segments;
}

/**
 * Estimates subtitle duration based on text length
 * @param {string} text - Subtitle text
 * @param {number} charsPerSecond - Reading speed (default: 15)
 * @returns {number} Duration in milliseconds
 */
export function estimateDuration(text, charsPerSecond = 15) {
    const minDuration = 1000; // Minimum 1 second
    const maxDuration = 7000; // Maximum 7 seconds
    const estimatedDuration = (text.length / charsPerSecond) * 1000;
    
    return Math.max(minDuration, Math.min(maxDuration, estimatedDuration));
}

/**
 * Creates a subtitle object
 * @param {number} start - Start time in milliseconds
 * @param {number} end - End time in milliseconds
 * @param {string} text - Subtitle text
 * @returns {Object} Subtitle object
 */
export function createSubtitle(start, end, text) {
    return {
        start: Math.max(0, start),
        end: Math.max(start, end),
        text: text.trim()
    };
}

/**
 * Merges two subtitles into one
 * @param {Object} subtitle1 - First subtitle
 * @param {Object} subtitle2 - Second subtitle
 * @returns {Object} Merged subtitle
 */
export function mergeSubtitles(subtitle1, subtitle2) {
    return createSubtitle(
        Math.min(subtitle1.start, subtitle2.start),
        Math.max(subtitle1.end, subtitle2.end),
        `${subtitle1.text}\n${subtitle2.text}`
    );
}

/**
 * Splits a subtitle at a specific time
 * @param {Object} subtitle - Subtitle to split
 * @param {number} splitTime - Time to split at (milliseconds)
 * @returns {Array} Array of two subtitles
 */
export function splitSubtitle(subtitle, splitTime) {
    if (splitTime <= subtitle.start || splitTime >= subtitle.end) {
        return [subtitle];
    }

    const words = subtitle.text.split(/\s+/);
    const midPoint = Math.floor(words.length / 2);
    const firstHalf = words.slice(0, midPoint).join(' ');
    const secondHalf = words.slice(midPoint).join(' ');

    return [
        createSubtitle(subtitle.start, splitTime, firstHalf),
        createSubtitle(splitTime, subtitle.end, secondHalf)
    ];
}

/**
 * Downloads SRT content as a file
 * @param {string} srtContent - SRT file content
 * @param {string} filename - Filename (without extension)
 */
export function downloadSRT(srtContent, filename = 'subtitles') {
    // Ensure UTF-8 encoding with BOM for better compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + srtContent], { 
        type: 'text/plain;charset=utf-8' 
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.srt`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Formats file size in bytes to human-readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

/**
 * Cleans and sanitizes subtitle text
 * @param {string} text - Text to clean
 * @returns {string} Cleaned text
 */
export function cleanText(text) {
    return text
        .trim()
        .replace(/\s+/g, ' ')           // Multiple spaces to single space
        .replace(/\n{3,}/g, '\n\n')     // Multiple newlines to double newline
        .replace(/[^\S\n]+/g, ' ');     // Normalize whitespace except newlines
}

export default {
    formatTimestamp,
    parseTimestamp,
    generateSRT,
    parseSRT,
    validateSRT,
    segmentText,
    estimateDuration,
    createSubtitle,
    mergeSubtitles,
    splitSubtitle,
    downloadSRT,
    formatFileSize,
    cleanText
};
