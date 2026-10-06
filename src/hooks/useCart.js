import { useCallback, useMemo, useReducer } from 'react'
import { cartReducer, initialCart } from '../cart.js'

function useCart() {
  const [cart, dispatch] = useReducer(cartReducer, initialCart)

  const add = useCallback((product) => {
    dispatch({ type: 'add', product })
  }, [])

  const remove = useCallback((id) => {
    dispatch({ type: 'remove', id })
  }, [])

  const clear = useCallback(() => {
    dispatch({ type: 'clear' })
  }, [])

  const totalCount = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.qty, 0),
    [cart.items],
  )

  const totalPrice = useMemo(
    () =>
      cart.items.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart.items],
  )

  return {
    items: cart.items,
    totalCount,
    totalPrice,
    add,
    remove,
    clear,
  }
}

export default useCart
