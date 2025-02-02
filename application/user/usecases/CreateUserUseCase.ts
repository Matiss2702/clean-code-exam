// application/user/usecases/CreateUserUseCase.ts

import { UserRepository } from "@domain/user/repositories/UserRepository.ts";
import { AuthServiceInterface } from "@domain/user/services/AuthServiceInterface.ts";
import { UuidGenerator } from "@domain/user/utils/UuidGenerator.ts";
import { User } from "@domain/user/entities/User.ts";

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

    // Vérifier si l'email est valide
    if (!/\S+@\S+\.\S+/.test(email)) {
      throw new Error("Invalid email format.");
    }

    // Générer un ID unique
    const userId = this.uuidGenerator.generateUuid();

    // Hasher le mot de passe
    const hashedPassword = await this.authService.hashPassword(password);

    // Créer un utilisateur
    const user = new User(userId, name, email, hashedPassword);

    // Sauvegarder en base de données
    return await this.userRepository.createUser(user);
  }
}
