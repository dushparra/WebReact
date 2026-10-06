function ProductCard({ product }) {
  return (
    <article className="product-card">
      <h2>{product.title}</h2>
      <p className="price">{product.price} ₽</p>
      <p className={product.inStock ? 'in-stock' : 'out-of-stock'}>
        {product.inStock ? 'В наличии' : 'Нет в наличии'}
      </p>
    </article>
  )
}

export default ProductCard
