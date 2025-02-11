export class BikeTest {
  constructor(
    public id: string,
    public user_id: string,
    public bike_id: string,
    public started_at: Date,
    public ended_at: Date | null,
    public is_accepted: boolean,
    public price: number
  ) {}
}
