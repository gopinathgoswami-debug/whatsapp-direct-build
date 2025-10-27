# WhatsApp Message Sender - Design Guidelines

## Design Approach

**Reference-Based Approach**: Drawing directly from WhatsApp's design language and visual identity to create a familiar, trusted user experience. The app should feel like a natural extension of WhatsApp itself.

## Core Design Principles

1. **WhatsApp Visual Identity**: Embrace WhatsApp's signature aesthetic throughout
2. **Mobile-First Simplicity**: Single-purpose interface with minimal cognitive load
3. **Touch-Friendly**: Large, easily tappable elements optimized for thumb navigation
4. **Instant Clarity**: Users should understand the app's purpose within 2 seconds

## Typography

- **Primary Font**: System fonts (San Francisco for iOS, Roboto for Android) for optimal native feel
- **Hierarchy**:
  - App Title: 24px, semi-bold
  - Input Labels: 14px, medium weight
  - Button Text: 16px, medium weight
  - Helper Text: 12px, regular weight
  - Error Messages: 13px, medium weight

## Layout System

**Spacing Units**: Use Tailwind units of 4, 6, and 8 for consistent rhythm (p-4, p-6, p-8, m-4, etc.)

**Container Structure**:
- Main content: max-width of 480px (optimal for mobile)
- Horizontal padding: 16px (p-4) on mobile, 24px (p-6) on larger screens
- Vertical sections: 24px spacing between major elements (space-y-6)

## Color Palette

**Primary WhatsApp Green**: #25D366 (buttons, accents, active states)
**Secondary Green**: #128C7E (darker shade for headers, borders)
**Background Tint**: #F0F2F5 (light gray, WhatsApp's background color)
**Success Green**: #00A884 (feedback messages)
**Error Red**: #E74C3C (validation errors)
**Text Primary**: #111B21 (WhatsApp's dark text)
**Text Secondary**: #667781 (helper text, labels)
**White**: #FFFFFF (card backgrounds, input fields)

## Component Library

### 1. App Header
- Fixed position at top
- Height: 56px
- Background: WhatsApp green (#128C7E)
- White text with app name "WhatsApp Quick Message"
- Optional settings icon (gear) aligned right

### 2. Phone Number Input Section
**Input Container**:
- White background card with subtle shadow
- Rounded corners (8px border radius)
- 12px padding
- Vertical layout with label above input

**Country Code Selector**:
- Inline dropdown next to phone input
- Width: 100px
- Display format: "+91 🇮🇳"
- Dropdown activates full country list modal

**Phone Number Input Field**:
- Large text size (18px) for easy reading
- Height: 56px for touch-friendliness
- Real-time formatting display
- Light gray placeholder: "Enter phone number"
- Border: 1px solid #E9EDEF (WhatsApp's border color)
- Focus state: 2px border in WhatsApp green

### 3. Formatted Number Preview
- Display beneath input in a subtle card
- Format: "Will message: +91 98410 19047"
- Text color: Secondary gray
- Background: Very light green tint (#F0FDF4)
- Only visible when valid number is entered

### 4. Primary Action Button
**WhatsApp Send Button**:
- Full width with 16px side margins
- Height: 52px
- Background: WhatsApp green (#25D366)
- White text: "Open in WhatsApp"
- WhatsApp logo icon positioned left of text (24px icon)
- Border radius: 8px
- Shadow: subtle elevation
- Disabled state: 50% opacity with gray background

### 5. Clipboard Detection Banner
- Slide-in notification from top
- Background: Light green (#D1F4E0)
- Text: "Phone number detected from clipboard"
- Small "Use Number" button aligned right
- Auto-dismiss after 5 seconds
- Height: 64px with 12px padding

### 6. Ad Banner Placeholder
**Position**: Fixed at bottom of viewport
**Dimensions**: 
- Height: 50px on mobile, 60px on tablet
- Full width
**Visual Treatment**:
- Border top: 1px solid #E9EDEF
- Background: White
- Placeholder content: Gray box with text "Ad Space - Replace with ad provider code"
- Comment structure for easy code replacement
**Implementation Note**: Sticky positioning to remain visible during scroll

### 7. Settings Page
**Layout**:
- Full-screen overlay modal
- Header bar matching app header style
- Back arrow (left) and "Settings" title
- White background content area

**Settings Items**:
- List-style layout with dividers
- Each item: 56px height
- Label on left, value/control on right
- Default Country Code setting with dropdown trigger
- Clear visual separation between items (1px border)

### 8. Error/Validation States
**Invalid Number Feedback**:
- Red text beneath input: "Please enter a valid phone number"
- Red border on input field (1px solid #E74C3C)
- Button disabled state activated

**Success Feedback**:
- Green checkmark icon appears next to formatted number
- Subtle scale animation on button (optional micro-interaction)

## Navigation & Interactions

**Primary User Flow**:
1. Land on main screen with empty input
2. Paste/type number → automatic formatting
3. Preview formatted number → confirm visually
4. Tap green WhatsApp button → opens wa.me link
5. Ad banner persistent throughout

**Settings Access**:
- Tap gear icon in header
- Modal slides in from right
- Change default country code
- Tap back or outside modal to dismiss

## Progressive Web App Elements

**App Icon**: WhatsApp-style green circular icon with white phone/message symbol
**Splash Screen**: WhatsApp green background with app icon centered
**Theme Color**: #128C7E (appears in browser chrome on Android)

## Accessibility

- All interactive elements minimum 44px touch target
- Sufficient color contrast (4.5:1 minimum)
- Semantic HTML form elements
- Clear focus indicators on all inputs
- Descriptive labels and ARIA attributes for screen readers

## Visual Hierarchy

**Priority Order**:
1. Phone number input (hero element, centered focus)
2. Send to WhatsApp button (primary action, impossible to miss)
3. Formatted number preview (confirmation before action)
4. Country code selector (secondary but essential)
5. Ad banner (present but non-intrusive)
6. Settings access (available but not prominent)

## Responsive Behavior

**Mobile Portrait (320px - 480px)**: Primary design target, single column
**Mobile Landscape**: Same layout, content scrollable
**Tablet (481px+)**: Centered card container (max 480px) with margins

## Images

**WhatsApp Logo**: Use official WhatsApp icon (white on transparent) at 24px × 24px inside the primary button, positioned to the left of button text. Source from official WhatsApp brand assets or use a high-quality SVG.

**No Hero Image Required**: This is a utility app - focus remains on functional clarity rather than marketing imagery.