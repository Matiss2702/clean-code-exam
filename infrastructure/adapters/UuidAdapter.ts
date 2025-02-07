import { UuidGenerator } from "@domain/utils/UuidGenerator.ts";

export class UuidAdapter implements UuidGenerator {
  generateUuid(): string {
    return crypto.randomUUID();
  }
}
