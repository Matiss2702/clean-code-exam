import { User } from "@domains/user/entities/User.ts";

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUserById(id: string): Promise<User | null>;
  findUserByEmail(email: string): Promise<User | null>;
}
