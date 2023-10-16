import {
  getAuth,
  signInWithEmailAndPassword,
  getIdToken,
  signOut,
  sendEmailVerification,
  deleteUser,
  updateEmail,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
//SignIn　idTokenを返す
export const FireBaseSignIn = async (email:string, password:string) => {
  const auth = getAuth();
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  return idToken;
};

//SignUp　idTokenを返す
export const FireBaseSignUp = async (email:string, password:string) => {
  const auth = getAuth();
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  const idToken = await user.getIdToken();
  return idToken;
};

//SignOut
export const FireBaseSignOut = async () => {
  const auth = getAuth();
  await signOut(auth);
};

//ユーザの削除　サーバでも削除処理を行うのでidTokenを返す
export const FireBaseDeleteUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;
  if(!user) return;
  const idToken = await user.getIdToken();
  await deleteUser(auth.currentUser);
  return idToken;
};
//アカウントのパスワードをリセット
export const FireBaseSendPassResetEmail = async (email:string) => {
  const auth = getAuth();
  await sendPasswordResetEmail(auth, email);
};

//認証メールを送る
export const FireBaseSendEmailVerification = async () => {
  const auth = getAuth();
  if (!auth.currentUser) return;
  await sendEmailVerification(auth.currentUser);
};

//Email変更
export const FireBaseChangeEmail = async (newEmail:string) => {
  const auth = getAuth();
  if (!auth.currentUser) return;
  await updateEmail(auth.currentUser, newEmail);
};
