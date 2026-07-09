import { useEffect, useRef } from "react";
import { useToast } from "@astryxdesign/core/Toast";

const TOAST_DURATION_MS = 5000;

export function FlashToasts({ flash }) {
  const toast = useToast();
  const shown = useRef(false);

  useEffect(() => {
    if (!flash || shown.current) return;

    if (flash.notice) {
      shown.current = true;
      toast({
        body: flash.notice,
        type: "info",
        isAutoHide: true,
        autoHideDuration: TOAST_DURATION_MS,
      });
      return;
    }

    if (flash.alert) {
      shown.current = true;
      toast({
        body: flash.alert,
        type: "error",
        isAutoHide: true,
        autoHideDuration: TOAST_DURATION_MS,
      });
    }
  }, [flash, toast]);

  return null;
}

export function showToast(toast, message, type = "info") {
  if (!message) return;

  toast({
    body: message,
    type,
    isAutoHide: true,
    autoHideDuration: TOAST_DURATION_MS,
  });
}
