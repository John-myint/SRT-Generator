# SRT Generator - Architecture Overview

## 🎯 Project Goal
A fully client-side SRT subtitle generator that works 100% in the browser with no backend, no API keys, and no costs.

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3
- **Speech Recognition**: Web Speech API (Chrome SpeechRecognition)
- **Styling**: CSS Variables (custom properties) for theming
- **Icons**: Lucide Icons (CDN)
- **Fonts**: Google Fonts (Padauk for Burmese script)
- **Storage**: LocalStorage for theme preferences
- **Deployment**: Static hosting (GitHub Pages, Cloudflare Pages, Netlify)

### Core Components

#### 1. **Speech Recognition Module** (`utils/speechRecognition.js`)
- Uses Web Speech API (`webkitSpeechRecognition` / `SpeechRecognition`)
- Processes audio/video files via HTML5 Audio API
- Generates timestamped transcripts
- Supports multiple languages
- Browser compatibility: Chrome, Edge (Chromium-based)

#### 2. **SRT Utilities Module** (`utils/srtUtils.js`)
- Formats timestamps (HH:MM:SS,mmm)
- Generates valid SRT file format
- Parses and validates SRT structure
- Handles subtitle segmentation

#### 3. **Translation Module** (`utils/translation.js`)
- **Primary Approach**: Manual editing interface
- Provides side-by-side editing
- Proper Burmese Unicode support
- Font rendering (Padauk, Noto Sans Myanmar)

#### 4. **Main Application** (`app.js`)
- File upload handling (drag & drop)
- UI state management
- Subtitle editing interface
- Dark/Light mode toggle
- Export functionality

## 🔧 Technical Implementation

### Speech-to-Text Flow
```
1. User uploads audio/video file
2. File loaded into Audio element
3. Audio played (can be muted/silent)
4. Web Speech API listens and transcribes
5. Results captured with timestamps
6. Formatted into SRT structure
7. Displayed in editable preview
8. User can download .srt file
```

### File Format Support
- **Input**: MP3, WAV, M4A, OGG, WebM, MP4, AVI (browser-supported formats)
- **Output**: .srt (SubRip subtitle format)

### SRT Format Structure
```
1
00:00:00,000 --> 00:00:02,500
First subtitle text

2
00:00:02,500 --> 00:00:05,000
Second subtitle text
```

## 🌐 Browser Compatibility

### Web Speech API Support
| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended |
| Edge (Chromium) | ✅ Full | Recommended |
| Firefox | ⚠️ Limited | Experimental, disabled by default |
| Safari | ⚠️ Limited | iOS 14.5+, macOS specific |
| Opera | ✅ Full | Chromium-based |

**Recommendation**: Use Chrome or Edge for best experience.

## 🎨 UI/UX Design Principles

### Layout Structure
```
┌─────────────────────────────────────┐
│  Header (Title + Theme Toggle)      │
├─────────────────────────────────────┤
│  Upload Area (Drag & Drop)          │
├─────────────────────────────────────┤
│  Language Selector                   │
├─────────────────────────────────────┤
│  Action Buttons (Generate/Clear)     │
├─────────────────────────────────────┤
│  Progress Indicator                  │
├─────────────────────────────────────┤
│  Subtitle Preview & Editor           │
├─────────────────────────────────────┤
│  Download Button                     │
└─────────────────────────────────────┘
```

### Accessibility Features
- Semantic HTML elements
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Escape)
- High contrast ratios (WCAG AA compliant)
- Focus indicators
- Screen reader friendly

### Theme System
- CSS Variables for all colors
- Smooth transitions (0.3s)
- LocalStorage persistence
- System preference detection

## 🚀 Deployment

### Static Hosting Options
1. **GitHub Pages** (Recommended)
   - Free, unlimited bandwidth
   - Custom domains supported
   - HTTPS by default
   
2. **Cloudflare Pages**
   - Global CDN
   - Unlimited bandwidth
   - Fast builds

