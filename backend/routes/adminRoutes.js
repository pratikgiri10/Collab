import express from 'express'
import {Login, checkSession, createInitialAdmin, destroySession} from '../controllers/adminController/adminAuth.controller.js'
import { viewUser, deleteUser } from '../controllers/adminController/manageUser.controller.js';
import { viewScheduledMeetings, deleteMeeting, deleteAllMeetings } from '../controllers/adminController/manageMeeting.controller.js';
import { getActiveRoomsDetail, getRoomsDetail } from '../controllers/adminController/manageRooms.controller.js';
const router = express.Router();

router.post('/login', Login);
router.post('/register', createInitialAdmin);

router.get('/session/check', checkSession);
router.get('/session/destroy', destroySession);

router.get('/getusers', viewUser);
router.delete('/deleteuser', deleteUser);

router.get('/scheduledmeetings', viewScheduledMeetings);
router.delete('/deletemeeting', deleteMeeting);
router.delete('/deleteallmeetings', deleteAllMeetings);

router.get('/roomDetail', getRoomsDetail);
router.get('/activeRoomDetail', getActiveRoomsDetail);

export default router;
