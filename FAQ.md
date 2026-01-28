# ❓ Frequently Asked Questions (FAQ)

Common questions and answers about the SRT Generator.

---

## General Questions

### What is SRT Generator?

SRT Generator is a free, open-source web application that creates subtitle files (SRT format) from audio or video files. It uses your browser's built-in speech recognition to transcribe speech, with special support for Burmese (Myanmar) language.

### Is it really 100% free?

Yes! There are:
- ❌ No API keys required
- ❌ No subscriptions
- ❌ No hidden costs
- ❌ No backend server costs
- ❌ No database costs
- ✅ Everything runs in your browser

### Do I need to install anything?

No installation required! Just open the website in Chrome or Edge browser. All processing happens directly in your browser.

### Is my data private?

**Mostly yes, with one caveat:**
- Your files never leave your device
- No data is sent to our servers (we don't have any!)
- The Web Speech API does send audio to Google for processing
- Audio is not stored by Google (according to their privacy policy)
- For fully offline solution, see "Future Enhancements" in README

---

## Technical Questions

### What browsers are supported?

**Full Support:**
- ✅ Google Chrome (Recommended)
- ✅ Microsoft Edge
- ✅ Opera
- ✅ Brave

**Limited Support:**
- ⚠️ Firefox (UI works, speech recognition experimental)
- ⚠️ Safari (iOS 14.5+, limited functionality)

**Not Supported:**
- ❌ Internet Explorer

### Why doesn't it work in Firefox/Safari?

The Web Speech API (used for transcription) is primarily supported in Chrome and Chrome-based browsers. Firefox and Safari have limited or experimental support.

**Solution:** Use Chrome or Edge for best results.

### Do I need an internet connection?

**Yes, for now:**
- Google Fonts need to load (Padauk for Burmese)
- Lucide Icons load from CDN
- Web Speech API sends audio to Google servers

**Future:** We plan to add offline support using Whisper.cpp WebAssembly.

### What file formats are supported?

**Audio:**
- MP3
- WAV
- M4A
- OGG
- AAC

**Video:**
- MP4
- WebM
- AVI (browser-dependent)

The app extracts audio from video files automatically.

### What's the maximum file size?

**Recommended:** Under 50MB

**Technical limits:**
- Browser memory: ~2GB for File API
- Larger files may cause:
  - Slower processing
  - Browser memory issues
  - Potential crashes

**Tip:** For large files, extract audio first and compress it.

---

## Usage Questions

### How accurate is the transcription?

Accuracy depends on:
- **Audio quality**: Clear audio = better results
- **Speaker accent**: Native speakers work best
- **Background noise**: Quiet environment is crucial
- **Language**: English works best
- **Speaking pace**: Normal pace is ideal

**Typical accuracy:** 80-95% for clear English audio

### Why are my subtitles inaccurate?

Common causes:
1. Poor audio quality
2. Heavy accent
3. Background noise
4. Multiple speakers
5. Technical jargon
6. Wrong language selected

**Solution:** Edit subtitles manually after generation.

### Can it automatically translate to Burmese?

**No.** Automatic translation requires:
- Paid API keys (Google Translate API, AWS, etc.)
- Authentication and billing
- Backend server

This would break our "100% free" promise.

**Workflow instead:**
1. Generate English subtitles
2. Use Google Translate separately
3. Copy-paste translations into editor
4. Edit for accuracy

### How do I get better timestamps?

Tips for accurate timing:
1. Use clear audio with distinct pauses
2. Speak at normal pace
3. Let the AI complete transcription
4. Manually adjust timestamps in editor
5. Use the format: `HH:MM:SS,mmm`

### Can I use this for long videos?

**Yes, but with limitations:**
- Processing time = audio duration (real-time)
- 1 hour audio = ~1 hour to process
- Browser may slow down for very long files
- Recommended: Split into shorter segments

---

## Burmese Language Questions

### Does it support Burmese speech recognition?

**Partially.** The Web Speech API has experimental Burmese support, but accuracy is limited.

**Best workflow:**
1. Transcribe English audio
2. Manually translate to Burmese
3. Type or paste Burmese text

### How do I type in Burmese?

Options:
1. **Windows Burmese Keyboard:**
   - Settings → Time & Language → Language
   - Add Myanmar (Burmese)
   - Switch: Windows + Space

2. **Copy-Paste:**
   - Use Google Translate
   - Copy Burmese text
   - Paste into subtitle editor

3. **Online Keyboards:**
   - lexilogos.com (Burmese keyboard)
   - branah.com/myanmar

### Why do I see squares instead of Burmese text?

**Cause:** Font not loaded

**Solutions:**
1. Check internet connection
2. Wait for page to fully load
3. Refresh browser
4. Clear cache and reload
5. Try different browser

### Is the Burmese font readable?

Yes! We use **Padauk**, a free, high-quality Burmese font developed by SIL International. It properly renders complex Burmese glyphs and is widely used.

---

## Feature Questions

### Can I edit subtitles after generation?

**Yes!** You can:
- Edit text
- Change start/end times
- Add new subtitles
- Delete subtitles
- Rearrange (manually copy-paste)

### Can I save my work?

**Currently:** No auto-save feature

**Workaround:**
1. Download SRT file frequently
2. Keep backup copies
3. Re-upload SRT later (manual edit)

**Future:** We plan to add localStorage auto-save.

### What format does it export?

**Standard SRT (SubRip) format:**
```
1
00:00:00,000 --> 00:00:02,500
Subtitle text here

2
00:00:02,500 --> 00:00:05,000
Next subtitle text
```

This format works with:
- YouTube
- VLC Media Player
- Windows Media Player
- Adobe Premiere
- Final Cut Pro
- Most video players and editors

### Can I export to other formats?

**Currently:** Only SRT

**Future plans:**
- VTT (WebVTT)
- ASS/SSA (Advanced SubStation)
- JSON
- Plain text

**Workaround:** Use online converters:
- gotranscript.com/subtitle-converter
- subtitletools.com/convert-to-vtt

### Can I upload an existing SRT to edit?

**Not yet**, but it's a planned feature.

**Current workaround:**
1. Open SRT in text editor
2. Copy subtitle text
3. Generate new subtitles
4. Replace text manually

---

## Troubleshooting

### App won't load / blank screen

**Solutions:**
1. Try different browser (Chrome/Edge)
2. Clear browser cache
3. Disable browser extensions
4. Check internet connection
5. Check browser console (F12) for errors

### "Permission denied" error

**Cause:** Microphone permission not granted

**Solution:**
1. Click the 🔒 icon in address bar
2. Allow microphone access
3. Refresh page
4. Try again

Note: Web Speech API requires mic permission even though we're not recording.

### No subtitles generated

**Possible causes:**
1. Audio has no speech
2. Audio quality too poor
3. Wrong language selected
4. Browser not supported

**Solutions:**
- Test with clear audio sample
- Verify language selection
- Use Chrome or Edge
- Check browser console for errors

### Progress bar stuck

**Cause:** Long audio or browser issue

**Solutions:**
1. Wait longer (processing is real-time)
2. Refresh and try shorter audio
3. Check browser console
4. Try smaller file

### Download button doesn't work

**Causes:**
- Pop-up blocker enabled
- Browser security settings
- JavaScript error

**Solutions:**
1. Disable pop-up blocker for site
2. Try different browser
3. Check console (F12) for errors

---

## Deployment Questions

### How do I deploy my own version?

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete guide.

**Quick steps:**
1. Fork/clone repository
2. Push to GitHub
3. Enable GitHub Pages
4. Access at yourusername.github.io/repo-name

### Can I customize the design?

**Yes!** It's open-source (MIT License):
- Change colors in CSS variables
- Modify layout in HTML
- Add features in JavaScript
- Brand it as your own
- Deploy your version

### Can I use this commercially?

**Yes!** MIT License allows:
- ✅ Commercial use
- ✅ Modification
- ✅ Distribution
- ✅ Private use

**Only requirement:** Include original license.

---

## Performance Questions

### Why is it slow?

**Transcription is real-time:**
- 5 minutes of audio = 5 minutes to process
- This is a Web Speech API limitation
- Future: Whisper.cpp may be faster

**Speed tips:**
- Use shorter audio segments
- Close other browser tabs
- Use faster computer
- Ensure good internet connection

### Does it work offline?

**Not currently.** Requires internet for:
- Web Speech API (sends audio to Google)
- Google Fonts
- Lucide Icons

**Future:** Planned offline mode with Whisper.cpp WebAssembly.

### How much RAM does it use?

**Typical usage:**
- Small file (<10MB): ~100-200MB
- Medium file (10-50MB): ~300-500MB
- Large file (>50MB): ~500MB-1GB

**Tip:** Close other apps for better performance.

---

## Contribution Questions

### How can I help?

Ways to contribute:
1. Report bugs (GitHub Issues)
2. Suggest features
3. Submit code (Pull Requests)
4. Improve documentation
5. Test on different devices
6. Share with others
7. Translate to other languages

### I found a bug, what should I do?

1. Check if it's already reported
2. Create GitHub Issue with:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Console errors (F12)

### Can I request a feature?

**Yes!** Create a GitHub Issue with:
- Clear description
- Use case / reason
- Examples or mockups
- Mark as "Feature Request"

---

## Contact & Support

### Where can I get help?

- **Documentation**: README.md, ARCHITECTURE.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: (add your email)

### How do I report security issues?

For security vulnerabilities:
1. **Do NOT** open public issue
2. Email directly: (add your email)
3. Include details and proof of concept
4. We'll respond within 48 hours

### Can I hire you to customize this?

This is an open-source project. For custom development:
- Fork the repository
- Modify as needed (MIT License)
- Or contact: (add your email)

---

## Future Plans

### What's coming next?

Planned features:
- [ ] Offline mode (Whisper.cpp)
- [ ] Auto-save to localStorage
- [ ] Upload existing SRT to edit
- [ ] Timeline / waveform visualization
- [ ] Keyboard shortcuts
- [ ] Export to VTT, ASS formats
- [ ] Video preview with subtitles
- [ ] Batch processing
- [ ] Better mobile support
- [ ] PWA (installable app)

### When will X feature be ready?

This is a community-driven project. Features are added as time allows. Want it faster? Contribute!

---

## Credits

### Who made this?

SRT Generator is open-source, created by the community.

**Technologies used:**
- Web Speech API (Google/Chromium)
- Lucide Icons
- Google Fonts (Inter, Padauk)
- Vanilla JavaScript

### Can I contribute?

**Absolutely!** See [Contributing](#how-can-i-help) above.

---

**Still have questions?** 

Open an issue on GitHub or check our [documentation](README.md).
