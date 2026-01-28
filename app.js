/**
 * SRT Generator - Main Application
 * Client-side subtitle generator with Burmese language support
 */

console.log('🚀 app.js module loading...');

import { 
    generateSRT, 
    downloadSRT, 
    formatFileSize,
    createSubtitle 
} from './utils/srtUtils.js';

import { 
    isSpeechRecognitionSupported, 
    SpeechTranscriber,
    getBrowserInfo 
} from './utils/speechRecognition.js';

import { 
    getLanguageInfo,
    applyLanguageFont,
    getLanguageFont 
} from './utils/translation.js';

import { 
    AI_PROVIDERS,
    estimateCost,
    validateTextLength,
    getLanguageName
} from './services/aiProviders.js';

import OpenAIProvider from './services/openai.js';
import GeminiProvider from './services/gemini.js';

/**
 * Application State
 */
const state = {
    currentFile: null,
    subtitles: [],
    transcriber: null,
    isProcessing: false,
    sourceLanguage: 'en-US',
    targetLanguage: 'my',
    theme: 'light',
    // AI Enhancement
    aiEnabled: false,
    aiProvider: AI_PROVIDERS.NONE,
    aiApiKey: null,
    aiClient: null
};

/**
 * DOM Elements
 */
const elements = {
    // Upload
    dropZone: document.getElementById('dropZone'),
    fileInput: document.getElementById('fileInput'),
    fileInfo: document.getElementById('fileInfo'),
    fileName: document.getElementById('fileName'),
    fileSize: document.getElementById('fileSize'),
    removeFile: document.getElementById('removeFile'),
    
    // Language
    sourceLanguage: document.getElementById('sourceLanguage'),
    targetLanguage: document.getElementById('targetLanguage'),
    
    // Actions
    generateBtn: document.getElementById('generateBtn'),
    clearBtn: document.getElementById('clearBtn'),
    
    // Progress
    progressSection: document.getElementById('progressSection'),
    progressText: document.getElementById('progressText'),
    progressFill: document.getElementById('progressFill'),
    
    // Editor
    editorSection: document.getElementById('editorSection'),
    subtitleList: document.getElementById('subtitleList'),
    addSubtitleBtn: document.getElementById('addSubtitleBtn'),
    
    // Download
    downloadSection: document.getElementById('downloadSection'),
    subtitleCount: document.getElementById('subtitleCount'),
    downloadBtn: document.getElementById('downloadBtn'),
    
    // Browser warning
    browserWarning: document.getElementById('browserWarning'),
    
    // Theme
    themeToggle: document.getElementById('themeToggle'),
    
    // AI Enhancement
    aiEnhancementToggle: document.getElementById('aiEnhancementToggle'),
    aiSettings: document.getElementById('aiSettings'),
    aiProvider: document.getElementById('aiProvider'),
    aiKeySection: document.getElementById('aiKeySection'),
    aiApiKey: document.getElementById('aiApiKey'),
    toggleApiKeyVisibility: document.getElementById('toggleApiKeyVisibility'),
    saveApiKey: document.getElementById('saveApiKey'),
    clearApiKey: document.getElementById('clearApiKey'),
    aiActions: document.getElementById('aiActions'),
    translateWithAI: document.getElementById('translateWithAI'),
    improveWithAI: document.getElementById('improveWithAI')
};

/**
 * Initialize Application
 */
function init() {
    console.log('🎬 SRT Generator - Initializing...');
    
    // Check browser compatibility
    checkBrowserCompatibility();
    
    // Load theme preference
    loadTheme();
    
    // Load AI settings
    loadAISettings();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    console.log('✅ Application initialized');
}

/**
 * Check Browser Compatibility
 */
function checkBrowserCompatibility() {
    const browserInfo = getBrowserInfo();
    
    if (!browserInfo.isSupported) {
        elements.browserWarning.style.display = 'flex';
        elements.generateBtn.disabled = true;
        elements.generateBtn.innerHTML = '<i data-lucide="alert-triangle"></i> Browser Not Supported';
        console.error('❌ Speech recognition not supported');
    } else if (!browserInfo.isRecommended) {
        elements.browserWarning.style.display = 'flex';
        console.warn('⚠️ Browser has limited support');
    }
}

/**
 * Setup Event Listeners
 */
