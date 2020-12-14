import express from 'express';
const router = express.Router()
import { newUser, postnewUser, loginUser, postLoginUser, profile, updateuser } from './../controller/user';

router.get('/ragister', newUser)
router.post('/ragister', postnewUser)
router.get('/profile', profile)
router.post('/profile', updateuser)

router.get('/login', loginUser)
router.post('/login', postLoginUser)


export default router