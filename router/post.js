import express from 'express';
import { newPost } from './../controller/posts';
const router = express.Router()



router.get('/', newPost )


export default router