import rss from '@astrojs/rss';
import { getPodcasts } from '../utils/podcasts';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const podcasts = getPodcasts();
  const site = context.site || new URL('https://podcast.coveredwheel.com/');
  
  return rss({
    title: 'CoveredWheel.com Podcast',
    description: 'Listen to the latest episodes of the CoveredWheel.com Podcast',
    site: site.toString(),
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/'
    },
    items: podcasts.map(podcast => ({
      title: podcast.title,
      pubDate: podcast.date,
      description: podcast.description || `${podcast.title} - ${podcast.date.toLocaleDateString()}`,
      link: new URL(podcast.url, site).toString(),
      enclosure: {
        url: new URL(podcast.url, site).toString(),
        type: 'audio/mpeg',
        // We don't have the file size, but RSS requires it
        // This is a workaround - in a real app, you'd get the actual file size
        length: 0
      }
    })),
    customData: `
      <language>en-us</language>
      <itunes:author>CoveredWheel.com</itunes:author>
      <itunes:category text="Technology"/>
      <itunes:explicit>false</itunes:explicit>
      <itunes:image href="${new URL('/favicon.svg', site).toString()}"/>
      <itunes:owner>
        <itunes:name>CoveredWheel.com</itunes:name>
        <itunes:email>info@coveredwheel.com</itunes:email>
      </itunes:owner>
    `
  });
}
