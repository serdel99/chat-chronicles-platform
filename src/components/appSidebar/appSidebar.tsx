import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronUp, Swords } from "lucide-react";
import { useUserStore } from "@/store/user";
import { useTwitchApi } from "@/services/twitch";
import { Button } from "../ui/button";
import { redirectTwichAuth } from "@/hooks/useValidateAuth";
import { useStoryList } from "@/store/storyList";
import { useLocation } from "wouter";
import { useTranslation } from "react-i18next";

export function AppSidebar() {
  const [_location, navigate] = useLocation();
  const [_, getUserInfo] = useTwitchApi(
    { url: "/helix/users" },
    { manual: true }
  );

  const { t } = useTranslation();
  const storyList = useStoryList();

  const userStore = useUserStore();

  useUserStore.subscribe(
    (state) => state.access_token,
    () => {
      getUserInfo().then(({ data }) => {
        userStore.addUser(data.data[0]);
      });
    }
  );

  const handleOnClick = () => {
    redirectTwichAuth();
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <img className=" w-[30px] h-[30px] mr-2" src="/icon-64.png" />
          <h2 className="text-lg font-semibold">Arena Bragis</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <Button
            onClick={() => {
              window.location.replace("/");
            }}
          >
            <Swords />
            {t("newbattle")}
          </Button>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Recent Battles</SidebarGroupLabel>
          <SidebarGroupContent className="overflow-hidden">
            {Object.values(storyList.stories).map((story) => {
              return (
                <Button
                  variant="ghost"
                  className="line-clamp-1 w-full text-left"
                  onClick={() => {
                    navigate(`/story/${story.id}`);
                  }}
                >
                  {story.hero_name} vs {story.enemy_name}
                </Button>
              );
            })}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              {userStore.display_name ? (
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <img
                      alt="twitch profile image"
                      className="w-[20px] h-[20px] rounded-full "
                      src={userStore.profile_image_url}
                    />
                    <p className="">{userStore.display_name}</p>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              ) : (
                <Button onClick={handleOnClick} className="w-full">
                  Login With Twitch
                </Button>
              )}

              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      userStore.logout();
                      useUserStore.persist.clearStorage();
                    }}
                  >
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
