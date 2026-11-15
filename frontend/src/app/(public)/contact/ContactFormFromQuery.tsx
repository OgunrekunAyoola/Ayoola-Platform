"use client";

import { useSearchParams } from "next/navigation";
import { preselectedInquiry } from "@/lib/inquiry";
import ContactForm from "./ContactForm";

type Props = Omit<React.ComponentProps<typeof ContactForm>, "preselected">;

/**
 * The contact form with its inquiry type preselected from `?type=` (e.g.
 * /contact?type=rescue from the Services page); without one, nothing is
 * selected. Render it inside <Suspense>,
 * with a plain <ContactForm> as the fallback, so the page stays static.
 */
export default function ContactFormFromQuery(props: Props) {
  const type = useSearchParams().get("type");
  const preselected = preselectedInquiry(props.inquiryTypes, type);
  // Keyed, so a client-side move to another ?type= starts a fresh form.
  return <ContactForm key={preselected ?? "none"} {...props} preselected={preselected} />;
}
