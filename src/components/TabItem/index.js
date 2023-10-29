import './index.css'

const TabItem = props => {
  const {tabDetails, isActive, changeActiveTabId} = props
  const {menuCategory, menuCategoryId} = tabDetails

  const onClickButton = () => {
    changeActiveTabId(menuCategoryId)
  }

  const activeClassName = isActive ? 'active-tab' : ''

  return (
    <li className="tab-item-container">
      <button
        className={`tab-btn ${activeClassName}`}
        onClick={onClickButton}
        type="button"
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
