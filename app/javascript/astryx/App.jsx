import React, { useState } from "react";
import { ToastViewport } from "@astryxdesign/core/Toast";
import { AppLayout } from "./components/AppLayout";
import { FlashToasts } from "./components/FlashToasts";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";
import { PasswordResetEditPage } from "./pages/PasswordResetEditPage";
import { withCacheBust } from "./utils/avatar";

export function App(props) {
  const { page, paths, flash, user, auth, settings, csrfToken } = props;
  const [currentUser, setCurrentUser] = useState(user);

  const handleAvatarUpdated = ({ avatarUrl, avatarThumbUrl }) => {
    setCurrentUser((existing) =>
      existing
        ? {
            ...existing,
            avatarUrl: withCacheBust(avatarUrl),
            avatarThumbUrl: withCacheBust(avatarThumbUrl),
          }
        : existing
    );
  };

  const content = (() => {
    switch (page) {
      case "dashboard":
        return <DashboardPage user={currentUser} />;
      case "settings":
        return (
          <SettingsPage
            paths={paths}
            settings={settings}
            csrfToken={csrfToken}
            onAvatarUpdated={handleAvatarUpdated}
          />
        );
      case "sign_in":
        return <SignInPage paths={paths} auth={auth} csrfToken={csrfToken} />;
      case "sign_up":
        return <SignUpPage paths={paths} auth={auth} csrfToken={csrfToken} />;
      case "password_reset":
        return <PasswordResetPage paths={paths} auth={auth} csrfToken={csrfToken} />;
      case "password_reset_edit":
        return <PasswordResetEditPage paths={paths} auth={auth} csrfToken={csrfToken} />;
      default:
        return currentUser ? (
          <DashboardPage user={currentUser} />
        ) : (
          <SignInPage paths={paths} auth={auth} csrfToken={csrfToken} />
        );
    }
  })();

  const authLayout =
    page === "sign_in" ||
    page === "sign_up" ||
    page === "password_reset" ||
    page === "password_reset_edit";

  return (
    <>
      <ToastViewport position="topEnd" />
      <FlashToasts flash={flash} />
      <AppLayout
        paths={paths}
        user={currentUser}
        authLayout={authLayout}
        currentPage={page}
      >
        {content}
      </AppLayout>
    </>
  );
}
