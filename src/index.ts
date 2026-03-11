import { getCarrier } from "./carriers/carrier.factory"

async function bootstrap() {

  const carrier = getCarrier("UPS")

  const rates = await carrier.getRates({
    origin: {
      country: "US",
      postalCode: "10001",
      city: "New York"
    },
    destination: {
      country: "US",
      postalCode: "90001",
      city: "Los Angeles"
    },
    package: {
      weight: 2,
      length: 10,
      width: 10,
      height: 10
    }
  })

  console.log(rates)
}

bootstrap()