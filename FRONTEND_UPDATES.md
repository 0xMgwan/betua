# Frontend Updates Required

## Overview
The frontend needs to be updated to support the new Polygon Amoy network and improve the user interface based on recent changes.

## Required Changes

### Network Migration
- [ ] Update network configuration to use Polygon Amoy instead of Mumbai
- [ ] Update RPC endpoints and chain IDs in the configuration
- [ ] Update contract addresses after deployment to Amoy
- [ ] Add network switching support for Amoy testnet

### UI/UX Improvements
- [ ] Navigation Component
  - [ ] Combine sign-in options into a single dropdown menu
  - [ ] Remove Exchange section
  - [ ] Add links to Analytics and Community pages
  - [ ] Update logo to simplified "UA" design

- [x] Leaderboard Component
  - [x] Change display from win rates to total winnings in ETH
  - [x] Add hover effects and color-coded avatars
  - [x] Improve styling and responsiveness

- [x] BettingInterface Component
  - [x] Enhance match card design
  - [x] Add LIVE badges for active matches
  - [x] Improve odds display organization
  - [x] Add hover effects and transitions

- [ ] Layout Adjustments
  - [ ] Ensure proper spacing between components
  - [ ] Implement responsive grid layout
  - [ ] Maintain consistent dark theme across all pages

### Dependencies
- [ ] Update Chakra UI components and styling
- [ ] Update RainbowKit configuration for wallet connections
- [ ] Review and update all package versions

## Technical Notes
- The application uses Next.js with TypeScript
- Styling is done with Chakra UI
- Wallet connections are handled through RainbowKit
- Environment variables need to be updated in `.env.local`

## Priority
High - These changes are required to support the migration to Polygon Amoy network.

## Additional Context

### Completed Updates (March 17, 2025)

1. **Added Sports Categories Component**
   - Created a grid layout for selecting different sports
   - Added icons and hover effects for better user experience
   - Implemented filtering based on selected sport

2. **Enhanced Matches List Component**
   - Added tabbed interface for Popular, Live, Upcoming, and Tournaments categories
   - Implemented match cards with team names, odds, and time information
   - Added visual indicators for live matches and viewer counts

3. **Added Comments Dropdown Component**
   - Implemented collapsible comments section for each match
   - Added wallet connection requirement for posting comments
   - Included user avatars and timestamps for comments

4. **Created Leaderboard Component**
   - Designed tabbed interface for All-time, Weekly, and Monthly leaders
   - Added animations for rows to enhance visual appeal
   - Included badges for achievements and win streaks

5. **Smart Contract Updates**
   - Added flattened contract for betting strategy
   - Created deployment and verification scripts
   - Updated configuration files for contract deployment
These changes are part of the migration from Mumbai testnet to Polygon Amoy, as Mumbai is being deprecated. The UI improvements were requested by users to enhance the betting experience and make the platform more intuitive.
