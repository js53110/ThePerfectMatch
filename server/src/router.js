import admin from './admin/index';
import authenticate from './shared/auth/authenticate';
import category from './category/index';
import refresh from './shared/auth/refresh';
import { Router } from 'express';
import user from './user/index';

const router = Router();

router
  .use(user.path, user.router)
  .use(authenticate)
  .use(refresh)
  .use(category.path, category.router)
  .use(admin.path, admin.router);

export default router;
