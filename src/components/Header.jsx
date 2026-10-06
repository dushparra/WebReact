function Header({ totalCount, totalPrice, onClear }) {
  return (
    <header className="header">
      <h1>Магазин</h1>
      <div className="cart-summary">
        <span>
          Корзина: {totalCount} шт. · {totalPrice} ₽
        </span>
        <button
          className="clear-button"
          type="button"
          disabled={totalCount === 0}
          onClick={onClear}
        >
          Очистить
        </button>
      </div>
    </header>
  )
}

export default Header
