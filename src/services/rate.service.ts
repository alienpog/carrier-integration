import { Carrier } from "../carriers/carrier.interface";
import { RateRequest } from "../types";
import { validateRateRequest } from "../validators/rate.validator";

export class RateService {
  constructor(private carrier: Carrier) {}

  async getRates(request: RateRequest) {

    // VALIDATION
    validateRateRequest(request);

    return this.carrier.getRates(request);
  }
}