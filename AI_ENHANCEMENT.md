# 🤖 AI Enhancement Feature

## Overview

The SRT Generator now includes **optional** AI-powered subtitle enhancement capabilities. This feature is:

- ✅ **Completely optional** - All core features work without AI
- ✅ **User-controlled** - Requires your own API key
- ✅ **Privacy-focused** - Keys stored locally in your browser
- ✅ **Cost-transparent** - You pay your AI provider directly

---

## ⚠️ Important Notes

### What AI Does
- ✅ Translates subtitle text to target language
- ✅ Improves grammar, punctuation, and flow
- ✅ Optimizes text for subtitle format

### What AI Does NOT Do
- ❌ Does NOT handle speech-to-text (uses Web Speech API)
- ❌ Does NOT process audio/video files
- ❌ Does NOT control timestamps
- ❌ Does NOT replace core free functionality

### Core App Remains Free
**The free, no-API-key features are unaffected:**
- Speech-to-text transcription
- Manual editing
- SRT file generation
- All existing functionality

---

## 🚀 How to Use AI Enhancement

### Step 1: Enable AI Enhancement

1. Scroll to **"AI Enhancement (Optional)"** section
2. Toggle **"Enable AI-Powered Translation & Improvement"**
3. The AI settings panel will appear

### Step 2: Select AI Provider

Choose from:
- **None (Free Mode)** - Default, no AI
- **OpenAI GPT** - High quality, ~$0.002 per subtitle
- **Google Gemini** - Cost-effective, ~$0.00025 per subtitle

### Step 3: Get an API Key

