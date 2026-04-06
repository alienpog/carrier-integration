import { RateService } from "../src/services/rate.service";
import { UPSService } from "../src/carriers/ups/ups.service";

jest.mock("../src/carriers/ups/ups.service");

describe("Rate Integration", () => {
  const mockUPSService = new UPSService() as jest.Mocked<UPSService>;
  const service = new RateService(mockUPSService);

  it("should return normalized rates", async () => {
    // Mock getRates to return what you expect
    mockUPSService.getRates.mockResolvedValue([
      { price: "120", service: "03" },
    ]);

    const res = await service.getRates({
      origin: "10001",
      destination: "90001",
      weight: 2
    });

    expect(res).toEqual([
      {
        price: "120",
        service: "03"
      }
    ]);
  });
});