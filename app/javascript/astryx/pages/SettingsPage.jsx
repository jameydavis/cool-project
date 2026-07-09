import React, { useEffect, useMemo, useState } from "react";
import { useToast } from "@astryxdesign/core/Toast";
import { Card } from "@astryxdesign/core/Card";
import { Heading, Text } from "@astryxdesign/core/Text";
import { TextInput } from "@astryxdesign/core/TextInput";
import { TextArea } from "@astryxdesign/core/TextArea";
import { FileInput } from "@astryxdesign/core/FileInput";
import { Button } from "@astryxdesign/core/Button";
import { Banner } from "@astryxdesign/core/Banner";
import { Avatar } from "@astryxdesign/core/Avatar";
import { VStack, HStack } from "@astryxdesign/core/Layout";
import { Link } from "@astryxdesign/core/Link";
import { showToast } from "../components/FlashToasts";
import { withCacheBust } from "../utils/avatar";

const TIMEZONES = [
  "Eastern Time (US & Canada)",
  "Central Time (US & Canada)",
  "Mountain Time (US & Canada)",
  "Pacific Time (US & Canada)",
  "Alaska",
  "Hawaii",
  "Arizona",
];

function selectedAvatarFile(value) {
  if (!value) return null;
  if (value instanceof File) return value;
  if (Array.isArray(value)) return value[0] || null;
  return null;
}

