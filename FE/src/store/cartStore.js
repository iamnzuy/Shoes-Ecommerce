import { toFormData } from 'axios';
import { create } from 'zustand'

const cartStore = create((set,get) => ({
  cart: [],
  totalPrice: 0,
  getCart(payload) {
      set({cart: payload})
      get().caculateTotalPrice()
  },
  handleAdd(index) {
    let newcart=[...get().cart]
        newcart[index] = {
           ...newcart[index],
            quantity: newcart[index].quantity +1,
        };
        console.log(newcart);
        set({cart: newcart})
        get().caculateTotalPrice()
  },
 handleDecrease(index) {
    let newcart=[...get().cart]
        newcart[index] = {
           ...newcart[index],
            quantity: newcart[index].quantity -1,
        };
        if (newcart[index].quantity<1) set((state)=>({cart: state.cart.filter((_,idx)=>idx!=index)}))
         else set({cart: newcart})
        get().caculateTotalPrice()
 },
 caculateTotalPrice() {
    let total=get().cart.reduce((acc,item)=>acc+item.price*item.quantity,0)
    console.log(total);
     set({totalPrice: total})
 }
}))
export default cartStore