import { UserRepository } from "@domains/user/repositories/UserRepository.ts";
import { User } from "@domains/user/entities/User.ts";
import { UserDomainService } from "@domains/user/services/UserDomainService.ts";
import { UserDTO } from "@application/user/dto/UserDTO.ts";

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  public async execute(
    name: string,
    email: string,
    password: string,
  ): Promise<UserDTO> {
    if (!UserDomainService.isEmailValid(email)) {
      throw new Error("Invalid email address");
    }
    const passwordHash = UserDomainService.hashPassword(password);
    const user = new User(crypto.randomUUID(), name, email, passwordHash);
    const createdUser = await this.userRepo.createUser(user);
    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }
}
