# WhatsApp Quick Message - PWA

A beautiful, mobile-first Progressive Web App that lets users send WhatsApp messages to any phone number without saving it to their contacts.

## Features

✅ **Smart Phone Number Input**
- Supports multiple formats (098410 19047, +919841019047, +91-98410-19047, etc.)
- Real-time validation using libphonenumber-js
- International number support for all countries
- Automatic formatting and preview

✅ **Country Code Selection**
- Default country code selector (defaults to +91 India)
- 30+ popular countries with flags
- Searchable country list
- Persistent settings saved to localStorage

✅ **Clipboard Detection**
- Automatically detects phone numbers copied to clipboard
- Shows notification banner to use detected number
- Respects permission denials and stops polling appropriately

✅ **WhatsApp Integration**
- One-tap opening of WhatsApp with formatted number
- Uses WhatsApp deep linking (wa.me)
- Works on both Android and iOS browsers

✅ **Progressive Web App**
- Installable on mobile devices
- Works offline (service worker configured)
- Native app-like experience
- WhatsApp-themed UI with signature green colors (#25D366)

✅ **Ad Monetization Ready**
- Dedicated ad banner placeholder at bottom
- Clear instructions for integrating ad providers (Google AdSense, etc.)
- Non-intrusive design that doesn't interfere with functionality

## Tech Stack

### Frontend
- React with TypeScript
- Wouter for routing
- Tailwind CSS for styling
- Shadcn UI components
- libphonenumber-js for validation
- TanStack Query for state management

### PWA Configuration
- Manifest.json with app metadata
- Service worker for offline support
- Mobile-optimized meta tags
- Install prompts for home screen

## User Flow

1. **Home Page**: User enters or pastes a phone number
2. **Format Detection**: App automatically formats and validates the number
3. **Country Selection**: User can change country code if needed
4. **Send to WhatsApp**: One tap opens WhatsApp with the number
5. **Settings**: User can set default country code for future use

## Ad Integration Instructions

The app includes a placeholder ad banner at the bottom. To integrate your ad provider:

1. **For Google AdSense**:
   - Add the AdSense script to `client/index.html` in the `<head>` section
   - Replace the placeholder div in `client/src/components/AdBanner.tsx` with your ad unit code
   - Full instructions are in the AdBanner.tsx file comments

2. **For other ad networks**:
   - Follow their integration guide
   - Add required scripts to index.html
   - Replace the placeholder div with their ad unit code

## Architecture

### Data Persistence
- Settings stored in browser localStorage
- No backend database required
- All processing happens client-side

### Phone Number Validation
- Uses libphonenumber-js for accurate international validation
- Supports all country codes and dialing formats
- Graceful fallback for unknown formats

### Routing
- Wouter provides lightweight client-side routing
- Two routes: `/` (home) and `/settings`
- Browser history support for back/forward navigation

## Design System

**Colors** (WhatsApp Theme):
- Primary Green: #25D366
- Darker Green: #128C7E
- Background: Light gray (#F0F2F5)
- Card: White (#FFFFFF)

**Typography**:
- System fonts for native feel (-apple-system, BlinkMacSystemFont, Roboto)
- Clear hierarchy with multiple text sizes

**Layout**:
- Mobile-first responsive design
- Max width 480px for optimal mobile experience
- Touch-friendly button sizes (minimum 44px)
- Fixed header and bottom ad banner

## Browser Compatibility

- ✅ Chrome (Android & Desktop)
- ✅ Safari (iOS & macOS)
- ✅ Firefox
- ✅ Edge
- ✅ Mobile browsers (Android & iOS)

## Development

The app is built with:
- Vite for fast development and builds
- Express.js for serving (minimal backend)
- Hot module replacement for instant updates

## Next Steps for Production

1. **Add Real Ad Code**: Replace placeholder with actual ad provider code
2. **Analytics**: Add Google Analytics or similar for tracking
3. **Deploy**: The app is ready to be published to Replit Deployments
4. **Custom Domain**: Configure a custom domain for professional branding
5. **App Store**: Consider wrapping in Capacitor for native app stores

## Privacy & Security

- No user data is collected or stored on servers
- Clipboard access requires user permission
- All phone number processing happens locally
- No analytics or tracking (until you add it)
- LocalStorage for settings only

## Credits

Built with love using modern web technologies and following WhatsApp's design language.
