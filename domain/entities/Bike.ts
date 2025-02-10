export class Bike {
  constructor(
    public id: string,
    public purchase_date: Date,
    public serial_number: string,
    public mileage: number,
    public plate_number: string,
    public production_batch_id: string,
    public bike_status_id	: string,
    public model_id : string,
  ) {}
}
