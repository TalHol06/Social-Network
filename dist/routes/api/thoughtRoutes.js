import Router from 'express';
const router = Router();
import { getThoughts, getThought, createThought,
// updateThought,
// deleteThought,
// addReaction,
// removeReaction
 } from '../../controllers/ThoughtsController.js';
router.route('/').get(getThoughts);
router.route('/user/:userId/thoughts').post(createThought);
router.route('/:thoughtId').get(getThought);
export { router as thoughtRouter };
//# sourceMappingURL=thoughtRoutes.js.map