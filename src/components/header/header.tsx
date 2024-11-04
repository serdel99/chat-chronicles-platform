import { useUserStore } from "@/store/user";
import { supabase } from "@/services/supabase";
import { redirectTwichAuth } from "@/hooks/useValidateAuth";
import { Button } from "../ui/button";
import { useTwitchApi, GetUserReponse } from "@/services/twitch";

const Header = () => {
  const [_, getUserInfo] = useTwitchApi(
    { url: "/helix/users" },
    { manual: true }
  );

  const userStore = useUserStore();

  useUserStore.subscribe(
    (state) => state.access_token,
    () => {
      getUserInfo().then(({ data }) => {
        console.log(data.data);
        userStore.addUser(data.data[0]);
      });
    }
  );

  const handleOnClick = () => {
    redirectTwichAuth();
  };


  
  return (
    <header className="flex shadow-md py-4 px-4 sm:px-10  min-h-[70px]  relative z-50">
      <div className="flex flex-wrap justify-between items-center w-full">
        <h2 className="text-lg font-semibold">Chat Chronicles</h2>
        <div className="flex gap-3 items-center ">
          {userStore.display_name ? (
            <>
              <img
                alt="twitch profile image"
                className="w-[20px] h-[20px] rounded-full "
                src={userStore.profile_image_url}
              />
              <p className="">{userStore.display_name}</p>
            </>
          ) : (
            <Button onClick={handleOnClick}>Login With Twitch</Button>
          )}
        </div>
      </div>
    </header>
  );
};

export { Header };
