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
}
//認証なしでのリクエスト用
//現在購入可能な商品をすべて取得する
export const ItemGetALL = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/item/all", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

//Topに表示する商品を取得する
export const ItemGetTop = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/item/top", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

export const ItemGetMaker = async (maker:string) => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/item/maker/"+maker, {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

