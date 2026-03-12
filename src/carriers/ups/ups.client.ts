import axios from "axios"
import { RateRequest } from "../../domain/rate-request"
import { UPSConfig } from "./ups.config"
import { handleUPSError } from "../../errors/handle-ups-error"
export class UPSRateClient {

  async getRates(token: string, request: RateRequest): Promise<any> {

    const payload = this.buildPayload(request)
    try{
          const response = await axios.post(
      `${UPSConfig.baseUrl}/rating/v1/Rate`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 5000
      }
    )

    return response.data
    } catch (error) {
      handleUPSError(error);
    }

  }

  private buildPayload(request: RateRequest) {

    return {
      RateRequest: {
        Shipment: {
          Shipper: {
            Address: {
              PostalCode: request.origin.postalCode,
              CountryCode: request.origin.country
            }
          },
          ShipTo: {
            Address: {
              PostalCode: request.destination.postalCode,
              CountryCode: request.destination.country
            }
          },
          Package: {
            PackagingType: {
              Code: "02"
            },
            Dimensions: {
              Length: request.package.length,
              Width: request.package.width,
              Height: request.package.height
            },
            PackageWeight: {
              Weight: request.package.weight
            }
          }
        }
      }
    }
  }
}