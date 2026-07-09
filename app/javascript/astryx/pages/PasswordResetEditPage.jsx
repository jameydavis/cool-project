import React, { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { AuthCard } from "../components/AuthCard";

export function PasswordResetEditPage({ paths, auth = {}, csrfToken }) {
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const minimumPasswordLength = auth.minimumPasswordLength;
  const subtitle =
    minimumPasswordLength != null
      ? `Choose a new password (${minimumPasswordLength} characters minimum).`
      : "Choose a new password for your account.";

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <AuthCard
      title="Change your password"
      subtitle={subtitle}
      errors={auth.errors || []}
      footer={
        <Text type="supporting">
          Remembered your password? <Link href={paths.signInPage}>Back to sign in</Link>
        </Text>
      }
    >
      <form action={paths.passwordReset} method="post" onSubmit={handleSubmit}>
        <input type="hidden" name="_method" value="put" />
        <input type="hidden" name="authenticity_token" value={csrfToken} />
        <input
          type="hidden"
          name="user[reset_password_token]"
          value={auth.resetPasswordToken || ""}
        />

        <VStack gap={3}>
          <TextInput
            label="New password"
            htmlName="user[password]"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            isRequired
          />

          <TextInput
            label="Confirm new password"
            htmlName="user[password_confirmation]"
            type="password"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            autoComplete="new-password"
            isRequired
          />

          <Button label="Change my password" type="submit" variant="primary" isLoading={isSubmitting} />
        </VStack>
      </form>
    </AuthCard>
  );
}
