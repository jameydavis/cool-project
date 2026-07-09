import React, { useEffect, useRef } from "react";
import { useToast } from "@astryxdesign/core/Toast";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { showToast } from "./FlashToasts";

export function AuthCard({ title, subtitle, errors = [], children, footer }) {
  const toast = useToast();
  const previousErrors = useRef("");

  useEffect(() => {
    const message = errors.join(" ");
    if (errors.length === 0 || message === previousErrors.current) return;

    previousErrors.current = message;
    showToast(toast, message, "error");
  }, [errors, toast]);

  return (
    <Card width="100%" maxWidth={480}>
      <VStack gap={4}>
        <VStack gap={1}>
          <Heading level={1}>{title}</Heading>
          {subtitle ? <Text type="supporting">{subtitle}</Text> : null}
        </VStack>

        {children}
        {footer}
      </VStack>
    </Card>
  );
}
