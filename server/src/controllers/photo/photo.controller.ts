import { Request, Response } from 'express';

import { photoQueries } from './queries';
import { pool } from '../../db';

export const photoController = {
  getAll: async (_req: Request, res: Response) => {
    const { rows: allPhotos } = await pool.query(
      photoQueries.getPhotosWithMetadata()
    );

    return res.json({ allPhotos });
  },

  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const { rows: [photo] } = await pool.query(
      photoQueries.getPhotosWithMetadata(`WHERE photos.id = $1`),
      [id]
    );

    return res.json({ photo });
  },
};