#### For OpenAI:
1. Visit [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Sign up / Login
3. Create new API key
4. Copy the key (starts with `sk-`)
5. Note: Requires billing setup ($5-20 recommended)

#### For Google Gemini:
1. Visit [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
2. Sign in with Google account
3. Create API key
4. Copy the key
5. Note: Free tier available with limits

### Step 4: Save API Key

1. Paste API key in the **"API Key"** field
2. Click **"Save Key"**
3. Key is stored locally in your browser
4. Two new buttons will appear:
   - **Translate All with AI**
   - **Improve All with AI**

### Step 5: Use AI Features

After generating subtitles with speech-to-text:

**To Translate:**
1. Click **"Translate All with AI"**
2. Review cost estimate
3. Confirm
4. Wait for processing
5. Edit any results as needed

**To Improve:**
1. Click **"Improve All with AI"**
2. Review cost estimate
3. Confirm
4. Wait for processing
5. Review improvements

---

## 💰 Cost Estimation

### OpenAI GPT-4o-mini Pricing (2026)
- **Input:** ~$0.15 per 1M tokens (~750k words)
- **Output:** ~$0.60 per 1M tokens (~750k words)
- **Typical Subtitle:** ~$0.001-0.003 per subtitle
- **100 Subtitles:** ~$0.10-0.30 USD

### Google Gemini Pro Pricing (2026)
- **Input:** ~$0.000125 per 1k characters
- **Output:** ~$0.000375 per 1k characters
- **Typical Subtitle:** ~$0.0001-0.0005 per subtitle
- **100 Subtitles:** ~$0.01-0.05 USD

**Actual costs depend on:**
- Text length
- Number of subtitles
- Target language complexity
- API pricing changes

---

## 🔒 Privacy & Security

### Your API Key
- ✅ Stored only in your browser's localStorage
- ✅ Never sent to our servers (we don't have any!)
- ✅ Only used to authenticate with your chosen AI provider
- ⚠️ Visible if someone accesses your browser
- 🔧 Can be cleared anytime

### Data Flow
```
Your Browser
    ↓
Subtitle Text → AI Provider (OpenAI/Gemini)
    ↓
Translated/Improved Text → Your Browser
```

### What Gets Sent to AI Providers
- ✅ Subtitle text only
- ✅ System prompts (translation/improvement instructions)
- ❌ NO audio/video files
- ❌ NO personal information
- ❌ NO timestamps

### AI Provider Privacy Policies
- **OpenAI:** [openai.com/privacy](https://openai.com/privacy)
- **Gemini:** [policies.google.com/privacy](https://policies.google.com/privacy)

---

## 🇲🇲 Burmese Translation Optimization

When translating to Burmese, the AI receives special instructions:

```
CRITICAL RULES:
1. Use Myanmar Unicode ONLY (NOT Zawgyi encoding)
2. Translate to natural spoken Burmese, not literal word-for-word
3. Preserve the original meaning, tone, and politeness level
4. Keep sentences concise and suitable for subtitles (max 2 lines)
5. Avoid overly formal or literary language - use conversational style
6. Maintain proper Burmese grammar and sentence structure
7. Do not transliterate English words unnecessarily
8. Preserve numbers, names, and proper nouns appropriately
```

This ensures:
- ✅ Proper Myanmar Unicode (not Zawgyi)
- ✅ Natural, conversational Burmese
- ✅ Subtitle-friendly length
- ✅ Culturally appropriate translations

---

## 🛡️ Safety Features

### Built-in Protections

1. **Character Limits**
   - Max 2,000 characters per request
   - Prevents excessive costs
   - Long subtitles skipped with warning

2. **Batch Processing**
   - Processes 10 subtitles at a time
   - Reduces rate limit issues
   - Prevents timeouts

3. **Graceful Fallback**
   - If AI fails, original text preserved
   - Clear error messages
   - No app crashes
   - Can continue editing manually

4. **Cost Warnings**
   - Shows estimated cost before processing
   - Requires confirmation
   - Displays character count
   - Clear pricing information

### Error Handling

**Common Errors:**

| Error | Cause | Solution |
|-------|-------|----------|
| Invalid API key | Wrong key format | Check key, regenerate if needed |
| Rate limit exceeded | Too many requests | Wait a few minutes, try again |
| Quota reached | No credits left | Add billing/credits to AI account |
| Network error | Connection issue | Check internet, try again |
| Request timeout | Large request | Split into smaller batches |

**All errors result in:**
- ❌ No data loss
- ✅ Original subtitles preserved
- ✅ Clear error message
- ✅ Fallback to manual editing

---

## 🎯 Best Practices

### When to Use AI

**Good Use Cases:**
- ✅ Translating many subtitles
- ✅ Improving awkward phrasing
- ✅ Fixing grammar in transcriptions
- ✅ Converting to formal/informal tone
- ✅ Professional-quality translations

**When Manual is Better:**
- ❌ Very short projects (< 10 subtitles)
- ❌ Highly technical jargon
- ❌ Cultural references
- ❌ Wordplay or humor
- ❌ When 100% accuracy is critical

### Workflow Recommendations

1. **Generate with Speech-to-Text** (Free)
2. **Review transcription quality**
3. **Decide if AI enhancement is worth the cost**
4. **If yes:**
   - Use AI for initial translation/improvement
   - Manually review AI results
   - Edit for accuracy and context
5. **If no:**
   - Manual translate/edit
   - Use online dictionaries
   - Get native speaker review

---

## 🔧 Troubleshooting

### "Invalid API key"
- **OpenAI:** Key must start with `sk-`
- **Gemini:** Check for extra spaces
- **Both:** Regenerate key if needed

### "Rate limit exceeded"
- Wait 1-2 minutes
- Reduce batch size
- Check API usage dashboard
- Upgrade API plan if needed

### "Quota reached"
- Add billing to OpenAI account
- Check Gemini free tier limits
- Review API usage dashboard

### AI results are poor
- Check source language is correct
- Verify target language is correct
- Review original transcription quality
- Try different AI provider
- Fall back to manual editing

### API key not saving
- Check browser localStorage is enabled
- Try different browser
- Check for browser extensions blocking storage

---

## 📊 Architecture

### System Design

```
┌─────────────────────────────────────────┐
│           User Interface                │
│  ┌─────────────────────────────────┐  │
│  │  AI Enhancement Panel           │  │
│  │  - Toggle                        │  │
│  │  - Provider Selection            │  │
│  │  - API Key Input                 │  │
│  │  - Action Buttons                │  │
│  └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│        Application Layer (app.js)        │
│  - State management                      │
│  - Event handling                        │
│  - Error handling                        │
│  - UI updates                            │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│      AI Services Layer                   │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │ aiProviders.js│  │  Provider APIs  │ │
│  │ - Base class  │  │  - openai.js    │ │
│  │ - Utilities   │  │  - gemini.js    │ │
│  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│        External APIs                     │
│  ┌──────────────┐  ┌─────────────────┐ │
│  │  OpenAI API  │  │  Gemini API     │ │
│  │  gpt-4o-mini │  │  gemini-pro     │ │
│  └──────────────┘  └─────────────────┘ │
└─────────────────────────────────────────┘
```

### File Structure

```
/services/
  ├── aiProviders.js    # Abstract base class, utilities
  ├── openai.js         # OpenAI GPT implementation
  └── gemini.js         # Google Gemini implementation

/app.js                 # AI integration & UI logic
/index.html             # AI Enhancement panel
/styles.css             # AI panel styling
```

---

## 🔮 Future Enhancements

### Planned Features
- [ ] Support for more AI providers (Claude, Llama, etc.)
- [ ] Custom system prompts
- [ ] Translation memory / glossary
- [ ] Batch size customization
- [ ] Cost tracking dashboard
- [ ] Preview before applying
- [ ] Undo AI changes
- [ ] Compare before/after
- [ ] Save AI preferences per project

### Community Contributions Welcome!
- Add new AI providers
- Improve prompts
- Optimize costs
- Enhance error handling
- Add more languages

---

## 📞 Support

### Getting Help
- **Documentation:** This file + README.md
- **Issues:** [GitHub Issues](https://github.com/yourusername/srt-generator/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/srt-generator/discussions)

### Reporting Bugs
Please include:
- AI provider used
- Error message
- Steps to reproduce
- Browser console logs
- Screenshot if applicable

---

## ⚖️ License & Disclaimer

### License
MIT License - Free to use, modify, and distribute

### Disclaimer
**This app does NOT:**
- Store or process your API keys on any server
- Charge you for AI services
- Guarantee AI accuracy
- Provide refunds for AI costs

**You are responsible for:**
- Your API key security
- Costs incurred with AI providers
- Reviewing AI-generated content
- Compliance with AI provider terms

**AI providers are independent third parties:**
- OpenAI Terms: [openai.com/terms](https://openai.com/terms)
- Google Terms: [policies.google.com/terms](https://policies.google.com/terms)

---

**AI Enhancement is a convenience feature, not a replacement for human review. Always verify AI-generated translations for accuracy and appropriateness.**

---

Last Updated: January 28, 2026
