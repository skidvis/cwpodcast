import { defineCollection, z } from 'astro:content';

const episodesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    link: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    date: z.coerce.date(),
    audioFile: z.string(),
  }),
});

export const collections = {
  episodes: episodesCollection,
};
