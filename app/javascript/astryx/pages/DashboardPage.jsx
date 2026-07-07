import React from "react";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Banner } from "@astryxdesign/core/Banner";
import { VStack, HStack } from "@astryxdesign/core/Layout";

export function DashboardPage({ paths, user }) {
  return (
    <VStack gap={3} width="100%">
      <Card width="100%">
        <VStack gap={2}>
          <Heading level={1}>Dashboard</Heading>
          <Text type="supporting">
            Welcome back, <strong>{user.displayName}</strong>.
          </Text>
        </VStack>
      </Card>

      {user.profileSetupNeeded ? (
        <Banner
          status="warning"
          title="Complete your profile"
          description="Add your contact details and address so we can personalize your experience."
          endContent={<Button label="Finish profile" href={paths.settings} variant="primary" size="sm" />}
        />
      ) : null}

      <HStack gap={3} wrap="wrap" align="stretch">
        <Card width="100%" style={{ flex: "1 1 16rem" }}>
          <VStack gap={2}>
            <Heading level={3}>Account</Heading>
            <Text type="supporting">{user.email}</Text>
            <Button label="Account settings" href={paths.settings} variant="secondary" />
          </VStack>
        </Card>

        <Card width="100%" style={{ flex: "1 1 16rem" }}>
          <VStack gap={2}>
            <Heading level={3}>Profile status</Heading>
            <Text>
              {user.profileComplete
                ? "Your profile is complete."
                : "Your profile still has missing details."}
            </Text>
            <Button label="View settings" href={paths.settings} variant="ghost" />
          </VStack>
        </Card>
      </HStack>
    </VStack>
  );
}
