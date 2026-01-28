# 🧪 Testing Guide

Quick guide to test your SRT Generator before deployment.

---

## ✅ Browser Testing Checklist

### Chrome/Edge (Primary Support)

1. **Open the app**
   - Open `index.html` in Chrome or Edge
   - Check that all icons load
   - Verify theme toggle works

2. **Upload a test file**
   - Create a short MP3 file (10-30 seconds)
   - Record yourself saying: "Hello, this is a test. One, two, three."
   - Upload the file via drag-drop or file picker
   - Verify file info displays correctly

3. **Generate subtitles**
   - Select "English (US)" as source language
   - Click "Generate Subtitles"
   - Grant microphone permission if prompted
   - Verify progress bar updates
   - Check that subtitles appear in real-time

4. **Edit subtitles**
   - Click on a subtitle text to edit
   - Change timestamps
   - Add a new subtitle
   - Delete a subtitle
   - Verify changes are saved

5. **Download SRT**
   - Click "Download SRT File"
   - Verify file downloads
   - Open the .srt file in a text editor
   - Check format is correct:
     ```
     1
     00:00:00,000 --> 00:00:02,500
     Hello, this is a test.
     
     2
     00:00:02,500 --> 00:00:05,000
     One, two, three.
     ```

6. **Test dark mode**
   - Toggle dark mode
   - Verify colors change correctly
   - Refresh page - theme should persist

7. **Test Burmese support**
   - Change target language to Burmese
   - Type or paste: `မင်္ဂလာပါ`
   - Verify Padauk font renders correctly
   - Check text is readable

8. **Clear all**
   - Click "Clear All"
   - Verify confirmation dialog
   - Check all data is cleared

### Firefox (Limited Support)

- Open app in Firefox
- Verify browser warning appears
- Test UI functionality (should work)
- Speech recognition may not work (expected)

### Mobile Browsers

1. **Chrome Mobile**
   - Open on Android device
   - Test responsive design
   - Upload works via file picker
   - Speech recognition should work

2. **Safari iOS**
   - Open on iPhone/iPad
   - Check layout responsiveness
   - Speech recognition is limited (expected)

---

## 🎤 Audio Testing Tips

### Good Test Audio

Create a test audio file with:
- Clear speech
- Minimal background noise
- Normal speaking pace
- 10-30 seconds duration

### Sample Script

Record yourself saying:

```
Hello, this is a test of the SRT Generator.
The quick brown fox jumps over the lazy dog.
Today is a beautiful day.
One, two, three, four, five.
Thank you for testing.
```

### Tools for Creating Test Audio

- **Windows**: Voice Recorder app
- **Mac**: QuickTime Player
- **Online**: voicerecorder.io
- **Mobile**: Default voice recorder app

---

## 🐛 Common Issues & Solutions

### Issue: "Speech recognition not supported"

**Cause**: Not using Chrome/Edge  
**Solution**: Switch to Chrome or Edge browser

### Issue: No subtitles generated

**Possible causes:**
1. Audio quality too poor
2. No speech in audio
3. Wrong language selected
4. Microphone permission denied

**Solutions:**
- Try clearer audio
- Verify audio has speech
- Select correct source language
- Grant microphone permission when prompted

### Issue: Icons not showing

**Cause**: No internet connection  
**Solution**: Lucide icons load from CDN, requires internet

### Issue: Burmese text shows as squares

**Cause**: Font not loaded  
**Solution**: 
- Check internet connection
- Google Fonts must load
- Try refreshing page

### Issue: Download doesn't work

**Cause**: Browser restrictions  
**Solution**:
- Check if pop-ups are blocked
- Try different browser
- Check console for errors

---

## 🔍 Manual Testing Scenarios

### Scenario 1: English Transcription
1. Upload English audio
2. Generate subtitles
3. Verify accuracy
4. Edit if needed
5. Download SRT
6. Test in video player

### Scenario 2: Burmese Translation
1. Upload English audio
2. Generate English subtitles
3. Change target language to Burmese
4. Manually translate each subtitle
5. Verify Burmese text renders
6. Download and test

### Scenario 3: Multiple Files
1. Generate subtitles for File 1
2. Download SRT
3. Clear all
4. Upload File 2
5. Repeat process
6. Verify no data leakage

### Scenario 4: Edit Workflow
1. Generate subtitles
2. Merge two subtitles (copy-paste)
3. Delete one
4. Add a new subtitle
5. Adjust timestamps
6. Download final SRT

---

## 📊 Performance Testing

### File Size Limits
- **Small**: < 1MB (instant)
- **Medium**: 1-10MB (fast)
- **Large**: 10-50MB (slower, may cause issues)
- **Very Large**: > 50MB (not recommended)

### Browser Memory
- Monitor browser task manager
- Check for memory leaks
- Test with multiple files

### Load Time
- Initial page load: < 2 seconds
- File upload: Instant
- Generate start: < 1 second
- Processing: Real-time (matches audio duration)

---

## ✨ Feature Validation

### Must Have Features
- [x] File upload (drag-drop and picker)
- [x] Speech-to-text transcription
- [x] Real-time subtitle preview
- [x] Manual editing (text and timing)
- [x] SRT download
- [x] Dark mode
- [x] Burmese font support
- [x] Browser compatibility warning

### Nice to Have (Future)
- [ ] Waveform visualization
- [ ] Video preview with subtitles
- [ ] Auto-save to localStorage
- [ ] Export to VTT format
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality

---

## 🧹 Clean Testing Environment

Before each test:
1. Clear browser cache (Ctrl+Shift+Delete)
2. Close other tabs
3. Disable browser extensions
4. Open DevTools console (F12)
5. Monitor for errors

---

## 📝 Test Report Template

```
Test Date: [Date]
Browser: [Chrome/Edge/Firefox] Version [Number]
OS: [Windows/Mac/Linux/Android/iOS]

Test Cases:
1. File Upload: ✅ / ❌
2. Speech Recognition: ✅ / ❌
3. Subtitle Editing: ✅ / ❌
4. Download SRT: ✅ / ❌
5. Dark Mode: ✅ / ❌
6. Burmese Support: ✅ / ❌
7. Responsive Design: ✅ / ❌

Issues Found:
- [Issue 1]
- [Issue 2]

Notes:
[Any additional observations]
```

---

## 🚀 Pre-Deployment Checklist

Before deploying to production:

- [ ] Test on Chrome (Windows)
- [ ] Test on Chrome (Mac)
- [ ] Test on Edge
- [ ] Test on mobile Chrome
- [ ] Verify all links work
- [ ] Check spelling in UI
- [ ] Test with real audio files
- [ ] Verify SRT format is valid
- [ ] Test dark mode
- [ ] Check accessibility (Tab navigation)
- [ ] Monitor console for errors
- [ ] Test with large files
- [ ] Verify download works
- [ ] Check responsive design
- [ ] Test clear all functionality

---

## 🎯 Acceptance Criteria

The app is ready for deployment when:

✅ All core features work in Chrome/Edge  
✅ No console errors on normal usage  
✅ SRT files download correctly  
✅ Burmese text renders properly  
✅ Theme toggle works and persists  
✅ Mobile responsive design works  
✅ Browser warning shows correctly  
✅ All buttons are functional  
✅ Loading states display properly  
✅ Error messages are clear and helpful  

---

**Happy Testing!** 🎉

If you find bugs, document them and fix before deployment.
