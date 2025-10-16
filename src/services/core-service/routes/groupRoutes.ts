import express, { Request, Response } from 'express';
import { groupController } from '../controllers';
import { validatePagination } from '../../../shared/middlewares/validation/validadePagination';
import { validateIdParam } from '../../../shared/middlewares/validation/validadeIdParam';

const router = express.Router();

router.post('/', (req: Request, res: Response) =>
  groupController.createGroup(req, res)
);
router.get('/', validatePagination, (req: any, res: Response) => {
  groupController.getGroups(req, res);
});
router.get('/:id', validateIdParam, (req: Request, res: Response) =>
  groupController.getGroupById(req, res)
);
router.delete('/:id', validateIdParam, (req: Request, res: Response) =>
  groupController.deleteGroup(req, res)
);
router.patch('/:id', validateIdParam, (req: Request, res: Response) =>
  groupController.updateGroupById(req, res)
);

export default router;
