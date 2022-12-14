import express from 'express';

import {
    getUser,
    getUserFriends,
    addRmoveFriend,
} from '../controllers/userController.js';

import { verifyToken } from '../middleware/authmiddleware.js';

const router = express.Router();
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// update
router.patch("/:id/:friendId", verifyToken, addRmoveFriend);

export default router;
