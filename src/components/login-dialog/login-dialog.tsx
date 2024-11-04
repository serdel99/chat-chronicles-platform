import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirectTwichAuth } from "@/hooks/useValidateAuth";
import { useTranslation } from "react-i18next";
import { Twitch } from "lucide-react";

type Props = {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const LoginDialog = ({ isOpen, setOpen }: Props) => {
  const { t } = useTranslation();
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("user.login.title")}</DialogTitle>
          <DialogDescription> {t("user.login.description")}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <Button
            type="submit"
            onClick={() => {
              redirectTwichAuth();
            }}
            className="w-full bg-[#6441a5] hover:bg-[#583a91]"
          >
            <Twitch />
            {t("user.login.action")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
