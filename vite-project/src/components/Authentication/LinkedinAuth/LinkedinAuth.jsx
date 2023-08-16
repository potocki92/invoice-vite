import React from "react";
import { LinkedIn } from "react-linkedin-login-oauth2";
import axios from "axios"; // Załóżmy, że używamy Axios do wykonywania żądań HTTP
import { LinkedInLoginButton } from "react-social-login-buttons";

const LinkedinAuth = () => {
  const clientId = "776f83gmqlpxma";
  const redirectUri = "qSrbchriIcshvDi4";
  const onSuccess = async (response) => {
    console.log("Login success: ", response);
    // Przesyłamy dostępy do serwera i rejestrujemy użytkownika
    try {
      const res = await axios.post("/api/register/linkedin", {
        accessToken: response.accessToken,
        // Inne dane użytkownika, które chcesz zachować
      });
      console.log("Rejestracja zakończona pomyślnie:", res.data);
    } catch (error) {
      console.error("Błąd podczas rejestracji:", error);
    }
  };

  const onFailure = (error) => {
    console.log("Login failed: ", error);
  };

  return (
    <LinkedIn
      clientId={clientId}
      redirectUri={`${window.location.origin}/linkedin`}
      onSuccess={(code) => {
        console.log(code);
      }}
      onError={(error) => {
        console.log(error);
      }}
    >
      {({ linkedInLogin }) => <LinkedInLoginButton onClick={linkedInLogin} />}
    </LinkedIn>
  );
};

export default LinkedinAuth;
