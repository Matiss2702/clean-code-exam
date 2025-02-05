import { UserRepository } from "@domain/repositories/UserRepository.ts";
import { User } from "@domain/entities/User.ts";

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(userId: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(userId);
    return user;
  }
}
