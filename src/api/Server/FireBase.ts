const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;

export interface CustomerRegisterPayload {
  Name: string;
  ZipCode: string;
  Address1: string;
  Address2: string;
  Address3: string;
  PhoneNumber: string;
}
//IdTokenが必要なアカウント関係の処理
//サインアップ処理
export const Register = async (MyData: CustomerRegisterPayload) => {
  try {
    const response = await fetch(
       IPAddress + "/go/Registration",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(MyData),
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
    const response = await fetch( IPAddress + "/go/Login", {
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
       IPAddress + "/go/DeleteCustomer",
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
