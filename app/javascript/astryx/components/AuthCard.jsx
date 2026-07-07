import React from "react";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { Banner } from "@astryxdesign/core/Banner";

export function AuthCard({ title, subtitle, errors = [], children, footer }) {
  return (
    <Card width="100%" maxWidth={480}>
      <VStack gap={4}>
        <VStack gap={1}>
          <Heading level={1}>{title}</Heading>
          {subtitle ? <Text type="supporting">{subtitle}</Text> : null}
        </VStack>

        {errors.length > 0 ? (
          <Banner
            status="error"
            title="Please fix the following"
            description={
              <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            }
          />
        ) : null}

        {children}
        {footer}
      </VStack>
    </Card>
  );
}
