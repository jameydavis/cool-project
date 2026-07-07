import React, { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { AuthCard } from "../components/AuthCard";

export function PasswordResetPage({ paths, auth = {}, csrfToken }) {
  const [email, setEmail] = useState(auth.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <AuthCard
      title="Reset your password"
      subtitle="Enter your email and we will send reset instructions."
      errors={auth.errors || []}
      footer={
        <Text type="supporting">
          Remembered your password? <Link href={paths.signInPage}>Back to sign in</Link>
        </Text>
      }
    >
      <form action={paths.passwordReset} method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="authenticity_token" value={csrfToken} />

        <VStack gap={3}>
          <TextInput
            label="Email"
            htmlName="user[email]"
            type="email"
            value={email}
            onChange={setEmail}
            autoComplete="email"
            isRequired
          />

          <Button label="Send reset instructions" type="submit" variant="primary" isLoading={isSubmitting} />
        </VStack>
      </form>
    </AuthCard>
  );
}
