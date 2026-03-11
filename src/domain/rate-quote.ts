export interface RateQuote {
  carrier: string
  service: string
  price: number
  currency: string
  estimatedDays?: number
}