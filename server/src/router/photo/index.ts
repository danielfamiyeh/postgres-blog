import { Router } from 'express';

import { photoCategoriesRouter } from './photo-categories';
import { photosToCategoriesRouter } from './photos-to-categories';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { controllers } from '../../controllers'

const photoRouter = Router();

photoRouter.use('/categories', photoCategoriesRouter);
photoRouter.use('/photos-to-categories', photosToCategoriesRouter);

photoRouter.get('/all', tryCatchAsync(controllers.photo.getAll))
photoRouter.get('/:id', tryCatchAsync(controllers.photo.getById));
photoRouter.get('/by-category/:category', tryCatchAsync(controllers.photo.getByCategory))

export { photoRouter };
