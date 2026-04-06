export interface RateRequest {
  origin: string;
  destination: string;
  weight: number;
}

export interface RateResponse {
  price: string;
  service: string;
}