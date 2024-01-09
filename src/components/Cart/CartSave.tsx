import { useEffect } from "react";
import { GetCustomer } from "../../api/Server/Customer";
import { useContext } from "react";
import { CartCountContext } from "../../api/Contexts/CartContext";
interface Props {
  Cart: string | undefined;
}
export const CartSave = (Cart: string | undefined) => {
  const { setCartsToLocalStorage } = useContext(CartCountContext);

  useEffect(() => {
    const Carts = localStorage.getItem("Cart");
    try {
      console.log(Carts);
      if (Carts?.length === 0 || Carts === undefined || Carts === null) {
      } else {
        if (Cart != undefined) {
          localStorage.setItem("Cart", Cart);
          setCartsToLocalStorage(Cart);
          console.log("successfully saved Cart:", Cart);
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, []);
};
