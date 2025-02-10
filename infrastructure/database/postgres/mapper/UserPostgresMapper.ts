import { UserRepository } from "@domain/repositories/UserRepository.ts";
import { User } from "@domain/entities/User.ts";
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
    const result = await client.queryObject<User>`
      SELECT id, name, email, password AS "passwordHash" FROM users WHERE id = ${id} LIMIT 1;
    `;
    return result.rows.length ? result.rows[0] : null;
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    const client = this.connection.getClient();
    const result = await client.queryObject<User>`
      SELECT id, name, email, password AS "passwordHash" FROM users WHERE email = ${email} LIMIT 1;
    `;
    return result.rows.length ? result.rows[0] : null;
  }

  public async findAll(): Promise<User[]> {
    const client = this.connection.getClient();
    const result = await client.queryObject<User>`
      SELECT id, name, email FROM users;
    `;
    return result.rows;
  }
}
