import axios from "axios"
import { UPSConfig } from "./ups.config"
import { UPSTokenResponse } from "./ups.types"

export class UPSAuthService {

  private token: string | null = null
  private expiry: number = 0

  async getToken(): Promise<string> {

    if (this.token && Date.now() < this.expiry) {
      return this.token
    }

    const response = await axios.post<UPSTokenResponse>(
      UPSConfig.tokenUrl,
      "grant_type=client_credentials",
      {
        auth: {
          username: UPSConfig.clientId,
          password: UPSConfig.clientSecret
        },
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }
    )

    const data = response.data

    this.token = data.access_token
    this.expiry = Date.now() + data.expires_in * 1000

    return this.token
  }
}