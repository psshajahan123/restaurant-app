import {useState} from 'react'

import './index.css'

import {AiOutlinePlaySquare} from 'react-icons/ai'

const DishItem = props => {
  const {dishDetails, decreaseTotalQuantity, increaseTotalQuantity} = props
  const [quantity, setQuantity] = useState(0)
  const {
    dishName,
    dishImage,
    dishPrice,
    dishDescription,
    dishCurrency,
    dishCalories,
    dishType,
    dishAvailability,
    addonCat,
  } = dishDetails
  const onClickDecrement = () => {
    if (quantity >= 1) {
      setQuantity(quantity - 1)
      decreaseTotalQuantity()
    }
  }
  const onClickIncrement = () => {
    if (quantity >= 0) {
      setQuantity(quantity + 1)
      increaseTotalQuantity()
    }
  }

  const dishTypeClassName = dishType === 1 ? 'food-dot' : 'green-dot'

  return (
    <li className="dish-item">
      <div className="dish-content">
        <AiOutlinePlaySquare className={`${dishTypeClassName}`} />
        <div>
          <h1 className="dish-heading">{dishName}</h1>
          <p className="dish-price">
            {dishCurrency} {dishPrice}
          </p>
          <p className="dish-description">{dishDescription}</p>
          {dishAvailability === true ? (
            <div className="addon-section">
              <button
                type="button"
                className="addon-button"
                onClick={onClickDecrement}
              >
                -
              </button>
              <p className="addon-text">{quantity}</p>
              <button
                type="button"
                className="addon-button"
                onClick={onClickIncrement}
              >
                +
              </button>
            </div>
          ) : (
            <p>Not available</p>
          )}
          {addonCat.length > 0 ? (
            <p className="addon-customization-text">Customizations available</p>
          ) : null}
        </div>
      </div>
      <div className="calories-and-image-container">
        <p className="dish-calories">{dishCalories} calories</p>
        <img className="dish-image" src={dishImage} alt={dishName} />
      </div>
    </li>
  )
}

export default DishItem
