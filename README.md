# Carrier Integration Service — UPS Rating

This project implements a small carrier integration service in TypeScript that wraps the UPS Rating API to fetch shipping rates. The goal was to design the service in a way that could realistically grow into a production module supporting multiple carriers and additional operations over time.

The implementation focuses on clear architecture, strong typing, input validation, and reliable error handling while keeping the system easy to extend.

---

## Overview

The service accepts a normalized rate request containing origin, destination, and package details, then fetches shipping rates from UPS and returns them in a standardized format.

The caller never interacts with raw UPS request or response structures. All external API details are encapsulated inside the carrier integration layer.

This design allows the system to support additional carriers like FedEx, USPS, or DHL without changing the core service logic.

---

## Architecture

The project is structured around clear separation of responsibilities:

```
Rate Request
    ↓
Carrier Interface
    ↓
UPS Carrier Implementation
    ↓
UPS Client (HTTP Layer)
    ↓
UPS Mapper (Normalization)
    ↓
RateQuote[]
```

Each layer has a specific responsibility:

**Domain Layer**

* Defines core business models such as `RateRequest` and `RateQuote`.

**Validation Layer**

* Runtime validation using Zod to ensure requests are valid before external calls.

**Carrier Abstraction**

* A common `Carrier` interface allows multiple carriers to plug into the system.

**UPS Implementation**

* Contains authentication logic, request building, API communication, and response mapping.

**Error Handling**

* All external errors are converted into structured domain errors.

---

## Key Features

### Rate Shopping

Accepts a normalized rate request and returns one or more rate quotes in a consistent internal format.

### OAuth Authentication

Implements the UPS OAuth client credentials flow with:

* token acquisition
* token reuse
* automatic refresh on expiry

### Extensible Carrier Architecture

New carriers can be added by implementing the `Carrier` interface.

Example future structure:

```
src/carriers
  ├ ups
  ├ fedex
  ├ dhl
  └ usps
```

No changes are required to the core service logic.

### Runtime Validation

All inputs are validated before external calls to prevent malformed requests.

### Structured Error Handling

External API errors are translated into structured internal errors such as:

```
AUTH_FAILED
NETWORK_ERROR
RATE_FETCH_FAILED
INVALID_RESPONSE
```

This keeps the service predictable for callers.

---

## Integration Tests

Integration tests simulate the full service flow using stubbed HTTP responses based on the UPS documentation.

The tests verify:

* request payload construction
* response normalization
* OAuth token lifecycle
* error handling scenarios
* system behavior without making real API calls

Because the HTTP layer is stubbed, the tests run quickly and deterministically.

---

## Project Structure

```
src
 ├ domain
 │   ├ rate-request.ts
 │   └ rate-quote.ts
 │
 ├ validation
 │   └ schemas
 │
 ├ carriers
 │   ├ carrier.factory.ts
 │   └ ups
 │       ├ ups.auth.ts
 │       ├ ups.client.ts
 │       ├ ups.mapper.ts
 │       └ ups.carrier.ts
 │
 ├ errors
 │   └ carrier.error.ts
 │
tests
 └ ups
     └ ups-rate.test.ts
```

---

## Running the Project

Install dependencies:

```
npm install
```

Run tests:

```
npm test
```

---

## Environment Variables

Create a `.env` file using the provided example.

```
UPS_CLIENT_ID=
UPS_CLIENT_SECRET=
UPS_TOKEN_URL=
UPS_API_BASE_URL=
```

Real credentials are not required for this assessment since HTTP calls are stubbed in tests.

---

## Design Decisions

A few design choices were made intentionally to keep the system maintainable:

**Carrier Interface**

This allows the service to support multiple carriers without modifying existing logic.

**Dedicated Mapper Layer**

External API responses often change or contain additional fields. The mapper isolates this complexity and converts responses into stable internal models.

**Isolated HTTP Client**

All network communication is contained within a client module. This makes it easier to mock in tests and prevents networking logic from leaking into business logic.

**Structured Errors**

Returning consistent error codes makes it easier for downstream systems to react appropriately.

---

## Possible Improvements

Given more time, the following enhancements could be implemented:

* support for multiple packages per shipment
* service code to human-readable service mapping
* retries with exponential backoff
* rate caching for repeated requests
* logging and observability hooks
* additional UPS operations (labels, tracking, address validation)

---

## Final Notes

The goal of this implementation was not only to wrap the UPS API, but to demonstrate how a carrier integration module could be structured in a way that remains clean, extensible, and easy to test as it grows.
