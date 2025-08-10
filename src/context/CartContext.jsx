import React, { createContext, useContext, useReducer, useMemo, useEffect } from 'react'

// Action types constants
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
}

// Local storage key
const CART_STORAGE_KEY = 'coffee-shop-cart'

const CartStateContext = createContext()
const CartDispatchContext = createContext()

// Input validation helpers
const validateItem = (item) => {
  if (!item || typeof item !== 'object') {
    throw new Error('Item must be a valid object')
  }
  if (!item.id) {
    throw new Error('Item must have an id')
  }
  if (!item.price || isNaN(Number(item.price))) {
    throw new Error('Item must have a valid price')
  }
  return true
}

const validateQuantity = (qty) => {
  const quantity = Number(qty)
  if (isNaN(quantity) || quantity < 0) {
    throw new Error('Quantity must be a non-negative number')
  }
  return quantity
}

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY)
    return stored ? JSON.parse(stored) : { items: [] }
  } catch (error) {
    console.error('Failed to load cart from storage:', error)
    return { items: [] }
  }
}

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
  } catch (error) {
    console.error('Failed to save cart to storage:', error)
  }
}

function reducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      try {
        const item = action.item
        validateItem(item)
        
        const existing = state.items.find(i => i.id === item.id)
        if (existing) {
          return {
            ...state,
            items: state.items.map(i => 
              i.id === item.id 
                ? { ...i, qty: i.qty + 1 } 
                : i
            )
          }
        }
        return {
          ...state, 
          items: [...state.items, { ...item, qty: 1 }]
        }
      } catch (error) {
        console.error('Error adding item to cart:', error)
        return state
      }
    }
    
    case CART_ACTIONS.REMOVE_ITEM: {
      const { id } = action
      if (!id) {
        console.error('Remove item action requires an id')
        return state
      }
      return {
        ...state, 
        items: state.items.filter(i => i.id !== id)
      }
    }
    
    case CART_ACTIONS.UPDATE_QUANTITY: {
      try {
        const { id, qty } = action
        if (!id) {
          console.error('Update quantity action requires an id')
          return state
        }
        
        const quantity = validateQuantity(qty)
        
        if (quantity === 0) {
          // Remove item if quantity is 0
          return {
            ...state,
            items: state.items.filter(i => i.id !== id)
          }
        }
        
        return {
          ...state,
          items: state.items.map(i => 
            i.id === id 
              ? { ...i, qty: quantity } 
              : i
          )
        }
      } catch (error) {
        console.error('Error updating quantity:', error)
        return state
      }
    }
    
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] }
      
    case CART_ACTIONS.LOAD_CART:
      return { ...state, ...action.cart }
      
    default:
      console.warn(`Unknown cart action: ${action.type}`)
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  
  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = loadCartFromStorage()
    if (savedCart.items.length > 0) {
      dispatch({ type: CART_ACTIONS.LOAD_CART, cart: savedCart })
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(state)
  }, [state])
  
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
    count: cartCount,
    isEmpty: state.items.length === 0
  }), [state, cartTotal, cartCount])

  return (
    <CartStateContext.Provider value={cartValue}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartStateContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const useDispatchCart = () => {
  const context = useContext(CartDispatchContext)
  if (context === undefined) {
    throw new Error('useDispatchCart must be used within a CartProvider')
  }
  return context
}

// Convenience hooks for common cart operations
export const useCartActions = () => {
  const dispatch = useDispatchCart()
  
  return {
    addItem: (item) => dispatch({ type: CART_ACTIONS.ADD_ITEM, item }),
    removeItem: (id) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, id }),
    updateQuantity: (id, qty) => dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, id, qty }),
    clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }
}

