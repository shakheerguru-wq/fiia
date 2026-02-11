import React, { useState } from 'react';

// Twemoji CDN base URL - converts emoji to SVG images
const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/';

// Convert emoji to Twemoji SVG URL
const getEmojiUrl = (emoji) => {
  const codePoint = [...emoji].map(char => char.codePointAt(0).toString(16)).join('-');
  return `${TWEMOJI_BASE}${codePoint}.svg`;
};

// Custom FIIA Emojis - SVG-based (you can add your own designs here)
const customFIIAEmojis = [
  { id: 'fiia-crown', name: 'Crown', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 48h48v8H8z" fill="#F59E0B"/><path d="M8 48l8-32 16 16 16-16 8 32H8z" fill="#FBBF24"/><circle cx="16" cy="16" r="4" fill="#F59E0B"/><circle cx="32" cy="8" r="4" fill="#F59E0B"/><circle cx="48" cy="16" r="4" fill="#F59E0B"/><path d="M12 52h4v4h-4zM24 52h4v4h-4zM36 52h4v4h-4zM48 52h4v4h-4z" fill="#D97706"/></svg>` },
  { id: 'fiia-handshake', name: 'Deal', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 28c0-4 4-8 12-8h8l12 12h12c4 0 8 4 8 8v4H8V28z" fill="#FBBF24"/><path d="M20 20l24 24" stroke="#D97706" stroke-width="4" stroke-linecap="round"/><path d="M16 36l8 8M24 36l8 8M32 36l8 8" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round"/></svg>` },
  { id: 'fiia-respect', name: 'Respect', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 56c-16 0-24-12-24-24S16 8 32 8s24 12 24 24-8 24-24 24z" fill="#1C1917"/><path d="M20 28l8 8 16-16" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
  { id: 'fiia-fire', name: 'Hot Take', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 4c8 12 20 16 20 32 0 12-8 24-20 24S12 48 12 36C12 20 24 16 32 4z" fill="#EF4444"/><path d="M32 24c4 8 12 8 12 20 0 8-4 16-12 16s-12-8-12-16c0-12 8-12 12-20z" fill="#F59E0B"/><path d="M32 40c2 4 6 4 6 12 0 4-2 8-6 8s-6-4-6-8c0-8 4-8 6-12z" fill="#FEF3C7"/></svg>` },
  { id: 'fiia-loyalty', name: 'Loyalty', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8l6 18h18l-14 11 5 18-15-11-15 11 5-18L8 26h18l6-18z" fill="#F59E0B"/><circle cx="32" cy="32" r="8" fill="#1C1917"/></svg>` },
  { id: 'fiia-family', name: 'Family', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="16" r="8" fill="#1C1917"/><circle cx="44" cy="16" r="8" fill="#1C1917"/><circle cx="32" cy="40" r="6" fill="#F59E0B"/><path d="M8 40c0-8 8-12 12-12s8 4 8 12v16H8V40z" fill="#1C1917"/><path d="M36 40c0-8 8-12 12-12s12 4 12 12v16H36V40z" fill="#1C1917"/><path d="M20 52c0-8 8-8 12-8s12 0 12 8v8H20v-8z" fill="#F59E0B"/></svg>` },
  { id: 'fiia-money', name: 'Business', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="16" width="48" height="32" rx="4" fill="#22C55E"/><circle cx="32" cy="32" r="12" fill="#16A34A"/><path d="M32 24v16M28 28h8c2 0 4 2 4 4s-2 4-4 4h-8" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round"/></svg>` },
  { id: 'fiia-secret', name: 'Secret', svg: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="24" fill="#1C1917"/><path d="M24 28c0-2 2-4 4-4h8c2 0 4 2 4 4v4H24v-4z" fill="#F59E0B"/><rect x="20" y="32" width="24" height="16" rx="2" fill="#F59E0B"/><circle cx="32" cy="40" r="3" fill="#1C1917"/><path d="M32 40v4" stroke="#1C1917" stroke-width="2" stroke-linecap="round"/></svg>` },
];

// Emoji categories with Twemoji-compatible emojis
const emojiCategories = [
  {
    name: 'FIIA',
    icon: '👑',
    emojis: customFIIAEmojis.map(e => ({ ...e, isCustom: true }))
  },
  {
    name: 'Smileys',
    icon: '😀',
    emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😌', '😍', '🥰', '😘', '😋', '😛', '😜', '🤪', '😎', '🤩', '🥳', '😏', '😒', '🙄', '😬', '😮', '😯', '😲', '😳', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '🤖'].map(e => ({ emoji: e, isCustom: false }))
  },
  {
    name: 'Gestures',
    icon: '👋',
    emojis: ['👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '💪', '🦾', '🖕'].map(e => ({ emoji: e, isCustom: false }))
  },
  {
    name: 'Hearts',
    icon: '❤️',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '🫀'].map(e => ({ emoji: e, isCustom: false }))
  },
  {
    name: 'Objects',
    icon: '🎁',
    emojis: ['💼', '👔', '👗', '🎩', '👑', '💍', '💎', '🔫', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '🏺', '🔮', '📿', '💈', '🔑', '🗝️', '🎰', '🎲', '♠️', '♥️', '♦️', '♣️', '🃏', '🀄', '🎴', '🎭', '🖼️', '🎨'].map(e => ({ emoji: e, isCustom: false }))
  },
  {
    name: 'Food',
    icon: '🍕',
    emojis: ['🍕', '🍔', '🍟', '🌭', '🥪', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥘', '🍲', '🥣', '🥗', '🍝', '🍜', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊'].map(e => ({ emoji: e, isCustom: false }))
  },
  {
    name: 'Animals',
    icon: '🐶',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔', '🐧', '🐦', '🐤', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊'].map(e => ({ emoji: e, isCustom: false }))
  },
];

const EmojiPicker = ({ onSelect, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const currentCategory = emojiCategories[activeCategory];
  
  const filteredEmojis = searchTerm 
    ? emojiCategories.flatMap(cat => cat.emojis).filter(e => 
        e.isCustom ? e.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
      )
    : currentCategory.emojis;

  const handleEmojiSelect = (emojiData) => {
    if (emojiData.isCustom) {
      // Return custom emoji with SVG data
      onSelect({ type: 'custom', id: emojiData.id, name: emojiData.name, svg: emojiData.svg });
    } else {
      // Return standard emoji with Twemoji URL
      onSelect({ type: 'twemoji', emoji: emojiData.emoji, url: getEmojiUrl(emojiData.emoji) });
    }
  };

  return (
    <div className="bg-stone-900 rounded-2xl overflow-hidden w-full max-w-sm shadow-2xl">
      {/* Header */}
      <div className="p-3 border-b border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-mafia text-white text-sm">Emojis & Stickers</h3>
          <button 
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search emojis..."
            className="w-full pl-9 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-white/30 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-white/10 overflow-x-auto">
        {emojiCategories.map((cat, idx) => (
          <button
            key={cat.name}
            onClick={() => { setActiveCategory(idx); setSearchTerm(''); }}
            className={`flex-shrink-0 px-4 py-2 text-lg transition-colors ${activeCategory === idx ? 'bg-amber-500/20 border-b-2 border-amber-500' : 'hover:bg-white/10'}`}
          >
            {cat.icon}
          </button>
        ))}
      </div>

      {/* Emoji Grid */}
      <div className="p-3 h-64 overflow-y-auto">
        <div className="grid grid-cols-7 gap-1">
          {filteredEmojis.map((emojiData, idx) => (
            <button
              key={emojiData.isCustom ? emojiData.id : `${emojiData.emoji}-${idx}`}
              onClick={() => handleEmojiSelect(emojiData)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
              title={emojiData.isCustom ? emojiData.name : emojiData.emoji}
            >
              {emojiData.isCustom ? (
                <div 
                  className="w-7 h-7"
                  dangerouslySetInnerHTML={{ __html: emojiData.svg }}
                />
              ) : (
                <img 
                  src={getEmojiUrl(emojiData.emoji)} 
                  alt={emojiData.emoji}
                  className="w-7 h-7"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                />
              )}
              {!emojiData.isCustom && (
                <span className="text-xl hidden">{emojiData.emoji}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer - Category Name */}
      <div className="px-3 py-2 border-t border-white/10 bg-white/5">
        <p className="text-white/50 text-xs">{searchTerm ? 'Search Results' : currentCategory.name}</p>
      </div>
    </div>
  );
};

// Emoji Display Component - Use this to render emojis consistently
export const EmojiDisplay = ({ emoji, size = 24 }) => {
  if (emoji.type === 'custom') {
    return (
      <span 
        className="inline-block"
        style={{ width: size, height: size }}
        dangerouslySetInnerHTML={{ __html: emoji.svg }}
      />
    );
  }
  
  return (
    <img 
      src={emoji.url || getEmojiUrl(emoji.emoji)}
      alt={emoji.emoji}
      className="inline-block"
      style={{ width: size, height: size }}
    />
  );
};

// Helper to convert text with emojis to Twemoji
export const twemojify = (text, size = 20) => {
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  const parts = text.split(emojiRegex);
  
  return parts.map((part, idx) => {
    if (emojiRegex.test(part)) {
      return (
        <img 
          key={idx}
          src={getEmojiUrl(part)}
          alt={part}
          className="inline-block align-text-bottom"
          style={{ width: size, height: size }}
        />
      );
    }
    return part;
  });
};

export default EmojiPicker;
