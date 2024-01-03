import { useEffect } from "react";
import { GetCustomer } from "../../api/Server/Customer";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
export const CartSave = () => {
  const { setCartsToLocalStorage } = useContext(CartCountContext);

  useEffect(() => {
    const Carts = localStorage.getItem("Cart");
    GetCustomer().then((response) => {
      if (response) {
        const CustomerData = response.Customer;
        try {
          const CartData = CustomerData.Cart;
          if (Carts?.length === 0 || Carts === undefined || Carts === null) {
          } else {
            localStorage.setItem("Cart", CartData.toString());
            setCartsToLocalStorage(CartData.toString());
            console.log("successfully saved Cart:", CustomerData.Cart);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
      }
    });
  }, []);
};
