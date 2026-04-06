
import { RateRequest, RateResponse } from "../../types";

// NOTE: isolates UPS-specific structure
export const mapToUPSRequest = (req: RateRequest) => {
 return {
    RateRequest: {
      Request: {
        TransactionReference: {
          CustomerContext: "Rate Request"
        }
      },
      Shipment: {
        Shipper: {
          Name: "Test Shipper",
          ShipperNumber: "123456",
          Address: {
            AddressLine: ["Shipper Address"],
            City: "New York",
            StateProvinceCode: "NY",
            PostalCode: req.origin,
            CountryCode: "US"
          }
        },
        ShipTo: {
          Name: "Receiver",
          Address: {
            AddressLine: ["Receiver Address"],
            City: "Los Angeles",
            StateProvinceCode: "CA",
            PostalCode: req.destination,
            CountryCode: "US"
          }
        },
        ShipFrom: {
          Name: "Sender",
          Address: {
            AddressLine: ["Sender Address"],
            City: "New York",
            StateProvinceCode: "NY",
            PostalCode: req.origin,
            CountryCode: "US"
          }
        },
        PaymentDetails: {
          ShipmentCharge: [
            {
              Type: "01",
              BillShipper: {
                AccountNumber: "123456"
              }
            }
          ]
        },
        Service: {
          Code: "03",
          Description: "Ground"
        },
        NumOfPieces: "1",
        Package: {
          PackagingType: {
            Code: "02",
            Description: "Package"
          },
          Dimensions: {
            UnitOfMeasurement: {
              Code: "IN",
              Description: "Inches"
            },
            Length: "5",
            Width: "5",
            Height: "5"
          },
          PackageWeight: {
            UnitOfMeasurement: {
              Code: "LBS",
              Description: "Pounds"
            },
            Weight: req.weight.toString()
          }
        }
      }
    }
  };
};

export const mapUPSResponse = (res: any) => {
  const shipments = res?.RateResponse?.RatedShipment || [];

  return shipments.map((s: any) => ({
    price: s.TotalCharges?.MonetaryValue || "0",
    service: s.Service?.Code || "UNKNOWN"
  }));
};