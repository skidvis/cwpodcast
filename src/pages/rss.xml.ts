import rss from '@astrojs/rss';
import { getCollection, type CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { podcastSettings } from '../config/settings';

export async function GET(context: APIContext) {
  const episodeEntries = await getCollection('episodes');
  const podcasts = episodeEntries.sort(
    (a: CollectionEntry<'episodes'>, b: CollectionEntry<'episodes'>) => 
      b.data.date.getTime() - a.data.date.getTime()
  );
  const site = context.site || new URL(podcastSettings.siteUrl);
  
  return rss({
    title: podcastSettings.title,
    description: podcastSettings.description,
    site: site.toString(),
    xmlns: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      content: 'http://purl.org/rss/1.0/modules/content/'
    },
  items: podcasts.map((podcast: CollectionEntry<'episodes'>) => ({
    title: podcast.data.title,
    pubDate: podcast.data.date,
    description: podcast.data.description || `${podcast.data.title} - ${new Date(podcast.data.date).toLocaleDateString()}`,
    link: new URL(`/episodes/${podcast.slug}`, site).toString(),
    enclosure: {
      url: new URL(`/files/${podcast.data.audioFile}`, site).toString(),
      type: 'audio/mpeg',
      // We don't have the file size, but RSS requires it
      // This is a workaround - in a real app, you'd get the actual file size
      length: 0
    }
  })),
    customData: `
      <language>en-us</language>
      <itunes:author>${podcastSettings.itunes.author}</itunes:author>
      <itunes:category text="${podcastSettings.itunes.category}"/>
      <itunes:explicit>${podcastSettings.itunes.explicit ? 'true' : 'false'}</itunes:explicit>
      <itunes:image href="${new URL('/favicon.svg', site).toString()}"/>
      <itunes:owner>
        <itunes:name>${podcastSettings.itunes.owner.name}</itunes:name>
        <itunes:email>${podcastSettings.itunes.owner.email}</itunes:email>
      </itunes:owner>
    `
  });
}
