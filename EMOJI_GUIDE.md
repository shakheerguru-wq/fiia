# Custom Emoji/Sticker Guide for FIIA

## 📁 File Structure

```
fiia-app/
├── src/
│   ├── components/
│   │   └── EmojiPicker.jsx    # Main emoji picker component
│   ├── assets/
│   │   └── emojis/            # Your custom SVG emojis go here
│   │       ├── crown.svg
│   │       ├── handshake.svg
│   │       └── ...
│   └── App.jsx
```

## 🎨 Creating Custom SVG Emojis

### Option 1: Design Tools (Recommended)

Use free design tools to create SVG emojis:

1. **Figma** (Free) - https://figma.com
   - Create a 64x64 frame
   - Design your emoji
   - Export as SVG

2. **Canva** (Free) - https://canva.com
   - Use their icon library as starting point
   - Customize colors and shapes
   - Download as SVG

3. **Adobe Illustrator** (Paid)
   - Professional vector design
   - Export as SVG

### Option 2: Code Your Own SVG

SVG is just code! Here's the anatomy of a custom emoji:

```svg
<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- 64x64 is the standard emoji size -->
  
  <!-- Circle background -->
  <circle cx="32" cy="32" r="28" fill="#F59E0B"/>
  
  <!-- Add shapes -->
  <rect x="20" y="20" width="24" height="24" fill="#1C1917"/>
  
  <!-- Add paths for complex shapes -->
  <path d="M32 16 L48 48 L16 48 Z" fill="#FFFFFF"/>
  
  <!-- Add text if needed -->
  <text x="32" y="40" text-anchor="middle" fill="#000" font-size="20">F</text>
</svg>
```

### FIIA Brand Colors

Use these colors for consistency:

```
Primary Gold:   #F59E0B (amber-500)
Dark Gold:      #D97706 (amber-600)
Light Gold:     #FBBF24 (amber-400)
Black:          #1C1917 (stone-900)
White:          #FFFFFF
Red:            #EF4444 (red-500)
Green:          #22C55E (green-500)
```

## 🔧 Adding Custom Emojis to the Picker

### Step 1: Add Your SVG to the customFIIAEmojis Array

In `EmojiPicker.jsx`, add your emoji:

```javascript
const customFIIAEmojis = [
  // ... existing emojis
  
  // Add your new emoji
  {
    id: 'fiia-yourname',           // Unique ID
    name: 'Your Emoji Name',        // Display name
    svg: `<svg viewBox="0 0 64 64">
      <!-- Your SVG code here -->
    </svg>`
  },
];
```

### Step 2: Or Load from External Files

```javascript
// In your component
import crownSvg from '../assets/emojis/crown.svg?raw';

const customEmojis = [
  { id: 'crown', name: 'Crown', svg: crownSvg },
];
```

## 📱 Using the Emoji Picker in Your App

### Basic Usage

```jsx
import EmojiPicker, { EmojiDisplay, twemojify } from './components/EmojiPicker';

function MyComponent() {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowPicker(false);
    console.log('Selected:', emoji);
  };

  return (
    <div>
      {/* Trigger Button */}
      <button onClick={() => setShowPicker(true)}>
        😀 Add Emoji
      </button>

      {/* Emoji Picker Modal */}
      {showPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPicker(false)} />
          <div className="relative">
            <EmojiPicker 
              onSelect={handleEmojiSelect}
              onClose={() => setShowPicker(false)}
            />
          </div>
        </div>
      )}

      {/* Display Selected Emoji */}
      {selectedEmoji && (
        <EmojiDisplay emoji={selectedEmoji} size={32} />
      )}
    </div>
  );
}
```

### Converting Text with Emojis to Twemoji

```jsx
import { twemojify } from './components/EmojiPicker';

function Message({ text }) {
  return (
    <p className="message">
      {twemojify(text, 20)} {/* 20px emoji size */}
    </p>
  );
}

// Usage
<Message text="Hello! 👋 How are you? 😊" />
// Renders with Twemoji SVG images instead of native emojis
```

## 🎯 Emoji Ideas for FIIA

Here are some custom emoji ideas that fit the FIIA theme:

### Power & Status
- 👑 Crown (leadership)
- ⚔️ Crossed swords (conflict)
- 🛡️ Shield (protection)
- 💎 Diamond (value)
- 🏆 Trophy (achievement)

### Social
- 🤝 Handshake (deals)
- 👨‍👩‍👧‍👦 Family (loyalty)
- 🤫 Shush (secrets)
- 🗣️ Speaking (opinions)
- 👥 People (community)

### Emotions
- 🔥 Fire (hot take)
- ❄️ Ice (cold response)
- ⚡ Lightning (shocking)
- 💯 100 (perfect)
- 🎯 Target (on point)

### Marketplace
- 💰 Money bag
- 🏷️ Price tag
- ⭐ Star rating
- 🛒 Cart
- 📦 Package

## 🌐 Twemoji CDN Reference

All standard emojis are loaded from Twitter's Twemoji CDN:

```
https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/[codepoint].svg
```

Benefits:
- ✅ Consistent across all devices
- ✅ High quality SVG (scales perfectly)
- ✅ Fast CDN delivery
- ✅ Free to use

## 🚀 Advanced: Animated Stickers

For animated stickers, you can use:

1. **Lottie Animations** - https://lottiefiles.com
   - JSON-based animations
   - Very small file size
   - Use `lottie-react` library

2. **Animated SVG**
   - CSS animations in SVG
   - SMIL animations

Example animated SVG:

```svg
<svg viewBox="0 0 64 64">
  <circle cx="32" cy="32" r="20" fill="#F59E0B">
    <animate 
      attributeName="r" 
      values="18;22;18" 
      dur="1s" 
      repeatCount="indefinite"
    />
  </circle>
</svg>
```

## 📤 Exporting for App Stores

When submitting to app stores, make sure:

1. All emojis are either:
   - Original designs you own
   - From Twemoji (MIT licensed, attribution required)
   - Licensed for commercial use

2. Include in your app's credits:
   ```
   Emoji graphics powered by Twemoji (https://twemoji.twitter.com/)
   Licensed under CC-BY 4.0
   ```

---

Need help creating specific emojis? Just describe what you want! 🎨
