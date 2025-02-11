import { UserRepository } from "@domain/repositories/UserRepository.ts";
import { User } from "@domain/entities/User.ts";

export class GetAllUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  public async execute(): Promise<User[]> {
    return await this.userRepository.findAll();
  }
}
