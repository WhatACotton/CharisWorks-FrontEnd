const IPAddress = process.env.IP_ADDRESS;


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
