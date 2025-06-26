# Referral Modal Usage Guide

## Overview
The referral modal has been created to replace the full referral page. It shows the user's referral URL, provides copy and share functionality, and integrates with native device sharing when available.

## Features
- ✅ Shows referral URL and code
- ✅ Copy to clipboard functionality
- ✅ QR code display
- ✅ Social media sharing (WhatsApp, Telegram, Twitter, Facebook, Instagram, LinkedIn, Reddit)
- ✅ Native device sharing (works on mobile devices)
- ✅ Responsive design
- ✅ Error handling and fallbacks

## Components Created

### 1. ReferralModal.jsx
The main modal component that contains all the sharing functionality.

### 2. ReferralButton.jsx
A button component that opens the referral modal when clicked.

### 3. ReferralIconButton (exported from ReferralButton.jsx)
A compact version for headers and navigation bars.

## Usage Examples

### Basic Usage
```jsx
import ReferralButton from './Components/ReferralButton';

// Simple button
<ReferralButton>
    Invite Friends
</ReferralButton>

// Customized button
<ReferralButton 
    colorScheme="purple" 
    size="lg"
    variant="outline"
>
    Share & Earn $50
</ReferralButton>
```

### Icon Button (for headers/nav)
```jsx
import { ReferralIconButton } from './Components/ReferralButton';

<ReferralIconButton 
    size="sm"
    colorScheme="blue"
/>
```

### Direct Modal Usage
```jsx
import ReferralModal from './Components/ReferralModal';
import { useDisclosure } from '@chakra-ui/react';

const MyComponent = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
        <>
            <Button onClick={onOpen}>Open Referral</Button>
            <ReferralModal isOpen={isOpen} onClose={onClose} />
        </>
    );
};
```

## Where It's Already Added

1. **User Header** - Small "Share" button in the top navigation
2. **User Dashboard** - "Invite Friends" button in the welcome section
3. **Original referrals page** - Still accessible via /user/referrals for full stats

## Sharing Features

### Social Media Platforms
- **WhatsApp**: Opens WhatsApp with pre-filled message
- **Telegram**: Opens Telegram share dialog
- **Twitter**: Opens Twitter compose with message
- **Facebook**: Opens Facebook share dialog
- **Instagram**: Copies link (Instagram doesn't support direct URL sharing)
- **LinkedIn**: Opens LinkedIn share dialog
- **Reddit**: Opens Reddit submit form

### Native Device Sharing
On mobile devices that support the Web Share API, users will see a "Share via Device Apps" button that opens the native sharing menu with all available apps.

### Fallbacks
- If clipboard API is not supported, falls back to older document.execCommand method
- If Web Share API is not supported, falls back to copy to clipboard
- If any social media sharing fails, falls back to copying the link

## Customization

### Colors
The modal uses your custom theme with social media brand colors. You can customize the theme in `src/theme.js`.

### Icons
All icons are from `react-icons` which is already installed. You can easily swap icons by changing the imports.

### Styling
The modal uses Chakra UI components and respects your color mode (light/dark theme).

## Mobile Experience

The modal is fully responsive and provides an excellent mobile experience:
- Touch-friendly buttons
- Native sharing integration
- QR code for easy scanning
- Copy functionality with visual feedback

## Testing the Modal

1. Click any "Share" or "Invite Friends" button in the user dashboard
2. Test copying the referral link
3. Test the QR code display
4. Test social media sharing buttons
5. On mobile devices, test the "Share via Device Apps" button

## Data Source

The referral code and link are fetched from the user's profile:
- Referral code: `profile?.USER?.my_code`
- Referral link: `${window.location.origin}/login?invitecode=${referralCode}`

## Future Enhancements

You can easily extend the modal by adding:
- Referral statistics preview
- Quick referral history
- Custom message templates
- More social platforms
- Analytics tracking for shares

## Performance

The modal is lazy-loaded and only renders when opened, ensuring optimal performance.