function setupEventListeners() {
    // File upload
    elements.dropZone.addEventListener('click', () => elements.fileInput.click());
    elements.dropZone.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            elements.fileInput.click();
        }
    });
    
    elements.fileInput.addEventListener('change', handleFileSelect);
    elements.removeFile.addEventListener('click', clearFile);
    
    // Drag and drop
    elements.dropZone.addEventListener('dragover', handleDragOver);
    elements.dropZone.addEventListener('dragleave', handleDragLeave);
    elements.dropZone.addEventListener('drop', handleDrop);
    
    // Language selection
    elements.sourceLanguage.addEventListener('change', (e) => {
        state.sourceLanguage = e.target.value;
    });
    
    elements.targetLanguage.addEventListener('change', (e) => {
        state.targetLanguage = e.target.value;
        updateSubtitleFonts();
    });
    
    // Actions
    elements.generateBtn.addEventListener('click', generateSubtitles);
    elements.clearBtn.addEventListener('click', clearAll);
    elements.addSubtitleBtn.addEventListener('click', addNewSubtitle);
    
    // Download
    elements.downloadBtn.addEventListener('click', downloadSubtitles);
    
    // Theme toggle
    console.log('🎨 Theme toggle element:', elements.themeToggle);
    if (elements.themeToggle) {
        elements.themeToggle.addEventListener('click', () => {
            console.log('🎨 Theme toggle clicked!');
            toggleTheme();
        });
        console.log('✅ Theme toggle listener attached');
    } else {
        console.error('❌ Theme toggle element not found!');
    }
    
    // AI Enhancement
    elements.aiEnhancementToggle.addEventListener('change', toggleAIEnhancement);
    elements.aiProvider.addEventListener('change', handleAIProviderChange);
    elements.toggleApiKeyVisibility.addEventListener('click', toggleApiKeyVisibility);
    elements.saveApiKey.addEventListener('click', saveAIApiKey);
    elements.clearApiKey.addEventListener('click', clearAIApiKey);
    elements.translateWithAI.addEventListener('click', translateSubtitlesWithAI);
    elements.improveWithAI.addEventListener('click', improveSubtitlesWithAI);
}

/**
 * Handle File Select
 */
function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        setFile(file);
    }
}

/**
 * Handle Drag Over
 */
function handleDragOver(e) {
    e.preventDefault();
    elements.dropZone.classList.add('drag-over');
}

/**
 * Handle Drag Leave
 */
function handleDragLeave(e) {
    e.preventDefault();
    elements.dropZone.classList.remove('drag-over');
}

/**
 * Handle Drop
 */
function handleDrop(e) {
    e.preventDefault();
    elements.dropZone.classList.remove('drag-over');
    
    const file = e.dataTransfer.files[0];
    if (file) {
        // Check if it's an audio or video file
        if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
            setFile(file);
        } else {
            alert('Please upload an audio or video file.');
        }
    }
}

/**
 * Set Current File
 */
function setFile(file) {
    state.currentFile = file;
    
    // Update UI
    elements.fileName.textContent = file.name;
    elements.fileSize.textContent = formatFileSize(file.size);
    elements.fileInfo.style.display = 'flex';
    elements.dropZone.style.display = 'none';
    elements.generateBtn.disabled = false;
    
    console.log('📁 File selected:', file.name);
}

/**
 * Clear File
 */
function clearFile() {
    state.currentFile = null;
    elements.fileInput.value = '';
    elements.fileInfo.style.display = 'none';
    elements.dropZone.style.display = 'block';
    elements.generateBtn.disabled = true;
}

/**
 * Generate Subtitles
 */
async function generateSubtitles() {
    if (!state.currentFile || state.isProcessing) return;
    
    console.log('🎙️ Starting transcription...');
    
    state.isProcessing = true;
    state.subtitles = [];
    
    // Show progress
    showProgress('Initializing transcription...');
    
    // Hide previous results
    elements.editorSection.style.display = 'none';
    elements.downloadSection.style.display = 'none';
    
    // Disable buttons
    elements.generateBtn.disabled = true;
    elements.clearBtn.disabled = true;
    
    try {
        // Create transcriber
        state.transcriber = new SpeechTranscriber(state.sourceLanguage);
        
        // Transcribe file
        const subtitles = await state.transcriber.transcribeFile(state.currentFile, {
            onProgress: (progress) => {
                // Update progress (interim results)
                const { percentage } = state.transcriber.getProgress();
                updateProgress(percentage, 'Transcribing audio...');
            },
            onResult: (subtitle, count) => {
                // New subtitle created
                console.log(`📝 Subtitle ${count}:`, subtitle.text);
                state.subtitles.push(subtitle);
                
                // Update UI in real-time
                renderSubtitles();
                
                const { percentage } = state.transcriber.getProgress();
                updateProgress(percentage, `Transcribed ${count} subtitle${count !== 1 ? 's' : ''}...`);
            },
            onError: (error) => {
                console.error('❌ Transcription error:', error);
                
                if (error === 'no-speech') {
                    // Continue, this is normal
                    return;
                }
                
                showError(`Transcription error: ${error}`);
            },
            onComplete: (subtitles) => {
                console.log('✅ Transcription complete:', subtitles.length, 'subtitles');
                completeTranscription();
            }
        });
        
    } catch (error) {
        console.error('❌ Failed to generate subtitles:', error);
        showError(error.message || 'Failed to generate subtitles');
        hideProgress();
        state.isProcessing = false;
        elements.generateBtn.disabled = false;
        elements.clearBtn.disabled = false;
    }
}

