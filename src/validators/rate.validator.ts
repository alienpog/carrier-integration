import { z } from "zod";

const schema = z.object({
  origin: z.string(),
  destination: z.string(),
  weight: z.number()
});

export const validateRateRequest = (data: any) => {
  schema.parse(data);
};