3. **Netlify**
   - Easy deployment
   - Instant previews
   - Form handling (optional)

### Deployment Process
```bash
# Build not required (static files)
# Simply push to repository

# For GitHub Pages:
1. Push code to GitHub
2. Enable Pages in repository settings
3. Select branch (main/master)
4. Site live at: username.github.io/repo-name
```

## ⚠️ Limitations & Trade-offs

### Speech Recognition Limitations
1. **Browser Dependency**
   - Requires Chrome/Edge for best results
   - Not fully offline (API calls to Google servers for recognition)
   
2. **Accuracy**
   - Depends on audio quality
   - Accents may affect accuracy
   - Background noise impacts results

3. **Language Support**
   - English: Excellent
   - Burmese: Limited (may require manual correction)
   - Other languages: Varies by browser support

### Translation Limitations
1. **No Automatic Translation**
   - Web-based free translation APIs are unreliable or require authentication
   - Offline translation models (TensorFlow.js) are too large (100MB+)
   - Manual translation/editing is the most practical approach

2. **Burmese Support**
   - Proper Unicode rendering with web fonts
   - Right-to-left text not needed (Burmese is left-to-right)
   - Complex glyphs handled by Padauk font

### File Size Constraints
- Large video files may cause memory issues
- Recommend: Extract audio first (< 50MB)
- Browser limits: ~2GB for File API

## 🔮 Future Improvements (Optional)

### Advanced Features
1. **Whisper.cpp Integration** (WebAssembly)
   - Better offline support
   - Higher accuracy
   - Larger model size (~50-150MB)
   - Implementation: `whisper.wasm` from GitHub

2. **Translation Integration**
   - TensorFlow.js translation models
   - LibreTranslate self-hosted API
   - Dictionary-based assistance

3. **Enhanced Editing**
   - Timeline visualization
   - Waveform display
   - Subtitle synchronization tools
   - Batch editing

4. **Export Formats**
   - VTT (WebVTT)
   - ASS/SSA (Advanced SubStation Alpha)
   - JSON subtitle format

## 📁 Project Structure
```
/
├── index.html              # Main HTML file
├── styles.css              # All styles and themes
├── app.js                  # Main application logic
├── utils/
│   ├── speechRecognition.js  # Web Speech API wrapper
│   ├── srtUtils.js          # SRT formatting utilities
│   └── translation.js       # Translation helpers
├── ARCHITECTURE.md         # This file
├── README.md               # User documentation
└── LICENSE                 # MIT License
```

## 🔒 Privacy & Security

### Data Handling
- **All processing is client-side**
- No data sent to external servers (except Web Speech API)
- No user tracking or analytics
- No cookies (only localStorage for preferences)

### Web Speech API Privacy Note
- Chrome's Web Speech API sends audio to Google servers for processing
- Audio is not stored by Google (according to their policy)
- For fully offline solution, consider Whisper.cpp integration

## 📊 Performance Considerations

### Optimization Strategies
1. **Lazy Loading**: Icons loaded via CDN
2. **Minimal Dependencies**: No frameworks, pure vanilla JS
3. **Efficient DOM Updates**: Batch updates, avoid reflows
4. **Memory Management**: Release audio objects after processing

### Recommended Specs
- **Minimum**: 4GB RAM, Chrome 90+
- **Recommended**: 8GB RAM, Chrome 120+
- **Audio Quality**: 16kHz+ sampling rate for best recognition

## 🧪 Testing Recommendations

### Browser Testing
- Chrome (primary)
- Edge (Chromium)
- Firefox (limited support warning)

### Audio Testing
- Clear speech recordings
- Various accents
- Background noise levels
- Different audio formats

### Burmese Text Testing
- Font rendering verification
- Unicode character display
- Copy/paste functionality
- Export encoding (UTF-8)

---

**Last Updated**: January 2026
**Version**: 1.0.0
**License**: MIT
