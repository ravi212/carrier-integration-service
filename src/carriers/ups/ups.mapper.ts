import { RateQuote } from "../../domain/rate-quote"

export class UPSMapper {

  mapRates(response: any): RateQuote[] {

    const ratedShipments =
      response?.RateResponse?.RatedShipment || []

    return ratedShipments.map((shipment: any) => ({
      carrier: "UPS",
      service: shipment.Service?.Code || "UNKNOWN",
      rate: parseFloat(
        shipment.TotalCharges?.MonetaryValue || "0"
      ),
      currency: shipment.TotalCharges?.CurrencyCode || "USD"
    }))
  }
}