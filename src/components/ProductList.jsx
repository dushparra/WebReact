import ProductCard from './ProductCard.jsx'

function ProductList({ products, qtyById, onAdd, onRemove }) {
  if (products.length === 0) {
    return <p className="empty-message">Товары не найдены</p>
  }

  return (
    <section className="product-list" aria-label="Каталог товаров">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          qty={qtyById[product.id] ?? 0}
          onAdd={onAdd}
          onRemove={onRemove}
        />
      ))}
    </section>
  )
}

export default ProductList
