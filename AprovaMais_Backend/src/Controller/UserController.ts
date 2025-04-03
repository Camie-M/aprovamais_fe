import { Request, Response } from 'express';
import { UserEntity } from '../Entity/UserEntity';

const userEntity = new UserEntity();

export const createUser = async (req: Request, res: Response) => {
  const { username, password, role, school } = req.body;
  const user = await userEntity.createUser(username, password, role, school);
  res.json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const user = await userEntity.updateUser(Number(id), data);
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await userEntity.deleteUser(Number(id));
  res.sendStatus(204);
};

export const listUsers = async (req: Request, res: Response) => {
  const users = await userEntity.listUsers();
  res.json(users);
};
