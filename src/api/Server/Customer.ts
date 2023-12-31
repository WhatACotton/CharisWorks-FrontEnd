const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
export interface Customer {
  Email: string;
  UserID: string;
  Contact: string;
  Name: string;
  ZipCode: string;
  Address1: string;
  Address2: string;
  Address3: string;
  PhoneNumber: string;
  CreatedDate: string;
  IsEmailVerified: boolean;
  IsRegistered: boolean;
  Role: string;
  Cart: CartItem[] | string;
}

//顧客情報の取得
export const GetCustomer = async () => {
  try {
    const response = await fetch(IPAddress + "/go/GetCustomer", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 401) {
      localStorage.setItem("IsRegistered", "false");
    }
    return response
  } catch (error) {
    console.log(error);
  }
};
//ログアウト処理
export const LogOut = async () => {
  try {
    const response = await fetch(IPAddress + "/go/SessionEnd", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "applicatnpion/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
export interface PurchaseResponse {
  message: string;
  url: string;
}
//購入処理　カートに入っている商品の購入　stripeの購入サイトへのURLを返す
export const Purchase = async (Carts: CartItem[]) => {
  try {
    const response = await fetch(IPAddress + "/go/Transaction", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(Carts),
    });
    const json: PurchaseResponse = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

interface TransactionItem {
  ItemID: string;
  Quantity: number;
  TransactionID: string;
  ItemName: string;
}

interface Transaction {
  TransactionID: string;
  Name: string;
  TotalAmount: number;
  TransactionTime: string;
  StripeID: string;
  status: string;
  ShipID: string;
  items: TransactionItem[];
}

export interface TransactionData {
  TransactionLists: Transaction[];
  Transactions: TransactionItem[][];
}

export interface TransactionCardProps {
  transaction: Transaction;
}

//購入履歴を取得する　購入履歴をjsonで返す
export const TransactionGet = async () => {
  try {
    const response = await fetch(
      IPAddress + "/go/GetTransactions",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const json: TransactionData = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export interface CartItem {
  ItemID: string;
  Quantity: number;
}
export interface CartItemProps {
  Cart: CartItem[];
}
//カートに入っている商品を取得する
export const CartGet = async () => {
  try {
    const response = await fetch(IPAddress + "/go/GetCart", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json: CartItemProps = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
import { CustomerRegisterPayload } from "./FireBase";
//アカウント情報の修正
export const CustomerModify = async (MyData: CustomerRegisterPayload) => {
  try {
    console.log(MyData);
    const response = await fetch(IPAddress + "/go/Modify", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
//カートへの商品の登録
export const CartPost = async (CartItems: CartItem[]) => {
  try {
    const response = await fetch(IPAddress + "/go/Cart", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CartItems),
    });
    const json: CartItem[] = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
import Router from "next/router";

export const CustomerReq = async () => {
  const response = await GetCustomer();
  if (response?.status == 200) {
    const CustomerData = await response.json();
    return CustomerData.Customer;
  }
  alert("ログインしてください");
  Router.router?.push("/signin");
  return null;
};
