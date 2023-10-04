import { Router } from 'express';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { pool } from '../../db';

const photosToCategoriesRouter = Router();

photosToCategoriesRouter.get(
  '/',
  tryCatchAsync(async (req, res) => {
    const {
      rows: photosToCategories,
    } = await pool.query(`
        SELECT * FROM photos_to_categories
    `);

    return res.json({ photosToCategories });
  })
);

photosToCategoriesRouter.post(
  '/',
  tryCatchAsync(async (req, res) => {
    const { photoId, categorySlug } = req.body;
    const {
      rows: [photoCategoryRelation],
    } = await pool.query(
      `
      INSERT INTO photos_to_categories (photo_id, category_slug)
      VALUES ($1, $2)
      RETURNING *
    `,
      [photoId, categorySlug]
    );

    return res.json({ photoCategoryRelation });
  })
);

export { photosToCategoriesRouter };
