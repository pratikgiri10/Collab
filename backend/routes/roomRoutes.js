import express from 'express';
import { createRoom, getParticipants, getUserName, joinRoom, leaveRoom } from '../controllers/room.controller.js';
const router = express.Router();

router.post('/create',createRoom);
router.post('/join',joinRoom);
router.post('/leave', leaveRoom);
router.post('/participants', getParticipants);
router.get('/getName',getUserName)

export default router;
