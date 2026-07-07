import React, { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { AuthCard } from "../components/AuthCard";

export function SignUpPage({ paths, auth = {}, csrfToken }) {
  const [email, setEmail] = useState(auth.email || "");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to get started with Cool Project."
      errors={auth.errors || []}
      footer={
        <Text type="supporting">
          Already have an account? <Link href={paths.signInPage}>Sign in</Link>
        </Text>
      }
    >
      <form action={paths.signUp} method="post" onSubmit={handleSubmit}>
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

          <TextInput
            label="Password"
            htmlName="user[password]"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            description="Minimum 6 characters"
            isRequired
          />

          <TextInput
            label="Confirm password"
            htmlName="user[password_confirmation]"
            type="password"
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            autoComplete="new-password"
            isRequired
          />

          <Button label="Sign up" type="submit" variant="primary" isLoading={isSubmitting} />
        </VStack>
      </form>
    </AuthCard>
  );
}
