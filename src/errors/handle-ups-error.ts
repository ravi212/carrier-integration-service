import { CarrierError } from "./carrier.error"
import { ErrorCodes } from "./error-codes"

export function handleUPSError(error: any): never {

  if (error.response) {

    const status = error.response.status

    if (status === 401) {
      throw new CarrierError(
        ErrorCodes.AUTH_FAILED,
        "UPS authentication failed"
      )
    }

    if (status >= 500) {
      throw new CarrierError(
        ErrorCodes.RATE_FETCH_FAILED,
        "UPS server error"
      )
    }

  }

  if (error.code === "ECONNABORTED") {
    throw new CarrierError(
      ErrorCodes.NETWORK_ERROR,
      "UPS request timeout"
    )
  }

  throw new CarrierError(
    ErrorCodes.INVALID_RESPONSE,
    "Unexpected UPS response"
  )
}