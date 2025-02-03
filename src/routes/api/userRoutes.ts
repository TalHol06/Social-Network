import Router from 'express';

const router = Router();
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUser,
  addFriend,
  removeFriend
} from '../../controllers/UserController.js';

router.route('/').get(getAllUsers).post(createUser);

router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUser);

router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);

export { router as userRouter };