const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
//stripeアカウント作成　アカウント作成サイトへのURLを返す
export const StripeAccountCreate = async () => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/AccountCreate",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
export interface PostItem {
  Item: string;
  Price: number;
  Stock: number;
  Series: string;
  Size: string;
  Color: string;
  Status: string;
  Name: string;
  Description: string;
}
//商品の出品　ItemMain(ItemID,Status,ItemName,Price,Stock)を登録する
export const ItemPost = async (Item: PostItem) => {
  try {
    const UserreqPayload = {
      ItemID: "testItemID",
      Price: Number(Item.Price),
      Stock: Number(Item.Stock),
      Series: Item.Series,
      Size: Item.Size,
      Color: Item.Color,
      Status: "inactive",
      Name: Item.Name,
      Description: Item.Description,
    };
    console.log(UserreqPayload);
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/ItemMainCreate",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(UserreqPayload),
      }
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
//商品の詳細の作成　ItemDetail(ItemID,Description,Color,Series,Size)を登録する
export const ItemDetailsPost = async (
  ItemID: string,
  Description: string,
  Color: string,
  Series: string,
  Size: string
) => {
  try {
    const UserreqPayload = {
      ItemID: ItemID,
      Description: Description,
      Color: Color,
      Series: Series,
      Size: Size,
    };
    console.log(UserreqPayload);
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/ItemDetailCreate",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(UserreqPayload),
      }
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

//出品者情報の登録　出品者しか実行できないので注意 この段階だともうすでにアカウントは作成されている
export const MakerRegister = async (Name: string, Description: string) => {
  const data = {
    MakerName: Name,
    MakerDescription: Description,
  };
  console.log(data);

  const postDemoforcustomer = async () => {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/DetailsRegister",
      {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (response) {
      console.log(response);
    }
  };
  console.log(postDemoforcustomer());
};
export interface MakerData {
  Maker: {
    MakerName: string;
    MakerDescription: string;
    StripeAccountID: string;
  };
}
//出品者の詳細情報の取得
export const MakerDetailsGet = async () => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/Details",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const json: MakerData = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const MakerItemGet = async () => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Maker/GetItem",
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

export const MakerItemIDGet = async (StripeAccountID: string) => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/item/maker/id/" + StripeAccountID,
      {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
