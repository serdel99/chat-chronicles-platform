import { useAxios, UserResponse } from "@/services/api";
import { useUserStore } from "@/store/user";
import { useEffect } from "react";
import { useLocation } from "wouter";

const clientId = import.meta.env.VITE_TWITCH_CLIENT_ID;
const redirectUrl = import.meta.env.VITE_REDIRECT_URL;

export const redirectTwichAuth = () => {
  const url = new URL("https://id.twitch.tv/oauth2/authorize");

  url.searchParams.append("client_id", clientId);
  url.searchParams.append("redirect_uri", redirectUrl);
  url.searchParams.append(
    "scope",
    "channel:manage:polls user:read:chat user:bot channel:bot channel:manage:redemptions"
  );
  url.searchParams.append("response_type", "id_token token");

  window.location.href = url.href;
};

export const useValidateAuth = () => {
  const userStorage = useUserStore();

  const [_location, navigate] = useLocation();

  const [_, getUserAcessToken] = useAxios<UserResponse>(
    {
      method: "POST",
      url: "/auth/login",
    },
    { manual: true, autoCancel: false }
  );

  useEffect(() => {
    if (window.localStorage.getItem("twitch_token")) {
      return;
    }

    const searchParams = new URLSearchParams(
      document.location.hash.substring(1)
    );

    const token = searchParams.get("access_token");
    const id_token = searchParams.get("id_token");

    if (token && id_token) {
      userStorage.addAccessToken(token, id_token);
      navigate("/");
    }
  }, []);
};
