/**
 * Podcast Settings
 * 
 * This file contains all configurable settings for your podcast.
 * Edit these values to customize your podcast site.
 */

export const podcastSettings = {
  // Basic podcast information
  title: 'CoveredWheel.com Podcast',
  description: 'Listen to the latest episodes of the CoveredWheel.com Podcast',
  
  // Website information
  website: {
    name: 'CoveredWheel.com',
    url: 'https://www.coveredwheel.com/',
  },
  
  // Site URL for RSS feed and links
  siteUrl: 'https://podcast.coveredwheel.com/',
  
  // iTunes/Podcast information
  itunes: {
    author: 'CoveredWheel.com',
    category: 'Technology',
    explicit: false,
    owner: {
      name: 'CoveredWheel.com',
      email: 'info@coveredwheel.com',
    },
  },
  
  // Promotional content (optional)
  promotions: [
    'Plan your next options play with <a href="https://optionstrat.com/coveredwheel">OptionStrat</a>'
  ],
  
  // File paths configuration
  paths: {
    audio: 'https://storage.googleapis.com/sharkjets-podcasts/coveredwheel', // Path where audio files are served from
  },
  
  // Deployment configuration
  deployment: {
    docker: {
      username: 'skidvis',
      imageName: 'podcast-coveredwheel-com',
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
