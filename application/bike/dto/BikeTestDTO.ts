export interface BikeTestDTO {
  id?: string;
  user_id: string;
  bike_id: string;
  started_at: Date;
  ended_at?: Date;
  is_accepted: boolean;
  price: number;
}
