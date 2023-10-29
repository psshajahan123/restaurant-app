import {Component} from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import Loader from 'react-loader-spinner'

import TabItem from '../TabItem'
import DishItem from '../DishItem'

import './index.css'

class RestaurantApp extends Component {
  state = {
    restaurantDetails: [],
    isLoading: true,
    activeTabId: '',
    totalQuantity: 0,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()
    console.log(fetchedData)
    const updatedData = {
      restaurantName: fetchedData[0].restaurant_name,
      tableMenuList: fetchedData[0].table_menu_list.map(eachMenu => ({
        menuCategory: eachMenu.menu_category,
        menuCategoryId: eachMenu.menu_category_id,
        categoryDishes: eachMenu.category_dishes.map(eachDish => ({
          dishId: eachDish.dish_id,
          dishName: eachDish.dish_name,
          dishPrice: eachDish.dish_price,
          dishImage: eachDish.dish_image,
          dishCurrency: eachDish.dish_currency,
          dishCalories: eachDish.dish_calories,
          dishDescription: eachDish.dish_description,
          dishAvailability: eachDish.dish_Availability,
          dishType: eachDish.dish_Type,
          addonCat: eachDish.addonCat,
          dishQuantity: 0,
        })),
      })),
    }
    this.setState({
      restaurantDetails: updatedData,
      isLoading: false,
      activeTabId: updatedData.tableMenuList[0].menuCategoryId,
    })
  }

  changeActiveTabId = id => {
    this.setState({activeTabId: id})
  }

  decreaseTotalQuantity = () => {
    this.setState(prevState => ({totalQuantity: prevState.totalQuantity - 1}))
  }

  increaseTotalQuantity = () => {
    this.setState(prevState => ({totalQuantity: prevState.totalQuantity + 1}))
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderContent = () => {
    const {restaurantDetails, activeTabId} = this.state
    const {tableMenuList} = restaurantDetails
    console.log(tableMenuList)

    return (
      <>
        <ul className="tabs-container">
          {tableMenuList.map(eachTab => (
            <TabItem
              key={eachTab.menuCategoryId}
              tabDetails={eachTab}
              changeActiveTabId={this.changeActiveTabId}
              isActive={eachTab.menuCategoryId === activeTabId}
            />
          ))}
        </ul>
        {this.renderDishItems()}
      </>
    )
  }

  renderDishItems = () => {
    const {restaurantDetails, activeTabId} = this.state
    const {tableMenuList} = restaurantDetails

    const activeMenuCategoryList = tableMenuList.filter(
      eachItem => activeTabId === eachItem.menuCategoryId,
    )
    const activeMenuCategory = activeMenuCategoryList[0]
    console.log(activeMenuCategory)

    return (
      <ul className="dish-container">
        {activeMenuCategory.categoryDishes.map(eachDish => (
          <DishItem
            key={eachDish.dishId}
            dishDetails={eachDish}
            decreaseTotalQuantity={this.decreaseTotalQuantity}
            increaseTotalQuantity={this.increaseTotalQuantity}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {restaurantDetails, isLoading, totalQuantity} = this.state
    return (
      <div className="app-container">
        <div className="header-section">
          <h1 className="restaurant-name">
            {restaurantDetails.restaurantName}
          </h1>
          <div className="cart-logo-container">
            <p className="my-orders-text">My Orders</p>
            <AiOutlineShoppingCart className="cart-icon" />
            <p>{totalQuantity}</p>
          </div>
        </div>
        {isLoading ? this.renderLoader() : this.renderContent()}
      </div>
    )
  }
}

export default RestaurantApp
