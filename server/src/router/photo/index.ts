import { Router } from 'express';

import { photoCategoriesRouter } from './photo-categories';
import { photosToCategoriesRouter } from './photos-to-categories';

import { tryCatchAsync } from '../../utils/trycatch-async';
import { controllers } from '../../controllers'

const photoRouter = Router();

photoRouter.use('/categories', photoCategoriesRouter);
photoRouter.use('/photos-to-categories', photosToCategoriesRouter);

photoRouter.get('/:id', tryCatchAsync(controllers.photo.getById));
photoRouter.get('/all', controllers.photo.getAll)

export { photoRouter };
