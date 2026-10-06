function SearchBar({
  query,
  onlyInStock,
  inputRef,
  onQueryChange,
  onStockChange,
}) {
  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Поиск по названию…"
        aria-label="Поиск по названию"
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <label className="stock-filter">
        <input
          type="checkbox"
          checked={onlyInStock}
          onChange={(event) => onStockChange(event.target.checked)}
        />
        Только в наличии
      </label>
    </div>
  )
}

export default SearchBar
