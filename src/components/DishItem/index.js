import {Component} from 'react'

import './index.css'

import {AiOutlinePlaySquare} from 'react-icons/ai'
import CartContext from '../../context/CartContext'

class DishItem extends Component {
  state = {quantity: 1}

  renderDishItem = () => (
    <CartContext.Consumer>
      {value => {
        const {quantity} = this.state
        const {
          dishDetails,
          decreaseTotalQuantity,
          increaseTotalQuantity,
        } = this.props
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
          if (quantity >= 2) {
            this.setState(prevState => ({quantity: prevState.quantity - 1}))
            decreaseTotalQuantity()
          }
        }
        const onClickIncrement = () => {
          if (quantity >= 0) {
            this.setState(prevState => ({quantity: prevState.quantity + 1}))
            increaseTotalQuantity()
          }
        }

        const dishTypeClassName = dishType === 1 ? 'food-dot' : 'green-dot'

        const {addCartItem} = value
        const onClickAddToCart = () => {
          addCartItem({...dishDetails, quantity})
        }
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
                  <>
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
                    <button
                      type="button"
                      className="add-to-cart-button"
                      onClick={onClickAddToCart}
                    >
                      ADD TO CART
                    </button>
                  </>
                ) : (
                  <p>Not available</p>
                )}
                {addonCat.length > 0 ? (
                  <p className="addon-customization-text">
                    Customizations available
                  </p>
                ) : null}
              </div>
            </div>
            <div className="calories-and-image-container">
              <p className="dish-calories">{dishCalories} calories</p>
              <img className="dish-image" src={dishImage} alt={dishName} />
            </div>
          </li>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return <>{this.renderDishItem()}</>
  }
}

export default DishItem
