import React, { createContext, useContext, useReducer, useMemo } from 'react'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

function reducer(state, action){
  switch(action.type){
    case 'add': {
      const item = action.item
      const existing = state.items.find(i => i.id === item.id)
      if(existing){
        return {
          ...state,
          items: state.items.map(i => i.id===item.id ? {...i, qty: i.qty+1} : i)
        }
      }
      return {...state, items:[...state.items, {...item, qty:1}]}
    }
    case 'remove':
      return {...state, items: state.items.filter(i => i.id !== action.id)}
    case 'setQty':
      return {...state, items: state.items.map(i => i.id===action.id ? {...i, qty: action.qty} : i)}
    case 'clear':
      return {...state, items: []}
    default:
      throw new Error('Unknown action')
  }
}

export function CartProvider({children}){
  const [state, dispatch] = useReducer(reducer, {items: []})
  
  // Memoized cart calculations
  const cartTotal = useMemo(() => {
    return state.items.reduce((total, item) => {
      return total + (item.qty * Number(item.price || 0))
    }, 0)
  }, [state.items])
  
  const cartCount = useMemo(() => {
    return state.items.reduce((count, item) => count + item.qty, 0)
  }, [state.items])

  const cartValue = useMemo(() => ({
    ...state,
    total: cartTotal,
    count: cartCount
  }), [state, cartTotal, cartCount])

  return (
    <CartStateContext.Provider value={cartValue}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export const useCart = () => useContext(CartStateContext)
export const useDispatchCart = () => useContext(CartDispatchContext)
