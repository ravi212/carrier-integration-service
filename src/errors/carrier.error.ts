export class CarrierError extends Error {

  constructor(
    public code: string,
    message: string,
    public details?: any
  ) {
    super(message)
  }

}