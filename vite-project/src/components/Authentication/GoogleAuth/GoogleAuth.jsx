import { useDispatch } from "react-redux";
import { LoginSocialGoogle } from "reactjs-social-login";
import { register } from "../../../redux/auth/operations";
import { FcGoogle } from "react-icons/fc";
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
    <LoginSocialGoogle
      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-[#292424] bg-[#FBFCFF] h-10 px-4 py-2 gap-[10px]"
      id="signInButton"
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
      <FcGoogle size="20px" />
      <span className="font-semibold">Continue with Google</span>
    </LoginSocialGoogle>
  );
};

export default GoogleAuth;
