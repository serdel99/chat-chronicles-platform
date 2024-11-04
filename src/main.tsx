import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, Switch } from "wouter";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { Story } from "./pages/story";

import { AppSidebar } from "./components/appSidebar/appSidebar";

import "./i18n";
import "./index.css";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <SidebarProvider>
      <SidebarTrigger />
      <AppSidebar />
      <Switch>
        <Route path="/" component={Story} />
        <Route path="/story/:id" component={Story} />
        <Route>404: No such page!</Route>
      </Switch>
    </SidebarProvider>
  </StrictMode>
);
