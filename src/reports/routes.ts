import { Router } from 'express';
import { isAuthenticated } from '../middleware/authenticated';
import { isAuthorized } from '../middleware/authorized';
import { Role } from '../models/enums';
import * as controller from './controller';

const reportsRouter = Router();

reportsRouter.get('/reports',
  isAuthenticated,
  isAuthorized({hasRole: Role.ADMIN}),
  controller.report
)

export default reportsRouter;