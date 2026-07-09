import React from "react";
import { AppShell } from "@astryxdesign/core/AppShell";
import { TopNav } from "@astryxdesign/core/TopNav";
import { TopNavItem } from "@astryxdesign/core/TopNav";
import { Button } from "@astryxdesign/core/Button";
import { VStack } from "@astryxdesign/core/Layout";
import { AppBrandHeading } from "./AppBrandHeading";

function SignOutForm({ paths, csrfToken }) {
  return (
    <form action={paths.signOut} method="post" style={{ display: "inline" }}>
      <input type="hidden" name="_method" value="delete" />
      <input type="hidden" name="authenticity_token" value={csrfToken} />
      <Button label="Sign out" type="submit" variant="ghost" size="sm" />
    </form>
  );
}

export function AppLayout({ paths, user, authLayout, currentPage, children }) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
  const brandHeading = <AppBrandHeading paths={paths} user={user} />;

  if (authLayout) {
    return (
      <AppShell height="auto" contentPadding={4}>
        <VStack gap={4} align="center">
          {brandHeading}
          {children}
        </VStack>
      </AppShell>
    );
  }

  const endContent = user ? (
    <>
      <TopNavItem label="Settings" href={paths.settings} isSelected={currentPage === "settings"} />
      {csrfToken ? <SignOutForm paths={paths} csrfToken={csrfToken} /> : null}
    </>
  ) : (
    <>
      <TopNavItem label="Sign in" href={paths.signInPage} />
      <Button label="Sign up" href={paths.signUpPage} variant="primary" size="sm" />
    </>
  );

  return (
    <AppShell
      height="auto"
      contentPadding={4}
      variant="elevated"
      topNav={
        <TopNav heading={brandHeading} endContent={endContent} />
      }
    >
      {children}
    </AppShell>
  );
}
