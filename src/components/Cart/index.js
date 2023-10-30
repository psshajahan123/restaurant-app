import CartContext from '../../context/CartContext'

import Header from '../Header'

import EmptyCartView from '../EmptyCartView'
import CartItem from '../CartItem'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems} = value
      const onClickRemoveAllBtn = () => {
        removeAllCartItems()
      }
      return (
        <>
          <Header />
          <div className="cart-container">
            {cartList.length === 0 ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1 className="cart-heading">My Cart</h1>
                <button
                  type="button"
                  className="remove-all-btn"
                  onClick={onClickRemoveAllBtn}
                  data-testid="remove"
                >
                  Remove All
                </button>
                <ul className="cart-list">
                  {cartList.map(eachItem => (
                    <CartItem key={eachItem.dishId} details={eachItem} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default Cart
