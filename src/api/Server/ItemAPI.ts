import { CartItem } from "./Customer";

const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
export interface ItemData {
  ItemID: string;
  Status: string;
  Name: string;
  Price: number;
  Stock: number;
  Description: string;
  Color: string;
  Series: string;
  Size: string;
  MakerName: string;
  MakerDescription: string;
}
export interface Item {
  Item: ItemData;
}
//認証なしでのリクエスト用
//現在購入可能な商品をすべて取得する
export const ItemGetALL = async () => {
  try {
    const response = await fetch( IPAddress + "/go/item/all", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

//Topに表示する商品を取得する
export const ItemGetTop = async () => {
  try {
    const response = await fetch( IPAddress + "/go/item/top", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const ItemGetMaker = async (maker: string) => {
  try {
    const response = await fetch(
       IPAddress + "/go/item/maker/" + maker,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
export const ItemGetDetails = async (ItemID: string) => {
  try {
    const response = await fetch(
       IPAddress + "/go/item/details/" + ItemID,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json: Item = await response.json();
    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
export interface CartDetails {
  ItemID: string;
  Quantity: number;
  Name: string;
  Price: number;
  Stock: number;
  Status: string;
}
export interface Cart {
  Cart: CartDetails[];
}
export const GetCartDetails = async (Carts: CartItem[]) => {
  try {
    const response = await fetch(
       IPAddress + "/go/item/CartDetails",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(Carts),
      }
    );

    const json: Cart = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
