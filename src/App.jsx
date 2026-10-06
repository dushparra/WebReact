import { useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { cartReducer, initialCart } from './cart.js'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { products } from './data.js'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [cart, dispatch] = useReducer(cartReducer, initialCart)
  const inputRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const visibleProducts = useMemo(() => {
    const preparedQuery = query.trim().toLowerCase()

    return products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(preparedQuery)
      const matchesStock = !onlyInStock || product.inStock

      return matchesQuery && matchesStock
    })
  }, [query, onlyInStock])

  const totalCount = cart.items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  )

  return (
    <main className="page">
      <Header
        totalCount={totalCount}
        totalPrice={totalPrice}
        onClear={() => dispatch({ type: 'clear' })}
      />
      <SearchBar
        query={query}
        onlyInStock={onlyInStock}
        inputRef={inputRef}
        onQueryChange={setQuery}
        onStockChange={setOnlyInStock}
      />
      <p className="result-count">Найдено: {visibleProducts.length}</p>
      <ProductList
        products={visibleProducts}
        cart={cart}
        onAdd={(product) => dispatch({ type: 'add', product })}
        onRemove={(id) => dispatch({ type: 'remove', id })}
      />
    </main>
  )
}

export default App
