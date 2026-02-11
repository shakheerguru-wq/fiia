import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  // Authentication State - Set to true to skip auth for testing
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [authScreen, setAuthScreen] = useState('welcome'); // 'welcome', 'age', 'phone', 'verify', 'signup'
  const [authPhone, setAuthPhone] = useState('');
  const [authCountryCode, setAuthCountryCode] = useState('+1');
  const [authName, setAuthName] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authAge, setAuthAge] = useState('');
  const [authBirthDate, setAuthBirthDate] = useState({ day: '', month: '', year: '' });
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const verificationInputs = useRef([]);

  // Country codes list - comprehensive
  const countryCodes = [
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+1', country: 'Canada', flag: '🇨🇦' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+20', country: 'Egypt', flag: '🇪🇬' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+30', country: 'Greece', flag: '🇬🇷' },
    { code: '+31', country: 'Netherlands', flag: '🇳🇱' },
    { code: '+32', country: 'Belgium', flag: '🇧🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+36', country: 'Hungary', flag: '🇭🇺' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+40', country: 'Romania', flag: '🇷🇴' },
    { code: '+41', country: 'Switzerland', flag: '🇨🇭' },
    { code: '+43', country: 'Austria', flag: '🇦🇹' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+45', country: 'Denmark', flag: '🇩🇰' },
    { code: '+46', country: 'Sweden', flag: '🇸🇪' },
    { code: '+47', country: 'Norway', flag: '🇳🇴' },
    { code: '+48', country: 'Poland', flag: '🇵🇱' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+51', country: 'Peru', flag: '🇵🇪' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+53', country: 'Cuba', flag: '🇨🇺' },
    { code: '+54', country: 'Argentina', flag: '🇦🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+56', country: 'Chile', flag: '🇨🇱' },
    { code: '+57', country: 'Colombia', flag: '🇨🇴' },
    { code: '+58', country: 'Venezuela', flag: '🇻🇪' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
    { code: '+63', country: 'Philippines', flag: '🇵🇭' },
    { code: '+64', country: 'New Zealand', flag: '🇳🇿' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+84', country: 'Vietnam', flag: '🇻🇳' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+90', country: 'Turkey', flag: '🇹🇷' },
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
    { code: '+93', country: 'Afghanistan', flag: '🇦🇫' },
    { code: '+94', country: 'Sri Lanka', flag: '🇱🇰' },
    { code: '+95', country: 'Myanmar', flag: '🇲🇲' },
    { code: '+98', country: 'Iran', flag: '🇮🇷' },
    { code: '+212', country: 'Morocco', flag: '🇲🇦' },
    { code: '+213', country: 'Algeria', flag: '🇩🇿' },
    { code: '+216', country: 'Tunisia', flag: '🇹🇳' },
    { code: '+218', country: 'Libya', flag: '🇱🇾' },
    { code: '+220', country: 'Gambia', flag: '🇬🇲' },
    { code: '+221', country: 'Senegal', flag: '🇸🇳' },
    { code: '+223', country: 'Mali', flag: '🇲🇱' },
    { code: '+224', country: 'Guinea', flag: '🇬🇳' },
    { code: '+225', country: 'Ivory Coast', flag: '🇨🇮' },
    { code: '+227', country: 'Niger', flag: '🇳🇪' },
    { code: '+228', country: 'Togo', flag: '🇹🇬' },
    { code: '+229', country: 'Benin', flag: '🇧🇯' },
    { code: '+230', country: 'Mauritius', flag: '🇲🇺' },
    { code: '+231', country: 'Liberia', flag: '🇱🇷' },
    { code: '+233', country: 'Ghana', flag: '🇬🇭' },
    { code: '+234', country: 'Nigeria', flag: '🇳🇬' },
    { code: '+237', country: 'Cameroon', flag: '🇨🇲' },
    { code: '+239', country: 'São Tomé', flag: '🇸🇹' },
    { code: '+240', country: 'Equatorial Guinea', flag: '🇬🇶' },
    { code: '+241', country: 'Gabon', flag: '🇬🇦' },
    { code: '+242', country: 'Congo', flag: '🇨🇬' },
    { code: '+243', country: 'DR Congo', flag: '🇨🇩' },
    { code: '+244', country: 'Angola', flag: '🇦🇴' },
    { code: '+245', country: 'Guinea-Bissau', flag: '🇬🇼' },
    { code: '+248', country: 'Seychelles', flag: '🇸🇨' },
    { code: '+249', country: 'Sudan', flag: '🇸🇩' },
    { code: '+250', country: 'Rwanda', flag: '🇷🇼' },
    { code: '+251', country: 'Ethiopia', flag: '🇪🇹' },
    { code: '+252', country: 'Somalia', flag: '🇸🇴' },
    { code: '+253', country: 'Djibouti', flag: '🇩🇯' },
    { code: '+254', country: 'Kenya', flag: '🇰🇪' },
    { code: '+255', country: 'Tanzania', flag: '🇹🇿' },
    { code: '+256', country: 'Uganda', flag: '🇺🇬' },
    { code: '+257', country: 'Burundi', flag: '🇧🇮' },
    { code: '+258', country: 'Mozambique', flag: '🇲🇿' },
    { code: '+260', country: 'Zambia', flag: '🇿🇲' },
    { code: '+261', country: 'Madagascar', flag: '🇲🇬' },
    { code: '+263', country: 'Zimbabwe', flag: '🇿🇼' },
    { code: '+264', country: 'Namibia', flag: '🇳🇦' },
    { code: '+265', country: 'Malawi', flag: '🇲🇼' },
    { code: '+266', country: 'Lesotho', flag: '🇱🇸' },
    { code: '+267', country: 'Botswana', flag: '🇧🇼' },
    { code: '+268', country: 'Eswatini', flag: '🇸🇿' },
    { code: '+351', country: 'Portugal', flag: '🇵🇹' },
    { code: '+352', country: 'Luxembourg', flag: '🇱🇺' },
    { code: '+353', country: 'Ireland', flag: '🇮🇪' },
    { code: '+354', country: 'Iceland', flag: '🇮🇸' },
    { code: '+355', country: 'Albania', flag: '🇦🇱' },
    { code: '+356', country: 'Malta', flag: '🇲🇹' },
    { code: '+357', country: 'Cyprus', flag: '🇨🇾' },
    { code: '+358', country: 'Finland', flag: '🇫🇮' },
    { code: '+359', country: 'Bulgaria', flag: '🇧🇬' },
    { code: '+370', country: 'Lithuania', flag: '🇱🇹' },
    { code: '+371', country: 'Latvia', flag: '🇱🇻' },
    { code: '+372', country: 'Estonia', flag: '🇪🇪' },
    { code: '+373', country: 'Moldova', flag: '🇲🇩' },
    { code: '+374', country: 'Armenia', flag: '🇦🇲' },
    { code: '+375', country: 'Belarus', flag: '🇧🇾' },
    { code: '+376', country: 'Andorra', flag: '🇦🇩' },
    { code: '+377', country: 'Monaco', flag: '🇲🇨' },
    { code: '+378', country: 'San Marino', flag: '🇸🇲' },
    { code: '+380', country: 'Ukraine', flag: '🇺🇦' },
    { code: '+381', country: 'Serbia', flag: '🇷🇸' },
    { code: '+382', country: 'Montenegro', flag: '🇲🇪' },
    { code: '+383', country: 'Kosovo', flag: '🇽🇰' },
    { code: '+385', country: 'Croatia', flag: '🇭🇷' },
    { code: '+386', country: 'Slovenia', flag: '🇸🇮' },
    { code: '+387', country: 'Bosnia', flag: '🇧🇦' },
    { code: '+389', country: 'North Macedonia', flag: '🇲🇰' },
    { code: '+420', country: 'Czech Republic', flag: '🇨🇿' },
    { code: '+421', country: 'Slovakia', flag: '🇸🇰' },
    { code: '+423', country: 'Liechtenstein', flag: '🇱🇮' },
    { code: '+852', country: 'Hong Kong', flag: '🇭🇰' },
    { code: '+853', country: 'Macau', flag: '🇲🇴' },
    { code: '+855', country: 'Cambodia', flag: '🇰🇭' },
    { code: '+856', country: 'Laos', flag: '🇱🇦' },
    { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
    { code: '+886', country: 'Taiwan', flag: '🇹🇼' },
    { code: '+960', country: 'Maldives', flag: '🇲🇻' },
    { code: '+961', country: 'Lebanon', flag: '🇱🇧' },
    { code: '+962', country: 'Jordan', flag: '🇯🇴' },
    { code: '+963', country: 'Syria', flag: '🇸🇾' },
    { code: '+964', country: 'Iraq', flag: '🇮🇶' },
    { code: '+965', country: 'Kuwait', flag: '🇰🇼' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+967', country: 'Yemen', flag: '🇾🇪' },
    { code: '+968', country: 'Oman', flag: '🇴🇲' },
    { code: '+970', country: 'Palestine', flag: '🇵🇸' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+972', country: 'Israel', flag: '🇮🇱' },
    { code: '+973', country: 'Bahrain', flag: '🇧🇭' },
    { code: '+974', country: 'Qatar', flag: '🇶🇦' },
    { code: '+975', country: 'Bhutan', flag: '🇧🇹' },
    { code: '+976', country: 'Mongolia', flag: '🇲🇳' },
    { code: '+977', country: 'Nepal', flag: '🇳🇵' },
    { code: '+992', country: 'Tajikistan', flag: '🇹🇯' },
    { code: '+993', country: 'Turkmenistan', flag: '🇹🇲' },
    { code: '+994', country: 'Azerbaijan', flag: '🇦🇿' },
    { code: '+995', country: 'Georgia', flag: '🇬🇪' },
    { code: '+996', country: 'Kyrgyzstan', flag: '🇰🇬' },
    { code: '+998', country: 'Uzbekistan', flag: '🇺🇿' },
  ];
  
  const [countrySearch, setCountrySearch] = useState('');
  const [showGuestProfileMessage, setShowGuestProfileMessage] = useState(false);
  const filteredCountries = countryCodes.filter(c => 
    c.country.toLowerCase().includes(countrySearch.toLowerCase()) || 
    c.code.includes(countrySearch)
  );

  const [loaded, setLoaded] = useState(false);
  
  // Card stack - with timestamps (createdAt in hours ago for demo)
  const [cards, setCards] = useState([
    { id: 1, category: 'Politics', author: 'V. Corleone', type: 'article', title: 'The Art of Negotiation', content: 'In the world of business and politics, negotiation is an art form...', createdAt: Date.now() - (2 * 60 * 60 * 1000) }, // 2 hours ago
    { id: 2, category: 'Culture', author: 'R. DiMaggio', type: 'presentation', title: 'Cinema\'s Golden Age', slides: [{ title: 'The Birth of an Era', text: 'How the 1970s transformed cinema', image: '🎬' }], createdAt: Date.now() - (5 * 60 * 60 * 1000) }, // 5 hours ago
    { id: 3, category: 'Academic', author: 'Dr. A. Russo', type: 'article', title: 'Game Theory & Loyalty', content: 'This paper examines game theory principles...', createdAt: Date.now() - (8 * 60 * 60 * 1000) }, // 8 hours ago
    { id: 4, category: 'Opinion', author: 'S. Fontane', type: 'article', title: 'Why Tradition Matters', content: 'In a rapidly changing world, tradition anchors us...', createdAt: Date.now() - (12 * 60 * 60 * 1000) }, // 12 hours ago
    { id: 5, category: 'Gossip', author: 'K. Adams', type: 'card', title: 'Congratulations!', frameColor: '#F59E0B', bg: '#1C1917', createdAt: Date.now() - (18 * 60 * 60 * 1000) }, // 18 hours ago - CARD type
    { id: 6, category: 'Politics', author: 'T. Hagen', type: 'article', title: 'The Balance of Power', content: 'Understanding influence in modern governance...', createdAt: Date.now() - (20 * 60 * 60 * 1000) }, // 20 hours ago
    { id: 7, category: 'Culture', author: 'M. Corleone', type: 'card', title: 'Happy Birthday!', frameColor: '#DC2626', bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', createdAt: Date.now() - (22 * 60 * 60 * 1000) }, // 22 hours ago - CARD type
    { id: 8, category: 'Academic', author: 'Dr. L. Brazzi', type: 'article', title: 'Economics of Trust', content: 'How trust creates value in closed networks...', createdAt: Date.now() - (23 * 60 * 60 * 1000) }, // 23 hours ago
  ]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [swipeX, setSwipeX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);
  const [exitingCard, setExitingCard] = useState(null); // For exit animation
  const [exitDirection, setExitDirection] = useState(0);
  const dragStartTime = useRef(0);
  
  // UI State
  const [showHitlist, setShowHitlist] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showRespondOptions, setShowRespondOptions] = useState(false);
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyQuestions, setSurveyQuestions] = useState([{ question: '', options: ['', ''] }]);
  const [isMarketplace, setIsMarketplace] = useState(false);
  const [showMarketplaceContent, setShowMarketplaceContent] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingComment, setRatingComment] = useState('');
  const [showGameInvite, setShowGameInvite] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);
  const [gameInvites, setGameInvites] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const [savedCards, setSavedCards] = useState([]); // Collection of saved cards
  const [showSaveConfirm, setShowSaveConfirm] = useState(false); // Save confirmation toast;
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [profileColors, setProfileColors] = useState({ left: '#000000', right: '#ffffff', divider: '#d4af37' });
  
  // Cards Section
  const [showCardsSection, setShowCardsSection] = useState(false);
  const [myCards, setMyCards] = useState([
    { id: 1, type: 'normal', title: 'My First Card', preview: '#FFFFFF', frame: '#FFD700', createdAt: Date.now() - 86400000 },
    { id: 2, type: 'article', title: 'My Thoughts on AI', preview: '#F5F5F4', frame: '#C0C0C0', createdAt: Date.now() - 172800000 },
  ]);
  
  // Card Type Editor States
  const [showCardTypeEditor, setShowCardTypeEditor] = useState(false);
  const [editingCardType, setEditingCardType] = useState(null); // 'article', 'presentation', 'interactive'
  const [articleContent, setArticleContent] = useState('');
  const [articleReferences, setArticleReferences] = useState([{ title: '', url: '' }]);
  const [presentationSlides, setPresentationSlides] = useState([{ id: 1, content: null }]); // Max 10
  const [interactiveBackDesign, setInteractiveBackDesign] = useState(null);
  const [isDesigningBack, setIsDesigningBack] = useState(false);
  const [editingBox, setEditingBox] = useState(null);
  const [viewingFriend, setViewingFriend] = useState(null);
  const [isProfilePrivate, setIsProfilePrivate] = useState(false);
  const [maskedBoxes, setMaskedBoxes] = useState([]);
  const [showHelpOptions, setShowHelpOptions] = useState(false);
  const [showNeedHelp, setShowNeedHelp] = useState(false);
  const [showHelpOthers, setShowHelpOthers] = useState(false);
  const [helpRequest, setHelpRequest] = useState('');
  const [helpRequests] = useState([
    { id: 1, user: 'Anna M.', request: 'Need a ride to the airport tomorrow at 6am', time: '2h ago' },
    { id: 2, user: 'Marco P.', request: 'Looking for someone to help me move furniture this weekend', time: '4h ago' },
    { id: 3, user: 'Lisa R.', request: 'Need help with calculus homework, exam on Friday', time: '5h ago' },
    { id: 4, user: 'Tony B.', request: 'Can someone watch my dog for 3 days next week?', time: '1d ago' },
  ]);
  const [marketplaceCreateType, setMarketplaceCreateType] = useState(null); // 'product' or 'service'
  const [marketplaceTitle, setMarketplaceTitle] = useState('');
  const [marketplacePrice, setMarketplacePrice] = useState('');
  const [marketplaceDescription, setMarketplaceDescription] = useState('');
  
  // Profile data
  const [profileData, setProfileData] = useState({
    name: 'Michael Corleone',
    username: '@michael_c',
    avatar: 'M',
    friends: ['Sonny F.', 'Tom H.', 'Fredo C.', 'Kay A.', 'Connie C.'],
    movie: { title: 'The Godfather', link: 'https://www.youtube.com/watch?v=sY1S34973zA', linkType: 'trailer' },
  });
  
  // Friends profiles data
  const friendsProfiles = {
    'Sonny F.': { name: 'Sonny Forelli', username: '@sonny_f', avatar: 'S', movie: { title: 'Scarface', link: 'https://youtube.com' }, quote: '"Act like a man!"', song: 'Volare', food: 'Cannoli', place: 'Brooklyn, NY' },
    'Tom H.': { name: 'Tom Hagen', username: '@tom_h', avatar: 'T', movie: { title: '12 Angry Men', link: 'https://youtube.com' }, quote: '"A lawyer with a briefcase can steal more than a hundred men with guns."', song: 'Moon River', food: 'Steak', place: 'Washington DC' },
    'Fredo C.': { name: 'Fredo Corleone', username: '@fredo_c', avatar: 'F', movie: { title: 'Casablanca', link: 'https://youtube.com' }, quote: '"I can handle things."', song: 'Fly Me to the Moon', food: 'Tiramisu', place: 'Las Vegas' },
    'Kay A.': { name: 'Kay Adams', username: '@kay_a', avatar: 'K', movie: { title: 'Roman Holiday', link: 'https://youtube.com' }, quote: '"I love you. I always have."', song: 'La Vie En Rose', food: 'Pasta', place: 'New Hampshire' },
    'Connie C.': { name: 'Connie Corleone', username: '@connie_c', avatar: 'C', movie: { title: 'Gone with the Wind', link: 'https://youtube.com' }, quote: '"I want my family."', song: 'Besame Mucho', food: 'Risotto', place: 'Lake Tahoe' },
  };
  
  // Marketplace products/services
  // Marketplace products/services - with timestamps
  const [marketplaceItems] = useState([
    { id: 101, category: 'Product', author: 'V. Imports', type: 'product', title: 'Authentic Olive Oil', price: '$45', rating: 4.8, reviews: 124, image: '🫒', desc: 'Premium cold-pressed olive oil imported from Sicily', createdAt: Date.now() - (3 * 60 * 60 * 1000) },
    { id: 102, category: 'Service', author: 'Tom H.', type: 'service', title: 'Legal Consulting', price: '$200/hr', rating: 5.0, reviews: 89, image: '👔', desc: 'Expert legal advice for business matters', createdAt: Date.now() - (6 * 60 * 60 * 1000) },
    { id: 103, category: 'Product', author: 'Genco Inc.', type: 'product', title: 'Imported Wines', price: '$85', rating: 4.9, reviews: 256, image: '🍷', desc: 'Fine selection of Italian wines', createdAt: Date.now() - (10 * 60 * 60 * 1000) },
    { id: 104, category: 'Service', author: 'Sonny F.', type: 'service', title: 'Security Services', price: 'Contact', rating: 4.7, reviews: 45, image: '🛡️', desc: 'Professional protection and security', createdAt: Date.now() - (15 * 60 * 60 * 1000) },
    { id: 105, category: 'Product & Service', author: 'Clemenza', type: 'both', title: 'Catering & Supplies', price: 'From $500', rating: 4.9, reviews: 178, image: '🍝', desc: 'Full catering service with authentic recipes', createdAt: Date.now() - (20 * 60 * 60 * 1000) },
    { id: 106, category: 'Service', author: 'M. Corleone', type: 'service', title: 'Business Advisory', price: 'By referral', rating: 5.0, reviews: 34, image: '💼', desc: 'Strategic consulting for growth', createdAt: Date.now() - (22 * 60 * 60 * 1000) },
  ]);
  const [marketplaceIndex, setMarketplaceIndex] = useState(0);
  
  // Create flow
  const [createStep, setCreateStep] = useState('choose');
  const [createType, setCreateType] = useState(null);
  const [createCategory, setCreateCategory] = useState('');
  const [createTitle, setCreateTitle] = useState('');
  const [createContent, setCreateContent] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  // Presentation slide state
  const [presentationSlides, setPresentationSlides] = useState([{ id: 1, stickers: [] }]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isDraggingSticker, setIsDraggingSticker] = useState(false);
  const [isResizingSticker, setIsResizingSticker] = useState(false);
  const [showStickerPicker, setShowStickerPicker] = useState(false);
  const slideRef = useRef(null);

  // Card Creator State (standalone cards - giftcards, greeting cards, etc.)
  const [showCardCreator, setShowCardCreator] = useState(false);
  const [cardCreatorStep, setCardCreatorStep] = useState('template'); // 'template', 'design', 'category', 'publish'
  const [cardTemplate, setCardTemplate] = useState(null);
  const [cardCategory, setCardCategory] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [cardStickers, setCardStickers] = useState([]);
  const [cardSelectedSticker, setCardSelectedSticker] = useState(null);
  const [cardIsDragging, setCardIsDragging] = useState(false);
  const [cardFrameColor, setCardFrameColor] = useState('#F59E0B'); // gold, silver, white, black, red
  const [cardVisibility, setCardVisibility] = useState('public'); // 'public', 'private'
  const [cardLifespan, setCardLifespan] = useState('24h'); // '24h', '7d', '30d', 'forever'
  const [cardType, setCardType] = useState('normal'); // 'normal', 'interactive', 'animated', 'article', 'slideshow', 'product', 'service'
  const [showCardStickerPicker, setShowCardStickerPicker] = useState(false);
  const [cardPublishOption, setCardPublishOption] = useState(null); // 'friend', 'library', 'marketplace'
  const [selectedFriendForCard, setSelectedFriendForCard] = useState(null);
  const [selectedFriendsGroup, setSelectedFriendsGroup] = useState([]);
  const [cardTextInput, setCardTextInput] = useState('');
  const [cardTextColor, setCardTextColor] = useState('#1C1917');
  const [cardTextFont, setCardTextFont] = useState('mafia'); // 'mafia', 'serif', 'sans', 'script', 'mono'
  const [strokeOpacity, setStrokeOpacity] = useState(100); // 0-100
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState(null);
  const cardCanvasRef = useRef(null);

  // Pattern Maker State (Escher-style symmetry drawing)
  const [showPatternMaker, setShowPatternMaker] = useState(false);
  const [patternTool, setPatternTool] = useState('pen'); // 'pen', 'line', 'circle', 'star', 'magic', 'calligraphy'
  const [patternSymmetry, setPatternSymmetry] = useState('rosette'); // 'none', 'rosette', 'p1', 'p2', 'p4', 'p6', 'pmm', 'p4m', 'p6m'
  const [patternSymmetryCount, setPatternSymmetryCount] = useState(6); // for rosette
  const [patternColor, setPatternColor] = useState('#F59E0B');
  const [patternBgColor, setPatternBgColor] = useState('#FFFFFF'); // Default to white
  const [patternLineWidth, setPatternLineWidth] = useState(3);
  const [patternPaths, setPatternPaths] = useState([]); // SVG paths
  const [currentPath, setCurrentPath] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const patternCanvasRef = useRef(null);
  const [cardPatternSvg, setCardPatternSvg] = useState(null); // SVG string for card background

  // ASCII Art State
  const [showAsciiModal, setShowAsciiModal] = useState(false);
  const [asciiArt, setAsciiArt] = useState(null); // { text: string, width: number, height: number }
  const [asciiColor, setAsciiColor] = useState('#F59E0B');
  const [asciiSize, setAsciiSize] = useState(4); // font size
  const [asciiDensity, setAsciiDensity] = useState('medium'); // 'low', 'medium', 'high'
  const [asciiChars, setAsciiChars] = useState('@%#*+=-:. '); // Characters to use
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [cardAsciiArt, setCardAsciiArt] = useState(null); // ASCII art placed on card
  const [asciiCustomChars, setAsciiCustomChars] = useState(''); // Custom characters to use
  const [asciiCharMode, setAsciiCharMode] = useState('preset'); // 'preset', 'custom', 'emoji'
  const [showAsciiEditor, setShowAsciiEditor] = useState(false); // Show text editor
  const asciiCanvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // ASCII character presets
  const asciiPresets = {
    classic: { name: 'Classic', chars: '@%#*+=-:. ' },
    blocks: { name: 'Blocks', chars: '█▓▒░ ' },
    dots: { name: 'Dots', chars: '●◉○◎◌ ' },
    stars: { name: 'Stars', chars: '★☆✦✧✩ ' },
    hearts: { name: 'Hearts', chars: '❤♥💕💗💖 ' },
    money: { name: 'Money', chars: '$€£¥₿ ' },
    fire: { name: 'Fire', chars: '🔥🔶🟠🟡⬜ ' },
    nature: { name: 'Nature', chars: '🌳🌲🌴🌿🍀 ' },
    faces: { name: 'Faces', chars: '😎🙂😊🥰😍 ' },
    detailed: { name: 'Detailed', chars: '$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,"^`\'. ' },
  };
  const [asciiPreset, setAsciiPreset] = useState('classic');

  // Get current character set
  const getAsciiChars = () => {
    if (asciiCharMode === 'custom' && asciiCustomChars.length > 0) {
      return asciiCustomChars + ' '; // Always add space for transparency
    }
    return asciiPresets[asciiPreset]?.chars || asciiPresets.classic.chars;
  };

  // Convert image to ASCII art
  const imageToAscii = (imageData, width, height, chars) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Resize for ASCII (smaller = fewer characters)
    // Adjust based on character width (emojis need more space)
    const isEmoji = /\p{Emoji}/u.test(chars);
    const charWidth = isEmoji ? 12 : 6;
    const charHeight = isEmoji ? 12 : 10;
    
    const asciiWidth = Math.floor(width / charWidth);
    const asciiHeight = Math.floor(height / charHeight);
    
    canvas.width = asciiWidth;
    canvas.height = asciiHeight;
    ctx.drawImage(imageData, 0, 0, asciiWidth, asciiHeight);
    
    const pixels = ctx.getImageData(0, 0, asciiWidth, asciiHeight).data;
    
    // Convert chars string to array (handles emojis properly)
    const charArray = [...chars];
    
    let ascii = '';
    
    for (let y = 0; y < asciiHeight; y++) {
      for (let x = 0; x < asciiWidth; x++) {
        const i = (y * asciiWidth + x) * 4;
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const a = pixels[i + 3];
        
        // If transparent (background removed), use space
        if (a < 128) {
          ascii += ' ';
          continue;
        }
        
        // Calculate brightness
        const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
        const charIndex = Math.floor(brightness * (charArray.length - 1));
        ascii += charArray[charArray.length - 1 - charIndex]; // Invert so dark = dense chars
      }
      ascii += '\n';
    }
    
    return { text: ascii, width: asciiWidth, height: asciiHeight };
  };

  // Simple background removal (threshold-based)
  const removeBackground = (imageData, threshold = 240) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    ctx.drawImage(imageData, 0, 0);
    
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = pixels.data;
    
    // Find the most common edge color (likely background)
    const edgeColors = [];
    for (let x = 0; x < canvas.width; x++) {
      edgeColors.push(getPixelColor(data, x, 0, canvas.width));
      edgeColors.push(getPixelColor(data, x, canvas.height - 1, canvas.width));
    }
    for (let y = 0; y < canvas.height; y++) {
      edgeColors.push(getPixelColor(data, 0, y, canvas.width));
      edgeColors.push(getPixelColor(data, canvas.width - 1, y, canvas.width));
    }
    
    // Calculate average edge color
    const avgR = edgeColors.reduce((s, c) => s + c.r, 0) / edgeColors.length;
    const avgG = edgeColors.reduce((s, c) => s + c.g, 0) / edgeColors.length;
    const avgB = edgeColors.reduce((s, c) => s + c.b, 0) / edgeColors.length;
    
    // Remove similar colors
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      const diff = Math.abs(r - avgR) + Math.abs(g - avgG) + Math.abs(b - avgB);
      
      if (diff < threshold) {
        data[i + 3] = 0; // Make transparent
      }
    }
    
    ctx.putImageData(pixels, 0, 0);
    return canvas;
  };

  const getPixelColor = (data, x, y, width) => {
    const i = (y * width + x) * 4;
    return { r: data[i], g: data[i + 1], b: data[i + 2] };
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setIsProcessingImage(true);
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        
        // Remove background
        const noBgCanvas = removeBackground(img, 200);
        
        // Convert to ASCII
        const chars = getAsciiChars();
        const ascii = imageToAscii(noBgCanvas, img.width, img.height, chars);
        setAsciiArt(ascii);
        setIsProcessingImage(false);
      };
      img.src = event.target.result;
    };
    
    reader.readAsDataURL(file);
  };

  // Regenerate ASCII with new settings
  const regenerateAscii = () => {
    if (!uploadedImage) return;
    setIsProcessingImage(true);
    
    setTimeout(() => {
      const noBgCanvas = removeBackground(uploadedImage, 200);
      const chars = getAsciiChars();
      const ascii = imageToAscii(noBgCanvas, uploadedImage.width, uploadedImage.height, chars);
      setAsciiArt(ascii);
      setIsProcessingImage(false);
    }, 100);
  };

  // Add ASCII art to card
  const addAsciiToCard = () => {
    if (!asciiArt) return;
    setCardAsciiArt({
      text: asciiArt.text,
      color: asciiColor,
      size: asciiSize,
      x: 50,
      y: 50,
    });
    setShowAsciiModal(false);
  };

  // Symmetry configurations
  const symmetryModes = [
    { id: 'none', name: 'None', icon: '○' },
    { id: 'rosette', name: 'Rosette', icon: '✿' },
    { id: 'p1', name: 'Translate', icon: '▦' },
    { id: 'pm', name: 'Mirror', icon: '◧' },
    { id: 'p2', name: 'Rotate 180°', icon: '◐' },
    { id: 'p4', name: 'Rotate 90°', icon: '◆' },
    { id: 'p6', name: 'Hexagonal', icon: '⬡' },
    { id: 'pmm', name: 'Double Mirror', icon: '▣' },
    { id: 'p4m', name: 'Square Mirror', icon: '❖' },
  ];

  const colorPalette = [
    '#F59E0B', '#EF4444', '#EC4899', '#8B5CF6', '#3B82F6', 
    '#10B981', '#14B8A6', '#F97316', '#FFFFFF', '#1C1917',
    '#FEF3C7', '#FED7AA', '#FECACA', '#E9D5FF', '#BFDBFE',
  ];

  // Pattern drawing functions
  const getPatternCanvasPoint = (e) => {
    if (!cardCanvasRef.current) return { x: 0, y: 0 };
    const rect = cardCanvasRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    // Scale to 288x288 viewBox
    return {
      x: ((clientX - rect.left) / rect.width) * 288,
      y: ((clientY - rect.top) / rect.height) * 288
    };
  };

  // Helper function to interpolate between two hex colors
  const interpolateColor = (color1, color2, t) => {
    const hex = (c) => parseInt(c.slice(1), 16);
    const r1 = (hex(color1) >> 16) & 255;
    const g1 = (hex(color1) >> 8) & 255;
    const b1 = hex(color1) & 255;
    const r2 = (hex(color2) >> 16) & 255;
    const g2 = (hex(color2) >> 8) & 255;
    const b2 = hex(color2) & 255;
    const r = Math.round(r1 + (r2 - r1) * t);
    const g = Math.round(g1 + (g2 - g1) * t);
    const b = Math.round(b1 + (b2 - b1) * t);
    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  };

  const startPatternDraw = (e) => {
    e.preventDefault();
    const point = getPatternCanvasPoint(e);
    setIsDrawing(true);
    
    // Determine effective symmetry - certain tools use no symmetry
    const noSymmetryTools = ['free', 'magic', 'glitter', 'calligraphy'];
    const effectiveSymmetry = noSymmetryTools.includes(patternTool) ? 'none' : patternSymmetry;
    
    // Magic pencil - pick random gradient colors including gold/silver
    const magicPalettes = [
      ['#FF6B6B', '#FEC89A', '#FFD93D', '#6BCB77', '#4D96FF'], // Rainbow
      ['#FFD700', '#FFC107', '#FFE082', '#FFFACD', '#FFD700'], // Gold shimmer
      ['#C0C0C0', '#D3D3D3', '#E8E8E8', '#F5F5F5', '#C0C0C0'], // Silver shimmer
      ['#FF9FF3', '#F368E0', '#BE2EDD', '#8E44AD', '#5B2C6F'], // Pink-Purple
      ['#00D2D3', '#01A3A4', '#54A0FF', '#5F27CD', '#341F97'], // Cyan-Purple
      ['#FF6B6B', '#EE5A24', '#F79F1F', '#A3CB38', '#009432'], // Warm sunset
      ['#FFD700', '#C0C0C0', '#FFD700', '#C0C0C0', '#FFD700'], // Gold-Silver mix
    ];
    const selectedPalette = patternTool === 'magic' ? magicPalettes[Math.floor(Math.random() * magicPalettes.length)] : null;
    
    // Variable line width for calligraphy
    const effectiveLineWidth = patternTool === 'calligraphy' ? patternLineWidth * 1.5 : patternLineWidth;
    
    setCurrentPath({
      tool: patternTool,
      color: patternColor,
      lineWidth: effectiveLineWidth,
      symmetry: effectiveSymmetry,
      symmetryCount: patternSymmetryCount,
      points: [point],
      startPoint: point,
      opacity: strokeOpacity / 100,
      magicPalette: selectedPalette,
      magicColors: selectedPalette ? [selectedPalette[0]] : [],
    });
  };

  const continuePatternDraw = (e) => {
    if (!isDrawing || !currentPath) return;
    e.preventDefault();
    const point = getPatternCanvasPoint(e);
    
    if (['pen', 'free', 'calligraphy', 'magic', 'glitter'].includes(patternTool)) {
      // Generate smooth gradient color for magic based on position in stroke
      let newColor = null;
      if (patternTool === 'magic' && currentPath.magicPalette) {
        const palette = currentPath.magicPalette;
        const progress = currentPath.points.length / 30; // Smooth transition over ~30 points
        const colorIndex = (progress * (palette.length - 1)) % palette.length;
        const lowerIndex = Math.floor(colorIndex);
        const upperIndex = Math.ceil(colorIndex) % palette.length;
        const t = colorIndex - lowerIndex;
        
        // Interpolate between colors for smooth gradient
        const c1 = palette[lowerIndex];
        const c2 = palette[upperIndex];
        newColor = interpolateColor(c1, c2, t);
      }
      
      setCurrentPath(prev => ({
        ...prev,
        points: [...prev.points, point],
        magicColors: patternTool === 'magic' ? [...(prev.magicColors || []), newColor] : prev.magicColors,
      }));
    } else {
      setCurrentPath(prev => ({
        ...prev,
        endPoint: point
      }));
    }
  };

  const endPatternDraw = () => {
    if (!isDrawing || !currentPath) return;
    setIsDrawing(false);
    if (currentPath.points.length > 1 || currentPath.endPoint) {
      setPatternPaths(prev => [...prev, currentPath]);
    }
    setCurrentPath(null);
  };

  const undoPattern = () => {
    setPatternPaths(prev => prev.slice(0, -1));
  };

  const clearPattern = () => {
    setPatternPaths([]);
    setCurrentPath(null);
  };

  // Generate SVG path string from points
  const pointsToSvgPath = (points) => {
    if (points.length < 2) return '';
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  // Apply symmetry transformations - now accepts symmetry type and count as parameters
  const getSymmetryTransforms = (canvasWidth, canvasHeight, symmetryType = patternSymmetry, symmetryCount = patternSymmetryCount) => {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const transforms = [];

    switch (symmetryType) {
      case 'none':
        transforms.push({ rotate: 0, translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 });
        break;
      case 'rosette':
        for (let i = 0; i < symmetryCount; i++) {
          const angle = (360 / symmetryCount) * i;
          transforms.push({ rotate: angle, cx, cy, scaleX: 1, scaleY: 1 });
          // Add mirror for each rotation
          transforms.push({ rotate: angle, cx, cy, scaleX: -1, scaleY: 1 });
        }
        break;
      case 'pm': // Mirror
        transforms.push({ rotate: 0, scaleX: 1, scaleY: 1 });
        transforms.push({ rotate: 0, scaleX: -1, scaleY: 1, cx });
        break;
      case 'p2': // 180° rotation
        transforms.push({ rotate: 0, scaleX: 1, scaleY: 1 });
        transforms.push({ rotate: 180, cx, cy, scaleX: 1, scaleY: 1 });
        break;
      case 'p4': // 90° rotation
        for (let i = 0; i < 4; i++) {
          transforms.push({ rotate: 90 * i, cx, cy, scaleX: 1, scaleY: 1 });
        }
        break;
      case 'p6': // 60° rotation
        for (let i = 0; i < 6; i++) {
          transforms.push({ rotate: 60 * i, cx, cy, scaleX: 1, scaleY: 1 });
        }
        break;
      case 'pmm': // Double mirror
        transforms.push({ rotate: 0, scaleX: 1, scaleY: 1 });
        transforms.push({ rotate: 0, scaleX: -1, scaleY: 1, cx });
        transforms.push({ rotate: 0, scaleX: 1, scaleY: -1, cy });
        transforms.push({ rotate: 0, scaleX: -1, scaleY: -1, cx, cy });
        break;
      case 'p4m': // Square + mirrors
        for (let i = 0; i < 4; i++) {
          transforms.push({ rotate: 90 * i, cx, cy, scaleX: 1, scaleY: 1 });
          transforms.push({ rotate: 90 * i, cx, cy, scaleX: -1, scaleY: 1 });
        }
        break;
      case 'p1': // Simple tile
      default:
        // Create a grid of tiles
        const tileSize = 100;
        for (let tx = -1; tx <= 2; tx++) {
          for (let ty = -1; ty <= 2; ty++) {
            transforms.push({ 
              rotate: 0, 
              translateX: tx * tileSize, 
              translateY: ty * tileSize, 
              scaleX: 1, 
              scaleY: 1 
            });
          }
        }
        break;
    }
    return transforms;
  };

  // Generate complete SVG - each path uses its own symmetry settings
  const generatePatternSvg = (width = 300, height = 200) => {
    const cx = width / 2;
    const cy = height / 2;

    let pathElements = '';
    
    const allPaths = currentPath ? [...patternPaths, currentPath] : patternPaths;
    
    allPaths.forEach((path, pathIndex) => {
      // Get transforms for this specific path's symmetry
      const pathSymmetry = path.symmetry || patternSymmetry;
      const pathSymmetryCount = path.symmetryCount || patternSymmetryCount;
      const transforms = getSymmetryTransforms(width, height, pathSymmetry, pathSymmetryCount);
      
      transforms.forEach((t, tIndex) => {
        let transformStr = '';
        if (t.rotate) {
          transformStr += `rotate(${t.rotate} ${t.cx || cx} ${t.cy || cy}) `;
        }
        if (t.translateX || t.translateY) {
          transformStr += `translate(${t.translateX || 0} ${t.translateY || 0}) `;
        }
        if (t.scaleX !== 1 || t.scaleY !== 1) {
          const scx = t.cx || cx;
          const scy = t.cy || cy;
          transformStr += `translate(${scx} ${scy}) scale(${t.scaleX} ${t.scaleY}) translate(${-scx} ${-scy}) `;
        }

        if ((path.tool === 'pen' || path.tool === 'free') && path.points) {
          const d = pointsToSvgPath(path.points);
          const opacity = path.opacity || 1;
          pathElements += `<path d="${d}" stroke="${path.color}" stroke-width="${path.lineWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" transform="${transformStr}"/>`;
        } else if (path.tool === 'calligraphy' && path.points) {
          // Premium calligraphy with beautiful brush effect
          const d = pointsToSvgPath(path.points);
          const opacity = path.opacity || 1;
          // Outer glow
          pathElements += `<path d="${d}" stroke="${path.color}" stroke-width="${path.lineWidth * 1.8}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity * 0.2}" transform="${transformStr}"/>`;
          // Main thick stroke
          pathElements += `<path d="${d}" stroke="${path.color}" stroke-width="${path.lineWidth * 1.3}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity * 0.6}" transform="${transformStr}"/>`;
          // Core line
          pathElements += `<path d="${d}" stroke="${path.color}" stroke-width="${path.lineWidth * 0.5}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity}" transform="${transformStr}"/>`;
          // Highlight
          pathElements += `<path d="${d}" stroke="white" stroke-width="${path.lineWidth * 0.2}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${opacity * 0.4}" transform="${transformStr}"/>`;
        } else if (path.tool === 'magic' && path.points && path.points.length > 1) {
          // Magic pencil with smooth gradient
          const opacity = path.opacity || 1;
          
          for (let i = 1; i < path.points.length; i++) {
            const p1 = path.points[i - 1];
            const p2 = path.points[i];
            const color = path.magicColors && path.magicColors[i] ? path.magicColors[i] : path.magicColors[i-1] || '#FFD700';
            
            // Glow effect
            pathElements += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${path.lineWidth * 3}" stroke-linecap="round" opacity="${opacity * 0.15}" transform="${transformStr}"/>`;
            // Main stroke
            pathElements += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="${color}" stroke-width="${path.lineWidth}" stroke-linecap="round" opacity="${opacity}" transform="${transformStr}"/>`;
            // Inner highlight
            pathElements += `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="white" stroke-width="${path.lineWidth * 0.25}" stroke-linecap="round" opacity="${opacity * 0.4}" transform="${transformStr}"/>`;
          }
        } else if (path.tool === 'glitter' && path.points && path.points.length > 1) {
          // Glitter trail with sparkles
          const d = pointsToSvgPath(path.points);
          // Golden base stroke
          pathElements += `<path d="${d}" stroke="#FFD700" stroke-width="${path.lineWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="${transformStr}"/>`;
          // Glowing outer
          pathElements += `<path d="${d}" stroke="#FFF8DC" stroke-width="${path.lineWidth * 1.5}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.4" transform="${transformStr}"/>`;
          // Add sparkle particles along the path
          for (let i = 0; i < path.points.length; i += 2) {
            const p = path.points[i];
            const sparkleColors = ['#FFD700', '#FFFFFF', '#FFF8DC', '#FFE4B5'];
            const color = sparkleColors[i % sparkleColors.length];
            const size = (Math.random() * 2 + 1) * (path.lineWidth * 0.3);
            const offsetX = (Math.random() - 0.5) * path.lineWidth * 2;
            const offsetY = (Math.random() - 0.5) * path.lineWidth * 2;
            pathElements += `<circle cx="${p.x + offsetX}" cy="${p.y + offsetY}" r="${size}" fill="${color}" opacity="${0.6 + Math.random() * 0.4}" transform="${transformStr}"/>`;
          }
        } else if (path.tool === 'line' && path.startPoint && path.endPoint) {
          pathElements += `<line x1="${path.startPoint.x}" y1="${path.startPoint.y}" x2="${path.endPoint.x}" y2="${path.endPoint.y}" stroke="${path.color}" stroke-width="${path.lineWidth}" stroke-linecap="round" transform="${transformStr}"/>`;
        } else if (path.tool === 'circle' && path.startPoint && path.endPoint) {
          const r = Math.sqrt(Math.pow(path.endPoint.x - path.startPoint.x, 2) + Math.pow(path.endPoint.y - path.startPoint.y, 2));
          pathElements += `<circle cx="${path.startPoint.x}" cy="${path.startPoint.y}" r="${r}" stroke="${path.color}" stroke-width="${path.lineWidth}" fill="none" transform="${transformStr}"/>`;
        } else if (path.tool === 'star' && path.startPoint && path.endPoint) {
          const r = Math.sqrt(Math.pow(path.endPoint.x - path.startPoint.x, 2) + Math.pow(path.endPoint.y - path.startPoint.y, 2));
          const starPoints = [];
          for (let i = 0; i < 10; i++) {
            const angle = (Math.PI / 5) * i - Math.PI / 2;
            const radius = i % 2 === 0 ? r : r * 0.5;
            starPoints.push({
              x: path.startPoint.x + Math.cos(angle) * radius,
              y: path.startPoint.y + Math.sin(angle) * radius
            });
          }
          const d = pointsToSvgPath(starPoints) + ' Z';
          pathElements += `<path d="${d}" stroke="${path.color}" stroke-width="${path.lineWidth}" fill="none" stroke-linejoin="round" transform="${transformStr}"/>`;
        }
      });
    });

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
      <rect width="${width}" height="${height}" fill="${patternBgColor}"/>
      ${pathElements}
    </svg>`;
  };

  const applyPatternToCard = () => {
    const svg = generatePatternSvg(300, 200);
    setCardPatternSvg(svg);
    setShowPatternMaker(false);
  };

  // Card templates - now includes pattern option
  const cardTemplates = [
    { id: 'pattern', name: 'Create Pattern', type: 'pattern', bg: '#1C1917', textColor: '#FFFFFF', icon: '✿' },
    { id: 'blank-white', name: 'Blank White', type: 'blank', bg: '#FFFFFF', textColor: '#1C1917', icon: '📄' },
    { id: 'blank-cream', name: 'Blank Cream', type: 'blank', bg: '#FEF3C7', textColor: '#78350F', icon: '📄' },
    { id: 'blank-dark', name: 'Blank Dark', type: 'blank', bg: '#1C1917', textColor: '#FFFFFF', icon: '📄' },
    { id: 'giftcard-gold', name: 'Gold Gift', type: 'giftcard', bg: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)', textColor: '#1C1917', icon: '🎁' },
    { id: 'giftcard-dark', name: 'Dark Elegance', type: 'giftcard', bg: 'linear-gradient(135deg, #1C1917 0%, #44403c 100%)', textColor: '#FFFFFF', icon: '🎁' },
    { id: 'giftcard-red', name: 'Ruby Red', type: 'giftcard', bg: 'linear-gradient(135deg, #DC2626 0%, #991B1B 100%)', textColor: '#FFFFFF', icon: '🎁' },
    { id: 'greeting-birthday', name: 'Birthday', type: 'greeting', bg: 'linear-gradient(135deg, #EC4899 0%, #8B5CF6 100%)', textColor: '#FFFFFF', icon: '🎂' },
    { id: 'greeting-congrats', name: 'Congratulations', type: 'greeting', bg: 'linear-gradient(135deg, #10B981 0%, #059669 100%)', textColor: '#FFFFFF', icon: '🎉' },
    { id: 'greeting-thankyou', name: 'Thank You', type: 'greeting', bg: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)', textColor: '#FFFFFF', icon: '💐' },
    { id: 'greeting-love', name: 'With Love', type: 'greeting', bg: 'linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)', textColor: '#FFFFFF', icon: '❤️' },
    { id: 'greeting-holiday', name: 'Holiday Wishes', type: 'greeting', bg: 'linear-gradient(135deg, #14532D 0%, #166534 100%)', textColor: '#FFFFFF', icon: '🎄' },
  ];

  const cardCategories = ['Personal', 'Birthday', 'Holiday', 'Thank You', 'Congratulations', 'Love', 'Business', 'Other'];

  // Card creator functions
  const openCardCreator = () => {
    setShowCardCreator(true);
    setCardCreatorStep('template');
    setCardTemplate(null);
    setCardCategory('');
    setCardMessage('');
    setCardStickers([]);
    setCardSelectedSticker(null);
    setCardPublishOption(null);
    setSelectedFriendForCard(null);
    setSelectedFriendsGroup([]);
    setCardPatternSvg(null);
    setPatternPaths([]);
    setCurrentPath(null);
    setCardAsciiArt(null);
    setAsciiArt(null);
    setUploadedImage(null);
    setShowAsciiEditor(false);
    setAsciiCustomChars('');
    setCardFrameColor('#F59E0B'); // Reset to gold
  };

  const addStickerToCard = (sticker, isCustom = false) => {
    const newSticker = {
      id: Date.now(),
      type: isCustom ? 'custom' : 'twemoji',
      content: isCustom ? sticker : { emoji: sticker, url: getEmojiUrl(sticker) },
      x: 50,
      y: 50,
      size: 50,
    };
    setCardStickers(prev => [...prev, newSticker]);
    setShowCardStickerPicker(false);
  };

  const updateCardStickerPosition = (stickerId, x, y) => {
    setCardStickers(prev => prev.map(s => 
      s.id === stickerId ? { ...s, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : s
    ));
  };

  const updateCardStickerSize = (stickerId, size) => {
    setCardStickers(prev => prev.map(s => 
      s.id === stickerId ? { ...s, size: Math.max(20, Math.min(150, size)) } : s
    ));
  };

  const deleteCardSticker = (stickerId) => {
    setCardStickers(prev => prev.filter(s => s.id !== stickerId));
    setCardSelectedSticker(null);
  };

  const handleCardStickerMouseDown = (e, sticker) => {
    e.stopPropagation();
    setCardSelectedSticker(sticker.id);
    setCardIsDragging(true);
  };

  const handleCardCanvasMouseMove = (e) => {
    if (!cardIsDragging || !cardSelectedSticker || !cardCanvasRef.current) return;
    const rect = cardCanvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((e.clientY - rect.top) / rect.height) * 100));
    
    if (cardSelectedSticker === 'ascii') {
      setCardAsciiArt(prev => ({ ...prev, x, y }));
    } else {
      updateCardStickerPosition(cardSelectedSticker, x, y);
    }
  };

  const handleCardCanvasMouseUp = () => {
    setCardIsDragging(false);
  };

  const handleCardCanvasTouchMove = (e) => {
    if (!cardIsDragging || !cardSelectedSticker || !cardCanvasRef.current) return;
    const touch = e.touches[0];
    const rect = cardCanvasRef.current.getBoundingClientRect();
    const x = Math.max(5, Math.min(95, ((touch.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(5, Math.min(95, ((touch.clientY - rect.top) / rect.height) * 100));
    
    if (cardSelectedSticker === 'ascii') {
      setCardAsciiArt(prev => ({ ...prev, x, y }));
    } else {
      updateCardStickerPosition(cardSelectedSticker, x, y);
    }
  };
  
  const categories = ['Politics', 'Culture', 'Academic', 'Gossip', 'Opinion'];

  // Twemoji CDN - converts emoji to high-quality SVG
  const TWEMOJI_BASE = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/';
  const getEmojiUrl = (emoji) => {
    const codePoint = [...emoji].map(char => char.codePointAt(0).toString(16)).join('-');
    return `${TWEMOJI_BASE}${codePoint}.svg`;
  };

  // Custom FIIA emojis (SVG-based)
  const customFIIAEmojis = [
    { id: 'fiia-crown', name: 'Crown', svg: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 48h48v8H8z" fill="#F59E0B"/><path d="M8 48l8-32 16 16 16-16 8 32H8z" fill="#FBBF24"/><circle cx="16" cy="16" r="4" fill="#F59E0B"/><circle cx="32" cy="8" r="4" fill="#F59E0B"/><circle cx="48" cy="16" r="4" fill="#F59E0B"/></svg>` },
    { id: 'fiia-respect', name: 'Respect', svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="28" fill="#1C1917"/><path d="M20 32l8 8 16-16" stroke="#F59E0B" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
    { id: 'fiia-fire', name: 'Hot Take', svg: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 4c8 12 20 16 20 32 0 12-8 24-20 24S12 48 12 36C12 20 24 16 32 4z" fill="#EF4444"/><path d="M32 24c4 8 12 8 12 20 0 8-4 16-12 16s-12-8-12-16c0-12 8-12 12-20z" fill="#F59E0B"/><path d="M32 40c2 4 6 4 6 12 0 4-2 8-6 8s-6-4-6-8c0-8 4-8 6-12z" fill="#FEF3C7"/></svg>` },
    { id: 'fiia-loyalty', name: 'Loyalty', svg: `<svg viewBox="0 0 64 64" fill="none"><path d="M32 8l6 18h18l-14 11 5 18-15-11-15 11 5-18L8 26h18l6-18z" fill="#F59E0B"/><circle cx="32" cy="32" r="8" fill="#1C1917"/></svg>` },
    { id: 'fiia-family', name: 'Family', svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="20" cy="16" r="8" fill="#1C1917"/><circle cx="44" cy="16" r="8" fill="#1C1917"/><circle cx="32" cy="40" r="6" fill="#F59E0B"/><path d="M8 40c0-8 8-12 12-12s8 4 8 12v16H8V40z" fill="#1C1917"/><path d="M36 40c0-8 8-12 12-12s12 4 12 12v16H36V40z" fill="#1C1917"/></svg>` },
    { id: 'fiia-money', name: 'Business', svg: `<svg viewBox="0 0 64 64" fill="none"><rect x="8" y="16" width="48" height="32" rx="4" fill="#22C55E"/><circle cx="32" cy="32" r="12" fill="#16A34A"/><path d="M32 24v16M28 28h8c2 0 4 2 4 4s-2 4-4 4h-8" stroke="#FEF3C7" stroke-width="2" stroke-linecap="round"/></svg>` },
    { id: 'fiia-secret', name: 'Secret', svg: `<svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="32" r="24" fill="#1C1917"/><path d="M24 28c0-2 2-4 4-4h8c2 0 4 2 4 4v4H24v-4z" fill="#F59E0B"/><rect x="20" y="32" width="24" height="16" rx="2" fill="#F59E0B"/><circle cx="32" cy="40" r="3" fill="#1C1917"/></svg>` },
    { id: 'fiia-handshake', name: 'Deal', svg: `<svg viewBox="0 0 64 64" fill="none"><path d="M8 24h12l8 8h8l8-8h12v24H8V24z" fill="#FBBF24"/><path d="M20 32l24 0" stroke="#D97706" stroke-width="4" stroke-linecap="round"/></svg>` },
  ];

  // Standard emoji categories
  const emojiCategories = [
    { name: 'FIIA', emojis: customFIIAEmojis },
    { name: 'Smileys', emojis: ['😀', '😃', '😄', '😁', '😅', '😂', '🤣', '😊', '😇', '🙂', '😉', '😍', '🥰', '😘', '😎', '🤩', '🥳', '😏', '🙄', '😬', '😳', '🥺', '😢', '😭', '😤', '😠', '😈', '💀', '👻'] },
    { name: 'Gestures', emojis: ['👋', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '👍', '👎', '👊', '✊', '🤛', '🤜', '👏', '🙌', '🤝', '🙏', '💪'] },
    { name: 'Hearts', emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝'] },
    { name: 'Objects', emojis: ['💼', '👔', '👑', '💍', '💎', '🔫', '🗡️', '⚔️', '🛡️', '🔑', '🎰', '🎲', '♠️', '♥️', '♦️', '♣️', '🎭'] },
    { name: 'Food', emojis: ['🍕', '🍔', '🍟', '🍝', '🍣', '🍷', '🍺', '🥃', '🍸', '☕', '🍰', '🍫', '🫒'] },
  ];
  
  const [emojiCategory, setEmojiCategory] = useState(0);
  
  const insertEmoji = (emoji, isCustom = false) => {
    if (isCustom) {
      // For custom emojis, insert a placeholder that can be rendered later
      setCreateContent(prev => prev + `[emoji:${emoji.id}]`);
    } else {
      setCreateContent(prev => prev + emoji);
    }
    setShowEmojiPicker(false);
  };

  // Sticker functions for presentations
  const addStickerToSlide = (sticker, isCustom = false) => {
    const newSticker = {
      id: Date.now(),
      type: isCustom ? 'custom' : 'twemoji',
      content: isCustom ? sticker : { emoji: sticker, url: getEmojiUrl(sticker) },
      x: 50, // percentage from left
      y: 50, // percentage from top
      size: 60, // size in pixels
    };
    
    setPresentationSlides(prev => {
      const newSlides = [...prev];
      newSlides[currentSlideIndex] = {
        ...newSlides[currentSlideIndex],
        stickers: [...newSlides[currentSlideIndex].stickers, newSticker]
      };
      return newSlides;
    });
    setShowStickerPicker(false);
  };

  const updateStickerPosition = (stickerId, x, y) => {
    setPresentationSlides(prev => {
      const newSlides = [...prev];
      const slide = newSlides[currentSlideIndex];
      slide.stickers = slide.stickers.map(s => 
        s.id === stickerId ? { ...s, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : s
      );
      return newSlides;
    });
  };

  const updateStickerSize = (stickerId, size) => {
    setPresentationSlides(prev => {
      const newSlides = [...prev];
      const slide = newSlides[currentSlideIndex];
      slide.stickers = slide.stickers.map(s => 
        s.id === stickerId ? { ...s, size: Math.max(20, Math.min(200, size)) } : s
      );
      return newSlides;
    });
  };

  const deleteSticker = (stickerId) => {
    setPresentationSlides(prev => {
      const newSlides = [...prev];
      const slide = newSlides[currentSlideIndex];
      slide.stickers = slide.stickers.filter(s => s.id !== stickerId);
      return newSlides;
    });
    setSelectedSticker(null);
  };

  const addNewSlide = () => {
    setPresentationSlides(prev => [...prev, { id: Date.now(), stickers: [] }]);
    setCurrentSlideIndex(presentationSlides.length);
  };

  const deleteSlide = (index) => {
    if (presentationSlides.length <= 1) return;
    setPresentationSlides(prev => prev.filter((_, i) => i !== index));
    if (currentSlideIndex >= presentationSlides.length - 1) {
      setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
    }
  };

  const handleStickerMouseDown = (e, sticker) => {
    e.stopPropagation();
    setSelectedSticker(sticker.id);
    setIsDraggingSticker(true);
  };

  const handleSlideMouseMove = (e) => {
    if (!isDraggingSticker || !selectedSticker || !slideRef.current) return;
    
    const rect = slideRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    updateStickerPosition(selectedSticker, x, y);
  };

  const handleSlideMouseUp = () => {
    setIsDraggingSticker(false);
    setIsResizingSticker(false);
  };

  const handleSlideTouchMove = (e) => {
    if (!isDraggingSticker || !selectedSticker || !slideRef.current) return;
    
    const touch = e.touches[0];
    const rect = slideRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    updateStickerPosition(selectedSticker, x, y);
  };
  
  // Helper function to calculate time remaining (24 hour expiry)
  const getTimeRemaining = (createdAt) => {
    const expiryTime = createdAt + (24 * 60 * 60 * 1000); // 24 hours in ms
    const now = Date.now();
    const remaining = expiryTime - now;
    
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (60 * 60 * 1000));
    const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m left`;
    }
    return `${minutes}m left`;
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  // Swipe handlers
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].clientX);
    dragStartTime.current = Date.now();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 5) setHasMoved(true);
    setSwipeX(diff);
  };

  const handleTouchEnd = () => {
    const duration = Date.now() - dragStartTime.current;
    if (duration < 200 && !hasMoved && Math.abs(swipeX) < 10) {
      setShowContent(true);
    } else if (swipeX > 100) {
      // Swipe right - go to next card
      setCurrentCardIndex(prev => Math.min(prev + 1, cards.length));
    } else if (swipeX < -100) {
      // Swipe left - go to next card
      setCurrentCardIndex(prev => Math.min(prev + 1, cards.length));
    }
    setIsDragging(false);
    setSwipeX(0);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.clientX);
    dragStartTime.current = Date.now();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 5) setHasMoved(true);
    setSwipeX(diff);
  };

  const handleMouseUp = () => {
    const duration = Date.now() - dragStartTime.current;
    if (duration < 200 && !hasMoved && Math.abs(swipeX) < 10) {
      setShowContent(true);
    } else if (swipeX > 100) {
      // Swipe right - go to next card
      setCurrentCardIndex(prev => Math.min(prev + 1, cards.length));
    } else if (swipeX < -100) {
      // Swipe left - go to next card
      setCurrentCardIndex(prev => Math.min(prev + 1, cards.length));
    }
    setIsDragging(false);
    setSwipeX(0);
  };

  // Marketplace swipe handlers
  const handleMarketplaceTouchStart = (e) => {
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.touches[0].clientX);
    dragStartTime.current = Date.now();
  };

  const handleMarketplaceTouchMove = (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    if (Math.abs(diff) > 5) setHasMoved(true);
    setSwipeX(diff);
  };

  const handleMarketplaceTouchEnd = () => {
    const duration = Date.now() - dragStartTime.current;
    if (duration < 200 && !hasMoved && Math.abs(swipeX) < 10) {
      setShowMarketplaceContent(true);
    } else if (swipeX > 100 || swipeX < -100) {
      setMarketplaceIndex(prev => Math.min(prev + 1, marketplaceItems.length));
    }
    setIsDragging(false);
    setSwipeX(0);
  };

  const handleMarketplaceMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setHasMoved(false);
    setStartX(e.clientX);
    dragStartTime.current = Date.now();
  };

  const handleMarketplaceMouseMove = (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 5) setHasMoved(true);
    setSwipeX(diff);
  };

  const handleMarketplaceMouseUp = () => {
    const duration = Date.now() - dragStartTime.current;
    if (duration < 200 && !hasMoved && Math.abs(swipeX) < 10) {
      setShowMarketplaceContent(true);
    } else if (swipeX > 100 || swipeX < -100) {
      setMarketplaceIndex(prev => Math.min(prev + 1, marketplaceItems.length));
    }
    setIsDragging(false);
    setSwipeX(0);
  };

  const openCreate = () => {
    // Reset card state
    setCardStickers([]);
    setCardSelectedSticker(null);
    setPatternPaths([]);
    setCurrentPath(null);
    setCardAsciiArt(null);
    setCardFrameColor('#F59E0B');
    setCardVisibility('public');
    setCardLifespan('24h');
    setCardType('normal');
    setCardCategory('');
    setPatternBgColor('#1C1917');
    // Open card creator
    setShowCreate(true);
    setCreateStep('design');
  };

  // Authentication Handlers
  const calculateAge = () => {
    const { day, month, year } = authBirthDate;
    if (!day || !month || !year) return null;
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleAgeSubmit = () => {
    const age = calculateAge();
    if (!age || age < 0 || age > 120) {
      setAuthError('Please enter a valid birth date');
      return;
    }
    setAuthAge(age);
    setAuthError('');
    setAuthScreen('phone');
  };

  const handlePhoneSubmit = () => {
    const phoneNumbers = authPhone.replace(/\D/g, '');
    if (phoneNumbers.length < 6) {
      setAuthError('Please enter a valid phone number');
      return;
    }
    setAuthLoading(true);
    setAuthError('');
    // Simulate checking if phone exists and sending code
    setTimeout(() => {
      setAuthLoading(false);
      // For demo, treat as new user if phone ends with odd number
      setIsNewUser(parseInt(phoneNumbers.slice(-1)) % 2 === 1);
      setAuthScreen('verify');
    }, 1500);
  };

  const handleVerification = () => {
    const code = verificationCode.join('');
    if (code.length !== 6) {
      setAuthError('Please enter the full 6-digit code');
      return;
    }
    setAuthLoading(true);
    // Simulate verification
    setTimeout(() => {
      setAuthLoading(false);
      if (code.length === 6) {
        if (isNewUser) {
          setAuthScreen('signup');
        } else {
          setIsAuthenticated(true);
          setIsGuest(false);
        }
      } else {
        setAuthError('Invalid verification code');
      }
    }, 1500);
  };

  const handleSignupComplete = () => {
    if (!authName.trim()) {
      setAuthError('Please enter your name');
      return;
    }
    if (!authUsername.trim()) {
      setAuthError('Please choose a username');
      return;
    }
    if (authUsername.length < 3) {
      setAuthError('Username must be at least 3 characters');
      return;
    }
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setIsAuthenticated(true);
      setIsGuest(false);
    }, 1500);
  };

  const handleVerificationInput = (index, value) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      verificationInputs.current[index + 1]?.focus();
    }
  };

  const handleVerificationKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      verificationInputs.current[index - 1]?.focus();
    }
  };

  const resendCode = () => {
    setAuthError('');
    setAuthLoading(true);
    setTimeout(() => {
      setAuthLoading(false);
      setAuthError('Code resent successfully!');
    }, 1000);
  };

  const resetAuthForm = () => {
    setAuthPhone('');
    setAuthName('');
    setAuthUsername('');
    setAuthAge('');
    setAuthBirthDate({ day: '', month: '', year: '' });
    setVerificationCode(['', '', '', '', '', '']);
    setAuthError('');
    setIsNewUser(false);
  };

  const continueAsGuest = () => {
    setIsGuest(true);
    setIsAuthenticated(false);
  };

  const selectedCountry = countryCodes.find(c => c.code === authCountryCode) || countryCodes[0];

  // If not authenticated and not guest, show auth screens
  if (!isAuthenticated && !isGuest) {
    return (
      <div className="min-h-screen bg-stone-950 text-white overflow-hidden relative">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
          * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
          .font-mafia { font-family: 'Cinzel', serif; }
          .font-elegant { font-family: 'Cormorant Garamond', serif; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.6; } }
          .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
          .animate-slide-up { animation: slideUp 0.6s ease-out forwards; }
          .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        `}</style>

        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Welcome Screen */}
        {authScreen === 'welcome' && (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 animate-fade-in">
            {/* Logo */}
            <div className="mb-12 text-center">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-2xl">
                <span className="text-5xl">👑</span>
              </div>
              <h1 className="font-mafia text-4xl text-white tracking-wider mb-2">FIIA</h1>
              <p className="text-white/50 font-elegant text-lg italic">Your Circle. Your Rules.</p>
            </div>

            {/* Buttons */}
            <div className="w-full max-w-sm space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <button 
                onClick={() => { resetAuthForm(); setAuthScreen('age'); }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity"
              >
                Get Started
              </button>
              <button 
                onClick={continueAsGuest}
                className="w-full py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-mafia text-sm tracking-wide hover:bg-white/10 transition-colors"
              >
                Continue as Guest
              </button>
            </div>

            {/* Guest Info */}
            <p className="mt-6 text-white/30 text-xs text-center max-w-xs">
              Guests can browse content but cannot create posts, respond, or message others
            </p>

            {/* Footer */}
            <p className="absolute bottom-8 text-white/30 text-xs text-center px-6">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        )}

        {/* Age Screen */}
        {authScreen === 'age' && (
          <div className="min-h-screen flex flex-col p-6 animate-fade-in">
            {/* Back Button */}
            <button 
              onClick={() => setAuthScreen('welcome')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-3xl">🎂</span>
              </div>
              <h2 className="font-mafia text-3xl text-white mb-2">Your Birthday</h2>
              <p className="text-white/50">Tell us when you were born</p>
            </div>

            {/* Birth Date Inputs */}
            <div className="space-y-6 flex-1">
              <div className="flex gap-3">
                {/* Day */}
                <div className="flex-1">
                  <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Day</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={authBirthDate.day}
                    onChange={(e) => setAuthBirthDate(prev => ({ ...prev, day: e.target.value.slice(0, 2) }))}
                    placeholder="DD"
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-lg placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                
                {/* Month */}
                <div className="flex-1">
                  <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Month</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={authBirthDate.month}
                    onChange={(e) => setAuthBirthDate(prev => ({ ...prev, month: e.target.value.slice(0, 2) }))}
                    placeholder="MM"
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-lg placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                
                {/* Year */}
                <div className="flex-[1.5]">
                  <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Year</label>
                  <input
                    type="number"
                    min="1900"
                    max={new Date().getFullYear()}
                    value={authBirthDate.year}
                    onChange={(e) => setAuthBirthDate(prev => ({ ...prev, year: e.target.value.slice(0, 4) }))}
                    placeholder="YYYY"
                    className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-center text-lg placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>

              {calculateAge() !== null && calculateAge() >= 0 && (
                <div className="text-center p-4 bg-amber-500/20 rounded-xl">
                  <span className="text-amber-400 font-mafia">{calculateAge()} years old</span>
                </div>
              )}

              {authError && (
                <p className="text-red-400 text-sm text-center">{authError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleAgeSubmit}
              disabled={!authBirthDate.day || !authBirthDate.month || !authBirthDate.year}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              Continue
            </button>
          </div>
        )}

        {/* Phone Number Screen */}
        {authScreen === 'phone' && (
          <div className="min-h-screen flex flex-col p-6 animate-fade-in">
            {/* Back Button */}
            <button 
              onClick={() => setAuthScreen('age')}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Header */}
            <div className="mb-8">
              <div className="w-16 h-16 mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-3xl">📱</span>
              </div>
              <h2 className="font-mafia text-3xl text-white mb-2">Phone Number</h2>
              <p className="text-white/50">We'll send you a verification code</p>
            </div>

            {/* Form */}
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Phone Number</label>
                <div className="flex gap-2">
                  {/* Country Code Picker */}
                  <button 
                    onClick={() => setShowCountryPicker(true)}
                    className="w-24 px-2 py-4 bg-white/10 border border-white/20 rounded-xl text-white flex items-center justify-center gap-1 hover:bg-white/20 transition-colors"
                  >
                    <span>{selectedCountry.flag}</span>
                    <span className="text-white/70 text-sm">{authCountryCode}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/50"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  <input
                    type="tel"
                    value={authPhone}
                    onChange={(e) => setAuthPhone(e.target.value.replace(/[^\d\s-]/g, ''))}
                    placeholder="Phone number"
                    className="flex-1 px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors text-lg"
                  />
                </div>
              </div>

              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}

              <div className="p-4 bg-white/5 rounded-xl">
                <p className="text-white/50 text-xs leading-relaxed">
                  📌 One phone number per account. This ensures each user is unique and helps keep our community safe.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              onClick={handlePhoneSubmit}
              disabled={authLoading || authPhone.replace(/\D/g, '').length < 6}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Send Code'
              )}
            </button>
          </div>
        )}

        {/* Country Picker Modal */}
        {showCountryPicker && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in">
            <div className="absolute inset-0 bg-black/70" onClick={() => { setShowCountryPicker(false); setCountrySearch(''); }} />
            <div className="relative w-full sm:max-w-md sm:mx-4 bg-stone-900 rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up" style={{ maxHeight: '85vh' }}>
              {/* Header */}
              <div className="sticky top-0 bg-stone-900 p-4 border-b border-white/10 z-10">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-mafia text-white text-lg">Select Country</h3>
                  <button onClick={() => { setShowCountryPicker(false); setCountrySearch(''); }} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                {/* Search Input */}
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                  </svg>
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search country or code..."
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors text-sm"
                    autoFocus
                  />
                </div>
              </div>
              
              {/* Country List */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                {filteredCountries.length === 0 ? (
                  <p className="text-center text-white/50 py-8">No countries found</p>
                ) : (
                  <div className="p-2">
                    {filteredCountries.map((country, index) => (
                      <button
                        key={`${country.code}-${index}`}
                        onClick={() => { setAuthCountryCode(country.code); setShowCountryPicker(false); setCountrySearch(''); }}
                        className={`w-full p-3 flex items-center gap-3 rounded-xl transition-colors ${authCountryCode === country.code ? 'bg-amber-500/20' : 'hover:bg-white/10 active:bg-white/20'}`}
                      >
                        <span className="text-2xl flex-shrink-0">{country.flag}</span>
                        <span className="text-white flex-1 text-left text-sm truncate">{country.country}</span>
                        <span className="text-white/50 text-sm flex-shrink-0 min-w-[50px] text-right">{country.code}</span>
                        {authCountryCode === country.code && (
                          <span className="text-amber-500 flex-shrink-0">✓</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Verification Screen */}
        {authScreen === 'verify' && (
          <div className="min-h-screen flex flex-col p-6 animate-fade-in">
            {/* Back Button */}
            <button 
              onClick={() => { setVerificationCode(['', '', '', '', '', '']); setAuthScreen('phone'); }}
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-8"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Header */}
            <div className="mb-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-3xl">✉️</span>
              </div>
              <h2 className="font-mafia text-3xl text-white mb-2">Enter Code</h2>
              <p className="text-white/50">We sent a 6-digit code to</p>
              <p className="text-amber-500 font-medium">{authCountryCode} {authPhone}</p>
            </div>

            {/* Code Input */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-8">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={el => verificationInputs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleVerificationInput(index, e.target.value)}
                  onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                  className="w-11 h-14 sm:w-12 sm:h-14 bg-white/10 border border-white/20 rounded-xl text-white text-center text-xl font-mafia focus:outline-none focus:border-amber-500 transition-colors"
                />
              ))}
            </div>

            {authError && (
              <p className={`text-center text-sm mb-4 ${authError.includes('resent') || authError.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{authError}</p>
            )}

            {/* Resend */}
            <p className="text-center text-white/50 text-sm mb-8">
              Didn't receive the code? <button onClick={resendCode} disabled={authLoading} className="text-amber-500">Resend</button>
            </p>

            {/* Submit Button */}
            <button 
              onClick={handleVerification}
              disabled={authLoading || verificationCode.join('').length !== 6}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Verify'
              )}
            </button>
          </div>
        )}

        {/* Complete Profile Screen (for new users) */}
        {authScreen === 'signup' && (
          <div className="min-h-screen flex flex-col p-6 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
              <div className="w-16 h-16 mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-3xl">✅</span>
              </div>
              <h2 className="font-mafia text-3xl text-white mb-2">Almost There!</h2>
              <p className="text-white/50">Complete your profile to get started</p>
            </div>

            {/* Form */}
            <div className="space-y-4 flex-1">
              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Full Name</label>
                <input
                  type="text"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">@</span>
                  <input
                    type="text"
                    value={authUsername}
                    onChange={(e) => setAuthUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="username"
                    className="w-full pl-9 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
                <p className="text-white/30 text-xs mt-1">Letters, numbers, and underscores only</p>
              </div>

              {/* Profile Summary */}
              <div className="p-4 bg-white/5 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <span>🎂</span>
                  <span>{authAge} years old</span>
                </div>
                <div className="flex items-center gap-2 text-white/50 text-sm">
                  <span>📱</span>
                  <span>{authCountryCode} {authPhone}</span>
                  <span className="text-green-400 text-xs">✓ Verified</span>
                </div>
              </div>

              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}
            </div>

            {/* Submit Button */}
            <button 
              onClick={handleSignupComplete}
              disabled={authLoading || !authName.trim() || !authUsername.trim()}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {authLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Complete Signup'
              )}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Show guest banner if in guest mode - positioned above cards
  const GuestBanner = () => isGuest ? (
    <div className="mt-4 mb-2">
      <div className="bg-amber-500 rounded-2xl p-3 flex items-center justify-between shadow-xl">
        <div>
          <p className="text-white font-mafia text-sm">Join FIIA</p>
          <p className="text-white/70 text-xs">Sign up to create & interact</p>
        </div>
        <button 
          onClick={() => { setIsGuest(false); setAuthScreen('welcome'); }}
          className="px-4 py-2 bg-white text-amber-600 rounded-xl font-mafia text-xs hover:bg-stone-100 transition-colors"
        >
          Sign Up
        </button>
      </div>
    </div>
  ) : null;

  return (
    <div className="min-h-screen bg-white text-stone-800 overflow-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');
        
        * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
        .font-mafia { font-family: 'Cinzel', serif; }
        .font-elegant { font-family: 'Cormorant Garamond', serif; }
        
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-100%); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.7; } }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        
        .animate-fade-up { animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
        .animate-slide-down { animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-pulse-slow { animation: pulse 3s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        .btn-hover { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .btn-hover:hover { transform: scale(1.08); }
        .btn-hover:active { transform: scale(0.95); }
        
        .card-shadow { box-shadow: 0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05); }
        .card-shadow-lg { box-shadow: 0 35px 60px -15px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05); }
        
        .glass { background: rgba(255,255,255,0.8); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
        .glass-dark { background: rgba(0,0,0,0.6); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50 via-white to-stone-100" />
        <div className="absolute bg-stone-950 rounded-full" style={{ width: '150vw', height: '150vw', top: '-75vw', left: '-100vw' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col px-4 py-8" style={{ paddingTop: 'max(2rem, env(safe-area-inset-top))' }}>
        
        {/* Top Row */}
        <div className={`flex justify-between items-start ${loaded ? 'animate-fade-up' : 'opacity-0'}`}>
          {/* Left side - Arrow and Survey */}
          <div className="flex flex-col gap-2">
            {/* Hitlist Arrow */}
            <button onClick={() => setShowHitlist(!showHitlist)} className="btn-hover p-2">
              <svg width="40" height="40" viewBox="0 0 48 48" fill="none" className={`${showHitlist ? 'text-amber-400' : 'text-white'} transition-colors duration-300`}>
                <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M32 16L40 24L32 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="8" y1="18" x2="14" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="30" x2="14" y2="24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            
            {/* Survey Button */}
            <button 
              onClick={() => isGuest ? null : setShowSurvey(true)} 
              className={`btn-hover px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg flex items-center gap-2 transition-colors ${isGuest ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={isGuest ? 'Sign up to create surveys' : 'Create Survey'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M9 11l3 3L22 4"/>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
              </svg>
              <span className="text-white text-[10px] font-mafia tracking-wider">Survey</span>
            </button>
          </div>
          
          {/* Send Button */}
          <button 
            onClick={() => isGuest ? null : setShowFriends(!showFriends)} 
            className={`btn-hover w-12 h-12 rounded-full ${showFriends ? 'bg-amber-500' : 'bg-stone-950'} ${isGuest ? 'opacity-50 cursor-not-allowed' : ''} flex items-center justify-center shadow-lg transition-colors duration-300`}
            title={isGuest ? 'Sign up to connect with friends' : 'Friends & Games'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Guest Banner - Above Cards */}
        <GuestBanner />

        {/* Hitlist Panel */}
        {showHitlist && (
          <div className="absolute left-4 right-4 top-24 z-30 animate-slide-down">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                <div>
                  <h3 className="font-mafia text-stone-800 text-sm">The Hitlist</h3>
                  <p className="text-xs text-stone-400">Active missions</p>
                </div>
                <button onClick={() => setShowHitlist(false)} className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-3 space-y-2">
                {[{ title: 'Weekly Discussion', votes: 156 }, { title: 'Youth Mentorship', votes: 234 }].map((m, i) => (
                  <div key={i} className="p-3 bg-stone-50 rounded-xl flex items-center justify-between animate-slide-in" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div>
                      <p className="font-medium text-stone-800 text-sm">{m.title}</p>
                      <p className="text-xs text-stone-400">{m.votes} votes</p>
                    </div>
                    <button className="w-9 h-9 rounded-lg bg-amber-500 text-white flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Friends Panel */}
        {showFriends && (
          <div className="absolute right-4 top-24 z-30 animate-slide-in">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200 overflow-hidden w-72">
              <div className="px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                <h3 className="font-mafia text-stone-800 text-sm">Play & Connect</h3>
                <button onClick={() => setShowFriends(false)} className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              
              {/* Help Button */}
              <div className="p-3 border-b border-stone-200">
                <button 
                  onClick={() => setShowHelpOptions(true)}
                  className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-mafia text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                  </svg>
                  Help
                </button>
              </div>
              
              {/* Games Section */}
              <div className="p-3">
                <p className="text-[10px] text-stone-400 uppercase tracking-wider px-1 mb-2">Choose a Game</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { name: 'Truth or Dare', icon: '🎯', color: 'bg-red-500' },
                    { name: 'Would You Rather', icon: '🤔', color: 'bg-purple-500' },
                    { name: 'Friend Quiz', icon: '📝', color: 'bg-blue-500' },
                    { name: 'Never Have I', icon: '🙅', color: 'bg-green-500' },
                    { name: '20 Questions', icon: '❓', color: 'bg-orange-500' },
                    { name: 'This or That', icon: '⚖️', color: 'bg-pink-500' },
                  ].map((game, i) => (
                    <button 
                      key={game.name}
                      onClick={() => { setSelectedGame(game); setShowGameInvite(true); }}
                      className="p-3 bg-stone-50 rounded-xl flex flex-col items-center gap-2 hover:bg-stone-100 transition-colors group"
                    >
                      <div className={`w-10 h-10 ${game.color} rounded-xl flex items-center justify-center text-lg group-hover:scale-110 transition-transform`}>
                        {game.icon}
                      </div>
                      <span className="text-[10px] text-stone-600 font-medium text-center leading-tight">{game.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Options Modal */}
        {showHelpOptions && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowHelpOptions(false)} />
            <div className="relative w-full max-w-xs bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-mafia text-stone-800">Help</h3>
                <button onClick={() => setShowHelpOptions(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-4 space-y-3">
                <button 
                  onClick={() => { setShowHelpOptions(false); setShowNeedHelp(true); }}
                  className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-xl font-mafia text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  🆘 I Need Help
                </button>
                <button 
                  onClick={() => { setShowHelpOptions(false); setShowHelpOthers(true); }}
                  className="w-full py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-mafia text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  🤝 Help Someone
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Need Help Modal */}
        {showNeedHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowNeedHelp(false)} />
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-mafia text-stone-800">🆘 Request Help</h3>
                <button onClick={() => setShowNeedHelp(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-stone-500 mb-2">Describe what you need help with:</p>
                <textarea
                  value={helpRequest}
                  onChange={(e) => setHelpRequest(e.target.value)}
                  placeholder="I need help with..."
                  rows={4}
                  className="w-full px-3 py-2 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-red-500 resize-none"
                />
                <div className="flex gap-2 mt-4">
                  <button 
                    onClick={() => { setShowNeedHelp(false); setHelpRequest(''); }}
                    className="flex-1 py-2.5 bg-stone-100 text-stone-600 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => { setShowNeedHelp(false); setHelpRequest(''); }}
                    disabled={!helpRequest.trim()}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${helpRequest.trim() ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                  >
                    Send Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Others Modal */}
        {showHelpOthers && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowHelpOthers(false)} />
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <h3 className="font-mafia text-stone-800">🤝 Help Requests</h3>
                <button onClick={() => setShowHelpOthers(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-2 max-h-80 overflow-y-auto">
                {helpRequests.map((req) => (
                  <div key={req.id} className="p-3 hover:bg-stone-50 rounded-xl transition-colors">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500 font-mafia text-sm flex-shrink-0">
                        {req.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-stone-800 text-sm">{req.user}</p>
                          <span className="text-[10px] text-stone-400">{req.time}</span>
                        </div>
                        <p className="text-xs text-stone-600 leading-relaxed">{req.request}</p>
                        <button className="mt-2 px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors">
                          Offer Help
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Game Invite Modal */}
        {showGameInvite && selectedGame && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/70" onClick={() => setShowGameInvite(false)} />
            <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
              <div className="p-4 border-b border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${selectedGame.color} rounded-xl flex items-center justify-center text-xl`}>
                    {selectedGame.icon}
                  </div>
                  <h3 className="font-mafia text-stone-800">{selectedGame.name}</h3>
                </div>
                <button onClick={() => setShowGameInvite(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-3">Invite Friends</p>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {['Michael C.', 'Sonny F.', 'Tom H.', 'Fredo C.', 'Kay A.'].map((name, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 rounded border-stone-300 text-amber-500 focus:ring-amber-500"
                        checked={gameInvites.includes(name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setGameInvites([...gameInvites, name]);
                          } else {
                            setGameInvites(gameInvites.filter(n => n !== name));
                          }
                        }}
                      />
                      <div className="w-9 h-9 rounded-full bg-stone-950 flex items-center justify-center text-white font-mafia text-xs">{name[0]}</div>
                      <span className="text-sm text-stone-700 flex-1">{name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="p-4 border-t border-stone-100">
                <button 
                  onClick={() => { setShowGameInvite(false); setShowFriends(false); setGameInvites([]); }}
                  disabled={gameInvites.length === 0}
                  className={`w-full py-3 rounded-xl font-mafia text-sm transition-colors ${gameInvites.length > 0 ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                >
                  {gameInvites.length > 0 ? `Start Game with ${gameInvites.length} friend${gameInvites.length > 1 ? 's' : ''}` : 'Select friends to invite'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Center Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          {/* Category - positioned just above the card's top-right corner */}
          <div className={`w-64 sm:w-72 flex justify-end mb-1 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <p className="font-mafia text-stone-500 text-[10px] tracking-[0.2em] uppercase">
              {isMarketplace 
                ? (marketplaceItems[marketplaceIndex]?.category || '')
                : (cards[currentCardIndex]?.category || '')
              }
            </p>
          </div>

          {/* Card Area */}
          <div className={`relative w-64 h-64 sm:w-72 sm:h-72 ${loaded ? 'animate-scale-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            {isMarketplace ? (
              <>
                {/* Marketplace Cards Stack */}
                {marketplaceItems.slice(marketplaceIndex, marketplaceIndex + 3).reverse().map((item, reversedIndex) => {
                  const stackIndex = Math.min(2, marketplaceItems.slice(marketplaceIndex, marketplaceIndex + 3).length - 1) - reversedIndex;
                  const isTop = stackIndex === 0;
                  
                  return (
                    <div
                      key={item.id}
                      className={`absolute inset-0 ${isTop ? 'cursor-pointer' : ''}`}
                      style={{
                        transform: isTop 
                          ? `translateX(${swipeX}px) rotate(${swipeX * 0.015}deg)` 
                          : `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 8}px)`,
                        zIndex: 20 - stackIndex,
                        transition: isDragging && isTop ? 'none' : 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onTouchStart={isTop ? handleMarketplaceTouchStart : undefined}
                      onTouchMove={isTop ? handleMarketplaceTouchMove : undefined}
                      onTouchEnd={isTop ? handleMarketplaceTouchEnd : undefined}
                      onMouseDown={isTop ? handleMarketplaceMouseDown : undefined}
                      onMouseMove={isTop ? handleMarketplaceMouseMove : undefined}
                      onMouseUp={isTop ? handleMarketplaceMouseUp : undefined}
                      onMouseLeave={isTop ? () => { if (isDragging) handleMarketplaceMouseUp(); } : undefined}
                    >
                      <div className={`w-full h-full bg-white rounded-2xl border-2 ${isTop ? 'border-stone-900' : 'border-stone-300'} p-4 flex flex-col`}
                        style={{ boxShadow: isTop ? '0 25px 50px -12px rgba(0,0,0,0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                      >
                        {/* Product/Service Image */}
                        <div className="flex-1 flex items-center justify-center bg-stone-50 rounded-xl mb-3 relative">
                          <span className="text-5xl">{item.image}</span>
                          {/* Time remaining badge */}
                          <span className="absolute top-2 right-2 text-[9px] text-red-500 font-medium bg-white/90 px-2 py-1 rounded-full flex items-center gap-1">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                            </svg>
                            {getTimeRemaining(item.createdAt)}
                          </span>
                        </div>
                        
                        {/* Info */}
                        <div>
                          <span className="text-[10px] font-mafia text-amber-600 tracking-wider uppercase">{item.category}</span>
                          <h3 className="font-mafia text-stone-900 text-sm leading-tight mt-1">{item.title}</h3>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                            <span className="text-[10px] text-stone-400">by {item.author}</span>
                            <div className="flex items-center gap-1">
                              <span className="text-amber-500 text-xs">★</span>
                              <span className="text-[10px] text-stone-600 font-medium">{item.rating}</span>
                              <span className="text-[10px] text-stone-400">({item.reviews})</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Swipe Indicators */}
                      {isTop && swipeX > 60 && (
                        <div className="absolute inset-0 rounded-2xl border-4 border-green-500 flex items-center justify-center bg-green-50/70">
                          <span className="text-5xl">✓</span>
                        </div>
                      )}
                      {isTop && swipeX < -60 && (
                        <div className="absolute inset-0 rounded-2xl border-4 border-red-500 flex items-center justify-center bg-red-50/70">
                          <span className="text-5xl">✗</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Marketplace Empty State */}
                {marketplaceIndex >= marketplaceItems.length && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center bg-white/50">
                    <span className="text-4xl mb-3">🛒</span>
                    <p className="font-mafia text-stone-600 text-sm mb-1">No more listings</p>
                    <p className="text-xs text-stone-400 mb-4">Check back later for more</p>
                    <button 
                      onClick={() => setMarketplaceIndex(0)} 
                      className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-mafia hover:bg-amber-500 transition-colors flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M1 4v6h6M23 20v-6h-6"/>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                      </svg>
                      Refresh
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Regular Cards Stack */}
                {cards.slice(currentCardIndex, currentCardIndex + 3).reverse().map((card, reversedIndex) => {
                  const stackIndex = Math.min(2, cards.slice(currentCardIndex, currentCardIndex + 3).length - 1) - reversedIndex;
                  const isTop = stackIndex === 0;
                  const isCardType = card.type === 'card';
                  
                  return (
                    <div
                      key={card.id}
                      className={`absolute inset-0 ${isTop ? 'cursor-pointer' : ''}`}
                      style={{
                        transform: isTop 
                          ? `translateX(${swipeX}px) rotate(${swipeX * 0.015}deg)` 
                          : `scale(${1 - stackIndex * 0.05}) translateY(${stackIndex * 8}px)`,
                        zIndex: 20 - stackIndex,
                        transition: isDragging && isTop ? 'none' : 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                      onTouchStart={isTop ? handleTouchStart : undefined}
                      onTouchMove={isTop ? handleTouchMove : undefined}
                      onTouchEnd={isTop ? handleTouchEnd : undefined}
                      onMouseDown={isTop ? handleMouseDown : undefined}
                      onMouseMove={isTop ? handleMouseMove : undefined}
                      onMouseUp={isTop ? handleMouseUp : undefined}
                      onMouseLeave={isTop ? () => { if (isDragging) handleMouseUp(); } : undefined}
                    >
                      {/* Card Type (with colored frame) */}
                      {isCardType ? (
                        <div 
                          className="w-full h-full rounded-2xl flex flex-col items-center justify-center"
                          style={{ 
                            background: card.bg || '#1C1917',
                            border: `3px solid ${card.frameColor || '#F59E0B'}`,
                            boxShadow: isTop ? '0 25px 50px -12px rgba(0,0,0,0.3)' : '0 10px 30px -10px rgba(0,0,0,0.1)'
                          }}
                        >
                          <span className="text-[10px] text-red-400 font-medium absolute top-3 right-3 flex items-center gap-1">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                            </svg>
                            {getTimeRemaining(card.createdAt)}
                          </span>
                          <span className="text-4xl mb-2">🎴</span>
                          <h3 className="font-mafia text-white text-lg text-center px-4">{card.title}</h3>
                          <span className="text-xs text-white/50 mt-2">from {card.author}</span>
                        </div>
                      ) : (
                        /* Article/Presentation Type */
                        <div className={`w-full h-full bg-white rounded-2xl border-2 ${isTop ? 'border-stone-900' : 'border-stone-300'} p-5 flex flex-col`}
                          style={{ boxShadow: isTop ? '0 25px 50px -12px rgba(0,0,0,0.2)' : '0 10px 30px -10px rgba(0,0,0,0.1)' }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mafia text-amber-600 tracking-wider">{card.category}</span>
                            <span className="text-[10px] text-red-500 font-medium flex items-center gap-1">
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                              </svg>
                              {getTimeRemaining(card.createdAt)}
                            </span>
                          </div>
                          <h3 className="font-mafia text-stone-900 text-lg mt-2 leading-tight flex-1">{card.title}</h3>
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                            <span className="text-xs text-stone-400">by {card.author}</span>
                            <span className="text-xs">{card.type === 'article' ? '📝' : '🎴'}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Swipe Indicators */}
                      {isTop && swipeX > 60 && (
                        <div className="absolute inset-0 rounded-2xl border-4 border-green-500 flex items-center justify-center bg-green-50/70">
                          <span className="text-5xl">✓</span>
                        </div>
                      )}
                      {isTop && swipeX < -60 && (
                        <div className="absolute inset-0 rounded-2xl border-4 border-red-500 flex items-center justify-center bg-red-50/70">
                          <span className="text-5xl">✗</span>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Empty State */}
                {currentCardIndex >= cards.length && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center bg-white/50">
                    <span className="text-4xl mb-3">📭</span>
                    <p className="font-mafia text-stone-600 text-sm mb-1">You're all caught up!</p>
                    <p className="text-xs text-stone-400 mb-4">No more cards to show</p>
                    <button 
                      onClick={() => setCurrentCardIndex(0)} 
                      className="px-6 py-2.5 bg-stone-900 text-white rounded-xl text-sm font-mafia hover:bg-amber-500 transition-colors flex items-center gap-2"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M1 4v6h6M23 20v-6h-6"/>
                        <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/>
                      </svg>
                      Refresh
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Bottom Row */}
        <div className={`flex justify-center items-center gap-4 mt-8 ${loaded ? 'animate-fade-up' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
          {/* Marketplace/Library Toggle */}
          <button 
            onClick={() => { setIsMarketplace(!isMarketplace); setMarketplaceIndex(0); setCurrentCardIndex(0); setShowCardsSection(false); }}
            className={`btn-hover w-11 h-11 rounded-xl ${isMarketplace ? 'bg-amber-500' : 'bg-stone-950'} flex items-center justify-center shadow-lg transition-colors`}
            title={isMarketplace ? 'Library' : 'Marketplace'}
          >
            {isMarketplace ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7h8M8 11h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="3" y="9" width="18" height="12" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M3 9l3-5h12l3 5" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 9v12" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            )}
          </button>
          
          {/* Cards Button */}
          <button 
            onClick={() => { setShowCardsSection(!showCardsSection); setIsMarketplace(false); }}
            className={`btn-hover w-11 h-11 rounded-xl ${showCardsSection ? 'bg-blue-500' : 'bg-stone-950'} flex items-center justify-center shadow-lg transition-colors`}
            title="My Cards"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
              <rect x="3" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="7" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
              <path d="M7 7h6M7 11h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* Create Button */}
          <button 
            onClick={() => isGuest ? null : openCreate()} 
            className={`btn-hover w-14 h-14 rounded-xl border-2 border-stone-950 bg-white flex items-center justify-center shadow-md ${showCreate ? 'bg-amber-500 border-amber-500' : ''} ${isGuest ? 'opacity-50 cursor-not-allowed' : ''} transition-colors duration-300`}
            title={isGuest ? 'Sign up to create content' : 'Create'}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={`${showCreate ? 'text-white rotate-45' : 'text-stone-950'} transition-all duration-300`}>
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          {/* Profile Button */}
          <button onClick={() => isGuest ? setShowGuestProfileMessage(true) : setShowProfile(true)} className="btn-hover w-11 h-11 rounded-xl bg-stone-950 flex items-center justify-center shadow-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* My Cards Section */}
      {showCardsSection && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/90" onClick={() => setShowCardsSection(false)} />
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between bg-black/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                    <rect x="3" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="7" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </div>
                <div>
                  <h2 className="font-mafia text-white text-xl">My Cards</h2>
                  <p className="text-white/40 text-xs">{myCards.length} cards created</p>
                </div>
              </div>
              <button onClick={() => setShowCardsSection(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50 hover:bg-white/20 transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Cards Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {myCards.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="text-4xl opacity-50">🎴</span>
                  </div>
                  <p className="text-white/50 font-mafia text-lg mb-2">No Cards Yet</p>
                  <p className="text-white/30 text-sm mb-6">Create your first card to see it here</p>
                  <button onClick={() => { setShowCardsSection(false); openCreate(); }} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-mafia text-sm transition-colors">
                    Create Card
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {myCards.map(card => (
                    <div 
                      key={card.id}
                      onClick={() => {
                        if (card.type === 'article') {
                          setEditingCardType('article');
                          setShowCardTypeEditor(true);
                        } else if (card.type === 'presentation' || card.type === 'slideshow') {
                          setEditingCardType('presentation');
                          setShowCardTypeEditor(true);
                        } else if (card.type === 'interactive') {
                          setEditingCardType('interactive');
                          setShowCardTypeEditor(true);
                        }
                      }}
                      className="bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all cursor-pointer group"
                    >
                      {/* Card Preview */}
                      <div className="aspect-[4/3] relative" style={{ background: card.preview, border: `3px solid ${card.frame}` }}>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
                          <span className="opacity-0 group-hover:opacity-100 text-white font-mafia text-sm transition-opacity">Edit</span>
                        </div>
                        {/* Type Badge */}
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-black/50 rounded-full text-white text-[10px] capitalize">
                          {card.type}
                        </div>
                      </div>
                      {/* Card Info */}
                      <div className="p-3">
                        <p className="font-mafia text-white text-sm truncate">{card.title || 'Untitled Card'}</p>
                        <p className="text-white/40 text-xs mt-1">{new Date(card.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Card Type Editor - Article, Presentation, Interactive */}
      {showCardTypeEditor && (
        <div className="fixed inset-0 z-[60] animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 flex flex-col">
            {/* Header */}
            <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <button onClick={() => setShowCardTypeEditor(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div>
                  <h2 className="font-mafia text-white text-xl">
                    {editingCardType === 'article' && '📝 Article Card'}
                    {editingCardType === 'presentation' && '📊 Presentation'}
                    {editingCardType === 'interactive' && '👆 Interactive Card'}
                  </h2>
                  <p className="text-white/40 text-xs">
                    {editingCardType === 'article' && 'Write content with references'}
                    {editingCardType === 'presentation' && `${presentationSlides.length}/10 slides`}
                    {editingCardType === 'interactive' && (isDesigningBack ? 'Designing back side' : 'Designing front side')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => { setShowCardTypeEditor(false); }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-xl font-mafia text-sm transition-colors"
              >
                Publish
              </button>
            </div>
            
            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
              
              {/* ARTICLE EDITOR */}
              {editingCardType === 'article' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  {/* Card Preview */}
                  <div className="w-full max-w-sm mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', background: patternBgColor, border: `3px solid ${cardFrameColor}` }}>
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-4xl">📝</span>
                    </div>
                  </div>
                  
                  {/* Article Content */}
                  <div className="space-y-4">
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Article Content</label>
                      <textarea
                        value={articleContent}
                        onChange={(e) => setArticleContent(e.target.value)}
                        placeholder="Write your article here... Share your thoughts, ideas, stories..."
                        rows={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-blue-500 resize-none"
                      />
                      <p className="text-white/30 text-xs mt-1 text-right">{articleContent.length} characters</p>
                    </div>
                    
                    {/* References */}
                    <div>
                      <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">References & Sources</label>
                      <div className="space-y-2">
                        {articleReferences.map((ref, idx) => (
                          <div key={idx} className="flex gap-2">
                            <input
                              type="text"
                              value={ref.title}
                              onChange={(e) => {
                                const updated = [...articleReferences];
                                updated[idx].title = e.target.value;
                                setArticleReferences(updated);
                              }}
                              placeholder="Title"
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 text-sm"
                            />
                            <input
                              type="url"
                              value={ref.url}
                              onChange={(e) => {
                                const updated = [...articleReferences];
                                updated[idx].url = e.target.value;
                                setArticleReferences(updated);
                              }}
                              placeholder="URL"
                              className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 text-sm"
                            />
                            {articleReferences.length > 1 && (
                              <button onClick={() => setArticleReferences(articleReferences.filter((_, i) => i !== idx))} className="w-10 h-10 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 flex items-center justify-center">✕</button>
                            )}
                          </div>
                        ))}
                        <button 
                          onClick={() => setArticleReferences([...articleReferences, { title: '', url: '' }])}
                          className="w-full py-2 border border-dashed border-white/20 rounded-lg text-white/50 text-sm hover:border-white/40 hover:text-white/70 transition-colors"
                        >
                          + Add Reference
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* PRESENTATION EDITOR */}
              {editingCardType === 'presentation' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Slides Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {presentationSlides.map((slide, idx) => (
                      <div 
                        key={slide.id}
                        className="bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-blue-500 transition-all cursor-pointer group relative"
                      >
                        <div className="aspect-[4/3] bg-white/10 flex items-center justify-center">
                          {slide.content ? (
                            <span className="text-white/50 text-xs">Slide {idx + 1}</span>
                          ) : (
                            <span className="text-white/30 text-2xl">+</span>
                          )}
                        </div>
                        <div className="p-2 flex items-center justify-between">
                          <span className="text-white/50 text-xs">Slide {idx + 1}</span>
                          {presentationSlides.length > 1 && (
                            <button 
                              onClick={(e) => { e.stopPropagation(); setPresentationSlides(presentationSlides.filter((_, i) => i !== idx)); }}
                              className="w-5 h-5 rounded bg-red-500/20 text-red-400 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >✕</button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Slide Button */}
                    {presentationSlides.length < 10 && (
                      <button 
                        onClick={() => setPresentationSlides([...presentationSlides, { id: Date.now(), content: null }])}
                        className="aspect-[4/3] bg-white/5 rounded-xl border-2 border-dashed border-white/20 hover:border-blue-500 flex flex-col items-center justify-center text-white/50 hover:text-blue-400 transition-all"
                      >
                        <span className="text-2xl mb-1">+</span>
                        <span className="text-xs">Add Slide</span>
                      </button>
                    )}
                  </div>
                  
                  <p className="text-center text-white/30 text-sm">Click a slide to edit • Maximum 10 slides</p>
                </div>
              )}
              
              {/* INTERACTIVE CARD EDITOR */}
              {editingCardType === 'interactive' && (
                <div className="max-w-lg mx-auto space-y-6">
                  {/* Front/Back Toggle */}
                  <div className="flex justify-center gap-2">
                    <button 
                      onClick={() => setIsDesigningBack(false)}
                      className={`px-6 py-3 rounded-xl font-mafia text-sm transition-all ${!isDesigningBack ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                    >
                      Front Side
                    </button>
                    <button 
                      onClick={() => setIsDesigningBack(true)}
                      className={`px-6 py-3 rounded-xl font-mafia text-sm transition-all ${isDesigningBack ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/50'}`}
                    >
                      Back Side
                    </button>
                  </div>
                  
                  {/* Card Preview */}
                  <div className="relative perspective-1000">
                    <div 
                      className="w-full max-w-md mx-auto rounded-2xl overflow-hidden transition-transform duration-500"
                      style={{ 
                        aspectRatio: '4/3', 
                        background: isDesigningBack ? '#1C1917' : patternBgColor, 
                        border: `3px solid ${cardFrameColor}`,
                        transform: isDesigningBack ? 'rotateY(180deg)' : 'rotateY(0deg)'
                      }}
                    >
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white/30 text-sm">{isDesigningBack ? 'Design the back' : 'Design the front'}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-center text-white/40 text-sm">Users will tap to flip between front and back</p>
                  
                  {/* Quick Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-center transition-colors">
                      <span className="text-2xl block mb-1">🖼️</span>
                      <span className="text-white/70 text-xs">Add Image</span>
                    </button>
                    <button className="p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-center transition-colors">
                      <span className="text-2xl block mb-1">✏️</span>
                      <span className="text-white/70 text-xs">Draw</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Guest Profile Message Modal */}
      {showGuestProfileMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowGuestProfileMessage(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
              <h3 className="font-mafia text-2xl text-stone-800 mb-3">Your Profile Awaits</h3>
              <p className="text-stone-500 leading-relaxed mb-6">
                Sign up to customize your own personal profile and discover the real you.
              </p>
              <div className="space-y-3">
                <button 
                  onClick={() => { setShowGuestProfileMessage(false); setIsGuest(false); setAuthScreen('welcome'); }}
                  className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl font-mafia text-sm tracking-wide hover:opacity-90 transition-opacity"
                >
                  Sign Up Now
                </button>
                <button 
                  onClick={() => setShowGuestProfileMessage(false)}
                  className="w-full py-3 text-stone-400 text-sm hover:text-stone-600 transition-colors"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Modal */}
      {showContent && cards[currentCardIndex] && (
        <div className="fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowContent(false)} />
          
          {/* Card Type Modal - No content, just buttons */}
          {cards[currentCardIndex].type === 'card' ? (
            <div className="absolute inset-4 sm:inset-8 flex items-center justify-center">
              <div 
                className="w-72 h-72 sm:w-80 sm:h-80 rounded-2xl flex flex-col items-center justify-center animate-scale-in"
                style={{ 
                  background: cards[currentCardIndex].bg || '#1C1917',
                  border: `3px solid ${cards[currentCardIndex].frameColor || '#F59E0B'}`,
                  boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
                }}
              >
                <span className="text-5xl mb-3">🎴</span>
                <h3 className="font-mafia text-white text-xl text-center px-6">{cards[currentCardIndex].title}</h3>
                <span className="text-sm text-white/50 mt-2">from {cards[currentCardIndex].author}</span>
                
                {/* Action Buttons */}
                <div className="mt-6 space-y-2 w-full px-6">
                  <button 
                    onClick={() => setShowRespondOptions(true)} 
                    className="w-full py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl font-mafia text-white text-sm transition-colors"
                  >
                    Respond
                  </button>
                  <button 
                    onClick={() => {
                      const card = cards[currentCardIndex];
                      if (!savedCards.find(c => c.id === card.id)) {
                        setSavedCards(prev => [...prev, card]);
                        setShowSaveConfirm(true);
                        setTimeout(() => setShowSaveConfirm(false), 2000);
                      }
                    }}
                    className={`w-full py-2.5 rounded-xl font-mafia text-sm flex items-center justify-center gap-2 transition-colors ${
                      savedCards.find(c => c.id === cards[currentCardIndex].id)
                        ? 'bg-green-500/30 text-green-300'
                        : 'bg-purple-500/30 text-purple-300 hover:bg-purple-500/40'
                    }`}
                  >
                    {savedCards.find(c => c.id === cards[currentCardIndex].id) ? (
                      <>✓ Saved</>
                    ) : (
                      <>Save to Collection</>
                    )}
                  </button>
                  <button 
                    onClick={() => setShowShareOptions(true)} 
                    className="w-full py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl font-mafia text-white/80 text-sm transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
              
              {/* Close button */}
              <button 
                onClick={() => setShowContent(false)} 
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ) : (
            /* Article/Presentation Type Modal - With content */
            <div className="absolute inset-4 sm:inset-8 bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
              <div className="flex-shrink-0 p-4 border-b border-stone-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mafia text-amber-600 tracking-wider">{cards[currentCardIndex].category}</span>
                  <h2 className="font-mafia text-stone-900 text-lg">{cards[currentCardIndex].title}</h2>
                </div>
                <button onClick={() => setShowContent(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">
                <p className="font-elegant text-stone-600 leading-relaxed text-lg">{cards[currentCardIndex].content || 'Content here...'}</p>
              </div>
              <div className="flex-shrink-0 p-4 border-t border-stone-100 space-y-3">
                {/* Save to Collection Button */}
                <button 
                  onClick={() => {
                    const card = cards[currentCardIndex];
                    if (!savedCards.find(c => c.id === card.id)) {
                      setSavedCards(prev => [...prev, card]);
                      setShowSaveConfirm(true);
                      setTimeout(() => setShowSaveConfirm(false), 2000);
                    }
                  }}
                  className={`w-full py-3 rounded-xl font-mafia text-sm flex items-center justify-center gap-2 transition-colors ${
                    savedCards.find(c => c.id === cards[currentCardIndex].id)
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-200'
                  }`}
                >
                  {savedCards.find(c => c.id === cards[currentCardIndex].id) ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
                      Saved to Collection
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"/></svg>
                      Save to Collection
                    </>
                  )}
                </button>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    onClick={() => setShowRespondOptions(true)} 
                    className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-mafia text-sm hover:bg-amber-600 transition-colors"
                  >
                    Respond
                  </button>
                  <button 
                    onClick={() => setShowShareOptions(true)} 
                    className="flex-1 py-3 bg-stone-900 text-white rounded-xl font-mafia text-sm hover:bg-stone-800 transition-colors"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Marketplace Content Modal */}
      {showMarketplaceContent && marketplaceItems[marketplaceIndex] && (
        <div className="fixed inset-0 z-40 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowMarketplaceContent(false)} />
          <div className="absolute inset-4 sm:inset-8 bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
            <div className="flex-shrink-0 p-4 border-b border-stone-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-mafia text-amber-600 tracking-wider">{marketplaceItems[marketplaceIndex].category}</span>
                <h2 className="font-mafia text-stone-900 text-lg">{marketplaceItems[marketplaceIndex].title}</h2>
              </div>
              <button onClick={() => setShowMarketplaceContent(false)} className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 hover:bg-stone-200 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {/* Product/Service Image */}
              <div className="w-full aspect-square max-w-xs mx-auto bg-stone-50 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-8xl">{marketplaceItems[marketplaceIndex].image}</span>
              </div>
              
              {/* Details */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-500 text-lg">★</span>
                    <span className="text-stone-800 font-medium">{marketplaceItems[marketplaceIndex].rating}</span>
                    <span className="text-stone-400 text-sm">({marketplaceItems[marketplaceIndex].reviews} reviews)</span>
                  </div>
                  <span className="text-xl font-bold text-stone-900">{marketplaceItems[marketplaceIndex].price}</span>
                </div>
                
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Description</p>
                  <p className="font-elegant text-stone-600 leading-relaxed text-lg">{marketplaceItems[marketplaceIndex].desc}</p>
                </div>
                
                <div className="pt-4 border-t border-stone-100">
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Offered by</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-950 flex items-center justify-center text-white font-mafia text-sm">
                      {marketplaceItems[marketplaceIndex].author[0]}
                    </div>
                    <span className="font-medium text-stone-800">{marketplaceItems[marketplaceIndex].author}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 p-4 border-t border-stone-100 flex gap-3">
              <button 
                onClick={() => setShowRatingModal(true)} 
                className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-mafia text-sm hover:bg-amber-600 transition-colors flex items-center justify-center gap-2"
              >
                <span>★</span> Rate
              </button>
              <button 
                onClick={() => setShowShareOptions(true)} 
                className="flex-1 py-3 bg-stone-900 text-white rounded-xl font-mafia text-sm hover:bg-stone-800 transition-colors"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Options Modal */}
      {showShareOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowShareOptions(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-mafia text-stone-800">Share</h3>
              <button onClick={() => setShowShareOptions(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-5 grid grid-cols-4 gap-4">
              {[
                { name: 'WhatsApp', icon: '💬', color: 'bg-green-500' },
                { name: 'Twitter', icon: '🐦', color: 'bg-sky-500' },
                { name: 'Instagram', icon: '📷', color: 'bg-pink-500' },
                { name: 'Facebook', icon: '👤', color: 'bg-blue-600' },
                { name: 'Telegram', icon: '✈️', color: 'bg-sky-400' },
                { name: 'Email', icon: '✉️', color: 'bg-stone-500' },
                { name: 'Copy', icon: '🔗', color: 'bg-stone-700' },
                { name: 'Save', icon: '💾', color: 'bg-amber-500' },
              ].map((platform, i) => (
                <button 
                  key={platform.name}
                  onClick={() => setShowShareOptions(false)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={`w-14 h-14 ${platform.color} rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg`}>
                    {platform.icon}
                  </div>
                  <span className="text-[10px] text-stone-600 font-medium">{platform.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Respond Options Modal */}
      {showRespondOptions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowRespondOptions(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-mafia text-stone-800">Respond with</h3>
              <button onClick={() => setShowRespondOptions(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: 'Article', icon: '📝', desc: 'Write a detailed response', type: 'article' },
                { name: 'Presentation', icon: '🎴', desc: 'Create visual slides', type: 'presentation' },
                { name: 'Quick Card', icon: '💬', desc: 'Short response card', type: 'card' },
              ].map((option, i) => (
                <button 
                  key={option.name}
                  onClick={() => { 
                    setShowRespondOptions(false); 
                    setShowContent(false);
                    setCreateType(option.type);
                    setShowCreate(true);
                    setCreateStep('category');
                  }}
                  className="w-full p-4 bg-stone-50 rounded-xl flex items-center gap-4 hover:bg-amber-50 hover:border-amber-200 border-2 border-transparent transition-all"
                >
                  <div className="w-14 h-14 bg-white rounded-xl border-2 border-stone-200 flex items-center justify-center text-2xl shadow-sm">
                    {option.icon}
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-mafia text-stone-800">{option.name}</p>
                    <p className="text-xs text-stone-400 mt-0.5">{option.desc}</p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-300"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Rating Modal */}
      {showRatingModal && marketplaceItems[marketplaceIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={() => { setShowRatingModal(false); setSelectedRating(0); setRatingComment(''); }} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-mafia text-stone-800">Rate this {marketplaceItems[marketplaceIndex].type === 'service' ? 'Service' : 'Product'}</h3>
              <button onClick={() => { setShowRatingModal(false); setSelectedRating(0); setRatingComment(''); }} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-6">
              {/* Item being rated */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-2xl">
                  {marketplaceItems[marketplaceIndex].image}
                </div>
                <div>
                  <p className="font-mafia text-stone-800 text-sm">{marketplaceItems[marketplaceIndex].title}</p>
                  <p className="text-xs text-stone-400">by {marketplaceItems[marketplaceIndex].author}</p>
                </div>
              </div>
              
              {/* Star Rating */}
              <div className="text-center mb-6">
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-3">Your Rating</p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setSelectedRating(star)}
                      className={`text-3xl transition-transform hover:scale-110 ${selectedRating >= star ? 'text-amber-500' : 'text-stone-300'}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {selectedRating > 0 && (
                  <p className="text-sm text-stone-600 mt-2">
                    {selectedRating === 1 && 'Poor'}
                    {selectedRating === 2 && 'Fair'}
                    {selectedRating === 3 && 'Good'}
                    {selectedRating === 4 && 'Very Good'}
                    {selectedRating === 5 && 'Excellent'}
                  </p>
                )}
              </div>
              
              {/* Comment */}
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-wider mb-2">Review (Optional)</p>
                <textarea
                  value={ratingComment}
                  onChange={(e) => setRatingComment(e.target.value)}
                  placeholder="Share your experience..."
                  rows={3}
                  className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>
            </div>
            <div className="p-4 border-t border-stone-100">
              <button 
                onClick={() => { setShowRatingModal(false); setShowMarketplaceContent(false); setSelectedRating(0); setRatingComment(''); }}
                disabled={selectedRating === 0}
                className={`w-full py-3 rounded-xl font-mafia text-sm transition-colors ${selectedRating > 0 ? 'bg-amber-500 text-white hover:bg-amber-600' : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Survey Creation Modal */}
      {showSurvey && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/70" onClick={() => setShowSurvey(false)} />
          <div className="absolute inset-4 sm:inset-8 bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
            <div className="flex-shrink-0 px-4 py-3 bg-stone-900 flex items-center justify-between">
              <h3 className="font-mafia text-white text-sm">Create Survey</h3>
              <button onClick={() => setShowSurvey(false)} className="w-8 h-8 rounded-lg bg-stone-800 flex items-center justify-center text-stone-400 hover:bg-red-500 hover:text-white transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {surveyQuestions.map((q, qIndex) => (
                <div key={qIndex} className="bg-stone-50 rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mafia text-stone-500">Question {qIndex + 1}</span>
                    {surveyQuestions.length > 1 && (
                      <button 
                        onClick={() => setSurveyQuestions(surveyQuestions.filter((_, i) => i !== qIndex))}
                        className="text-xs text-red-500 hover:text-red-600"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    value={q.question}
                    onChange={(e) => {
                      const updated = [...surveyQuestions];
                      updated[qIndex].question = e.target.value;
                      setSurveyQuestions(updated);
                    }}
                    placeholder="Ask a question..."
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                  />
                  <div className="space-y-2">
                    {q.options.map((opt, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full border-2 border-stone-300" />
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...surveyQuestions];
                            updated[qIndex].options[optIndex] = e.target.value;
                            setSurveyQuestions(updated);
                          }}
                          placeholder={`Option ${optIndex + 1}`}
                          className="flex-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                        />
                        {q.options.length > 2 && (
                          <button 
                            onClick={() => {
                              const updated = [...surveyQuestions];
                              updated[qIndex].options = updated[qIndex].options.filter((_, i) => i !== optIndex);
                              setSurveyQuestions(updated);
                            }}
                            className="w-6 h-6 rounded bg-stone-200 flex items-center justify-center text-stone-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                          >
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        const updated = [...surveyQuestions];
                        updated[qIndex].options.push('');
                        setSurveyQuestions(updated);
                      }}
                      className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                    >
                      + Add option
                    </button>
                  </div>
                </div>
              ))}
              
              <button
                onClick={() => setSurveyQuestions([...surveyQuestions, { question: '', options: ['', ''] }])}
                className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-500 text-sm hover:border-amber-500 hover:text-amber-600 transition-colors"
              >
                + Add Question
              </button>
            </div>
            
            <div className="flex-shrink-0 p-4 border-t border-stone-200 flex gap-3">
              <button 
                onClick={() => setShowSurvey(false)}
                className="flex-1 py-3 bg-stone-100 text-stone-600 rounded-xl font-mafia text-sm hover:bg-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  // Here you would send the survey
                  setShowSurvey(false);
                  setSurveyQuestions([{ question: '', options: ['', ''] }]);
                }}
                className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-mafia text-sm hover:bg-amber-600 transition-colors"
              >
                Send Survey
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Card Creator Modal - Premium Design */}
      {showCreate && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          {/* Premium gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255, 119, 198, 0.2) 0%, transparent 50%)' }} />
          
          <div className="absolute inset-0 flex flex-col">
            
            {/* Premium Header */}
            <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {createStep === 'settings' && (
                  <button onClick={() => setCreateStep('design')} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/70 hover:bg-white/10 hover:text-white transition-all">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
                  </button>
                )}
                <div>
                  <h2 className="font-mafia text-white text-xl tracking-wide">
                    {createStep === 'design' ? 'Create' : 'Publish'}
                  </h2>
                  <p className="text-white/40 text-xs">
                    {createStep === 'design' ? 'Design your card' : 'Choose settings'}
                  </p>
                </div>
              </div>
              <button onClick={() => { setShowCreate(false); setCreateStep('design'); }} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/50 hover:bg-red-500/20 hover:border-red-500/50 hover:text-red-400 transition-all">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto flex flex-col px-4">
              
              {/* Design Step */}
              {createStep === 'design' && (
                <div className="flex-1 flex flex-col">
                  
                  {/* CARD CANVAS - Clean White Design */}
                  <div 
                    className="w-full max-w-md mx-auto rounded-2xl relative overflow-hidden"
                    style={{ 
                      aspectRatio: '4/3',
                      border: `3px solid ${cardFrameColor}`,
                      boxShadow: `0 20px 40px -12px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.05)`
                    }}
                  >
                    <div 
                      ref={cardCanvasRef}
                      className="absolute inset-0 touch-none"
                      style={{ 
                        background: patternBgColor,
                        cursor: patternTool === 'magic' ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Ctext x=\'2\' y=\'18\' font-size=\'14\'%3E✨%3C/text%3E%3C/svg%3E") 4 4, crosshair' : 'crosshair'
                      }}
                      onMouseDown={(e) => {
                        if (!cardSelectedSticker) {
                          startPatternDraw(e);
                        }
                      }}
                      onMouseMove={(e) => { continuePatternDraw(e); handleCardCanvasMouseMove(e); }}
                      onMouseUp={() => { endPatternDraw(); handleCardCanvasMouseUp(); }}
                      onMouseLeave={() => { endPatternDraw(); handleCardCanvasMouseUp(); }}
                      onTouchStart={(e) => {
                        if (!cardSelectedSticker) {
                          startPatternDraw(e);
                        }
                      }}
                      onTouchMove={(e) => { continuePatternDraw(e); handleCardCanvasTouchMove(e); }}
                      onTouchEnd={() => { endPatternDraw(); handleCardCanvasMouseUp(); }}
                      onClick={() => setCardSelectedSticker(null)}
                    >
                      {/* Pattern Layer */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
                        <g dangerouslySetInnerHTML={{ __html: generatePatternSvg(400, 300).replace(/<svg[^>]*>|<\/svg>|<rect[^>]*\/>/g, '') }} />
                      </svg>

                      {/* ASCII Art */}
                      {cardAsciiArt && (
                        <div 
                          className={`absolute cursor-move select-none ${cardSelectedSticker === 'ascii' ? 'ring-2 ring-purple-500 rounded' : ''}`}
                          style={{ left: `${cardAsciiArt.x}%`, top: `${cardAsciiArt.y}%`, transform: 'translate(-50%, -50%)', zIndex: 20 }}
                          onMouseDown={(e) => { e.stopPropagation(); setCardSelectedSticker('ascii'); setCardIsDragging(true); }}
                          onTouchStart={(e) => { e.stopPropagation(); setCardSelectedSticker('ascii'); setCardIsDragging(true); }}
                          onClick={(e) => { e.stopPropagation(); setCardSelectedSticker('ascii'); }}
                        >
                          <pre className="font-mono leading-none whitespace-pre" style={{ color: cardAsciiArt.color, fontSize: `${cardAsciiArt.size}px` }}>
                            {cardAsciiArt.text}
                          </pre>
                          {cardSelectedSticker === 'ascii' && (
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-900 rounded-full px-2 py-1.5 shadow-xl">
                              <button onClick={(e) => { e.stopPropagation(); setCardAsciiArt(prev => ({...prev, size: Math.max(3, prev.size - 1)})); }} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center">−</button>
                              <button onClick={(e) => { e.stopPropagation(); setCardAsciiArt(prev => ({...prev, size: Math.min(16, prev.size + 1)})); }} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm flex items-center justify-center">+</button>
                              <button onClick={(e) => { e.stopPropagation(); setCardAsciiArt(null); setCardSelectedSticker(null); }} className="w-7 h-7 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm flex items-center justify-center">✕</button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Stickers & Text - Canva-style with resize handles */}
                      {cardStickers.map((sticker) => (
                        <div
                          key={sticker.id}
                          className={`absolute cursor-move select-none group ${cardSelectedSticker === sticker.id ? 'z-50' : 'z-20'}`}
                          style={{ left: `${sticker.x}%`, top: `${sticker.y}%`, transform: 'translate(-50%, -50%)' }}
                          onMouseDown={(e) => { e.stopPropagation(); handleCardStickerMouseDown(e, sticker); }}
                          onTouchStart={(e) => { e.stopPropagation(); setCardSelectedSticker(sticker.id); setCardIsDragging(true); }}
                          onClick={(e) => { e.stopPropagation(); setCardSelectedSticker(sticker.id); }}
                        >
                          {/* Selection border */}
                          {cardSelectedSticker === sticker.id && (
                            <div className="absolute -inset-2 border-2 border-blue-500 rounded pointer-events-none" />
                          )}
                          
                          {sticker.type === 'text' ? (
                            <span 
                              className={`whitespace-nowrap ${sticker.font === 'serif' ? 'font-serif' : sticker.font === 'sans' ? 'font-sans' : sticker.font === 'mono' ? 'font-mono' : sticker.font === 'script' ? 'italic' : 'font-mafia'}`}
                              style={{ 
                                fontSize: sticker.size, 
                                color: sticker.color,
                                opacity: sticker.opacity || 1
                              }}
                            >
                              {sticker.content.text}
                            </span>
                          ) : sticker.type === 'custom' ? (
                            <div style={{ width: sticker.size, height: sticker.size, opacity: sticker.opacity || 1 }} dangerouslySetInnerHTML={{ __html: sticker.content.svg }} />
                          ) : (
                            <img src={sticker.content.url} alt="" style={{ width: sticker.size, height: sticker.size, opacity: sticker.opacity || 1 }} draggable={false} />
                          )}
                          
                          {/* Resize handles - Canva style */}
                          {cardSelectedSticker === sticker.id && (
                            <>
                              {/* Control bar */}
                              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex gap-1 bg-slate-900 rounded-lg px-2 py-1.5 shadow-xl whitespace-nowrap">
                                <button onClick={(e) => { e.stopPropagation(); updateCardStickerSize(sticker.id, Math.max(12, (sticker.size || 40) - 6)); }} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center">−</button>
                                <button onClick={(e) => { e.stopPropagation(); updateCardStickerSize(sticker.id, Math.min(200, (sticker.size || 40) + 6)); }} className="w-7 h-7 rounded bg-white/10 hover:bg-white/20 text-white text-xs flex items-center justify-center">+</button>
                                <div className="w-px h-5 bg-white/20 mx-1 self-center" />
                                <button onClick={(e) => { e.stopPropagation(); deleteCardSticker(sticker.id); }} className="w-7 h-7 rounded bg-red-500/80 hover:bg-red-500 text-white text-xs flex items-center justify-center">✕</button>
                              </div>
                              
                              {/* Corner resize handles */}
                              <div className="absolute -top-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-nw-resize" />
                              <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-ne-resize" />
                              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-500 rounded-full cursor-sw-resize" />
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full cursor-se-resize" />
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PREMIUM TOOLBAR */}
                  <div className="mt-5 space-y-4 max-w-md mx-auto w-full">
                    
                    {/* TEXT INPUT with Font & Color */}
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={cardTextInput}
                          onChange={(e) => setCardTextInput(e.target.value)}
                          placeholder="Type your text..."
                          className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:border-blue-500 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && cardTextInput.trim()) {
                              setCardStickers(prev => [...prev, { 
                                id: Date.now(), 
                                type: 'text', 
                                content: { text: cardTextInput.trim() }, 
                                x: 50, y: 50, 
                                size: 28, 
                                color: cardTextColor,
                                font: cardTextFont,
                                opacity: 1
                              }]);
                              setCardTextInput('');
                            }
                          }}
                        />
                        <button 
                          onClick={() => {
                            if (cardTextInput.trim()) {
                              setCardStickers(prev => [...prev, { 
                                id: Date.now(), 
                                type: 'text', 
                                content: { text: cardTextInput.trim() }, 
                                x: 50, y: 50, 
                                size: 28, 
                                color: cardTextColor,
                                font: cardTextFont,
                                opacity: 1
                              }]);
                              setCardTextInput('');
                            }
                          }}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium text-sm transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      
                      {/* Font & Color Row */}
                      <div className="flex items-center gap-3">
                        <select 
                          value={cardTextFont} 
                          onChange={(e) => setCardTextFont(e.target.value)}
                          className="px-2 py-1.5 bg-white/10 border border-white/10 rounded-lg text-white text-xs focus:outline-none"
                        >
                          <option value="mafia">Display</option>
                          <option value="serif">Serif</option>
                          <option value="sans">Sans</option>
                          <option value="script">Script</option>
                          <option value="mono">Mono</option>
                        </select>
                        
                        <div className="flex items-center gap-1">
                          <span className="text-white/40 text-xs">Color:</span>
                          {['#1C1917', '#FFFFFF', '#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'].map(c => (
                            <button 
                              key={c} 
                              onClick={() => setCardTextColor(c)} 
                              className={`w-5 h-5 rounded-full transition-transform ${cardTextColor === c ? 'scale-125 ring-2 ring-blue-400' : 'hover:scale-110'}`}
                              style={{ background: c, border: c === '#FFFFFF' ? '1px solid rgba(0,0,0,0.2)' : 'none' }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Drawing Tools */}
                    <div className="grid grid-cols-4 gap-2">
                      <button onClick={() => setPatternTool('pen')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${patternTool === 'pen' ? 'bg-blue-500 shadow-lg shadow-blue-500/30' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                        <span className="text-xl">✏️</span>
                        <span className="text-[10px] text-white/80 font-medium">Draw</span>
                      </button>
                      <button onClick={() => setPatternTool('calligraphy')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${patternTool === 'calligraphy' ? 'bg-purple-500 shadow-lg shadow-purple-500/30' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                        <span className="text-xl">🖋️</span>
                        <span className="text-[10px] text-white/80 font-medium">Elegant</span>
                      </button>
                      <button onClick={() => setPatternTool('magic')} className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${patternTool === 'magic' ? 'bg-gradient-to-br from-amber-400 via-pink-500 to-purple-500 shadow-lg' : 'bg-gradient-to-br from-amber-400/20 via-pink-500/20 to-purple-500/20 hover:from-amber-400/30 hover:via-pink-500/30 hover:to-purple-500/30 border border-white/10'}`}>
                        <span className="text-xl">✨</span>
                        <span className="text-[10px] text-white font-medium">Magic</span>
                      </button>
                      <button onClick={() => setShowCardStickerPicker(true)} className="p-3 rounded-xl flex flex-col items-center gap-1 bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                        <span className="text-xl">😀</span>
                        <span className="text-[10px] text-white/80 font-medium">Sticker</span>
                      </button>
                    </div>

                    {/* Symmetry - Only for Draw tool */}
                    {patternTool === 'pen' && (
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/40 text-xs mb-2 font-medium">Symmetry</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {symmetryModes.map(mode => (
                            <button key={mode.id} onClick={() => setPatternSymmetry(mode.id)} className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all ${patternSymmetry === mode.id ? 'bg-blue-500 text-white shadow-md' : 'bg-white/5 text-white/50 hover:bg-white/10'}`} title={mode.name}>
                              {mode.icon}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Magic Tool Info */}
                    {patternTool === 'magic' && (
                      <div className="p-3 bg-gradient-to-r from-amber-500/10 via-pink-500/10 to-purple-500/10 rounded-xl border border-amber-500/20">
                        <p className="text-white/80 text-xs text-center">✨ Creates beautiful gradients with gold, silver & rainbow colors!</p>
                      </div>
                    )}

                    {/* Size, Opacity & Colors */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Stroke Size */}
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/40 text-xs font-medium">Size</span>
                          <span className="text-white/60 text-xs">{patternLineWidth}px</span>
                        </div>
                        <input 
                          type="range" min="2" max="24" value={patternLineWidth} 
                          onChange={(e) => setPatternLineWidth(parseInt(e.target.value))} 
                          className="w-full accent-blue-500 h-1"
                        />
                      </div>
                      
                      {/* Opacity */}
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white/40 text-xs font-medium">Opacity</span>
                          <span className="text-white/60 text-xs">{strokeOpacity}%</span>
                        </div>
                        <input 
                          type="range" min="10" max="100" value={strokeOpacity} 
                          onChange={(e) => setStrokeOpacity(parseInt(e.target.value))} 
                          className="w-full accent-blue-500 h-1"
                        />
                      </div>
                    </div>

                    {/* Stroke Color */}
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-white/40 text-xs font-medium mb-2">Stroke Color</p>
                      <div className="flex gap-1.5 flex-wrap">
                        {['#1C1917', '#6B7280', '#EF4444', '#F59E0B', '#FFD700', '#C0C0C0', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899', '#FFFFFF'].map(c => (
                          <button 
                            key={c} 
                            onClick={() => setPatternColor(c)} 
                            className={`w-7 h-7 rounded-full transition-transform ${patternColor === c ? 'scale-125 ring-2 ring-blue-400' : 'hover:scale-110'}`} 
                            style={{ background: c, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.3)', border: c === '#FFFFFF' ? '1px solid rgba(0,0,0,0.2)' : 'none' }} 
                          />
                        ))}
                      </div>
                    </div>

                    {/* Background & Frame */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/40 text-xs font-medium mb-2">Background</p>
                        <div className="flex gap-1.5 flex-wrap">
                          {['#FFFFFF', '#F5F5F4', '#FEF3C7', '#DBEAFE', '#FCE7F3', '#1C1917', '#0F172A'].map(c => (
                            <button key={c} onClick={() => setPatternBgColor(c)} className={`w-6 h-6 rounded-full transition-transform ${patternBgColor === c ? 'scale-125 ring-2 ring-blue-400' : 'hover:scale-110'}`} style={{ background: c, border: '1px solid rgba(0,0,0,0.1)' }} />
                          ))}
                        </div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        <p className="text-white/40 text-xs font-medium mb-2">Frame</p>
                        <div className="flex gap-1.5">
                          {['#FFD700', '#C0C0C0', '#FFFFFF', '#1C1917', '#E11D48'].map(c => (
                            <button key={c} onClick={() => setCardFrameColor(c)} className={`w-6 h-6 rounded-full transition-transform ${cardFrameColor === c ? 'scale-125 ring-2 ring-blue-400' : 'hover:scale-110'}`} style={{ background: c }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2">
                      <button onClick={() => setShowAsciiModal(true)} className="flex-1 p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all">
                        <span className="text-purple-400 font-bold text-sm">Aa</span>
                        <span className="text-white/60 text-xs">ASCII Art</span>
                      </button>
                      <button onClick={undoPattern} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 flex items-center justify-center transition-all" title="Undo">
                        <span className="text-white/60">↩</span>
                      </button>
                      <button onClick={clearPattern} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl border border-red-500/20 flex items-center justify-center transition-all" title="Clear">
                        <span className="text-red-400">🗑</span>
                      </button>
                    </div>
                  </div>

                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              )}
              
              {/* Settings Step */}
              {createStep === 'settings' && (
                <div className="flex-1 p-4 space-y-5 overflow-y-auto">
                  {/* Preview */}
                  <div className="w-40 mx-auto rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '4/3', border: `3px solid ${cardFrameColor}`, background: patternBgColor }}>
                    <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">Your Card</div>
                  </div>

                  {/* Visibility */}
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Visibility</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ id: 'public', icon: '🌍', label: 'Public' }, { id: 'private', icon: '🔒', label: 'Private' }].map(opt => (
                        <button key={opt.id} onClick={() => setCardVisibility(opt.id)} className={`p-3 rounded-xl border flex items-center gap-3 ${cardVisibility === opt.id ? 'border-amber-500 bg-amber-500/20' : 'border-white/20'}`}>
                          <span className="text-2xl">{opt.icon}</span>
                          <span className="font-mafia text-white">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lifespan */}
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Lifespan</p>
                    <div className="grid grid-cols-4 gap-2">
                      {[{ id: '24h', label: '24h', icon: '⏰' }, { id: '7d', label: '7 Days', icon: '📅' }, { id: '30d', label: '30 Days', icon: '🗓️' }, { id: 'forever', label: 'Forever', icon: '♾️' }].map(opt => (
                        <button key={opt.id} onClick={() => setCardLifespan(opt.id)} className={`p-2 rounded-xl border text-center ${cardLifespan === opt.id ? 'border-amber-500 bg-amber-500/20' : 'border-white/20'}`}>
                          <span className="text-xl block">{opt.icon}</span>
                          <span className="text-white text-xs">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Card Type */}
                  <div>
                    <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Card Type</p>
                    <div className="grid grid-cols-2 gap-2">
                      {[{ id: 'normal', icon: '🎴', label: 'Normal' }, { id: 'interactive', icon: '👆', label: 'Interactive' }, { id: 'animated', icon: '✨', label: 'Animated' }, { id: 'article', icon: '📝', label: 'Article' }, { id: 'slideshow', icon: '📊', label: 'Slideshow' }, { id: 'product', icon: '📦', label: 'Product' }, { id: 'service', icon: '🛠️', label: 'Service' }].map(opt => (
                        <button key={opt.id} onClick={() => setCardType(opt.id)} className={`p-3 rounded-xl border flex items-center gap-2 ${cardType === opt.id ? 'border-amber-500 bg-amber-500/20' : 'border-white/20'}`}>
                          <span className="text-xl">{opt.icon}</span>
                          <span className="font-mafia text-white text-sm">{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category */}
                  {cardVisibility === 'public' && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Category</p>
                      <div className="flex gap-2 flex-wrap">
                        {categories.map(cat => (
                          <button key={cat} onClick={() => setCardCategory(cat)} className={`px-4 py-2 rounded-xl border ${cardCategory === cat ? 'border-amber-500 bg-amber-500/20 text-white' : 'border-white/20 text-white/60'}`}>
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price for product/service */}
                  {(cardType === 'product' || cardType === 'service') && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Price</p>
                      <input type="text" value={marketplacePrice} onChange={(e) => setMarketplacePrice(e.target.value)} placeholder="$0.00" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500" />
                    </div>
                  )}

                  {/* Article content */}
                  {cardType === 'article' && (
                    <div>
                      <p className="text-white/50 text-xs uppercase tracking-wider mb-2">Article Text</p>
                      <textarea value={createContent} onChange={(e) => setCreateContent(e.target.value)} placeholder="Write your article..." rows={4} className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-amber-500 resize-none" />
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Footer */}
            <div className="flex-shrink-0 px-4 py-4 bg-black/50 flex items-center justify-between">
              {createStep === 'design' && (
                <>
                  <span className="text-white/40 text-sm">{patternPaths.length} strokes • {cardStickers.length} items{cardAsciiArt && ' • ASCII'}</span>
                  <button onClick={() => setCreateStep('settings')} className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-mafia">Next →</button>
                </>
              )}
              {createStep === 'settings' && (
                <>
                  <div className="flex items-center gap-2 text-white/50 text-sm">
                    <span>{cardVisibility === 'public' ? '🌍' : '🔒'}</span>
                    <span>{cardLifespan}</span>
                    <span>•</span>
                    <span>{cardType}</span>
                  </div>
                  <button 
                    onClick={() => { 
                      // Check if card type needs special editor
                      if (cardType === 'article') {
                        setShowCreate(false);
                        setCreateStep('design');
                        setEditingCardType('article');
                        setShowCardTypeEditor(true);
                      } else if (cardType === 'slideshow') {
                        setShowCreate(false);
                        setCreateStep('design');
                        setEditingCardType('presentation');
                        setShowCardTypeEditor(true);
                      } else if (cardType === 'interactive') {
                        setShowCreate(false);
                        setCreateStep('design');
                        setEditingCardType('interactive');
                        setShowCardTypeEditor(true);
                      } else {
                        // Normal publish
                        setMyCards(prev => [...prev, { 
                          id: Date.now(), 
                          type: cardType, 
                          title: 'New Card', 
                          preview: patternBgColor, 
                          frame: cardFrameColor, 
                          createdAt: Date.now() 
                        }]);
                        setShowCreate(false);
                        setCreateStep('design');
                      }
                    }} 
                    className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-mafia text-sm"
                  >
                    {['article', 'slideshow', 'interactive'].includes(cardType) ? 'Continue →' : 'Publish 🎴'}
                  </button>
                </>
              )}
            </div>

            {/* ASCII Art Modal */}
            {showAsciiModal && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
                <div className="bg-stone-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
                  <div className="p-4 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-mafia text-white text-lg">ASCII Art Generator</h3>
                    <button onClick={() => setShowAsciiModal(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
                  </div>
                  
                  <div className="p-4 space-y-4 overflow-y-auto flex-1">
                    {/* Upload Button */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-white/30 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-500 hover:bg-white/5 transition-all"
                    >
                      <span className="text-3xl mb-2">📷</span>
                      <span className="text-white/50 text-sm">Upload Image</span>
                    </div>

                    {/* Processing indicator */}
                    {isProcessingImage && (
                      <div className="text-center py-4">
                        <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                        <p className="text-white/50 text-sm">Converting to ASCII...</p>
                      </div>
                    )}

                    {/* ASCII Preview */}
                    {asciiArt && !isProcessingImage && (
                      <div className="space-y-3">
                        <div className="bg-black rounded-xl p-3 overflow-auto max-h-48">
                          <pre 
                            className="font-mono text-center whitespace-pre leading-none"
                            style={{ fontSize: `${asciiSize}px`, color: asciiColor }}
                          >
                            {asciiArt.text}
                          </pre>
                        </div>
                        
                        {/* Size Control */}
                        <div className="flex items-center gap-3">
                          <span className="text-white/50 text-sm">Size:</span>
                          <input 
                            type="range" 
                            min="3" 
                            max="12" 
                            value={asciiSize} 
                            onChange={(e) => setAsciiSize(parseInt(e.target.value))} 
                            className="flex-1 accent-amber-500"
                          />
                          <span className="text-white/50 text-sm w-8">{asciiSize}px</span>
                        </div>
                        
                        {/* Color Control */}
                        <div className="flex items-center gap-2">
                          <span className="text-white/50 text-sm">Color:</span>
                          {['#FFFFFF', '#F59E0B', '#EF4444', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'].map(c => (
                            <button 
                              key={c} 
                              onClick={() => setAsciiColor(c)} 
                              className={`w-7 h-7 rounded-full border-2 ${asciiColor === c ? 'border-white scale-110' : 'border-white/20'}`}
                              style={{ background: c }}
                            />
                          ))}
                        </div>

                        {/* Character Set */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-white/50 text-sm">Style:</span>
                          {[
                            { id: 'standard', chars: '@%#*+=-:. ' },
                            { id: 'blocks', chars: '█▓▒░ ' },
                            { id: 'simple', chars: '#. ' },
                            { id: 'dots', chars: '●○◐◑ ' },
                          ].map(set => (
                            <button 
                              key={set.id}
                              onClick={() => { setAsciiChars(set.chars); regenerateAscii(); }}
                              className={`px-3 py-1 rounded-lg text-xs ${asciiChars === set.chars ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/50'}`}
                            >
                              {set.id}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 border-t border-white/10 flex gap-2">
                    <button onClick={() => setShowAsciiModal(false)} className="flex-1 py-3 bg-white/10 text-white rounded-xl font-mafia">Cancel</button>
                    <button 
                      onClick={() => { addAsciiToCard(); setShowAsciiModal(false); }}
                      disabled={!asciiArt}
                      className={`flex-1 py-3 rounded-xl font-mafia ${asciiArt ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-white/10 text-white/30'}`}
                    >
                      Add to Card
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Emoji/Sticker Picker Modal */}
            {showCardStickerPicker && (
              <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/50">
                <div className="bg-stone-900 rounded-t-3xl w-full max-w-lg max-h-[60vh] overflow-hidden flex flex-col animate-slide-up">
                  <div className="p-3 border-b border-white/10 flex items-center justify-between">
                    <h3 className="font-mafia text-white">Add Emoji</h3>
                    <button onClick={() => setShowCardStickerPicker(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">✕</button>
                  </div>
                  
                  {/* Category Tabs */}
                  <div className="flex gap-1 p-2 overflow-x-auto border-b border-white/10">
                    {emojiCategories.map((cat, idx) => (
                      <button
                        key={cat.name}
                        onClick={() => setEmojiCategory(idx)}
                        className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap ${emojiCategory === idx ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/50'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                  
                  {/* Emoji Grid */}
                  <div className="p-3 overflow-y-auto flex-1">
                    <div className="grid grid-cols-6 gap-2">
                      {emojiCategories[emojiCategory].name === 'FIIA' ? (
                        emojiCategories[emojiCategory].emojis.map((emoji) => (
                          <button
                            key={emoji.id}
                            onClick={() => {
                              setCardStickers(prev => [...prev, {
                                id: Date.now(),
                                type: 'custom',
                                content: { svg: emoji.svg },
                                x: 50, y: 50,
                                size: 50
                              }]);
                              setShowCardStickerPicker(false);
                            }}
                            className="aspect-square flex items-center justify-center rounded-xl bg-white/10 hover:bg-amber-500/30"
                          >
                            <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: emoji.svg }} />
                          </button>
                        ))
                      ) : (
                        emojiCategories[emojiCategory].emojis.map((emoji, idx) => (
                          <button
                            key={`${emoji}-${idx}`}
                            onClick={() => {
                              setCardStickers(prev => [...prev, {
                                id: Date.now(),
                                type: 'emoji',
                                content: { emoji, url: getEmojiUrl(emoji) },
                                x: 50, y: 50,
                                size: 50
                              }]);
                              setShowCardStickerPicker(false);
                            }}
                            className="aspect-square flex items-center justify-center rounded-xl bg-white/10 hover:bg-amber-500/30"
                          >
                            <img src={getEmojiUrl(emoji)} alt={emoji} className="w-8 h-8" />
                          </button>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Profile Page */}
      {showProfile && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/80" onClick={() => { setShowProfile(false); setShowFriendsList(false); setIsCustomizing(false); setEditingBox(null); }} />
          <div className="absolute inset-0 sm:inset-4 sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            
            {/* Split Background */}
            <div className="absolute inset-0 flex pointer-events-none">
              <div className="w-1/2 h-full" style={{ backgroundColor: profileColors.left }} />
              <div className="w-1/2 h-full" style={{ backgroundColor: profileColors.right }} />
            </div>
            
            {/* Divider Line - Clickable for color picker */}
            <div 
              className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 cursor-pointer hover:w-2 transition-all z-10 group"
              style={{ backgroundColor: profileColors.divider }}
              onClick={() => setShowColorPicker(true)}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" style={{ backgroundColor: profileColors.divider }}>
                <span className="text-xs">🎨</span>
              </div>
            </div>
            
            {/* Close Button - Bottom Right */}
            <button onClick={() => { setShowProfile(false); setShowFriendsList(false); setIsCustomizing(false); setEditingBox(null); }} className="absolute bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            
            {/* Privacy Toggle - Above Edit Button */}
            <button 
              onClick={() => setIsProfilePrivate(!isProfilePrivate)}
              className={`absolute bottom-16 left-4 z-20 px-3 py-1.5 rounded-full backdrop-blur-sm flex items-center gap-2 transition-all ${isProfilePrivate ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
            >
              {isProfilePrivate ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>
                </svg>
              )}
              <span className="text-[10px] font-medium">{isProfilePrivate ? 'Private' : 'Public'}</span>
            </button>
            
            {/* Edit Button - Bottom Left */}
            <button 
              onClick={() => { setIsCustomizing(!isCustomizing); setEditingBox(null); }} 
              className={`absolute bottom-4 left-4 z-20 px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2 transition-all ${isCustomizing ? 'bg-amber-500 text-white' : 'bg-black/20 text-white hover:bg-black/40'}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              <span className="text-xs font-medium">{isCustomizing ? 'Done' : 'Edit'}</span>
            </button>
            
            {/* Split Content - Left and Right sides */}
            <div className="relative w-full h-full flex">
              
              {/* LEFT SIDE - Black */}
              <div className="w-1/2 h-full flex flex-col p-4 pr-6 overflow-hidden">
                
                {/* Profile Info - Top Left */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-mafia text-lg border-2 border-white/30 shadow-xl flex-shrink-0">
                    {isProfilePrivate ? '?' : profileData.avatar}
                  </div>
                  <div>
                    <h2 className="font-mafia text-white text-base">
                      {isProfilePrivate ? '••••••••••' : profileData.name}
                    </h2>
                    <p className="text-white/50 text-xs">
                      {isProfilePrivate ? '@••••••' : profileData.username}
                    </p>
                  </div>
                </div>
                
                {/* Left Side Boxes */}
                <div className="space-y-2 flex-1">
                  
                  {/* Movie Box */}
                  <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('movie')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('movie') ? prev.filter(b => b !== 'movie') : [...prev, 'movie']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('movie') ? 'bg-red-500 text-white' : 'bg-white/20 text-white/60'}`}
                      >
                        {maskedBoxes.includes('movie') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Movie</p>
                    {maskedBoxes.includes('movie') ? (
                      <p className="text-white/40 font-mafia text-sm">🔒 ••••••••••</p>
                    ) : (
                      <a href={profileData.movie.link} target="_blank" rel="noopener noreferrer" className="text-white font-mafia text-sm hover:text-amber-400 transition-colors">
                        🎬 {profileData.movie.title}
                      </a>
                    )}
                  </div>
                  
                  {/* Music Box */}
                  <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('music')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('music') ? prev.filter(b => b !== 'music') : [...prev, 'music']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('music') ? 'bg-red-500 text-white' : 'bg-white/20 text-white/60'}`}
                      >
                        {maskedBoxes.includes('music') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Song</p>
                    {maskedBoxes.includes('music') ? (
                      <p className="text-white/40 font-mafia text-sm">🔒 ••••••••••</p>
                    ) : (
                      <>
                        <p className="text-white font-mafia text-sm">🎵 Speak Softly Love</p>
                        <p className="text-white/50 text-xs">by Nino Rota</p>
                      </>
                    )}
                  </div>
                  
                  {/* Food Box */}
                  <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('food')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('food') ? prev.filter(b => b !== 'food') : [...prev, 'food']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('food') ? 'bg-red-500 text-white' : 'bg-white/20 text-white/60'}`}
                      >
                        {maskedBoxes.includes('food') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Food</p>
                    {maskedBoxes.includes('food') ? (
                      <p className="text-white/40 font-mafia text-sm">🔒 ••••••••••</p>
                    ) : (
                      <p className="text-white font-mafia text-sm">🍝 Spaghetti</p>
                    )}
                  </div>
                  
                  {/* Place Box */}
                  <div 
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('place1')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('place1') ? prev.filter(b => b !== 'place1') : [...prev, 'place1']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('place1') ? 'bg-red-500 text-white' : 'bg-white/20 text-white/60'}`}
                      >
                        {maskedBoxes.includes('place1') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Dream Destination</p>
                    {maskedBoxes.includes('place1') ? (
                      <p className="text-white/40 font-mafia text-sm">🔒 ••••••••••</p>
                    ) : (
                      <p className="text-white font-mafia text-sm">🇮🇹 Sicily, Italy</p>
                    )}
                  </div>
                  
                </div>
              </div>
              
              {/* RIGHT SIDE - White */}
              <div className="w-1/2 h-full flex flex-col p-4 pl-6 overflow-hidden">
                
                {/* Friends - Top Right */}
                <div className="flex justify-end mb-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setShowFriendsList(true); }}
                    className="flex items-center gap-2 px-3 py-1.5 bg-black/10 hover:bg-black/20 rounded-full transition-colors relative z-50 cursor-pointer pointer-events-auto"
                  >
                    <div className="flex -space-x-2">
                      {profileData.friends.slice(0, 3).map((friend, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-white text-[9px] font-mafia">
                          {friend[0]}
                        </div>
                      ))}
                    </div>
                    <span className="text-stone-700 text-xs font-medium">{profileData.friends.length} friends</span>
                  </button>
                </div>
                
                {/* Right Side Boxes */}
                <div className="space-y-2 flex-1">
                  
                  {/* Quote Box */}
                  <div 
                    className={`bg-black/5 rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('quote')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('quote') ? prev.filter(b => b !== 'quote') : [...prev, 'quote']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('quote') ? 'bg-red-500 text-white' : 'bg-black/10 text-stone-400'}`}
                      >
                        {maskedBoxes.includes('quote') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-stone-400 uppercase tracking-wider mb-0.5">Favorite Quote</p>
                    {maskedBoxes.includes('quote') ? (
                      <p className="text-stone-400 font-elegant italic text-sm">🔒 ••••••••••••••</p>
                    ) : (
                      <p className="text-stone-700 font-elegant italic text-sm">"Keep your friends close, but your enemies closer."</p>
                    )}
                  </div>
                  
                  {/* Poem Box */}
                  <div 
                    className={`bg-black/5 rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('poem')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('poem') ? prev.filter(b => b !== 'poem') : [...prev, 'poem']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('poem') ? 'bg-red-500 text-white' : 'bg-black/10 text-stone-400'}`}
                      >
                        {maskedBoxes.includes('poem') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-stone-400 uppercase tracking-wider mb-0.5">Favorite Poem</p>
                    {maskedBoxes.includes('poem') ? (
                      <p className="text-stone-400 font-elegant italic text-sm">🔒 ••••••••••••••</p>
                    ) : (
                      <>
                        <p className="text-stone-700 font-elegant italic text-sm">"The woods are lovely, dark and deep..."</p>
                        <p className="text-stone-400 text-[10px] mt-0.5">— Robert Frost</p>
                      </>
                    )}
                  </div>
                  
                  {/* Place Box */}
                  <div 
                    className={`bg-black/5 rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('place2')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('place2') ? prev.filter(b => b !== 'place2') : [...prev, 'place2']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('place2') ? 'bg-red-500 text-white' : 'bg-black/10 text-stone-400'}`}
                      >
                        {maskedBoxes.includes('place2') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-stone-400 uppercase tracking-wider mb-0.5">Favorite Place</p>
                    {maskedBoxes.includes('place2') ? (
                      <p className="text-stone-400 font-mafia text-sm">🔒 ••••••••••</p>
                    ) : (
                      <p className="text-stone-700 font-mafia text-sm">🏔️ Sanine, Lebanon</p>
                    )}
                  </div>
                  
                  {/* Color Box */}
                  <div 
                    className={`bg-black/5 rounded-xl p-3 relative ${isCustomizing ? 'ring-2 ring-amber-500 cursor-pointer' : ''}`}
                    onClick={() => isCustomizing && setEditingBox('color')}
                  >
                    {isCustomizing && (
                      <button 
                        onClick={(e) => { e.stopPropagation(); setMaskedBoxes(prev => prev.includes('color') ? prev.filter(b => b !== 'color') : [...prev, 'color']); }}
                        className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-[8px] ${maskedBoxes.includes('color') ? 'bg-red-500 text-white' : 'bg-black/10 text-stone-400'}`}
                      >
                        {maskedBoxes.includes('color') ? '🔒' : '👁'}
                      </button>
                    )}
                    <p className="text-[9px] text-stone-400 uppercase tracking-wider mb-0.5">Favorite Color</p>
                    {maskedBoxes.includes('color') ? (
                      <p className="text-stone-400 font-mafia text-sm">🔒 ••••••</p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-lg bg-stone-900 border border-stone-300" />
                        <p className="text-stone-700 font-mafia text-sm">Black</p>
                      </div>
                    )}
                  </div>
                  
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Box Edit Modal */}
          {editingBox && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setEditingBox(null)} />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-scale-in">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mafia text-stone-800">Edit Box</h3>
                  <button onClick={() => setEditingBox(null)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Title/Label</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                      placeholder="Enter title..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Content</label>
                    <textarea 
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500 resize-none"
                      rows={3}
                      placeholder="Enter content..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Link (optional)</label>
                    <input 
                      type="url" 
                      className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                      placeholder="https://..."
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 mt-6">
                  <button 
                    onClick={() => setEditingBox(null)}
                    className="flex-1 py-2 bg-stone-100 text-stone-600 rounded-lg text-sm font-medium hover:bg-stone-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => setEditingBox(null)}
                    className="flex-1 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Color Picker Modal */}
          {showColorPicker && (
            <div className="absolute inset-0 z-30 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/50" onClick={() => setShowColorPicker(false)} />
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-scale-in">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-mafia text-stone-800 text-lg">Choose Colors</h3>
                  <button onClick={() => setShowColorPicker(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
                
                <div className="mb-5">
                  <p className="text-xs text-stone-500 mb-3 font-medium">Left Side</p>
                  <div className="flex gap-3 flex-wrap">
                    {['#000000', '#1a1a2e', '#16213e', '#0f3460', '#4a0e0e', '#1e3a1e'].map(color => (
                      <button
                        key={color}
                        onClick={() => setProfileColors(prev => ({ ...prev, left: color }))}
                        className={`w-11 h-11 rounded-xl shadow-md transition-all hover:scale-110 ${profileColors.left === color ? 'ring-2 ring-amber-500 ring-offset-2 scale-110' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-5">
                  <p className="text-xs text-stone-500 mb-3 font-medium">Right Side</p>
                  <div className="flex gap-3 flex-wrap">
                    {['#ffffff', '#f5f5f5', '#fef3c7', '#fce7f3', '#e0f2fe', '#d1fae5'].map(color => (
                      <button
                        key={color}
                        onClick={() => setProfileColors(prev => ({ ...prev, right: color }))}
                        className={`w-11 h-11 rounded-xl shadow-md border border-stone-200 transition-all hover:scale-110 ${profileColors.right === color ? 'ring-2 ring-amber-500 ring-offset-2 scale-110' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <p className="text-xs text-stone-500 mb-3 font-medium">Divider Line</p>
                  <div className="flex gap-3 flex-wrap">
                    {['#d4af37', '#ef4444', '#22c55e', '#3b82f6', '#a855f7', '#f97316'].map(color => (
                      <button
                        key={color}
                        onClick={() => setProfileColors(prev => ({ ...prev, divider: color }))}
                        className={`w-11 h-11 rounded-xl shadow-md transition-all hover:scale-110 ${profileColors.divider === color ? 'ring-2 ring-stone-800 ring-offset-2 scale-110' : ''}`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Friends List Modal */}
      {showFriendsList && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowFriendsList(false)} />
          <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="p-4 border-b border-stone-100 flex items-center justify-between">
              <h3 className="font-mafia text-stone-800">Friends</h3>
              <button onClick={() => setShowFriendsList(false)} className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 hover:bg-stone-200 transition-colors">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              {profileData.friends.map((friend, i) => (
                <div 
                  key={i} 
                  className="p-3 flex items-center gap-3 hover:bg-stone-50 rounded-xl cursor-pointer transition-colors"
                  onClick={() => setViewingFriend(friend)}
                >
                  <div className="w-11 h-11 rounded-full bg-stone-950 flex items-center justify-center text-white font-mafia">{friend[0]}</div>
                  <div className="flex-1">
                    <p className="font-medium text-stone-800">{friend}</p>
                    <p className="text-xs text-stone-400">Friend</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setViewingFriend(friend); }}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 rounded-lg text-xs text-white transition-colors"
                  >
                    View
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Friend Profile View */}
      {viewingFriend && friendsProfiles[viewingFriend] && (
        <div className="fixed inset-0 z-[70] animate-fade-in">
          <div className="absolute inset-0 bg-black/80" onClick={() => setViewingFriend(null)} />
          <div className="absolute inset-0 sm:inset-4 sm:rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
            
            {/* Split Background */}
            <div className="absolute inset-0 flex">
              <div className="w-1/2 h-full bg-stone-900" />
              <div className="w-1/2 h-full bg-stone-100" />
            </div>
            
            {/* Divider Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-amber-500 z-10" />
            
            {/* Back Button - Bottom Left */}
            <button onClick={() => setViewingFriend(null)} className="absolute bottom-4 left-4 z-20 px-4 py-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              <span className="text-xs font-medium">Back</span>
            </button>
            
            {/* Split Content */}
            <div className="relative w-full h-full flex">
              
              {/* LEFT SIDE */}
              <div className="w-1/2 h-full flex flex-col p-4 pr-6 overflow-hidden">
                
                {/* Friend Profile Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-mafia text-lg border-2 border-white/30 shadow-xl flex-shrink-0">
                    {friendsProfiles[viewingFriend].avatar}
                  </div>
                  <div>
                    <h2 className="font-mafia text-white text-base">{friendsProfiles[viewingFriend].name}</h2>
                    <p className="text-white/50 text-xs">{friendsProfiles[viewingFriend].username}</p>
                  </div>
                </div>
                
                {/* Left Side Boxes */}
                <div className="space-y-2 flex-1">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Movie</p>
                    <a href={friendsProfiles[viewingFriend].movie.link} target="_blank" rel="noopener noreferrer" className="text-white font-mafia text-sm hover:text-amber-400 transition-colors">
                      🎬 {friendsProfiles[viewingFriend].movie.title}
                    </a>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Song</p>
                    <p className="text-white font-mafia text-sm">🎵 {friendsProfiles[viewingFriend].song}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Food</p>
                    <p className="text-white font-mafia text-sm">🍝 {friendsProfiles[viewingFriend].food}</p>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                    <p className="text-[9px] text-white/50 uppercase tracking-wider mb-0.5">Favorite Place</p>
                    <p className="text-white font-mafia text-sm">📍 {friendsProfiles[viewingFriend].place}</p>
                  </div>
                </div>
              </div>
              
              {/* RIGHT SIDE */}
              <div className="w-1/2 h-full flex flex-col p-4 pl-6 overflow-hidden">
                
                <div className="mb-4" />
                
                {/* Right Side Boxes */}
                <div className="space-y-2 flex-1">
                  <div className="bg-black/5 rounded-xl p-3">
                    <p className="text-[9px] text-stone-400 uppercase tracking-wider mb-0.5">Favorite Quote</p>
                    <p className="text-stone-700 font-elegant italic text-sm">{friendsProfiles[viewingFriend].quote}</p>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      )}

      {/* Save Confirmation Toast */}
      {showSaveConfirm && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 font-mafia text-sm">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
            Saved to Collection!
          </div>
        </div>
      )}


    </div>
  );
};

export default App;
