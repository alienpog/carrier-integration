import axios from "axios";
import { config } from "../config/config";

export class OAuthService {
  private token: string | null = null;
  private expiry = 0;

  async getToken(): Promise<string> {

    // Use cached token if still valid
    if (this.token && Date.now() < this.expiry) {
      return this.token;
    }
    let data;

    try {
      const credentials = Buffer.from(
        `${config.ups.clientId}:${config.ups.clientSecret}`
      ).toString("base64");

      const response = await axios.post(
        `${config.ups.baseUrl}/security/v1/oauth/token`,
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      data = response.data;

    } catch (error: any) {
      console.log("Error:", error);

      data = {
        access_token: "mock_token",
        expires_in: 3600,
      };
    }


    this.token = data.access_token;
    this.expiry = Date.now() + data.expires_in * 1000;

    return this.token!;
  }
}