import { Request, Response } from 'express';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { photoQueries } from './queries';
import { pool } from '../../db';



export const photoController = {
  create: tryCatchAsync(
    async (req: Request, res: Response) => {
      const { caption, url, categories, blogPosts, photoshoots } = req.body;
      const client = await pool.connect();
      
      client.query('BEGIN');
      // Create photo

      const {
        rows: [photoId],
      } = await pool.query('');

      // Create photo-category relations
    },
    () => pool.query('ROLLBACK')
  ),

  getAll: async (_req: Request, res: Response) => {
    const { rows: allPhotos } = await pool.query(
      photoQueries.getPhotosWithMetadata()
    );

    return res.json({ allPhotos });
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const {
      rows: [photo],
    } = await pool.query(
      photoQueries.getPhotosWithMetadata(`WHERE photos.id = $1`),
      [id]
    );

    return res.json({ photo });
  },

  getByCategory: async (req: Request, res: Response) => {
    const { category } = req.params;

    const { rows: photosByCategory } = await pool.query(
      photoQueries.getPhotosByCategory,
      [category]
    );

    return res.json({ photosByCategory });
  },
};
