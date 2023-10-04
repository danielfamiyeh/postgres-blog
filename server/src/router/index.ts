import { Router } from 'express';

import { photoRouter } from './photo';
import { blogPostRouter } from './blog-post.router';

const router = Router();

router.use('/blog', blogPostRouter);
router.use('/photo', photoRouter);

export { router };
