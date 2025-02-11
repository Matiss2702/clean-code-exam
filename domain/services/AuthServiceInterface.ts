export interface AuthServiceInterface {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
  generateToken(payload: Record<string, unknown>): Promise<string>;
  verifyToken(token: string): Promise<Record<string, unknown>>;
}
