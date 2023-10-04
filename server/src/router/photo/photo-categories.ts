import { Router } from 'express';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { pool } from '../../db';

const photoCategoriesRouter = Router();

photoCategoriesRouter.get(
  '/',
  tryCatchAsync(async (req, res) => {
    const { rows: photoCategories } = await pool.query(`
        SELECT * FROM photo_categories
    `);

    return res.json({ photoCategories });
  })
);

photoCategoriesRouter.post(
  '/',
  tryCatchAsync(async (req, res) => {
    const { slug, display_name } = req.body;
    const {
      rows: [photoCategory],
    } = await pool.query(
      `
    INSERT INTO photo_categories (slug, display_name)
    VALUES ($1, $2)
    RETURNING *
    `,
      [slug, display_name]
    );

    return res.json({ photoCategory });
  })
);

export { photoCategoriesRouter };
