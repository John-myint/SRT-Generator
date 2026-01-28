# 🎬 SRT Generator - Free Subtitle Creator

A **100% free, open-source, client-side** subtitle generator that works entirely in your browser. No API keys, no backend servers, no costs. Generate SRT subtitles with special support for English → Burmese (Myanmar) translation.

[**🚀 Live Demo**](#deployment) | [**📖 Documentation**](ARCHITECTURE.md)

---

## ✨ Features

- ✅ **Completely Free** - No API keys, no subscriptions, no hidden costs
- ✅ **Client-Side Only** - All processing happens in your browser
- ✅ **Privacy First** - Your files never leave your device
- ✅ **Burmese Language Support** - Proper Unicode rendering with Padauk font
- ✅ **Real-Time Preview** - See subtitles as they're generated
- ✅ **Manual Editing** - Full control over text and timing
- ✅ **Dark Mode** - Easy on the eyes
- ✅ **Drag & Drop** - Simple file upload interface
- ✅ **Multiple Formats** - Supports MP3, WAV, MP4, WebM, OGG, M4A
- ✅ **Responsive Design** - Works on desktop and mobile

---

## 🎯 Use Cases

- Create subtitles for videos
- Transcribe audio recordings
- Generate Burmese subtitles from English audio
- Translate and localize content
- Accessibility improvements
- Educational content creation

---

## 🚀 Quick Start

### Option 1: Use Online (Recommended)

1. Visit the [**live demo**](#deployment)
2. Upload your audio/video file
3. Click "Generate Subtitles"
4. Edit and download your SRT file

### Option 2: Run Locally

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/srt-generator.git
   cd srt-generator
   ```

2. **Open in browser**
   - Simply open `index.html` in Chrome or Edge
   - Or use a local server:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx serve
     ```

3. **Access the app**
   - Navigate to `http://localhost:8000`

---

## 📋 How It Works

### Step 1: Upload File
Drag and drop or click to upload an audio/video file. Supported formats:
- **Audio**: MP3, WAV, M4A, OGG
- **Video**: MP4, WebM, AVI (audio extracted automatically)

### Step 2: Select Language
Choose your source language (the language spoken in the audio) and target language (the language you want for subtitles).

### Step 3: Generate
Click "Generate Subtitles". The app will:
1. Play the audio silently in the background
2. Use Web Speech API to transcribe speech
3. Create timestamped subtitle entries
4. Display them in real-time

### Step 4: Edit & Translate
- Click any subtitle to edit text or timing
- For Burmese translation, manually type or paste translated text
- Add, delete, or merge subtitles as needed

### Step 5: Download
Click "Download SRT File" to get your subtitles in standard SRT format.

---

## 🤖 Optional AI Enhancement

**NEW**: Enhance your subtitles with AI-powered translation and improvement!

### What is it?
- **Completely Optional** - All core features work without AI
- **Your API Key** - Bring your own OpenAI or Google Gemini key
- **Translation & Improvement** - AI translates or improves subtitle text
- **Cost Transparent** - ~$0.001-0.003 per subtitle (you pay provider directly)

### Supported Providers
- **OpenAI GPT-4o-mini** - High quality, ~$0.10-0.30 per 100 subtitles
- **Google Gemini Pro** - Cost-effective, ~$0.01-0.05 per 100 subtitles

### How to Use
1. Enable "AI Enhancement" toggle
2. Select AI provider (OpenAI or Gemini)
3. Enter your API key from the provider
4. Use "Translate All with AI" or "Improve All with AI" buttons

### Key Features
- ✅ **Burmese-Optimized** - Special prompts for natural Myanmar Unicode translation
- ✅ **Privacy-First** - Keys stored locally in your browser only
- ✅ **Cost Warnings** - Estimates cost before processing
- ✅ **Graceful Fallback** - Falls back to manual editing if AI fails
- ✅ **No Lock-In** - Free mode remains fully functional

**📖 Full Documentation**: See [AI_ENHANCEMENT.md](AI_ENHANCEMENT.md) for detailed setup, costs, and best practices.

---

## 🌐 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| **Chrome** | ✅ Full Support | Recommended |
| **Edge** | ✅ Full Support | Recommended |
| **Opera** | ✅ Full Support | Chromium-based |
| **Brave** | ✅ Full Support | Chromium-based |
| **Firefox** | ⚠️ Limited | Experimental support |
| **Safari** | ⚠️ Limited | iOS 14.5+, macOS specific |

**Best Experience**: Use Chrome or Edge for optimal speech recognition accuracy.

---

## ⚠️ Limitations & Considerations

### Speech Recognition
- **Requires Internet**: Chrome's Web Speech API sends audio to Google servers for processing
- **Accuracy**: Depends on audio quality, accents, and background noise
- **Language Support**: English works best; Burmese recognition is experimental
- **Browser Dependent**: Only works in Chrome/Edge with good reliability

### Translation
- **No Automatic Translation**: Free translation APIs are unreliable or require authentication
- **Manual Editing Required**: You need to translate text yourself
- **Recommended Workflow**: Generate English subtitles → Use Google Translate separately → Copy-paste translations

### Performance
- **File Size**: Large files (>50MB) may cause memory issues
- **Processing Time**: Real-time transcription matches audio duration
- **Memory Usage**: ~100-500MB depending on file size

---

## 🛠️ Technology Stack

### Core Technologies
- **HTML5** - Structure and semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Application logic
- **Web Speech API** - Speech-to-text transcription

### Features
- **Modular Architecture** - Clean separation of concerns
- **ES6 Modules** - Import/export for code organization
- **Local Storage** - Theme preference persistence
- **File API** - Client-side file handling
- **Blob API** - File download generation

### External Resources (CDN)
- **Google Fonts** - Inter (UI) + Padauk (Burmese)
- **Lucide Icons** - Beautiful SVG icons

---

## 📁 Project Structure

```
srt-generator/
├── index.html              # Main HTML file
├── styles.css              # All styles and themes
├── app.js                  # Main application logic
├── utils/
│   ├── speechRecognition.js  # Web Speech API wrapper
│   ├── srtUtils.js          # SRT formatting utilities
│   └── translation.js       # Translation helpers
├── ARCHITECTURE.md         # Technical documentation
├── README.md               # This file
└── LICENSE                 # MIT License
```

---

## 🚀 Deployment

### GitHub Pages (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/srt-generator.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings
   - Navigate to Pages section
   - Select source: `main` branch
   - Click Save

3. **Access Your Site**
   - Your site will be live at: `https://yourusername.github.io/srt-generator/`
   - Usually takes 1-2 minutes to deploy

### Cloudflare Pages

1. **Login to Cloudflare Dashboard**
   - Go to Pages section
   - Click "Create a project"

2. **Connect Repository**
   - Connect your GitHub account
   - Select the repository

3. **Configure Build**
   - Framework preset: None
   - Build command: (leave empty)
   - Build output directory: `/`

4. **Deploy**
   - Click "Save and Deploy"
   - Site will be live in 1-2 minutes

### Netlify

1. **Login to Netlify**
   - Go to netlify.com
   - Click "Add new site"

2. **Import from Git**
   - Connect to GitHub
   - Select repository

3. **Build Settings**
   - Build command: (leave empty)
   - Publish directory: `/`

4. **Deploy**
   - Click "Deploy site"
   - Live in seconds!

### Local Development Server

For development, use any static file server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve

# VS Code Live Server extension
# Right-click index.html → Open with Live Server
```

---

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --color-primary: #2563eb;    /* Change main color */
    --color-success: #10b981;    /* Change success color */
    /* ... more variables */
}
```

### Add More Languages

Edit language options in `index.html`:

```html
<option value="si-LK">Sinhala</option>
<option value="ta-IN">Tamil</option>
```

### Customize Subtitle Timing

Edit reading speed in `utils/translation.js`:

```javascript
const readingSpeeds = {
    'en': 15,   // Characters per second
    'my': 10,   // Slower for complex scripts
};
```

---

## 🔧 Advanced Features

### Keyboard Shortcuts

- `Enter` on drop zone → Open file picker
- `Tab` → Navigate between fields
- `Esc` in editor → Cancel editing (planned)

### SRT Format

Generated files use standard SubRip format:

```
1
00:00:00,000 --> 00:00:02,500
First subtitle text

2
00:00:02,500 --> 00:00:05,000
Second subtitle text
```

### Burmese Unicode

The app uses proper Unicode rendering:
- Unicode range: U+1000 to U+109F
- Font: Padauk (open-source Burmese font)
- Proper text rendering for complex glyphs

---

## 🔮 Future Enhancements

### Planned Features

- [ ] **Whisper.cpp Integration** - Offline speech recognition with WebAssembly
- [ ] **Timeline Editor** - Visual timeline with waveform
- [ ] **Auto-Translation** - TensorFlow.js translation models
- [ ] **Subtitle Sync** - Fine-tune timing with video preview
- [ ] **Export Formats** - VTT, ASS, JSON
- [ ] **Batch Processing** - Multiple files at once
- [ ] **Keyboard Shortcuts** - Power user features
- [ ] **Undo/Redo** - Edit history

### Advanced Options

- **Custom Reading Speed** - Adjust subtitle duration
- **Auto-Segmentation** - Smart text breaking
- **Quality Presets** - Balance speed vs. accuracy
- **Custom Fonts** - Upload your own fonts

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Bugs** - Open an issue with details
2. **Suggest Features** - Share your ideas
3. **Submit Pull Requests** - Fix bugs or add features
4. **Improve Documentation** - Help others understand the code
5. **Share** - Tell others about this tool

### Development Guidelines

- Follow existing code style
- Add comments for complex logic
- Test in Chrome and Edge
- Keep it free and open-source

---

## 📄 License

**MIT License** - Free to use, modify, and distribute.

```
Copyright (c) 2026 SRT Generator Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙏 Acknowledgments

- **Web Speech API** - Powered by Chromium
- **Lucide Icons** - Beautiful open-source icons
- **Google Fonts** - Free web fonts (Inter, Padauk)
- **MDN Web Docs** - Excellent API documentation
- **Stack Overflow Community** - Countless helpful answers

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/yourusername/srt-generator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/srt-generator/discussions)
- **Email**: your.email@example.com

---

## ⭐ Star This Project

If you find this tool useful, please consider starring the repository on GitHub. It helps others discover the project!

---

**Made with ❤️ using 100% free and open-source technologies**

*No servers. No databases. No API keys. No costs. Just pure client-side magic.* ✨
