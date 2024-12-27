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

//Auth routes
router.use('/auth', authRoutes);
//User routes
router.use('/users', usersRoutes);
//Location routes
router.use('/locations', locationsRoutes);
//Specs routes
router.use('/specs', specsRoutes);
//Product routes
router.use('/products', productsRoutes);
//Project routes
router.use('/projects', projectsRoutes);
//Equipment routes
router.use('/equipments', equipmentsRoutes);
//Reservation routes
router.use('/reservations', reservationsRoutes);

export default router;