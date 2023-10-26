import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  sendEmailVerification,
  deleteUser,
  updateEmail,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

import {
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
} from "reactstrap";
import fbinitialize from "../../lib/FireBase/firebaseConfig";
// .envファイルで設定した環境変数をfirebaseConfigに入れる
const IPAddress = process.env.NEXT_PUBLIC_IP_ADDRESS;
fbinitialize();
const endserver = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/SessionEnd", {
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
const createStripeAccount = async () => {
  try {
    const response = await fetch(
      "http://" + IPAddress + ":80/go/CreateStripeAccount",
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
    return json.URL;
  } catch (error) {
    console.log(error);
  }
};
const purchase = async () => {
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
const getTransaction = async () => {
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
  } catch (error) {
    console.log(error);
  }
};
const getCart = async () => {
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
const getItemALL = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/item/all", {
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
const getItemTop = async () => {
  try {
    const response = await fetch("http://" + IPAddress + ":80/go/item/top", {
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
const signout = async () => {
  try {
    const auth = getAuth();

    await signOut(auth).catch((error) => {
      // An error happened.
      console.log(error);
    });
    endserver();
  } catch (error) {
    console.log(error);
  }
};
const verification = async () => {
  try {
    const auth = getAuth();
    await sendEmailVerification(auth.currentUser);
  } catch (error) {
    console.log(error);
  }
};
const deleteuser = async () => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const idToken = await user.getIdToken();
    await deleteUser(auth.currentUser);
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
const ChangeEmail = async (newEmail) => {
  try {
    console.log("newEmail: ", newEmail);
    const auth = getAuth();
    await updateEmail(auth.currentUser, newEmail);
  } catch (error) {
    console.log(error);
  }
};
const ModifyCustomer = async (Name, ZipCode, Address) => {
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
const PostItem = async (ItemID, Status, ItemName, Price, Stock) => {
  try {
    const UserreqPayload = {
      ItemID: ItemID,
      Status: Status,
      ItemName: ItemName,
      Price: Price,
      Stock: Stock,
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
const PostItemDetails = async (ItemID, Description, Color, Series, Size) => {
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
function StripeAccountCreate(props) {
  const [MakerDescription, setMakerDescription] = useState("");
  const [MakerName, setMakerName] = useState("");
  const [newMakerDescription, setnewMakerDescription] = useState("");
  const [newMakerName, setnewMakerName] = useState("");
  if (props.StripeAccountID == "Allow") {
    return (
      <div>
        <Button
          style={{ width: 220 }}
          color="primary"
          // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
          onClick={() => {
            CreateStripeAccount().then(function (response) {
              props.router.push(response);
            });
          }}
        >
          ストライプアカウント作成
        </Button>
      </div>
    );
  } else {
    if (props.StripeAccountID != undefined) {
      return (
        <div>
          <p>ストライプアカウント作成済み</p>
          <Button
            style={{ width: 220 }}
            color="primary"
            // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              GetMakerDetails().then(function (response) {
                try {
                  if (response.MakerDescription != "") {
                    setMakerDescription(response.Maker.MakerDescription);
                    console.log(response.Maker.MakerDescription);
                  }
                  if (response.MakerName != "") {
                    setMakerName(response.Maker.MakerName);
                    console.log(response.Maker.MakerName);
                  }
                } catch (error) {
                  console.log(error);
                }
              });
            }}
          >
            ストライプアカウント取得
          </Button>
          <p> MakerName:{MakerName} </p>
          <p>Description:{MakerDescription}</p>

          <Label>名前：</Label>
          <Input
            type="text"
            name="MakerName"
            style={{ height: 50, fontSize: "1.2rem" }}
            onChange={(e) => setnewMakerName(e.target.value)}
          />
          <br />
          <Label>説明：</Label>
          <Input
            type="text"
            name="ItemID"
            style={{ height: 50, fontSize: "1.2rem" }}
            onChange={(e) => setnewMakerDescription(e.target.value)}
          />
          <Button
            style={{ width: 220 }}
            color="primary"
            // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              //片方だけ入力されたときの処理を後でやる。
              registerMaker(newMakerName, newMakerDescription);
            }}
          >
            出品者情報更新
          </Button>
        </div>
      );
    }
  }
}
const registerMaker = async (Name, Description) => {
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

const GetMakerDetails = async () => {
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

const CreateStripeAccount = async () => {
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
// ユーザーがログインボタンを押したときにdoLogin関数が実行される

const cart = async (ItemID, Quantity) => {
  const data = {
    itemid: ItemID,
    Quantity: parseInt(Quantity),
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

export default function Register() {
  // useStateでユーザーが入力したメールアドレスとパスワードをemailとpasswordに格納する
  const router = useRouter();
  const [newEmail, setnewEmail] = useState("");
  const [email, setEmail] = useState(null);
  const [CreatedDate, setCreatedDate] = useState(null);
  const [EmailVerified, setEmailVerified] = useState(null);
  const [LastAccessedDate, setLastAccessedDate] = useState(null);
  const [Register, setERegister] = useState(null);
  const [newName, setnewName] = useState("");
  const [newZipCode, setnewZipCode] = useState("");
  const [newAddress, setnewAddress] = useState("");
  const [Name, setName] = useState("");
  const [ZipCode, setZipCode] = useState("");
  const [Address, setAddress] = useState("");
  const [StripeAccountID, setStripeAccountID] = useState("");
  const [ItemID, setItemID] = useState("");
  const [Quantity, setQuantity] = useState("");

  const continueserver = async () => {
    try {
      const response = await fetch(
        "http://" + IPAddress + ":80/go/GetCustomer",
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
      if (json.message == "未ログインです。") {
        alert("未ログインです。ログインページへ戻ります。");
        router.push("/signin");
      }
      console.log(
        json.Contact,
        json.EmailVerified,
        json.CreatedDate,
        json.LastAccessedDate,
        json.Register,
        json.Name,
        json.ZipCode,
        json.Address
      );
      setEmail(json.Contact);
      setCreatedDate(json.CreatedDate);
      setLastAccessedDate(json.LastAccessedDate);
      if (json.IsEmailVerified == true) {
        setEmailVerified("verified");
      } else {
        setEmailVerified("not verified");
      }
      if (json.IsRegistered == true) {
        setERegister("本登録が完了しています");
      } else {
        setERegister("本登録を完了してください");
      }
      setName(json.Name);
      setZipCode(json.ZipCode);
      setAddress(json.Address);
      if (json.StripeAccountID == "Allow") {
        setStripeAccountID(json.StripeAccountID);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    continueserver();
  }, []);

  return (
    <div>
      <div className={styles.card}>
        <h1>マイページ</h1>
        <div>
          <p>currentEmail is {email}</p>
          <p>CreatedDate is {CreatedDate}</p>
          <p>Email is {EmailVerified}</p>
          <p>LastAccessedDate is {LastAccessedDate}</p>
          <p>{Register}</p>
        </div>
        <div className={styles.card}>
          <h1>カート入力</h1>
          <div style={{ paddingBottom: "1rem" }}>
            <Form>
              <FormGroup>
                <Label>商品ID：</Label>
                <Input
                  type="text"
                  name="ItemID"
                  style={{ height: 50, fontSize: "1.2rem" }}
                  onChange={(e) => setItemID(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label>数量：</Label>
                <Input
                  type="number"
                  name="Quantity"
                  style={{ height: 50, fontSize: "1.2rem" }}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </FormGroup>
              <Button
                style={{ width: 220 }}
                color="primary"
                // ログインボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  cart(ItemID, Quantity);
                }}
              >
                送信
              </Button>
            </Form>
          </div>
        </div>
        <div className={styles.card}>
          <Form>
            <FormGroup>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  signout().catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
                  router.push("/signin");
                }}
              >
                サインアウト
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                onClick={() =>
                  verification()
                    .then(() => {
                      router.push("/signin");
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    })
                }
              >
                verification
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  deleteuser().catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
                  router.push("/signin");
                }}
              >
                delete user
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  purchase()
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    })
                    .then((url) => {
                      router.push(url);
                    })
                    .catch((error) => {
                      // An error happened.
                      console.log(error);
                    });
                }}
              >
                purchase
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  getTransaction().catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
                }}
              >
                get transaction
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  getCart().catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
                }}
              >
                get cart
              </Button>
              <Button
                style={{
                  width: 220,
                  height: 50,
                  margin: "10px 10px 10px 10px",
                }}
                color="primary"
                // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
                onClick={() => {
                  URL = createStripeAccount().catch((error) => {
                    // An error happened.
                    console.log(error);
                  });
                  router.push(URL);
                }}
              >
                createStripeAccount
              </Button>
            </FormGroup>
          </Form>
        </div>
        <div className={styles.card}>
          <Form>
            <h2>メールアドレス変更</h2>
            <FormGroup>
              <Label>変更先メールアドレス：</Label>
              <Input
                type="email"
                name="email"
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setnewEmail(e.target.value)}
              />
            </FormGroup>
            <Button
              style={{ width: 220, height: 50, margin: "10px 10px 10px 10px" }}
              color="primary"
              // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
              onClick={() => {
                ChangeEmail(newEmail).catch((error) => {
                  // An error happened.
                  console.log(error);
                });
                router.push("/signin");
              }}
            >
              ChangeEmail
            </Button>
          </Form>
        </div>
        <div className={styles.card}>
          <Form>
            <h2>個人情報</h2>
            <FormGroup>
              <Label>名前：</Label>
              <Input
                type="text"
                name="name"
                placeholder={Name}
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setnewName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>郵便番号：</Label>
              <Input
                type="text"
                name="ZipCode"
                placeholder={ZipCode}
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setnewZipCode(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label>郵便番号の先の住所：</Label>
              <Input
                type="text"
                name="Address"
                placeholder={Address}
                style={{ height: 50, fontSize: "1.2rem" }}
                onChange={(e) => setnewAddress(e.target.value)}
              />
            </FormGroup>
            <Button
              style={{ width: 220, height: 50, margin: "10px 10px 10px 10px" }}
              color="primary"
              // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
              onClick={() => {
                let reqName;
                let reqZipCode;
                let reqAddress;
                if (newName == "") {
                  reqName = Name;
                } else {
                  reqName = newName;
                }
                if (newZipCode == "") {
                  reqZipCode = ZipCode;
                } else {
                  reqZipCode = newZipCode;
                }
                if (newAddress == "") {
                  reqAddress = Address;
                } else {
                  reqAddress = newAddress;
                }

                ModifyCustomer(reqName, reqZipCode, reqAddress).catch(
                  (error) => {
                    // An error happened.
                    console.log(error);
                  }
                );
                router.push("/mypage");
              }}
            >
              登録
            </Button>
            <StripeAccountCreate
              StripeAccountID={StripeAccountID}
              router={router}
            />
          </Form>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              PostItem("ItemID2", "Status", "ItemName", 20, 20).catch(
                (error) => {
                  // An error happened.
                  console.log(error);
                }
              );
            }}
          >
            postItem
          </Button>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              PostItemDetails(
                "ItemID",
                "Description",
                "Color",
                "Series",
                "Size"
              ).catch((error) => {
                // An error happened.
                console.log(error);
              });
            }}
          >
            postItemDetails
          </Button>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              getItemALL().catch((error) => {
                // An error happened.
                console.log(error);
              });
            }}
          >
            ItemGetAll
          </Button>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            // 登録ボタンがクリックされたときdoRegister関数が実行されるようにする
            onClick={() => {
              getItemTop().catch((error) => {
                // An error happened.
                console.log(error);
              });
            }}
          >
            ItemGetTop
          </Button>
        </div>
      </div>
    </div>
  );
}
