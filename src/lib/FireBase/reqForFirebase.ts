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
  GoogleAuthProvider,
  signInWithPopup,
  OAuthProvider,
} from "firebase/auth";
//SignIn　idTokenを返す
export const FireBaseSignIn = async (email: string, password: string) => {
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
export const FireBaseSignUp = async (email: string, password: string) => {
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
  if (!user) return;
  const idToken = await user.getIdToken();
  await deleteUser(auth.currentUser);
  return idToken;
};
//アカウントのパスワードをリセット
export const FireBaseSendPassResetEmail = async (email: string) => {
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
export const FireBaseChangeEmail = async (newEmail: string) => {
  const auth = getAuth();
  if (!auth.currentUser) return;
  await updateEmail(auth.currentUser, newEmail);
};

export const FireBaseGoogleSignIn = async () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const user = await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) return;
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(token);
      console.log(user);
      return user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

  if (!user) return;
  const idToken = await user.getIdToken();
  if (!idToken) return;
  console.log(idToken);
  return idToken;
};
export const MicrosoftSignIn = async () => {
  const auth = getAuth();
  const provider = new OAuthProvider("microsoft.com");
  signInWithPopup(auth, provider)
    .then((result) => {
      // User is signed in.
      // IdP data available in result.additionalUserInfo.profile.

      // Get the OAuth access token and ID Token
      const credential = OAuthProvider.credentialFromResult(result);
      if (!credential) return;
      const accessToken = credential.accessToken;
      const idToken = credential.idToken;
      console.log(accessToken);
      console.log(idToken);
      return;
    })
    .catch((error) => {
      // Handle error.
    });
};
