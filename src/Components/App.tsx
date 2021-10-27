import { inject } from 'mobx-react'
import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import '../App.scss'
import Card from './Card'
import CryptoStore, { itemType } from '../Store/store'

interface propsType {
  CryptoStore: CryptoStore
}
const App = inject('CryptoStore')(
  observer((props: propsType) => {
    const { CryptoStore } = props

    useEffect(() => {
      CryptoStore.fetchCryptos()
    }, [CryptoStore])
    const [showFav, setShowFav] = useState(false)
    const showFavorites = () => {
      setShowFav(!showFav)
    }
    return (
      <div className="App">
        <header className="App-header">
          <button className="showTogglerBtn" onClick={showFavorites}>
            {showFav ? 'показать все' : 'показать избранные'}
          </button>
        </header>
        <main>
          <div className="container">
            {showFav
              ? CryptoStore.favoriteList.map((item: itemType) => (
                  <Card
                    key={item.CoinInfo.Id}
                    item={item}
                    CryptoStore={CryptoStore}
                    likes={true}
                  />
                ))
              : CryptoStore.cryptoList.map((item: itemType) => (
                  <Card
                    key={item.CoinInfo.Id}
                    item={item}
                    CryptoStore={CryptoStore}
                    likes={false}
                  />
                ))}
          </div>
        </main>
      </div>
    )
  })
)
export default App
