# 🤝 Contributing to SRT Generator

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

---

## 📋 Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Setup](#development-setup)
4. [Project Structure](#project-structure)
5. [Coding Standards](#coding-standards)
6. [Commit Guidelines](#commit-guidelines)
7. [Pull Request Process](#pull-request-process)
8. [Feature Requests](#feature-requests)
9. [Bug Reports](#bug-reports)
10. [Documentation](#documentation)

---

## 📜 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior:**
- ✅ Using welcoming and inclusive language
- ✅ Being respectful of differing viewpoints
- ✅ Accepting constructive criticism gracefully
- ✅ Focusing on what is best for the community
- ✅ Showing empathy towards others

**Unacceptable behavior:**
- ❌ Trolling, insulting/derogatory comments
- ❌ Public or private harassment
- ❌ Publishing others' private information
- ❌ Any conduct that would be inappropriate in a professional setting

---

## 🚀 Getting Started

### Ways to Contribute

1. **Report Bugs** - Found an issue? Let us know!
2. **Suggest Features** - Have ideas? Share them!
3. **Write Code** - Fix bugs or implement features
4. **Improve Documentation** - Help others understand the code
5. **Test** - Try the app on different devices/browsers
6. **Design** - Improve UI/UX
7. **Translate** - Add language support

### First Time Contributors

Look for issues labeled:
- `good first issue` - Easy tasks for beginners
- `help wanted` - We need assistance
- `documentation` - Documentation improvements

---

## 💻 Development Setup

### Prerequisites

- Git
- Modern web browser (Chrome/Edge recommended)
- Text editor (VS Code recommended)
- Basic knowledge of HTML/CSS/JavaScript

### Local Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/srt-generator.git
   cd srt-generator
   ```

3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

4. **Start a local server**
   ```bash
   # Python
   python -m http.server 8000
   
   # Or use VS Code Live Server extension
   ```

5. **Open in browser**
   ```
   http://localhost:8000
   ```

6. **Make changes and test**

---

## 📁 Project Structure

```
srt-generator/
├── index.html           # Main HTML file
├── styles.css           # All styles and themes
├── app.js              # Main application logic
├── utils/              # Utility modules
│   ├── speechRecognition.js  # Web Speech API wrapper
│   ├── srtUtils.js          # SRT formatting utilities
│   └── translation.js       # Translation helpers
├── docs/               # Documentation files
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── FAQ.md
│   └── CONTRIBUTING.md (this file)
├── README.md           # Main documentation
├── LICENSE             # MIT License
└── .gitignore         # Git ignore rules
```

### Key Components

- **index.html**: UI structure, semantic HTML
- **styles.css**: All styling, CSS variables for theming
- **app.js**: Main app logic, event handlers, state management
- **utils/**: Reusable modules with specific responsibilities

---

## 📝 Coding Standards

### JavaScript Style

```javascript
// Use ES6+ features
const myFunction = () => {
    // Arrow functions
};

// Use template literals
const message = `Hello, ${name}!`;

// Use const/let, not var
const immutable = 'value';
let mutable = 'value';

// Destructuring
const { prop1, prop2 } = object;

// Default parameters
function greet(name = 'User') {
    return `Hello, ${name}!`;
}

// Async/await over promises
async function fetchData() {
    try {
        const data = await fetch(url);
        return data;
    } catch (error) {
        console.error(error);
    }
}
```

### Naming Conventions

```javascript
// Variables and functions: camelCase
const myVariable = 'value';
function myFunction() {}

// Classes: PascalCase
class MyClass {}

// Constants: UPPER_SNAKE_CASE
const MAX_SIZE = 100;
const API_KEY = 'key';

// Private methods: prefix with underscore
function _privateMethod() {}

// Boolean variables: prefix with is/has/should
const isActive = true;
const hasError = false;
const shouldUpdate = true;
```

### Comments

```javascript
/**
 * Function description (JSDoc style)
 * @param {string} name - Parameter description
 * @returns {Object} Return value description
 */
function myFunction(name) {
    // Single-line comment for implementation details
    
    /* Multi-line comment
       for longer explanations
       spanning multiple lines */
    
    return { name };
}
```

### CSS Style

```css
/* Use CSS variables for theming */
:root {
    --color-primary: #2563eb;
    --spacing-md: 1rem;
}

/* BEM-like naming for classes */
.block-name {}
.block-name__element {}
.block-name--modifier {}

/* Mobile-first responsive design */
.element {
    /* Base styles (mobile) */
}

@media (min-width: 768px) {
    .element {
        /* Tablet styles */
    }
}

@media (min-width: 1024px) {
    .element {
        /* Desktop styles */
    }
}
```

### HTML Style

```html
<!-- Use semantic HTML5 elements -->
<header>...</header>
<nav>...</nav>
<main>...</main>
<section>...</section>
<article>...</article>
<footer>...</footer>

<!-- Always include accessibility attributes -->
<button aria-label="Close dialog">X</button>
<img src="..." alt="Descriptive text">
<input type="text" id="name" aria-describedby="name-help">

<!-- Use data attributes for JavaScript hooks -->
<div data-component="modal" data-id="123">
```

---

## 📤 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat(speech): add support for Thai language"
git commit -m "fix(ui): correct dark mode toggle icon"
git commit -m "docs(readme): update deployment instructions"
git commit -m "style(css): improve button hover animations"

# Bad commits
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "..."
```

### Commit Best Practices

- ✅ Write in present tense ("add feature" not "added feature")
- ✅ Keep subject line under 50 characters
- ✅ Separate subject from body with blank line
- ✅ Explain what and why, not how
- ✅ Reference issue numbers (#123)
- ❌ Don't end subject with period

---

## 🔀 Pull Request Process

### Before Submitting

1. **Update your fork**
   ```bash
   git checkout main
   git pull upstream main
   git checkout your-branch
   git rebase main
   ```

2. **Test your changes**
   - Test in Chrome and Edge
   - Check mobile responsiveness
   - Verify no console errors
   - Test both light and dark themes

3. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update CHANGELOG if exists

4. **Commit and push**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin your-branch
   ```

### Creating a Pull Request

1. Go to GitHub repository
2. Click "New Pull Request"
3. Select your branch
4. Fill out PR template:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Edge
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots here]

## Checklist
- [ ] Code follows project style
- [ ] Comments added where necessary
- [ ] Documentation updated
- [ ] No new warnings
```

5. Submit and wait for review

### Review Process

- Maintainers will review within 1-3 days
- Address feedback promptly
- Be open to suggestions
- Make requested changes
- Get approval from at least one maintainer
- Maintainer will merge

---

## 💡 Feature Requests

### How to Request a Feature

1. **Check existing issues** - Maybe it's already requested
2. **Create new issue** with label `feature request`
3. **Provide details:**
   - Clear description
   - Use case / motivation
   - Example implementation (if applicable)
   - Screenshots or mockups
   - Alternatives considered

### Feature Request Template

```markdown
**Feature Description**
Clear description of the feature

**Problem it Solves**
What problem does this address?

**Proposed Solution**
How should it work?

**Alternatives Considered**
Other approaches you've thought about

**Additional Context**
Screenshots, mockups, examples
```

---

## 🐛 Bug Reports

### How to Report a Bug

1. **Search existing issues** - Don't duplicate
2. **Create new issue** with label `bug`
3. **Include all details** (see template below)

### Bug Report Template

```markdown
**Bug Description**
Clear description of what's wrong

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What should happen?

**Actual Behavior**
What actually happens?

**Screenshots**
If applicable

**Environment**
- Browser: [Chrome 120]
- OS: [Windows 11]
- Device: [Desktop/Mobile]
- Screen size: [1920x1080]

**Console Errors**
```
Paste console errors here (F12)
```

**Additional Context**
Any other relevant information
```

---

## 📚 Documentation

### What Needs Documentation

- New features
- API changes
- Configuration options
- Setup instructions
- Usage examples
- Known issues
- Browser compatibility

### Documentation Style

```markdown
# Clear Headers

Brief introduction paragraph.

## Subsections

Use code blocks for examples:

```javascript
const example = 'code';
```

**Bold** for emphasis.
*Italic* for less emphasis.

- Bullet points for lists
- Keep it concise
- Use examples
```

### Where to Add Documentation

- **README.md** - User-facing features
- **ARCHITECTURE.md** - Technical details
- **FAQ.md** - Common questions
- **Code comments** - Implementation details
- **Wiki** - Extended guides

---

## 🎯 Priority Areas

We especially welcome contributions in:

1. **Browser Compatibility** - Firefox, Safari support
2. **Offline Support** - Whisper.cpp integration
3. **Performance** - Optimization for large files
4. **Accessibility** - Screen reader support, keyboard navigation
5. **Mobile Experience** - Better mobile UI
6. **Testing** - Automated tests
7. **Language Support** - More languages
8. **UI/UX** - Design improvements

---

## ✅ Quality Checklist

Before submitting, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass (if applicable)
- [ ] No console errors or warnings
- [ ] Documentation updated
- [ ] Comments added where needed
- [ ] Commit messages are clear
- [ ] No sensitive data in code
- [ ] Tested in Chrome and Edge
- [ ] Responsive design maintained
- [ ] Accessibility not broken
- [ ] Dark mode works
- [ ] No performance regressions

---

## 🏆 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Thanked in project README
- Given credit for their work

---

## 📞 Getting Help

Stuck? Need clarification?

- **Discord/Slack**: [Add link if available]
- **GitHub Discussions**: Ask questions
- **Email**: [Add email]

---

## 🙏 Thank You!

Every contribution, no matter how small, is valuable. Thank you for helping make SRT Generator better!

**Happy coding!** 🎉
