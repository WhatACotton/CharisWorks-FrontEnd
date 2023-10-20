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
    const json = await response.json();
    console.log(json);
    return json.URL;
  } catch (error) {
    console.log(error);
  }
};

//商品の出品　ItemMain(ItemID,Status,ItemName,Price,Stock)を登録する
export const ItemPost = async (
  ItemName: string,
  Price: number,
  Stock: number,
  Series: string,
  Size: string,
  Color: string,
  Description: string
) => {
  try {
    const UserreqPayload = {
      ItemID: "testItemID",
      Price: Price,
      Stock: Stock,
      Series: Series,
      Size: Size,
      Color: Color,
      Status: "inactive",
      ItemName: ItemName,
      Description: Description,
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

//出品者情報の登録　出品者しか実行できないので注意
export const MakerRegister = async (Name: string, Description: string) => {
  const data = {
    MakerName: Name,
    MakerDescription: Description,
  };
  console.log(data);
  function postDemoforcustomer() {
    return fetch("http://" + IPAddress + ":80/go/Maker/DetailsRegister", {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        return json;
      });
  }
  console.log(postDemoforcustomer());
};

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
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};

//stripeアカウントの作成　stripeのアカウント作成のURLを返す
export const MakerStripeAccountCreate = async () => {
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
    const json = await response.json();
    console.log(json);
    return json.URL;
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
