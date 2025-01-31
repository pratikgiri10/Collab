import express from 'express'
import { viewUser, deleteUser, addUser, editUser } from '../controllers/adminController/manageUser.controller.js';
import { viewScheduledMeetings, deleteMeeting, deleteAllMeetings, editMeeting, addMeeting } from '../controllers/adminController/manageMeeting.controller.js';
import { deleteRoom, getActiveRoomsDetail, getActiveSessions, getRoomsDetail } from '../controllers/adminController/manageRooms.controller.js';
import { getActiveRooms, getTotalMeetings, getTotalUsers } from '../controllers/adminController/dashboard.controller.js';
const router = express.Router();



router.get('/getusers', viewUser);
router.post('/addUser', addUser);
router.put('/editUser', editUser);
router.delete('/deleteuser', deleteUser);

router.get('/scheduledmeetings', viewScheduledMeetings);
router.post('/addMeeting', addMeeting);
router.put('/editMeeting/:id', editMeeting);
router.delete('/deletemeeting', deleteMeeting);
router.delete('/deleteallmeetings', deleteAllMeetings);

router.get('/roomDetail', getRoomsDetail);
router.get('/activeRoomDetail', getActiveRoomsDetail);

router.get('/totalUsers', getTotalUsers);
router.get('/activeRooms', getActiveRooms);
router.get('/activeSessions', getActiveSessions);
router.get('/totalMeetings', getTotalMeetings)
router.delete('/deleteRoom', deleteRoom);

export default router;
