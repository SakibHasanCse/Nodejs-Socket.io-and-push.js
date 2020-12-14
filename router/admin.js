import express from 'express';
const router = express.Router()
import { dashboard } from './../controller/admin';

router.get('/admin', dashboard)


export default router