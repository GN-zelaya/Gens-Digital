import { Router } from 'express';
import { createProductsController } from '../controllers/productsController.js';

export function createProductsRoutes(pool) {
  const router = Router();
  const controller = createProductsController(pool);

  router.get('/by-code', controller.findByScanCode);

  return router;
}