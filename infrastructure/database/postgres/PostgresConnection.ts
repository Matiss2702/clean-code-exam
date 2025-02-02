import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

export interface PostgresConfig {
  hostname: string;
  port: number;
  user: string;
  password: string;
  database: string;
}

export class PostgresConnection {
  private client: Client;
  private connected = false;

  constructor(private config: PostgresConfig) {
    this.client = new Client({
      hostname: config.hostname,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }

  public async connect(): Promise<void> {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
    }
  }

  public getClient(): Client {
    return this.client;
  }
}
