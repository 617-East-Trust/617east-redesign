/*
 * Mount-once engagement listeners (scroll depth, outbound, blog 90%).
 * Does not load third-party tags — only fires events after consent.
 */

import { useEffect } from "react";
import { bindEngagementTracking, getConsent, initAnalytics } from "@/lib/analytics";

export default function EngagementTracker() {
  useEffect(() => {
    if (getConsent() === "granted") {
      initAnalytics();
    }
    return bindEngagementTracking();
  }, []);

  return null;
}
