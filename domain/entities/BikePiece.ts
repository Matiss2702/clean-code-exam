export class BikePiece {
  constructor(
    public id: string,
    public name: string,
    public reference: string,
    public price: number,
    public maintenance_period_alert: number,
    public stock: number,
    public stock_alert: number,
    public bike_id: string,
  ) {}
}
