import React from "react";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";

export function DashboardPage({ user }) {
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
    </VStack>
  );
}
