import { useEffect, useMemo, useRef, useState, useTransition } from 'react'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { products } from './data.js'
import useCart from './hooks/useCart.js'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef(null)
  const { items, totalCount, totalPrice, add, remove, clear } = useCart()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  function handleSearch(value) {
    setQuery(value)
    startTransition(() => {
      setFilter(value)
    })
  }

  const visibleProducts = useMemo(() => {
    const preparedQuery = filter.trim().toLowerCase()

    return products.filter((product) => {
      const matchesQuery = product.title.toLowerCase().includes(preparedQuery)
      const matchesStock = !onlyInStock || product.inStock

      return matchesQuery && matchesStock
    })
  }, [filter, onlyInStock])

  const qtyById = useMemo(
    () => Object.fromEntries(items.map((item) => [item.id, item.qty])),
    [items],
  )

  return (
    <main className="page">
      <Header
        totalCount={totalCount}
        totalPrice={totalPrice}
        onClear={clear}
      />
      <SearchBar
        query={query}
        onlyInStock={onlyInStock}
        inputRef={inputRef}
        onQueryChange={handleSearch}
        onStockChange={setOnlyInStock}
      />
      <div className="result-row">
        <span className="result-count">Найдено: {visibleProducts.length}</span>
        {isPending && <span className="pending-message">Обновляем список…</span>}
      </div>
      <ProductList
        products={visibleProducts}
        qtyById={qtyById}
        onAdd={add}
        onRemove={remove}
      />
    </main>
  )
}

export default App
