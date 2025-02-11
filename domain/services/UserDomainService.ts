export class UserDomainService {
  public static isEmailValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }

  public static hashPassword(password: string): string {
    return `hashed_${password}`;
  }
}
