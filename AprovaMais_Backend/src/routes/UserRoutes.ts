import { Router } from 'express';
import { createUser, deleteUser, listUsers, updateUser } from '../Controller/UserController';

const router = Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', listUsers);

export default router;
