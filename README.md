# YouTube Engagement Calculator

A modern, interactive tool that analyzes YouTube video engagement metrics and calculates creator engagement scores. Built as a Buffer Community feature showcase for a growth marketing engineer job application.

## Features

### 🎯 Core Functionality

**Ghost Score Analysis**
- Analyzes YouTube videos to calculate a "Ghost Score" based on creator engagement
- Ghost Score = 100 - (Creator Reply Rate %)
- Measures how often creators reply to comments on their videos
- Provides actionable insights into audience engagement habits

**Multi-Video Support**
- Analyze up to 3 YouTube videos in a single session
- Aggregate metrics across multiple videos
- Compare engagement patterns across your content

**5-Tier Engagement Classification**
- 🏆 **Community Champion** (80-100% reply rate): Crushing it with audience engagement
- 💬 **Engaged Creator** (50-79% reply rate): Solid engagement with room to grow
- 👋 **Part-Time Replier** (25-49% reply rate): Engaging but missing opportunities
- 👀 **Occasional Visitor** (10-24% reply rate): Audience wants to hear more often
- 👻 **Serial Ghoster** (0-9% reply rate): Time to start replying!

### 📊 Detailed Analytics

For each analyzed video, the tool displays:
- **Video metadata**: Thumbnail, title, and channel information
- **Engagement stats**: Views, likes, comments, and creator replies
- **Ghost Score**: Color-coded tier badge with personalized message
- **Reply metrics**: Reply rate percentage and total comments analyzed

### 🎨 Design Features

- **Dark hero section** with Buffer brand styling
- **Responsive design** optimized for mobile, tablet, and desktop
- **Color-coded tiers** with Buffer's official HSL color palette
- **Light navigation bar** with Buffer branding
- **Feature showcase sections** highlighting Buffer Community capabilities

## How to Use

### Getting Started

1. **Navigate to the tool**: Go to `/tools/engagement-calculator`
2. **See the hero section**: Review the 3-step process overview
3. **Paste YouTube URLs**: Enter up to 3 video URLs in the input field
4. **Click "Analyze"**: Submit for processing

### Analyzing Videos

```
Step 1: Paste URLs → Step 2: Analyze → Step 3: Get Score
```

The tool will:
1. Fetch video metadata (title, thumbnail, view/like counts)
2. Retrieve all comments from each video
3. Count how many comment threads received creator replies
4. Calculate the Ghost Score and engagement tier
5. Display comprehensive results with metrics

### Viewing Results

After analysis, you'll see:
- **Ghost Score Card**: Your overall engagement tier with personalized message
- **Individual video cards**: Detailed metrics for each analyzed video
- **Actionable insights**: Tips to improve your engagement
- **Feature showcase**: Buffer Community capabilities
- **Related resources**: Blog posts and guides to level up

### Analyze More

Click the **"Analyze More Videos"** button in the Ghost Score card to return to the input form and analyze different videos.

## Technical Architecture

### Tech Stack

- **Frontend**: Next.js 16.0.5 with App Router
- **Styling**: Tailwind CSS v4 with custom Buffer color palette
- **API**: YouTube Data API v3
- **Language**: TypeScript with strict mode
- **Build**: Turbopack for fast development

### Key Components

**VideoInput** (`app/components/VideoInput.tsx`)
- Input form for YouTube URLs
- Validation and error handling
- Up to 3 URL support with add/remove functionality

**GhostScore** (`app/components/GhostScore.tsx`)
- Displays aggregated engagement metrics
- Color-coded tier visualization
- Button to analyze more videos

**ResultsCard** (`app/components/ResultsCard.tsx`)
- Individual video analysis display
- Responsive layout (thumbnail + stats)
- Mobile-optimized with adaptive grid

**CommunityFeatures** (`app/components/CommunityFeatures.tsx`)
- Feature 1: Comment Score showcase
- Feature 2: Create Post from Reply

