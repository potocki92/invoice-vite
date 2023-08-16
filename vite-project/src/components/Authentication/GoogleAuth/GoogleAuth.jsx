import { useDispatch } from "react-redux";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { register } from "../../../redux/auth/operations";
const GoogleAuth = (isRegister) => {
  const dispatch = useDispatch();
  const clientId =
    "815039792408-0a4voqplfkk3kkb1adobf7ocudbo5r01.apps.googleusercontent.com";

  const onSuccess = async (res) => {
    console.log("Login success: ", res.profileObj);

    if (!isRegister) {
      isRegister = true;
    }
    try {
      await dispatch(
        register({
          googleId: res.profileObj.googleId,
          email: res.profileObj.email,
          name: res.profileObj.name,
        })
      );
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    } finally {
      isRegister = false;
    }
  };
  return (
    <div id="signInButton">
      <LoginSocialGoogle
        client_id={clientId}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
        onSuccess={onSuccess}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
    </div>
  );
};

export default GoogleAuth;
