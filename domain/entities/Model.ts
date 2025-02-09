export class Model {
  constructor(
    public id: string,
    public name: string,
    public link : string,
    public maintenance_mileage_alert: number,
    public maintenance_period_alert: number,
    public top_case : number,
    public seat : number,
    public transmission_type : string,
    public brand_id : string,
    public bike_category_id : string,
  ) {}
}
