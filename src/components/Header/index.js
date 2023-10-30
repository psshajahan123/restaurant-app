import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'

import './index.css'
import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/')
  }

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            <p className="total-quantity">{cartItemsCount}</p>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <div className="header-section">
      <Link to="/" className="nav-link">
        <h1 className="restaurant-name">UNI Resto Cafe</h1>
      </Link>
      <div className="cart-logo-container">
        <Link to="/cart" className="nav-link">
          <p className="my-orders-text">My Orders</p>
        </Link>
        <Link to="/cart">
          <AiOutlineShoppingCart className="cart-icon" />
        </Link>
        {renderCartItemsCount()}
        <button type="button" className="logout-btn" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
