const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;

interface MyData {
  Name: string;
  ZipCode: string;
  Address: string;
}
//IdTokenが必要なアカウント関係の処理
//サインアップ処理
export const Register = async (MyData: MyData) => {
  try {
    const data = JSON.stringify({
      Name: MyData.Name,
      ZipCode: MyData.ZipCode,
      Address: MyData.Address,
    });
    console.log(data);
    const response = await fetch(
      "http://" + IPAddress + ":80/go/Registration",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: data,
      }
    );

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};

//ログイン処理
export const SignInServer = async (idToken: string) => {
  try {
    console.log(idToken);
    const response = await fetch("http://" + IPAddress + ":80/go/Login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: idToken,
      },
      credentials: "include",
    });
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
//アカウント削除
export const UserDelete = async (idToken: string) => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/DeleteCustomer",
      {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: idToken,
        },
        credentials: "include",
      }
    );
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.log(error);
  }
};
