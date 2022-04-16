import express from 'express';
import { signin, signup} from '../controllers/user.js';

const router = express.Router();
//we have to send all the information from the log in form to the backend
router.post('/signin', signin);
router.post('/signup', signup);

export default router;