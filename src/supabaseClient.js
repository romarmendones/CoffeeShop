import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ygtjpbgzialkiuapcirf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlndGpwYmd6aWFsa2l1YXBjaXJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3Mzc1NDQsImV4cCI6MjA3MDMxMzU0NH0.r0iH21RNeQH_iNmqPuboEZWjRiJ_-GeOEgJG3XV8eWo'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Utility functions for common operations
export const supabaseUtils = {
  // Fetch menu items with categories
  async getMenuItems() {
    const { data, error } = await supabase
      .from('menu')
      .select(`
        id,
        name,
        description,
        price,
        image_url,
        category_id,
        available,
        featured,
        preparation_time,
        calories,
        created_at,
        updated_at,
        categories (
          id,
          name,
          icon,
          color
        )
      `)
      .eq('available', true)
      .order('featured', { ascending: false })
      .order('name')
    
    if (error) {
      console.error('Error fetching menu items:', error)
      throw error
    }
    
    return data || []
  },

  // Fetch featured items
  async getFeaturedItems() {
    const { data, error } = await supabase
      .from('menu')
      .select(`
        id,
        name,
        description,
        price,
        image_url,
        category_id,
        available,
        featured,
        preparation_time,
        calories,
        created_at,
        updated_at,
        categories (
          id,
          name,
          icon,
          color
        )
      `)
      .eq('available', true)
      .eq('featured', true)
      .order('name')
    
    if (error) {
      console.error('Error fetching featured items:', error)
      throw error
    }
    
    return data || []
  },

  // Fetch categories
  async getCategories() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
    
    return data || []
  },

  // Create new menu item
  async createMenuItem(itemData) {
    const { data, error } = await supabase
      .from('menu')
      .insert(itemData)
      .select()
    
    if (error) {
      console.error('Error creating menu item:', error)
      throw error
    }
    
    return data?.[0]
  },

  // Update menu item
  async updateMenuItem(id, updates) {
    const { data, error } = await supabase
      .from('menu')
      .update(updates)
      .eq('id', id)
      .select()
    
    if (error) {
      console.error('Error updating menu item:', error)
      throw error
    }
    
    return data?.[0]
  },

  // Create new order
  async createOrder(orderData) {
    const { data, error } = await supabase
      .from('orders')
      .insert(orderData)
      .select()
    
    if (error) {
      console.error('Error creating order:', error)
      throw error
    }
    
    return data?.[0]
  },

  // Create order items
  async createOrderItems(orderItems) {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select()
    
    if (error) {
      console.error('Error creating order items:', error)
      throw error
    }
    
    return data || []
  },

  // Get orders for admin
  async getOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items (
          *,
          menu_item:menu (
            id,
            name,
            price
          )
        )
      `)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching orders:', error)
      throw error
    }
    
    return data || []
  },

  // Update order status
  async updateOrderStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
    
    if (error) {
      console.error('Error updating order status:', error)
      throw error
    }
    
    return data?.[0]
  }
}

export default supabase
