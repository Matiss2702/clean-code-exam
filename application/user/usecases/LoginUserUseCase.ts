import { UserRepository } from "@domain/repositories/UserRepository.ts";
import { AuthServiceInterface } from "@domain/services/AuthServiceInterface.ts";

export class LoginUserUseCase {
  constructor(private userRepository: UserRepository, private authService: AuthServiceInterface) {}

  public async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValid = await this.authService.comparePassword(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Invalid credentials");
    }

    // Générer un token
    const token = await this.authService.generateToken({ userId: user.id, email: user.email });
    return token;
  }
}
