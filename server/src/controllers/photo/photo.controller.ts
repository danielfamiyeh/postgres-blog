import { Request, Response } from 'express';

import { photoQueries } from './queries';
import { pool } from '../../db';

export const photoController = {
  getById: async (req: Request, res: Response) => {
    const { id } = req.params;

    const { rows: photos } = await pool.query(
      photoQueries.getPhotosWithMetadata(`WHERE photos.id = $1`),
      [id]
    );

    return res.json({ photos });
  },
};
