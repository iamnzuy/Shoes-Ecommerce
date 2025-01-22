import { toFormData } from 'axios';
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware';

const cartStore = create(
    persist( //use cart-storage to store cart
    (set,get) => ({
        cart: [],
        totalPrice: 0,
    addToCart(product){ //if item exist: add up quantity, else add new item
        set((state) => {
            const existingItemIndex = state.cart.findIndex(item => item._id === product._id)
            
            if (existingItemIndex !== -1) {

                const newCart = [...state.cart]
                
                newCart[existingItemIndex] = {
                    ...newCart[existingItemIndex],
                    quantity: newCart[existingItemIndex].quantity + product.quantity
                }

                return { cart: newCart }
            } else {
                return { cart: [...state.cart, product] }
            }
        })
        get().calculateTotalPrice()
    },

    handleAdd(index) {
        let newcart=[...get().cart]
            newcart[index] = {
            ...newcart[index],
                quantity: newcart[index].quantity +1,
            };
            // console.log(newcart);
            set({cart: newcart})
            get().calculateTotalPrice()
    },

    handleDecrease(index) {
        let newcart=[...get().cart]
            newcart[index] = {
            ...newcart[index],
                quantity: newcart[index].quantity -1,
            };
            if (newcart[index].quantity<1) set((state)=>({cart: state.cart.filter((_,idx)=>idx!=index)}))
            else set({cart: newcart})
            get().calculateTotalPrice()
    },

    removeFromCart: (index) => {
        set((state) => ({
          cart: state.cart.filter((_, idx) => idx !== index)
        }))
        get().calculateTotalPrice()
    },

    clearCart: () => {
        set({ cart: [], totalPrice: 0 })
    },
    calculateTotalPrice() {
        let total=get().cart.reduce((acc,item)=>acc+item.price*item.quantity,0)
        set({totalPrice: total})
    }
}),
 {
    name: 'cart-storage',  
    storage: createJSONStorage(() => localStorage)
 }
))
 
export default cartStore