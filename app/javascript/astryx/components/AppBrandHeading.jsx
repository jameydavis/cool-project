import React from "react";
import { TopNavHeading } from "@astryxdesign/core/TopNav";
import { Avatar } from "@astryxdesign/core/Avatar";

export function AppBrandHeading({ paths, user }) {
  return (
    <TopNavHeading
      heading="Cool Project"
      headingHref={paths.root}
      logo={
        user ? (
          <Avatar
            src={user.avatarThumbUrl}
            size="small"
            alt="Your profile photo"
          />
        ) : null
      }
    />
  );
}
