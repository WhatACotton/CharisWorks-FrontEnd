const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
interface MyData {
  Email: string;
  UserID: string;
  Contact:string;
  Name:string;
  ZipCode:string;
  Address:string;
  CreatedDate:string;
  IsEmailVerified:boolean;
  IsRegistered:boolean;
}
//顧客情報の取得
export const CustomerGet = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/GetCustomer", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json:MyData = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
//ログアウト処理
export const LogOut = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/SessionEnd", {
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

//購入処理　カートに入っている商品の購入　stripeの購入サイトへのURLを返す
export const Purchase = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/Transaction", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
    return json.url;
  } catch (error) {
    console.log(error);
  }
};

//購入履歴を取得する　購入履歴をjsonで返す
export const TransactionGet = async () => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/GetTransactions",
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

//カートに入っている商品を取得する
export const CartGet = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/GetCart", {
      method: "GET",
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

//アカウント情報の修正
export const CustomerModify = async (Name:string, ZipCode:string, Address:string) => {
  try {
    const UserreqPayload = {
      Name: Name,
      ZipCode: ZipCode,
      Address: Address,
    };
    console.log(UserreqPayload);
    const response = await fetch("http://" + IPAddress + ":80/go/Modify", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(UserreqPayload),
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
//カートへの商品の登録
export const CartPost = async (ItemID:string, Quantity:number) => {
  const data = {
    itemid: ItemID,
    Quantity: Quantity,
  };
  console.log(data);
  function postDemoforcustomer() {
    return fetch("http://" + IPAddress + ":80/go/PostCart", {
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

  alert("仮登録が完了しました。");
};
