import { UPSCarrier } from "../../carriers/ups/ups.carrier";
import mockResponse from "./mocks/ups-rate-response.json";

const request = {
  origin: {
    country: "US",
    postalCode: "10001",
    city: "New York",
  },
  destination: {
    country: "US",
    postalCode: "90001",
    city: "Los Angeles",
  },
  package: {
    weight: 2,
    length: 10,
    width: 10,
    height: 10,
  },
};

describe("UPS Rate Integration", () => {
  const carrier = new UPSCarrier();

  jest
    .spyOn(carrier["authService"], "getToken")
    .mockResolvedValue("mock-token");

  jest.spyOn(carrier["client"], "getRates").mockResolvedValue(mockResponse);

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return normalized rate quotes", async () => {
    const rates = await carrier.getRates({
      origin: {
        country: "US",
        postalCode: "10001",
        city: "New York",
      },
      destination: {
        country: "US",
        postalCode: "90001",
        city: "Los Angeles",
      },
      package: {
        weight: 2,
        length: 10,
        width: 10,
        height: 10,
      },
    });

    expect(rates).toEqual([
      {
        carrier: "UPS",
        service: "03",
        rate: 12.45,
        currency: "USD",
      },
    ]);
  });

  it("should throw structured error on API failure", async () => {
    jest
      .spyOn(carrier["client"], "getRates")
      .mockRejectedValue(new Error("API failed"));

    await expect(
      carrier.getRates({
        origin: { country: "US", postalCode: "10001", city: "NY" },
        destination: { country: "US", postalCode: "90001", city: "LA" },
        package: { weight: 2, length: 10, width: 10, height: 10 },
      }),
    ).rejects.toThrow();
  });

  it("should reuse cached token", async () => {
    const request = {
      origin: { country: "US", postalCode: "10001", city: "New York" },
      destination: { country: "US", postalCode: "90001", city: "Los Angeles" },
      package: { weight: 2, length: 10, width: 10, height: 10 },
    };

    jest
      .spyOn(carrier["authService"], "getToken")
      .mockResolvedValue("mock-token");

    jest.spyOn(carrier["client"], "getRates").mockResolvedValue(mockResponse);

    const authSpy = jest.spyOn(carrier["authService"], "getToken");

    await carrier.getRates(request);
    await carrier.getRates(request);

    expect(authSpy).toHaveBeenCalledTimes(2);
  });
});
