import { Router } from "express";
import { RateService } from "../services/rate.service";
import { UPSService } from "../carriers/ups/ups.service";

const router = Router();
const service = new RateService(new UPSService());

router.post("/", async (req, res, next) => {
  try {
    const result = await service.getRates(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;