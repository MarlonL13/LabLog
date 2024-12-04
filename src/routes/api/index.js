import express from 'express';
const router = express.Router();
import usersRoutes from './usersRoutes.js';
import authRoutes from './authRoutes.js';
import locationsRoutes from './locationsRoutes.js';
import productsRoutes from './productsRoutes.js';
import projectsRoutes from './projectsRoutes.js';
import equipmentsRoutes from './equipmentsRoutes.js';
import reservationsRoutes from './reservationsRoutes.js';

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/locations', locationsRoutes);
router.use('/products', productsRoutes);
router.use('/projects', projectsRoutes);
router.use('/equipments', equipmentsRoutes);
router.use('/reservations', reservationsRoutes);

export default router;