export function SettingsPage({ paths, settings = {}, csrfToken, onAvatarUpdated }) {
  const toast = useToast();
  const initial = settings.user || {};
  const [form, setForm] = useState({
    preferredName: initial.preferredName || "",
    phoneNumber: initial.phoneNumber || "",
    addressLine1: initial.addressLine1 || "",
    addressLine2: initial.addressLine2 || "",
    city: initial.city || "",
    state: initial.state || "",
    postalCode: initial.postalCode || "",
    country: initial.country || "",
    bio: initial.bio || "",
    timezone: initial.timezone || "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [savedAvatarUrl, setSavedAvatarUrl] = useState(initial.avatarUrl || null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);

  const pendingAvatarFile = useMemo(() => selectedAvatarFile(avatarFile), [avatarFile]);
  const displayAvatarUrl = previewUrl || savedAvatarUrl;

  useEffect(() => {
    if (settings.errors?.length) {
      showToast(toast, settings.errors.join(" "), "error");
    }
  }, [settings.errors, toast]);

  useEffect(() => {
    if (initial.avatarUrl) {
      setSavedAvatarUrl(initial.avatarUrl);
    }
  }, [initial.avatarUrl]);

  useEffect(() => {
    if (!pendingAvatarFile) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(pendingAvatarFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [pendingAvatarFile]);

  const updateField = (field) => (value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSaveAvatar = async () => {
    if (!pendingAvatarFile) {
      showToast(toast, "Choose an image to upload.", "error");
      return;
    }

    setIsSavingAvatar(true);

    const body = new FormData();
    body.append("authenticity_token", csrfToken);
    body.append("user[avatar]", pendingAvatarFile);

    const response = await fetch(paths.settingsAvatarUpdate, {
      method: "PATCH",
      body,
      headers: {
        Accept: "application/json",
        "X-CSRF-Token": csrfToken,
      },
      credentials: "same-origin",
    });

    setIsSavingAvatar(false);

    if (response.ok) {
      const payload = await response.json();
      setSavedAvatarUrl(withCacheBust(payload.avatarUrl));
      setAvatarFile(null);
      onAvatarUpdated?.({
        avatarUrl: payload.avatarUrl,
        avatarThumbUrl: payload.avatarThumbUrl,
      });
      showToast(toast, payload.notice || "Profile photo updated.", "info");
      return;
    }

    if (response.status === 422) {
      const payload = await response.json();
      showToast(toast, (payload.errors || []).join(" ") || "Unable to save profile photo.", "error");
      return;
    }

    showToast(toast, "Unable to save profile photo.", "error");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const body = new FormData();
    body.append("authenticity_token", csrfToken);
    if (settings.profilePrompt) {
      body.append("profile_prompt", "true");
    }

    body.append("user[preferred_name]", form.preferredName);
    body.append("user[phone_number]", form.phoneNumber);
    body.append("user[address_line1]", form.addressLine1);
    body.append("user[address_line2]", form.addressLine2);
    body.append("user[city]", form.city);
    body.append("user[state]", form.state);
    body.append("user[postal_code]", form.postalCode);
    body.append("user[country]", form.country);
    body.append("user[bio]", form.bio);
    body.append("user[timezone]", form.timezone);

    const response = await fetch(paths.settingsUpdate, {
      method: "PATCH",
      body,
      headers: { Accept: "application/json" },
      credentials: "same-origin",
    });

    if (response.ok) {
      const payload = await response.json();
      window.location.href = payload.redirectTo || paths.root;
      return;
    }

    setIsSubmitting(false);

    if (response.status === 422) {
      const payload = await response.json();
      const nextErrors = payload.errors || [ "We couldn't save your settings. Please review the form and try again." ];
      showToast(toast, nextErrors.join(" "), "error");
      return;
    }

    showToast(toast, "We couldn't save your settings. Please review the form and try again.", "error");
  };

  return (
    <Card width="100%" maxWidth={720}>
      <VStack gap={4}>
        {settings.profilePrompt ? (
          <Banner
            status="info"
            title="Complete your profile"
            description="Welcome! Add your details so we can personalize your experience. You can update these anytime from Settings."
          />
        ) : (
          <VStack gap={1}>
            <Heading level={1}>Account Settings</Heading>
            <Text type="supporting">Update your profile information and preferences.</Text>
          </VStack>
        )}

        <VStack gap={3}>
          <Heading level={2}>Profile photo</Heading>
          <HStack gap={3} align="center" wrap="wrap">
            <Avatar
              key={displayAvatarUrl || "default-avatar"}
              src={displayAvatarUrl || undefined}
              size="medium"
              alt="Your profile photo"
            />

            <VStack gap={2}>
              <FileInput
                label="Upload image"
                description="JPEG, PNG, WebP, or GIF up to 5 MB"
                accept="image/jpeg,image/png,image/webp,image/gif"
                maxSize={5 * 1024 * 1024}
                value={avatarFile}
                onChange={setAvatarFile}
              />

              <Button
                label="Save photo"
                variant="secondary"
                onClick={handleSaveAvatar}
                isLoading={isSavingAvatar}
                isDisabled={!pendingAvatarFile}
              />
            </VStack>
          </HStack>
        </VStack>

        <form onSubmit={handleSubmit}>
          <VStack gap={5}>
            <VStack gap={3}>
              <Heading level={2}>About you</Heading>

              <TextInput
                label="Preferred name"
                value={form.preferredName}
                onChange={updateField("preferredName")}
                placeholder="How should we address you?"
              />

              <TextInput
                label="Phone number"
                type="text"
                value={form.phoneNumber}
                onChange={updateField("phoneNumber")}
                placeholder="(555) 555-5555"
              />

              <TextArea
                label="Short bio"
                value={form.bio}
                onChange={updateField("bio")}
                placeholder="Tell us a little about yourself (optional)"
                rows={4}
              />

              <label>
                <Text type="label">Timezone</Text>
                <select
                  value={form.timezone}
                  onChange={(event) => updateField("timezone")(event.target.value)}
                  style={{ width: "100%", marginTop: "0.5rem", padding: "0.5rem" }}
                >
                  <option value="">Select a timezone</option>
                  {TIMEZONES.map((zone) => (
                    <option key={zone} value={zone}>
                      {zone}
                    </option>
                  ))}
                </select>
              </label>
            </VStack>

            <VStack gap={3}>
              <Heading level={2}>Address</Heading>

              <TextInput
                label="Street address"
                value={form.addressLine1}
                onChange={updateField("addressLine1")}
              />

              <TextInput
                label="Apartment, suite, etc. (optional)"
                value={form.addressLine2}
                onChange={updateField("addressLine2")}
              />

              <HStack gap={3} wrap="wrap">
                <TextInput label="City" value={form.city} onChange={updateField("city")} width="100%" />
                <TextInput
                  label="State / Province"
                  value={form.state}
                  onChange={updateField("state")}
                  width="100%"
                />
              </HStack>

              <HStack gap={3} wrap="wrap">
                <TextInput
                  label="Postal code"
                  value={form.postalCode}
                  onChange={updateField("postalCode")}
                  width="100%"
                />
                <TextInput
                  label="Country"
                  value={form.country}
                  onChange={updateField("country")}
                  placeholder="United States"
                  width="100%"
                />
              </HStack>
            </VStack>

            <HStack gap={2}>
              <Button
                label={settings.profilePrompt ? "Save and continue" : "Save settings"}
                type="submit"
                variant="primary"
                isLoading={isSubmitting}
              />
              {!settings.profilePrompt ? (
                <Link href={paths.root}>Cancel</Link>
              ) : null}
            </HStack>
          </VStack>
        </form>
      </VStack>
    </Card>
  );
}
