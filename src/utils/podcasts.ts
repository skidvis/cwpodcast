import fs from 'fs';
import path from 'path';

export interface Podcast {
  filename: string;
  title: string;
  date: Date;
  url: string;
}

export function getPodcasts(): Podcast[] {
  const filesDir = path.join(process.cwd(), 'files');
  
  // Check if directory exists
  if (!fs.existsSync(filesDir)) {
    return [];
  }
  
  // Get all mp3 files
  const files = fs.readdirSync(filesDir)
    .filter(file => file.endsWith('.mp3'));
  
  // Parse podcast information from filenames
  return files.map(filename => {
    // Extract date from filename (assuming format: name-YYYY-MM-DD.mp3)
    const match = filename.match(/^(.+)-(\d{4}-\d{2}-\d{2})\.mp3$/);
    
    let title = filename.replace('.mp3', '');
    let date = new Date();
    
    if (match) {
      const [_, name, dateStr] = match;
      // title = name.split('-').map(word => 
      //   word.charAt(0).toUpperCase() + word.slice(1)
      // ).join(' ');
      date = new Date(dateStr);
    }
    
    return {
      filename,
      title,
      date,
      url: `/files/${encodeURIComponent(filename)}`
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first
}
