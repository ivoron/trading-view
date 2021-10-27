import { action, makeObservable, observable } from 'mobx'
import likeButton from '../images/icon1.png'
import removeButton from '../images/icon2.png'

class CryptoStore {
  URL: string =
    'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD&api_key=c614087f5faf53a35aaf4a037fb5649fe577a4185dd12f3a550a0e1701c5a7f0' as string
  API_KEY: string =
    'api_key=c614087f5faf53a35aaf4a037fb5649fe577a4185dd12f3a550a0e1701c5a7f0' as string

  urls: urlsType = {
    baseUrl: 'https://cryptocompare.com/',
    addButtonSrc: likeButton,
    removeButtonSrc: removeButton,
  }
  cryptoList: Array<itemType> = []
  favoriteList: Array<itemType> = []
  constructor() {
    makeObservable(this, {
      cryptoList: observable,
      favoriteList: observable,
      urls: observable,
      fetchCryptos: action,
      checkList: action,
      addToFavorites: action,
      removeFromFavorites: action,
      removeFromList: action,
    })
  }
  fetchCryptos = async () => {
    try {
      const cryptoList = await fetch(this.URL)
      const list = await cryptoList.json()
      this.cryptoList = list.Data
    } catch (e) {
      console.error(e)
    }
  }
  checkList = (id: number) => {
    return (
      (this.favoriteList.find((item: itemType) => item.CoinInfo.Id === id) &&
        true) ||
      false
    )
  }
  addToFavorites = (item: itemType) => {
    if (!this.checkList(item.CoinInfo.Id)) {
      this.favoriteList.unshift(item)
    }
    console.log('added', this.favoriteList.length)
  }
  removeFromFavorites = (item: itemType) => {
    this.favoriteList = this.favoriteList.filter(
      (i: itemType) => i.CoinInfo.Id !== item.CoinInfo.Id
    )
    console.log('removed', this.favoriteList.length)
  }
  removeFromList = (item: itemType) => {
    this.cryptoList = this.cryptoList.filter(
      (i: itemType) => i.CoinInfo.Id !== item.CoinInfo.Id
    )
  }
}
export type itemType = {
  CoinInfo: {
    Id: number
    Name: string
    FullName: string
    Url: string
    ImageUrl: string
  }
  RAW: {
    USD: {
      PRICE: number
    }
  }
}
export type urlsType = {
  baseUrl: string
  addButtonSrc: string
  removeButtonSrc: string
}
export type CryptoStoreType = {
  URL: string
  API_KEY: string
  urls: urlsType
  cryptoList: Array<itemType>
  favoriteList: Array<itemType>
  fetchCryptos: () => Promise<void>
  checkList: (id: number) => boolean
  addToFavorites: (item: itemType) => void
  removeFromFavorites: (item: itemType) => void
  removeFromList: (item: itemType) => void
}

export default CryptoStore
