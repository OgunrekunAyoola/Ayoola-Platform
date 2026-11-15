/** An inquiry type on the contact form; `key` is what `/contact?type=<key>` preselects. */
export interface InquiryType {
  key: string;
  label: string;
}

/**
 * The inquiry type a `?type=` value preselects: a matching key (case-
 * insensitive), otherwise the first type. Unknown or missing values never
 * throw, since the link may have been typed or shared by hand.
 */
export function preselectedInquiry(types: readonly InquiryType[], requested: string | null | undefined): string {
  const wanted = requested?.trim().toLowerCase();
  return types.find((t) => t.key === wanted)?.key ?? types[0].key;
}

/** The human-readable label for a key, used in the email subject and body. */
export function inquiryLabel(types: readonly InquiryType[], key: string): string {
  return types.find((t) => t.key === key)?.label ?? key;
}
