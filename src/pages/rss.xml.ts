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
      content: 'http://purl.org/rss/1.0/modules/content/',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
      atom: 'http://www.w3.org/2005/Atom'
    },
    items: podcasts.map((podcast: CollectionEntry<'episodes'>) => {
      const episodeUrl = new URL(`/episodes/${podcast.slug}`, site).toString();
      const audioUrl = `${podcastSettings.paths.audio}/${podcast.data.audioFile}`;
      const description = podcast.data.description || `${podcast.data.title} - ${new Date(podcast.data.date).toLocaleDateString()}`;
      
      return {
        title: podcast.data.title,
        pubDate: podcast.data.date,
        description: description,
        link: episodeUrl,
        content: description,
        enclosure: {
          url: audioUrl,
          type: 'audio/mpeg',
          // We don't have the file size, but RSS requires it
          // This is a workaround - in a real app, you'd get the actual file size
          length: 0
        },
        customData: `
          <itunes:title>${podcast.data.title}</itunes:title>
          <itunes:author>${podcastSettings.itunes.author}</itunes:author>
          <itunes:duration>00:30:00</itunes:duration>
          <itunes:summary><![CDATA[${description}]]></itunes:summary>
          <itunes:explicit>${podcastSettings.itunes.explicit ? 'true' : 'false'}</itunes:explicit>
          <itunes:episodeType>full</itunes:episodeType>
          <googleplay:description><![CDATA[${description}]]></googleplay:description>
          <guid isPermaLink="false">${podcast.slug}</guid>
        `
      };
    }),
    customData: `
      <language>en-us</language>
      <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
      <atom:link href="${new URL('/rss.xml', site).toString()}" rel="self" type="application/rss+xml" />
      <itunes:author>${podcastSettings.itunes.author}</itunes:author>
      <itunes:summary><![CDATA[${podcastSettings.description}]]></itunes:summary>
      <itunes:type>episodic</itunes:type>
      <itunes:category text="${podcastSettings.itunes.category}"/>
      <itunes:explicit>${podcastSettings.itunes.explicit ? 'true' : 'false'}</itunes:explicit>
      <itunes:image href="${new URL('/videobg.png', site).toString()}"/>
      <itunes:owner>
        <itunes:name>${podcastSettings.itunes.owner.name}</itunes:name>
        <itunes:email>${podcastSettings.itunes.owner.email}</itunes:email>
      </itunes:owner>
      <googleplay:author>${podcastSettings.itunes.author}</googleplay:author>
      <googleplay:description><![CDATA[${podcastSettings.description}]]></googleplay:description>
      <googleplay:category text="${podcastSettings.itunes.category}"/>
      <googleplay:explicit>${podcastSettings.itunes.explicit ? 'yes' : 'no'}</googleplay:explicit>
      <googleplay:image href="${new URL('/videobg.png', site).toString()}"/>
      <copyright>© ${new Date().getFullYear()} ${podcastSettings.website.name}</copyright>
    `
  });
}
