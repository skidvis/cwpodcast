import fs from 'fs';
import path from 'path';

export interface Podcast {
  filename: string;
  title: string;
  date: Date;
  url: string;
  description?: string;
}

interface Frontmatter {
  link?: string;
  title?: string;
  description?: string;
}

/**
 * Parse frontmatter from markdown content
 */
function parseFrontmatter(content: string): Frontmatter {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterStr = match[1];
  const frontmatter: Frontmatter = {};
  
  // Parse each line of the frontmatter
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      // Remove quotes if present
      let value = line.slice(colonIndex + 1).trim();
      if (value.startsWith("'") && value.endsWith("'")) {
        value = value.slice(1, -1);
      }
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key as keyof Frontmatter] = value;
    }
  });
  
  return frontmatter;
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
  
  // Parse podcast information from filenames and markdown frontmatter
  return files.map(filename => {
    // Extract date from filename (assuming format: name-YYYY-MM-DD.mp3)
    const match = filename.match(/^(.+)-(\d{4}-\d{2}-\d{2})\.mp3$/);
    
    let title = filename.replace('.mp3', '');
    let date = new Date();
    let description: string | undefined;
    
    if (match) {
      const [_, name, dateStr] = match;
      date = new Date(dateStr);
    }
    
    // Check if there's a corresponding markdown file
    const mdFilename = filename.replace('.mp3', '.md');
    const mdPath = path.join(filesDir, mdFilename);
    
    if (fs.existsSync(mdPath)) {
      try {
        const mdContent = fs.readFileSync(mdPath, 'utf-8');
        const frontmatter = parseFrontmatter(mdContent);
        
        // Use frontmatter data if available
        if (frontmatter.title) {
          title = frontmatter.title;
        }
        
        if (frontmatter.description) {
          description = frontmatter.description;
        }
      } catch (error) {
        console.error(`Error reading markdown file ${mdFilename}:`, error);
      }
    }
    
    return {
      filename,
      title,
      date,
      description,
      url: `/files/${encodeURIComponent(filename)}`
    };
  }).sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort by date, newest first
}
