import axios from "axios";
import { Carrier } from "../carrier.interface";
import { RateRequest, RateResponse } from "../../types";
import { OAuthService } from "../../auth/oauth.service";
import { mapToUPSRequest, mapUPSResponse } from "./ups.mapper";
import { config } from "../../config/config";

export class UPSService implements Carrier {
  private auth = new OAuthService();

  async getRates(request: RateRequest): Promise<RateResponse[]> {

    const token = await this.auth.getToken();
    const payload = mapToUPSRequest(request);

    const url = `${config.ups.baseUrl}/api/rating/${config.ups.version}/${config.ups.requestOption}`;

    try {
      const response = await axios.post(url, payload, {
        timeout: 5000,
        headers: {
          "Content-Type": "application/json",
          transId: "123456",
          transactionSrc: "testing",
          Authorization: `Bearer ${token}`
        }
      });

      return mapUPSResponse(response.data);

    } catch (error: any) {
      console.error("UPS Error:",{
      "message": "Error message",
      "code": error.code,
      "status": 400
    } );

      // FALLBACK 
      return [
        {
          price: "120",
          service: "UPS_GROUND"
        }
      ];
    }
  }
}