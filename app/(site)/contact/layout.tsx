import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Virtue Enclosure Systems",
  description:
    "Get in touch with Virtue Enclosure Systems for switchboard and enclosure solutions. Request a quote, ask questions, or discuss your project requirements.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
