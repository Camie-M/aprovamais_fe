import { UserRepository } from "../Repository/UserRepository";


const userRepository = new UserRepository();

export class UserEntity {
  async createUser(username: string, password: string, role: string, school: string) {
    return await userRepository.createUser(username, password, role, school);
  }

  async updateUser(id: number, data: any) {
    return await userRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    return await userRepository.deleteUser(id);
  }

  async listUsers() {
    return await userRepository.listUsers();
  }
}
