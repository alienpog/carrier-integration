import { RateRequest, RateResponse } from "../types";

export interface Carrier {
  getRates(request: RateRequest): Promise<RateResponse[]>;
}