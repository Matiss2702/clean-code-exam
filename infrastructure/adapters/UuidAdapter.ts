import { UuidGenerator } from "@domain/user/utils/UuidGenerator.ts";

export class UuidAdapter implements UuidGenerator {
  generateUuid(): string {
    return crypto.randomUUID();
  }
}
