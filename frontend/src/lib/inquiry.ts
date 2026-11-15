/** An inquiry type on the contact form; `key` is what `/contact?type=<key>` preselects. */
export interface InquiryType {
  key: string;
  label: string;
  /** Replaces the message label while this type is selected. */
  messageLabel?: string;
}

/** Sent as the type when the visitor doesn't pick one. */
export const NO_INQUIRY_TYPE = "Not specified";

/**
 * The inquiry type a `?type=` value preselects: a matching key (case-
 * insensitive), otherwise none. Nothing is preselected without `?type=`, and
 * an unknown value never throws, since the link may have been typed by hand.
 */
export function preselectedInquiry(types: readonly InquiryType[], requested: string | null | undefined): string | null {
  const wanted = requested?.trim().toLowerCase();
  return types.find((t) => t.key === wanted)?.key ?? null;
}

/** The human-readable label for a key, used in the email subject and body. */
export function inquiryLabel(types: readonly InquiryType[], key: string): string {
  return types.find((t) => t.key === key)?.label ?? NO_INQUIRY_TYPE;
}

/** The message field's label: the selected type's own wording, or the default. */
export function messageLabelFor(types: readonly InquiryType[], key: string, fallback: string): string {
  return types.find((t) => t.key === key)?.messageLabel ?? fallback;
}
