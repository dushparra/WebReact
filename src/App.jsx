import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
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

  const qtyById = useMemo(
    () =>
      Object.fromEntries(cart.items.map((item) => [item.id, item.qty])),
    [cart.items],
  )

  const totalCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty, 0),
    [cart.items],
  )

  const totalPrice = useMemo(
    () =>
      cart.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart.items],
  )

  const handleAdd = useCallback((product) => {
    dispatch({ type: 'add', product })
  }, [])

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'remove', id })
  }, [])

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  return (
    <main className="page">
      <Header
        totalCount={totalCount}
        totalPrice={totalPrice}
        onClear={handleClear}
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
        qtyById={qtyById}
        onAdd={handleAdd}
        onRemove={handleRemove}
      />
    </main>
  )
}

export default App
