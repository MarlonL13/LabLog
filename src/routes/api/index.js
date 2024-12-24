const router = express.Router();
import express from 'express';
import usersRoutes from './usersRoutes.js';
import authRoutes from './authRoutes.js';
import locationsRoutes from './locationsRoutes.js';
import specsRoutes from './specsRoutes.js';
import productsRoutes from './productsRoutes.js';
import projectsRoutes from './projectsRoutes.js';
import equipmentsRoutes from './equipmentsRoutes.js';
import reservationsRoutes from './reservationsRoutes.js';

// Aggregates all routes into one router
router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/locations', locationsRoutes);
router.use('/specs', specsRoutes);
router.use('/products', productsRoutes);
router.use('/projects', projectsRoutes);
router.use('/equipments', equipmentsRoutes);
router.use('/reservations', reservationsRoutes);

export default router;