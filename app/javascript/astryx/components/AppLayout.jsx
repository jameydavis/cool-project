import React from "react";
import { AppShell } from "@astryxdesign/core/AppShell";
import { TopNav } from "@astryxdesign/core/TopNav";
import { TopNavHeading } from "@astryxdesign/core/TopNav";
import { TopNavItem } from "@astryxdesign/core/TopNav";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";
import { VStack } from "@astryxdesign/core/Layout";

function SignOutForm({ paths, csrfToken }) {
  return (
    <form action={paths.signOut} method="post" style={{ display: "inline" }}>
      <input type="hidden" name="_method" value="delete" />
      <input type="hidden" name="authenticity_token" value={csrfToken} />
      <Button label="Sign out" type="submit" variant="ghost" size="sm" />
    </form>
  );
}

export function AppLayout({ paths, user, flash, authLayout, currentPage, children }) {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;

  const banner = flash?.notice ? (
    <Banner status="success" title={flash.notice} />
  ) : flash?.alert ? (
    <Banner status="error" title={flash.alert} />
  ) : null;

  if (authLayout) {
    return (
      <AppShell height="auto" contentPadding={4} banner={banner}>
        <VStack gap={4} align="center">
          <TopNavHeading heading="Cool Project" headingHref={paths.root} />
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
      banner={banner}
      topNav={
        <TopNav
          heading={<TopNavHeading heading="Cool Project" headingHref={paths.root} />}
          endContent={endContent}
        />
      }
    >
      {children}
    </AppShell>
  );
}
