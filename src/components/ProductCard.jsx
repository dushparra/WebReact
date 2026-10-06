function ProductCard({ product, qty, onAdd, onRemove }) {
  return (
    <article className="product-card">
      <h2>{product.title}</h2>
      <p className="price">{product.price} ₽</p>
      <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
        {product.inStock ? 'В наличии' : 'Нет в наличии'}
      </p>
      <div className="card-actions">
        <button
          type="button"
          disabled={!product.inStock}
          onClick={() => onAdd(product)}
        >
          {qty > 0 ? `В корзине: ${qty}` : 'В корзину'}
        </button>
        {qty > 0 && (
          <button
            className="remove-button"
            type="button"
            onClick={() => onRemove(product.id)}
          >
            Убрать
          </button>
        )}
      </div>
    </article>
  )
}

export default ProductCard
