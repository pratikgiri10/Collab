import express from 'express';
import { createRoom, getParticipants, joinRoom, leaveRoom } from '../controllers/room.controller.js';
const router = express.Router();

router.post('/create',createRoom);
router.post('/join',joinRoom);
router.post('/leave', leaveRoom);
router.get('/participants', getParticipants);

export default router;
