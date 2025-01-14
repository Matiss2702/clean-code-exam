import { UserRepository } from "@domains/user/repositories/UserRepository.ts";
import { User } from "@domains/user/entities/User.ts";

export class InMemoryUserRepository implements UserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findUserById(id: string): Promise<User | null> {
    return this.users.find((user) => user.id === id) || null;
  }
}
