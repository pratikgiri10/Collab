import express from 'express'
import {Login, createInitialAdmin} from '../controllers/adminController/adminAuth.controller.js'
import { viewUser, deleteUser } from '../controllers/adminController/manageUser.controller.js';
import { viewScheduledMeetings, deleteMeeting } from '../controllers/adminController/manageMeeting.controller.js';
const router = express.Router();

router.post('/login', Login);
router.post('/register', createInitialAdmin);
router.get('/getusers', viewUser);
router.delete('/deleteuser', deleteUser);

router.get('/scheduledmeetings', viewScheduledMeetings);
router.delete('/deletemeeting', deleteMeeting);

export default router;
