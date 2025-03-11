# CoveredWheel.com Podcast

A podcast directory and RSS feed built with Astro.

## Features

- Display podcast episodes with audio player
- Download MP3 files
- Auto-updating RSS feed for podcast subscribers
- iTunes podcast feed compatible
- Responsive design

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:4321`

## Adding New Podcasts

To add new podcast episodes, simply place MP3 files in the `files` directory. The filename format should be:

```
name-YYYY-MM-DD.mp3
```

For example: `coveredwheel-2025-03-11.mp3`

The application will automatically:
- Extract the title from the filename (converting to title case)
- Extract the date from the filename
- Add the new episode to the podcast list
- Update the RSS feed

## Building for Production

To build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## RSS Feed

The RSS feed is available at `/rss.xml` and is compatible with podcast players and iTunes.

## Project Structure

```text
/
├── files/                  # MP3 files directory
│   └── *.mp3               # Podcast episode files
├── public/                 # Static assets
│   └── favicon.svg
├── src/
│   ├── components/         # UI components
│   │   └── PodcastList.astro
│   ├── layouts/            # Page layouts
│   │   └── Layout.astro
│   ├── pages/              # Page routes
│   │   ├── index.astro     # Main podcast page
│   │   ├── rss.xml.ts      # RSS feed generator
│   │   └── files/[...file].ts # Dynamic route for serving MP3 files
│   └── utils/              # Utility functions
│       └── podcasts.ts     # Podcast file scanner
└── package.json
```

## Technologies Used

- [Astro](https://astro.build/) - The web framework
- [@astrojs/rss](https://docs.astro.build/en/guides/rss/) - RSS feed generation
