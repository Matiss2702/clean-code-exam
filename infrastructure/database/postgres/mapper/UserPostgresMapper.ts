import { UserRepository } from "@domain/user/repositories/UserRepository.ts";
import { User } from "@domain/user/entities/User.ts";
import { PostgresConnection } from "../PostgresConnection.ts";

export class UserPostgresMapper implements UserRepository {
  constructor(private connection: PostgresConnection) {}

  public async createUser(user: User): Promise<User> {
    const client = this.connection.getClient();
    await client.queryArray`
      INSERT INTO users (id, name, email, password)
      VALUES (${user.id}, ${user.name}, ${user.email}, ${user.passwordHash})
    `;
    return user;
  }

  public async findUserById(id: string): Promise<User | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<{ id: string; name: string; email: string; password: string }>`
      SELECT id, name, email, password FROM users WHERE id = ${id}
    `;
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.name, row.email, row.password);
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<{ id: string; name: string; email: string; password: string }>`
      SELECT id, name, email, password FROM users WHERE email = ${email}
    `;
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return new User(row.id, row.name, row.email, row.password);
  }
}
