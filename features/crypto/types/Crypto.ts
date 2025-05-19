export interface Crypto {
  symbol: string,
  name: string,
  quote: {
    USD: {
      price: number,
      volume_change_24h: number,
      percent_change_24h: number,
    }
  }
}