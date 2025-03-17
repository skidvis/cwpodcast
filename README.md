# Generic Podcast Site

A customizable podcast website built with Astro that can be easily configured for any podcast.

## Features

- Responsive design that works on all devices
- RSS feed for podcast directories (Apple Podcasts, Spotify, etc.)
- Episode pages with audio player and download options
- Customizable theme and branding
- Easy deployment with Docker

## Getting Started

### Prerequisites

- Node.js 18.17.x or higher
- npm or yarn

### Installation

1. Clone this repository
```bash
git clone https://github.com/yourusername/podcast-site.git
cd podcast-site
```

2. Install dependencies
```bash
npm install
```

3. Customize your podcast settings
Edit the file at `src/config/settings.ts` to match your podcast information.

4. Run the development server
```bash
npm run dev
```

5. Visit `http://localhost:4321` to see your site

## Configuration

All podcast-specific settings are in `src/config/settings.ts`. This includes:

- Podcast title and description
- Website information
- iTunes/podcast feed details
- Theme colors
- Deployment settings

Example configuration:

```typescript
export const podcastSettings = {
  // Basic podcast information
  title: 'My Amazing Podcast',
  description: 'Listen to the latest episodes of My Amazing Podcast',
  
  // Website information
  website: {
    name: 'MyPodcast.com',
    url: 'https://www.mypodcast.com/',
  },
  
  // Site URL for RSS feed and links
  siteUrl: 'https://podcast.mypodcast.com/',
  
  // iTunes/Podcast information
  itunes: {
    author: 'Podcast Author',
    category: 'Technology',
    explicit: false,
    owner: {
      name: 'Podcast Owner',
      email: 'info@mypodcast.com',
    },
  },
  
  // Promotional content (optional)
  promotions: [
    {
      text: 'Check out our sponsor',
      url: 'https://sponsor.com/mypodcast',
    },
  ],
  
  // File paths configuration
  paths: {
    audio: '/files', // Path where audio files are served from
  },
  
  // Deployment configuration
  deployment: {
    docker: {
      username: 'dockerusername',
      imageName: 'podcast-site',
    },
  },
  
  // Theme configuration
  theme: {
    colors: {
      primary: '#4a6cf7',
      primaryHover: '#3a5ce5',
      text: '#333',
      textLight: '#666',
      background: '#f5f7fa',
    },
  },
};
```

## Adding Episodes

1. Add your MP3 file to the `files/` directory with the naming format: `name-YYYY-MM-DD.mp3`
2. Create a markdown file in `src/content/episodes/` with the same name (e.g., `name-YYYY-MM-DD.md`)
3. Add frontmatter to the markdown file:

```markdown
---
title: "Episode Title"
description: "Episode description goes here"
date: 2025-03-16
audioFile: "name-2025-03-16.mp3"
---

Episode show notes and content go here.
```

## Deployment

### Docker

This project includes a Dockerfile and GitHub Actions workflow for easy deployment.

1. Set up the following secrets in your GitHub repository:
   - `DOCKERHUB_USERNAME`: Your Docker Hub username
   - `DOCKERHUB_TOKEN`: Your Docker Hub access token

2. When you create a new release in GitHub, the workflow will automatically:
   - Build the site
   - Create a Docker image
   - Push the image to Docker Hub

3. You can then deploy the Docker image to your hosting provider.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
