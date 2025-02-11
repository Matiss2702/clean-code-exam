import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create, verify, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts";
import { AuthServiceInterface } from "@domain/services/AuthServiceInterface.ts";

export class AuthService implements AuthServiceInterface {
  private key!: CryptoKey;
  private encoder = new TextEncoder();

  constructor(private secretKey: string) {}

  public async init(): Promise<void> {
    const keyBuf = this.encoder.encode(this.secretKey);
    this.key = await crypto.subtle.importKey("raw", keyBuf, { name: "HMAC", hash: "SHA-256" }, false, [
      "sign",
      "verify",
    ]);
  }

  public async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  public async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  public async generateToken(payload: Record<string, unknown>): Promise<string> {
    payload.exp = getNumericDate(60 * 60);

    return await create({ alg: "HS256", typ: "JWT" }, payload, this.key);
  }

  public async verifyToken(token: string): Promise<Record<string, unknown>> {
    return await verify(token, this.key);
  }
}
