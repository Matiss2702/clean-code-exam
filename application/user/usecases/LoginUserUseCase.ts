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
    const token = await this.authService.generateToken({ userId: user.id, email: user.email });

    // Décode le token pour vérifier le payload
    const tokenParts = token.split(".");
    if (tokenParts.length === 3) {
      // Les tokens JWT comportent trois parties : header.payload.signature
      // Le payload est en base64. On peut le décoder pour voir son contenu.
      const payloadBase64 = tokenParts[1];
      // Assurez-vous que la chaîne a le bon padding
      const padded = payloadBase64.padEnd(payloadBase64.length + ((4 - (payloadBase64.length % 4)) % 4), "=");
      const tokenPayload = JSON.parse(atob(padded));
      console.log("Payload du token :", tokenPayload);
    } else {
      console.warn("Le token généré ne semble pas être un JWT valide.");
    }

    return token;
  }
}