/**
 * Complete Transcription
 */
function completeTranscription() {
    hideProgress();
    state.isProcessing = false;
    
    // Re-enable buttons
    elements.generateBtn.disabled = false;
    elements.clearBtn.disabled = false;
    
    if (state.subtitles.length === 0) {
        const errorMsg = `No subtitles were generated. Common fixes:

1. Grant microphone permission (even for file uploads)
2. Ensure audio contains clear speech
3. Check your internet connection (required for Web Speech API)
4. Try using Chrome or Edge browser
5. Check browser console (F12) for detailed errors

Audio quality tips:
- Clear speech without too much background noise
- Supported languages: English works best
- File format: MP3, WAV, MP4 recommended`;
        
        showError(errorMsg);
        console.error('❌ No subtitles generated. Check:', {
            fileSize: state.currentFile?.size,
            fileType: state.currentFile?.type,
            sourceLanguage: state.sourceLanguage,
            browserSupport: isSpeechRecognitionSupported()
        });
        return;
    }
    
    // Show editor and download sections
    elements.editorSection.style.display = 'block';
    elements.downloadSection.style.display = 'block';
    
    // Render subtitles
    renderSubtitles();
    
    // Update download info
    updateDownloadInfo();
    
    // Scroll to editor
    elements.editorSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Render Subtitles
 */
function renderSubtitles() {
    elements.subtitleList.innerHTML = '';
    
    state.subtitles.forEach((subtitle, index) => {
        const item = createSubtitleItem(subtitle, index);
        elements.subtitleList.appendChild(item);
    });
    
    // Reinitialize icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Apply language font
    updateSubtitleFonts();
}

/**
 * Create Subtitle Item Element
 */
function createSubtitleItem(subtitle, index) {
    const item = document.createElement('div');
    item.className = 'subtitle-item';
    item.dataset.index = index;
    item.setAttribute('role', 'listitem');
    
    const startTime = formatTimeForInput(subtitle.start);
    const endTime = formatTimeForInput(subtitle.end);
    
    item.innerHTML = `
        <div class="subtitle-header">
            <span class="subtitle-number">#${index + 1}</span>
            <div class="subtitle-actions">
                <button class="btn-icon" onclick="window.appActions.deleteSubtitle(${index})" 
                        aria-label="Delete subtitle">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>
        <div class="subtitle-timing">
            <input type="text" 
                   value="${startTime}" 
                   placeholder="00:00:00,000"
                   onchange="window.appActions.updateSubtitleTime(${index}, 'start', this.value)"
                   aria-label="Start time">
            <span class="subtitle-arrow">→</span>
            <input type="text" 
                   value="${endTime}" 
                   placeholder="00:00:00,000"
                   onchange="window.appActions.updateSubtitleTime(${index}, 'end', this.value)"
                   aria-label="End time">
        </div>
        <textarea class="subtitle-text" 
                  rows="3"
                  onchange="window.appActions.updateSubtitleText(${index}, this.value)"
                  aria-label="Subtitle text">${subtitle.text}</textarea>
    `;
    
    return item;
}

/**
 * Format time for input field
 */
function formatTimeForInput(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const milliseconds = Math.floor(ms % 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const hours = Math.floor(totalSeconds / 3600);
    
    const pad = (num, size = 2) => String(num).padStart(size, '0');
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)},${pad(milliseconds, 3)}`;
}

/**
 * Parse time from input field
 */
function parseTimeFromInput(timeStr) {
    const [time, ms] = timeStr.split(',');
    const [hours, minutes, seconds] = time.split(':').map(Number);
    
    return (hours * 3600 + minutes * 60 + seconds) * 1000 + Number(ms);
}

/**
 * Update subtitle fonts based on target language
 */
function updateSubtitleFonts() {
    const font = getLanguageFont(state.targetLanguage);
    const textareas = elements.subtitleList.querySelectorAll('.subtitle-text');
    
    textareas.forEach(textarea => {
        textarea.style.fontFamily = font;
    });
}

/**
 * Add New Subtitle
 */
function addNewSubtitle() {
    const lastSubtitle = state.subtitles[state.subtitles.length - 1];
    const start = lastSubtitle ? lastSubtitle.end : 0;
    const end = start + 3000; // 3 seconds duration
    
    const newSubtitle = createSubtitle(start, end, '[Enter subtitle text]');
    state.subtitles.push(newSubtitle);
    
    renderSubtitles();
    updateDownloadInfo();
    
    // Scroll to new subtitle
    const newItem = elements.subtitleList.lastElementChild;
    if (newItem) {
        newItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        const textarea = newItem.querySelector('.subtitle-text');
        if (textarea) {
            textarea.focus();
            textarea.select();
        }
    }
}

/**
 * Update Download Info
 */
function updateDownloadInfo() {
    const count = state.subtitles.length;
    elements.subtitleCount.textContent = `${count} subtitle ${count !== 1 ? 'entries' : 'entry'}`;
}

/**
 * Download Subtitles
 */
function downloadSubtitles() {
    if (state.subtitles.length === 0) {
        alert('No subtitles to download');
        return;
    }
    
    const srtContent = generateSRT(state.subtitles);
    const filename = state.currentFile ? state.currentFile.name.replace(/\.[^/.]+$/, '') : 'subtitles';
    
    downloadSRT(srtContent, filename);
    
    console.log('💾 Downloaded:', `${filename}.srt`);
}

/**
 * Clear All
 */
function clearAll() {
    if (state.subtitles.length > 0) {
        const confirm = window.confirm('Are you sure you want to clear all subtitles? This action cannot be undone.');
        if (!confirm) return;
    }
    
    // Stop transcription if in progress
    if (state.transcriber) {
        state.transcriber.stop();
    }
    
    // Reset state
    state.subtitles = [];
    state.transcriber = null;
    state.isProcessing = false;
    
    // Reset UI
    clearFile();
    hideProgress();
    elements.editorSection.style.display = 'none';
    elements.downloadSection.style.display = 'none';
    elements.generateBtn.disabled = true;
    elements.clearBtn.disabled = false;
    
    console.log('🗑️ Cleared all data');
}

/**
 * Show Progress
 */
function showProgress(message) {
    elements.progressSection.style.display = 'block';
    elements.progressText.textContent = message;
    elements.progressFill.style.width = '0%';
}

/**
 * Update Progress
 */
function updateProgress(percentage, message) {
    elements.progressFill.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
    if (message) {
        elements.progressText.textContent = message;
    }
}

/**
 * Hide Progress
 */
function hideProgress() {
    elements.progressSection.style.display = 'none';
}

/**
 * Show Error
 */
function showError(message) {
    alert(`Error: ${message}`);
}

/**
 * Toggle Theme
 */
function toggleTheme() {
    console.log('🎨 toggleTheme() called - current theme:', state.theme);
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
    
    console.log('🎨 Theme changed to:', state.theme);
}

/**
 * Load Theme
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        state.theme = savedTheme;
    } else {
        // Check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        state.theme = prefersDark ? 'dark' : 'light';
    }
    
    document.documentElement.setAttribute('data-theme', state.theme);
}

/* ============================================
   AI Enhancement Functions
   ============================================ */

/**
 * Load AI Settings from localStorage
 */
function loadAISettings() {
    const savedApiKey = localStorage.getItem('ai_api_key');
    const savedProvider = localStorage.getItem('ai_provider');
    const savedEnabled = localStorage.getItem('ai_enabled') === 'true';
    
    if (savedEnabled) {
        elements.aiEnhancementToggle.checked = true;
        elements.aiSettings.style.display = 'block';
        state.aiEnabled = true;
    }
    
    if (savedProvider && savedProvider !== AI_PROVIDERS.NONE) {
        elements.aiProvider.value = savedProvider;
        state.aiProvider = savedProvider;
        elements.aiKeySection.style.display = 'block';
        
        if (savedApiKey) {
            elements.aiApiKey.value = savedApiKey;
            state.aiApiKey = savedApiKey;
            initializeAIClient();
            elements.aiActions.style.display = 'flex';
        }
    }
}

/**
 * Toggle AI Enhancement Panel
 */
function toggleAIEnhancement(e) {
    state.aiEnabled = e.target.checked;
    elements.aiSettings.style.display = state.aiEnabled ? 'block' : 'none';
    localStorage.setItem('ai_enabled', state.aiEnabled);
    
    console.log('🤖 AI Enhancement:', state.aiEnabled ? 'Enabled' : 'Disabled');
}

/**
 * Handle AI Provider Change
 */
function handleAIProviderChange(e) {
    state.aiProvider = e.target.value;
    localStorage.setItem('ai_provider', state.aiProvider);
    
    if (state.aiProvider === AI_PROVIDERS.NONE) {
        // When user selects "None", turn off AI Enhancement completely
        state.aiEnabled = false;
        state.aiClient = null;
        elements.aiEnhancementToggle.checked = false;
        elements.aiSettings.style.display = 'none';
        elements.aiKeySection.style.display = 'none';
        elements.aiActions.style.display = 'none';
        localStorage.setItem('ai_enabled', false);
        
        console.log('🤖 AI Enhancement disabled (None selected)');
    } else {
        elements.aiKeySection.style.display = 'block';
        
        // Check if we have a saved key
        if (state.aiApiKey) {
            initializeAIClient();
            elements.aiActions.style.display = 'flex';
        } else {
            elements.aiActions.style.display = 'none';
        }
    }
    
    console.log('🤖 AI Provider changed to:', state.aiProvider);
}

/**
 * Toggle API Key Visibility
 */
function toggleApiKeyVisibility() {
    const input = elements.aiApiKey;
    const icon = elements.toggleApiKeyVisibility.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    
    // Reinitialize icon
    if (window.lucide) {
        lucide.createIcons();
    }
}

/**
 * Save AI API Key
 */
function saveAIApiKey() {
    const apiKey = elements.aiApiKey.value.trim();
    
    if (!apiKey) {
        alert('Please enter an API key');
        return;
    }
    
    state.aiApiKey = apiKey;
    localStorage.setItem('ai_api_key', apiKey);
    
    try {
        initializeAIClient();
        elements.aiActions.style.display = 'flex';
        alert('API key saved successfully!');
        console.log('🔑 API key saved');
    } catch (error) {
        alert(`Failed to initialize AI client: ${error.message}`);
        console.error('❌ Failed to initialize AI:', error);
    }
}

/**
 * Clear AI API Key
 */
function clearAIApiKey() {
    if (!confirm('Are you sure you want to clear your API key?')) {
        return;
    }
    
    elements.aiApiKey.value = '';
    state.aiApiKey = null;
    state.aiClient = null;
    localStorage.removeItem('ai_api_key');
    elements.aiActions.style.display = 'none';
    
    alert('API key cleared');
    console.log('🔑 API key cleared');
}

/**
 * Initialize AI Client
 */
function initializeAIClient() {
    if (!state.aiApiKey || state.aiProvider === AI_PROVIDERS.NONE) {
        throw new Error('No API key or provider selected');
    }
    
    switch (state.aiProvider) {
        case AI_PROVIDERS.OPENAI:
            state.aiClient = new OpenAIProvider(state.aiApiKey);
            break;
        case AI_PROVIDERS.GEMINI:
            state.aiClient = new GeminiProvider(state.aiApiKey);
            break;
        default:
            throw new Error(`Unknown AI provider: ${state.aiProvider}`);
    }
    
    if (!state.aiClient.validateApiKey()) {
        throw new Error('Invalid API key format');
    }
    
    console.log('✅ AI client initialized:', state.aiProvider);
}

/**
 * Translate Subtitles with AI
 */
async function translateSubtitlesWithAI() {
    if (!state.aiClient || state.subtitles.length === 0) {
        alert('No AI client initialized or no subtitles to translate');
        return;
    }
    
    if (state.isProcessing) {
        alert('Processing already in progress');
        return;
    }
    
    // Calculate cost estimate
    const totalChars = state.subtitles.reduce((sum, sub) => sum + sub.text.length, 0);
    const costEstimate = estimateCost(totalChars, state.aiProvider);
    
    const confirmMessage = `Translate ${state.subtitles.length} subtitles to ${getLanguageName(state.targetLanguage)}?\n\n` +
        `Estimated cost: $${costEstimate.estimatedCost} USD\n` +
        `Characters: ${costEstimate.characterCount}\n\n` +
        `Your API provider will charge you directly.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    state.isProcessing = true;
    showProgress('Translating subtitles with AI...');
    
    try {
        console.log('🤖 Starting AI translation...');
        
        const translatedSubtitles = await state.aiClient.batchProcess(
            state.subtitles,
            'translate',
            state.targetLanguage
        );
        
        state.subtitles = translatedSubtitles;
        renderSubtitles();
        hideProgress();
        
        const successCount = translatedSubtitles.filter(s => s.aiProcessed).length;
        const failCount = translatedSubtitles.length - successCount;
        
        let message = `✅ Translation complete!\n\n`;
        message += `Successful: ${successCount}\n`;
        if (failCount > 0) {
            message += `Failed: ${failCount} (kept original text)\n`;
        }
        
        alert(message);
        console.log('✅ AI translation complete');
        
    } catch (error) {
        console.error('❌ AI translation failed:', error);
        hideProgress();
        alert(`AI translation failed: ${error.message}\n\nFalling back to free mode. Please edit manually.`);
    } finally {
        state.isProcessing = false;
    }
}

