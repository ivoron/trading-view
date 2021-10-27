import { useState, useEffect } from 'react'
import CryptoStore, { itemType } from '../Store/store'

interface CardPropsType {
  CryptoStore: CryptoStore
  item: itemType
  likes: boolean
}

const Card = (props: CardPropsType) => {
  const { CryptoStore } = props
  const { item } = props
  const { CoinInfo } = item
  const { urls } = CryptoStore

  const [like, setLike] = useState(false)
  useEffect(() => {
    props.likes && setLike(true)
  }, [props.likes])
  const toFavorite = (item: itemType) => {
    if (like) {
      CryptoStore.removeFromFavorites(item)
      setLike(!like)
    } else {
      CryptoStore.addToFavorites(item)
      setLike(!like)
    }
  }
  return (
    <div className="card">
      <div className="card_header">
        <h3>{CoinInfo.Name}</h3>
        <div className="removeIcon">
          <button
            className="removeBtn"
            onClick={() => CryptoStore.removeFromList(item)}
          >
            &#10006;
          </button>
          <span className="deletePop">удалить</span>
        </div>
      </div>
      <div>
        <div className="coinInfo">
          <img
            alt={CoinInfo.FullName}
            src={`${urls.baseUrl}${CoinInfo.ImageUrl}`}
            width="50px"
          />
          <strong>{CoinInfo.FullName}</strong>
        </div>
        <p className="costInfo">
          <span>Cтоимость: ${item.RAW.USD.PRICE} </span>
          <br />
          <a
            href={`${urls.baseUrl}${CoinInfo.Url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            подробнее
          </a>
        </p>
        <div className="likeIcon">
          <img
            alt="add to favorite"
            width="20px"
            src={like ? urls.removeButtonSrc : urls.addButtonSrc}
            onClick={() => toFavorite(item)}
          />{' '}
          <span className="likesPop">В избранное</span>
        </div>
      </div>
    </div>
  )
}
export default Card
