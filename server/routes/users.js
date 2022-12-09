import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

const router = Router();

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//Update
router.put("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
