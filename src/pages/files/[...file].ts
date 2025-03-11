import type { APIRoute, GetStaticPathsResult } from 'astro';
import fs from 'fs';
import path from 'path';
import { getPodcasts } from '../../utils/podcasts';

// This function is required for dynamic routes in static builds
export function getStaticPaths(): GetStaticPathsResult {
  const podcasts = getPodcasts();
  
  // Return paths for all podcast files
  return podcasts.map(podcast => ({
    params: { file: podcast.filename }
  }));
}

export const GET: APIRoute = async ({ params }) => {
  // Get the file path from the params
  const filePath = path.join(
    process.cwd(),
    'files',
    params.file || ''
  );
  
  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    return new Response('File not found', { status: 404 });
  }
  
  try {
    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    
    // Determine content type based on file extension
    let contentType = 'application/octet-stream';
    if (filePath.endsWith('.mp3')) {
      contentType = 'audio/mpeg';
    }
    
    // Return the file with appropriate headers
    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `inline; filename="${path.basename(filePath)}"`,
        'Cache-Control': 'public, max-age=31536000' // Cache for 1 year
      }
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new Response('Error serving file', { status: 500 });
  }
};
