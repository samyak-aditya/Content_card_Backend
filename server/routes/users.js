import express from "express";
import {signin, signup} from '../controllers/user.js'

const router = express.Router();

router.post('user/signin', signin);
router.post('user/signup', signup);

export default router;