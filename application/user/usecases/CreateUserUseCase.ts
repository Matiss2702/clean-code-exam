// application/user/usecases/CreateUserUseCase.ts

import { UserRepository } from "@domain/repositories/UserRepository.ts";
import { AuthServiceInterface } from "@domain/services/AuthServiceInterface.ts";
import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";
import { User } from "@domain/entities/User.ts";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthServiceInterface,
    private uuidGenerator: UuidGenerator
  ) {}

  public async execute(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists with this email.");
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format.");
    }

    const userId = this.uuidGenerator.generateUuid();

    const hashedPassword = await this.authService.hashPassword(password);

    const user = new User(userId, name, email, hashedPassword);

    return await this.userRepository.createUser(user);
  }
}
