import { UserRepository } from "@domains/user/repositories/UserRepository.ts";
import { UserDTO } from "@application/user/dto/UserDTO.ts";

export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  public async execute(id: string): Promise<UserDTO | null> {
    const user = await this.userRepo.findUserById(id);
    if (!user) return null;
    return { id: user.id, name: user.name, email: user.email };
  }
}
