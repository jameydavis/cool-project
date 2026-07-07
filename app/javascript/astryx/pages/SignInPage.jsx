import React, { useState } from "react";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Button } from "@astryxdesign/core/Button";
import { Link } from "@astryxdesign/core/Link";
import { Text } from "@astryxdesign/core/Text";
import { VStack } from "@astryxdesign/core/Layout";
import { AuthCard } from "../components/AuthCard";

export function SignInPage({ paths, auth = {}, csrfToken }) {
  const [email, setEmail] = useState(auth.email || "");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
  };

  return (
    <AuthCard
      title="Sign in"
      subtitle="Welcome back. Enter your account details to continue."
      errors={auth.errors || []}
      footer={
        <Text type="supporting">
          Need an account? <Link href={paths.signUpPage}>Sign up</Link>
        </Text>
      }
    >
      <form action={paths.signIn} method="post" onSubmit={handleSubmit}>
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
            autoComplete="current-password"
            isRequired
          />

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="checkbox"
              name="user[remember_me]"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              value="1"
            />
            Remember me
          </label>

          <Button label="Sign in" type="submit" variant="primary" isLoading={isSubmitting} />

          <Link href={paths.passwordResetPage}>Forgot your password?</Link>
        </VStack>
      </form>
    </AuthCard>
  );
}