/**
 * Improve Subtitles with AI
 */
async function improveSubtitlesWithAI() {
    if (!state.aiClient || state.subtitles.length === 0) {
        alert('No AI client initialized or no subtitles to improve');
        return;
    }
    
    if (state.isProcessing) {
        alert('Processing already in progress');
        return;
    }
    
    // Calculate cost estimate
    const totalChars = state.subtitles.reduce((sum, sub) => sum + sub.text.length, 0);
    const costEstimate = estimateCost(totalChars, state.aiProvider);
    
    const confirmMessage = `Improve grammar and flow for ${state.subtitles.length} subtitles?\n\n` +
        `Estimated cost: $${costEstimate.estimatedCost} USD\n` +
        `Characters: ${costEstimate.characterCount}\n\n` +
        `Your API provider will charge you directly.`;
    
    if (!confirm(confirmMessage)) {
        return;
    }
    
    state.isProcessing = true;
    showProgress('Improving subtitles with AI...');
    
    try {
        console.log('🤖 Starting AI improvement...');
        
        const improvedSubtitles = await state.aiClient.batchProcess(
            state.subtitles,
            'improve',
            state.targetLanguage
        );
        
        state.subtitles = improvedSubtitles;
        renderSubtitles();
        hideProgress();
        
        const successCount = improvedSubtitles.filter(s => s.aiProcessed).length;
        const failCount = improvedSubtitles.length - successCount;
        
        let message = `✅ Improvement complete!\n\n`;
        message += `Successful: ${successCount}\n`;
        if (failCount > 0) {
            message += `Failed: ${failCount} (kept original text)\n`;
        }
        
        alert(message);
        console.log('✅ AI improvement complete');
        
    } catch (error) {
        console.error('❌ AI improvement failed:', error);
        hideProgress();
        alert(`AI improvement failed: ${error.message}\n\nFalling back to free mode. Your original subtitles are preserved.`);
    } finally {
        state.isProcessing = false;
    }
}

/**
 * Global actions (for inline event handlers)
 */
window.appActions = {
    updateSubtitleText(index, text) {
        if (state.subtitles[index]) {
            state.subtitles[index].text = text;
            console.log(`📝 Updated subtitle ${index + 1}`);
        }
    },
    
    updateSubtitleTime(index, type, value) {
        if (state.subtitles[index]) {
            try {
                const time = parseTimeFromInput(value);
                state.subtitles[index][type] = time;
                console.log(`⏱️ Updated subtitle ${index + 1} ${type} time`);
            } catch (e) {
                console.error('Invalid time format:', value);
                // Restore original value
                renderSubtitles();
            }
        }
    },
    
    deleteSubtitle(index) {
        const confirm = window.confirm(`Delete subtitle #${index + 1}?`);
        if (confirm) {
            state.subtitles.splice(index, 1);
            renderSubtitles();
            updateDownloadInfo();
            console.log(`🗑️ Deleted subtitle ${index + 1}`);
        }
    }
};

/**
 * Initialize when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for debugging
window.appState = state;
window.testToggle = () => {
    console.log('🧪 Manual toggle test - current theme:', document.documentElement.getAttribute('data-theme'));
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    console.log('🧪 Changed to:', newTheme);
};
window.appElements = elements;
