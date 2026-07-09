import React from "react";
import { Banner } from "@astryxdesign/core/Banner";
import { Button } from "@astryxdesign/core/Button";

export function ProfileIncompleteBanner({ paths }) {
  return (
    <Banner
      status="warning"
      container="section"
      title="Your profile still has missing details."
      endContent={
        <Button label="Finish profile" href={paths.settings} variant="primary" size="sm" />
      }
    />
  );
}
