import Router from 'express';

const router = Router();

import {
  getThoughts,
  getThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../../controllers/ThoughtsController.js';

router.route('/').get(getThoughts);

router.route('/user/:userId').post(createThought);

router.route('/:thoughtId').get(getThought).put(updateThought).post(addReaction);

router.route('/:thoughtId/user/:userId').delete(deleteThought);

router.route('/:thoughtId/reaction').post(addReaction);
router.route('/:thoughtId/reaction/:reactionId').delete(removeReaction);

export { router as thoughtRouter };