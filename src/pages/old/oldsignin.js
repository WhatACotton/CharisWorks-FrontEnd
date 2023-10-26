import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Home.module.css";
import { Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";

const firebaseConfig = {
  apiKey: "AIzaSyAeGNz6VkosSnQJ5mJcQjMZVNxg08C9Jf4",
  authDomain: "charisworks-a1ef5.firebaseapp.com",
  projectId: "charisworks-a1ef5",
  storageBucket: "charisworks-a1ef5.appspot.com",
  messagingSenderId: "155658937570",
  appId: "1:155658937570:web:968428199b75bb618ceabb",
  measurementId: "G-MF7MGV4D71",
};
import * as React from "react";
import Button from "@mui/material/Button";

export function ButtonUsage() {
  return <Button variant="contained">Hello world</Button>;
}
const IPAdress = "192.168.10.179";
export default function Register() {
  initializeApp(firebaseConfig);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signin = async (email, password) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await postDemoforcustomer(idToken);
      router.push("/mypage"); // 登録後にリダイレクトする先を指定
    } catch (error) {
      console.log(error);
    }
  };
  const signup = async (email, password) => {
    try {
      // [START auth_signup_password]
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      await signupserver(idToken);
      router.push("/mypage"); // 登録後にリダイレクトする先を指定
      // [END auth_signup_password]
    } catch (error) {
      console.log(error);
    }
  };
  const passreset = async (email) => {
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    }
  };
  const signupserver = async (idToken) => {
    try {
      console.log(idToken);
      const response = await fetch("http://" + IPAdress + ":80/go/SignUp", {
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
  const postDemoforcustomer = async (idToken) => {
    try {
      console.log(idToken);
      const response = await fetch("http://" + IPAdress + ":80/go/Login", {
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
  return (
    <div className={styles.card}>
      <h1>新規登録・ログイン</h1>

      <div>
        <Form>
          <FormGroup>
            <Label>メールアドレス：</Label>
            <Input
              type="email"
              name="email"
              style={{ height: 50, fontSize: "1.2rem", margin: "1rem" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>パスワード：</Label>
            <Input
              type="password"
              name="password"
              style={{ height: 50, fontSize: "1.2rem", margin: "1rem" }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            onClick={() => {
              signin(email, password);
            }}
          >
            サインイン
          </Button>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            onClick={() => passreset(email)}
          >
            パスワードのリセット
          </Button>
          <Button
            style={{
              width: 220,
              height: 50,
              margin: "10px 10px 10px 10px",
            }}
            color="primary"
            onClick={() => signup(email, password)}
          >
            新規登録
          </Button>
        </Form>
        <ButtonUsage />
      </div>
    </div>
  );
}
