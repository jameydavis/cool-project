import React from "react";
import { AppLayout } from "./components/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { PasswordResetPage } from "./pages/PasswordResetPage";

export function App(props) {
  const { page, paths, flash, user, auth, settings } = props;

  const content = (() => {
    switch (page) {
      case "dashboard":
        return <DashboardPage paths={paths} user={user} />;
      case "settings":
        return <SettingsPage paths={paths} settings={settings} csrfToken={props.csrfToken} />;
      case "sign_in":
        return <SignInPage paths={paths} auth={auth} csrfToken={props.csrfToken} />;
      case "sign_up":
        return <SignUpPage paths={paths} auth={auth} csrfToken={props.csrfToken} />;
      case "password_reset":
        return <PasswordResetPage paths={paths} auth={auth} csrfToken={props.csrfToken} />;
      default:
        return user ? (
          <DashboardPage paths={paths} user={user} />
        ) : (
          <SignInPage paths={paths} auth={auth} csrfToken={props.csrfToken} />
        );
    }
  })();

  const authLayout = page === "sign_in" || page === "sign_up" || page === "password_reset";

  return (
    <AppLayout
      paths={paths}
      user={user}
      flash={flash}
      authLayout={authLayout}
      currentPage={page}
    >
      {content}
    </AppLayout>
  );
}
