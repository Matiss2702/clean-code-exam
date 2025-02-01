import { UserRepository } from "@domain/user/repositories/UserRepository.ts";
import { User } from "@domain/user/entities/User.ts";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }
}
