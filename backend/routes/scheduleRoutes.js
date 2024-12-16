import express from 'express';
import { scheduleMeeting, meetingDetails, deleteMeeting, getByMeetingId, updateByMeetingId } from '../controllers/meeting.controller.js';
const router = express.Router();

router.post('/schedule',scheduleMeeting);
router.get('/details', meetingDetails);
router.delete('/delete',deleteMeeting);
router.get('/:id', getByMeetingId);
router.put('/update/:id', updateByMeetingId);

export default router;
