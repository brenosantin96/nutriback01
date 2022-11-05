import { Router } from 'express';

import * as UserController from '../controllers/userController';
import * as FoodController from '../controllers/foodController';
import {Auth} from '../middlewares/Auth';

const router = Router();

router.get('/ping', UserController.ping);
router.get('/users', Auth.privateAdmin, UserController.getAllUsers);
router.post('/login', UserController.login);
router.post('/signup', UserController.signUp);

//Food
router.get('/foods', FoodController.getAllFood);
router.get('/foods/:id', FoodController.getOneFood);
router.post('/foods', FoodController.createFood);
router.put('/foods/:id', FoodController.updateFood);
router.delete('/foods/:id', FoodController.deleteFood);

export default router;