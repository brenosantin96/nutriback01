import { Router } from 'express';

import * as UserController from '../controllers/userController';
import {Auth} from '../middlewares/Auth';

const router = Router();

router.get('/ping', UserController.ping);
router.get('/users', Auth.private, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

export default router;