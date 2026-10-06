import { useEffect, useMemo, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import ProductList from './components/ProductList.jsx'
import SearchBar from './components/SearchBar.jsx'
import { products } from './data.js'
import './App.css'

function App() {
  const [query, setQuery] = useState('')
  const [onlyInStock, setOnlyInStock] = useState(false)
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

  return (
    <main className="page">
      <Header />
      <SearchBar
        query={query}
        onlyInStock={onlyInStock}
        inputRef={inputRef}
        onQueryChange={setQuery}
        onStockChange={setOnlyInStock}
      />
      <p className="result-count">Найдено: {visibleProducts.length}</p>
      <ProductList products={visibleProducts} />
    </main>
  )
}

export default App
