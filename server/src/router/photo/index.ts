import { Router } from 'express';

import { photoCategoriesRouter } from './photo-categories';
import { photosToCategoriesRouter } from './photos-to-categories';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { pool } from '../../db';

const photoRouter = Router();

photoRouter.use('/categories', photoCategoriesRouter);
photoRouter.use('/photos-to-categories', photosToCategoriesRouter);

photoRouter.get(
  '/:id',
  tryCatchAsync(async (req, res) => {
    const { id } = req.params;

    const {
      rows: [photo],
    } = await pool.query(
      `
        SELECT photos.id, photos.caption, photos.url, photo_categories.slug, photo_categories.display_name AS
        FROM photos
        LEFT JOIN photos_to_categories ON photos.id = photos_to_categories.photo_id
        LEFT JOIN photo_categories ON photos_to_categories.category_slug = photo_categories.slug
        WHERE photos.id = $1;
        `,
      [id]
    );

    return res.json(photo);
  })
);

export { photoRouter };