**CreatePostFeature** (`app/components/CreatePostFeature.tsx`)
- Shows how to turn replies into new posts
- Comment thread preview mock

**RelatedContent** (`app/components/RelatedContent.tsx`)
- Links to Buffer blog resources
- Tips for improving engagement

### API Integration

**YouTube Data API v3**
- `GET /videos`: Fetch video metadata
- `GET /commentThreads`: Retrieve comment threads

**Analysis Algorithm**
```
replyRate = (threadsWithCreatorReply / totalThreads) × 100
ghostScore = 100 - replyRate
```

### Color System

All colors use HSL values mapped to Buffer's official palette:

| Tier | Color | Background | Badge |
|------|-------|-----------|-------|
| Community Champion | Green 500 | Green 50 | Green 500 |
| Engaged Creator | Aqua 800 | Aqua 100 | Aqua 800 |
| Part-Time Replier | Yellow 500 | Yellow 50 | Yellow 500 |
| Occasional Visitor | Orange 600 | Orange 50 | Orange 600 |
| Serial Ghoster | Coral 600 | Coral 50 | Coral 600 |

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your YouTube API key to .env.local

# Run development server
pnpm dev
```

### Environment Variables

```env
NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key_here
```

### Project Structure

```
app/
├── page.tsx                           # Home redirect
├── layout.tsx                         # Root layout
├── globals.css                        # Global styles
├── components/                        # React components
│   ├── Navbar.tsx                    # Navigation bar
│   ├── VideoInput.tsx                # URL input form
│   ├── GhostScore.tsx                # Score display
│   ├── ResultsCard.tsx               # Video result card
│   ├── CommunityFeatures.tsx         # Feature showcase
│   ├── CreatePostFeature.tsx         # Feature 2 component
│   ├── RelatedContent.tsx            # Resource links
│   ├── LoadingState.tsx              # Loading animation
│   ├── ErrorMessage.tsx              # Error display
│   └── CTABanner.tsx                 # Call-to-action
├── api/
│   └── youtube/
│       └── analyze/                  # API endpoint for analysis
│           └── route.ts
└── tools/
    └── engagement-calculator/
        ├── page.tsx                  # Main tool page
        └── results/
            └── page.tsx              # Results display page

lib/
├── types.ts                           # TypeScript interfaces
├── utils/
│   ├── cn.ts                         # Class name utility
│   └── formatters.ts                 # Number formatting
└── youtube/
    └── constants.ts                  # Ghost Score tiers & API config

tailwind.config.ts                     # Tailwind configuration
next.config.ts                         # Next.js configuration
tsconfig.json                          # TypeScript configuration
```

## Error Handling

The tool gracefully handles:
- **Invalid URLs**: Validation and helpful error messages
- **Private videos**: Skipped with explanatory message
- **Disabled comments**: Detected and reported
- **API quota exceeded**: Informative message
- **Network errors**: Retry suggestions

## Limitations

- Maximum 3 videos per analysis session
- Maximum 200 comments per video analyzed
- YouTube API quota limits apply (1 million requests per day)
- Comments disabled on video cannot be analyzed
- Private/unlisted videos cannot be analyzed

## Performance

- Optimized image loading with Next.js Image component
- Lazy loading for below-the-fold content
- Session storage for result persistence
- Responsive design ensures fast loading on mobile

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Context: Job Application

This tool was built as part of a job application for a **Growth Marketing Engineer role at Buffer**. It demonstrates:

- Deep understanding of Buffer's brand and design system
- Full-stack development capabilities (frontend + backend)
- API integration and data analysis
- User-centric design thinking
- Production-ready code quality

The Ghost Score concept showcases how Buffer Community can help creators understand and improve their audience engagement patterns.

## Future Enhancements

Potential features for expansion:
- Historical engagement tracking
- Comparative analysis across channels
- AI-powered reply suggestions
- Export analytics as PDF report
- Integration with Buffer's publishing tools
- Custom engagement benchmarks
