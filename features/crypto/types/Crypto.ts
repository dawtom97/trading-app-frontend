export interface Crypto {
  symbol: string,
  name: string,
  id: string,
  quote: {
    USD: {
      price: number,
      volume_change_24h: number,
      percent_change_24h: number,
    }
  }
}