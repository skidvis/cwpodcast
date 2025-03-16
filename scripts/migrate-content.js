import fs from 'fs';
import path from 'path';

// Create content directory if it doesn't exist
const contentDir = path.join(process.cwd(), 'src', 'content', 'episodes');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Get all markdown files from the files directory
const filesDir = path.join(process.cwd(), 'files');
const mdFiles = fs.readdirSync(filesDir)
  .filter(file => file.endsWith('.md'));

// Process each markdown file
mdFiles.forEach(mdFile => {
  const mdPath = path.join(filesDir, mdFile);
  const mdContent = fs.readFileSync(mdPath, 'utf-8');
  
  // Extract frontmatter
  const frontmatterMatch = mdContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.error(`No frontmatter found in ${mdFile}`);
    return;
  }
  
  const frontmatterStr = frontmatterMatch[1];
  const content = frontmatterMatch[2];
  
  // Parse frontmatter
  const frontmatter = {};
  frontmatterStr.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      
      // Remove quotes if present
      if ((value.startsWith("'") && value.endsWith("'")) || 
          (value.startsWith('"') && value.endsWith('"'))) {
        value = value.slice(1, -1);
      }
      
      frontmatter[key] = value;
    }
  });
  
  // Extract date from filename (assuming format: name-YYYY-MM-DD.md)
  const dateMatch = mdFile.match(/^(.+)-(\d{4}-\d{2}-\d{2})\.md$/);
  let dateStr = new Date().toISOString().split('T')[0]; // Default to today
  
  if (dateMatch) {
    dateStr = dateMatch[2];
  }
  
  // Create new frontmatter with date and audioFile
  const audioFile = mdFile.replace('.md', '.mp3');
  const newFrontmatter = {
    ...frontmatter,
    date: dateStr,
    audioFile: audioFile
  };
  
  // Format new frontmatter
  let newFrontmatterStr = '---\n';
  Object.entries(newFrontmatter).forEach(([key, value]) => {
    // Format date properly
    if (key === 'date') {
      newFrontmatterStr += `${key}: ${value}\n`;
    } else {
      newFrontmatterStr += `${key}: "${value}"\n`;
    }
  });
  newFrontmatterStr += '---\n\n';
  
  // Create new content file
  const slug = mdFile.replace('.md', '');
  const newFilePath = path.join(contentDir, `${slug}.md`);
  
  fs.writeFileSync(newFilePath, newFrontmatterStr + content);
  console.log(`Migrated ${mdFile} to ${newFilePath}`);
});

console.log('Content migration complete!');
