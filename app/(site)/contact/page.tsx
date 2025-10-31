"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { FadeY } from "@/components/core/reveal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone || "");
      formData.append("company", data.company || "");
      formData.append("message", data.message);

      // Handle file upload if present
      const fileInput =
        document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput?.files?.[0]) {
        formData.append("file", fileInput.files[0]);
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        });
        reset();
        if (fileInput) fileInput.value = "";
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Section spacing="xl" background="dark">
        <Container>
          <FadeY>
            <Heading level={1} className="mb-6 text-white">
              Get in Touch
            </Heading>
          </FadeY>
          <FadeY delay={0.2}>
            <Text size="body-lg" className="max-w-3xl text-neutral-300">
              Have a project in mind? Need expert advice on switchboards or
              enclosures? We're here to help. Fill out the form below or contact
              us directly.
            </Text>
          </FadeY>
        </Container>
      </Section>

      {/* Contact Form & Info Section */}
      <Section spacing="lg">
        <Container>
          <div className="grid md:grid-cols-5 gap-12">
            {/* Left Side - Contact Information */}
            <div className="md:col-span-2">
              <FadeY>
                <Heading level={2} className="mb-8">
                  Contact Information
                </Heading>
              </FadeY>

              {/* Address */}
              <FadeY delay={0.1}>
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand flex-shrink-0">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-semibold text-neutral-900 mb-1">
                        Address
                      </Text>
                      <Text className="text-neutral-600">
                        123 Industrial Drive
                        <br />
                        Dandenong, VIC 3175
                        <br />
                        Australia
                      </Text>
                    </div>
                  </div>
                </div>
              </FadeY>

              {/* Phone */}
              <FadeY delay={0.2}>
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand flex-shrink-0">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-semibold text-neutral-900 mb-1">
                        Phone
                      </Text>
                      <Text className="text-neutral-600">
                        <a
                          href="tel:+61397945555"
                          className="hover:text-brand transition-colors"
                        >
                          +61 3 9794 5555
                        </a>
                      </Text>
                    </div>
                  </div>
                </div>
              </FadeY>

              {/* Email */}
              <FadeY delay={0.3}>
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand flex-shrink-0">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-semibold text-neutral-900 mb-1">
                        Email
                      </Text>
                      <Text className="text-neutral-600">
                        <a
                          href="mailto:info@virtueenclosures.com.au"
                          className="hover:text-brand transition-colors"
                        >
                          info@virtueenclosures.com.au
                        </a>
                      </Text>
                    </div>
                  </div>
                </div>
              </FadeY>

              {/* Business Hours */}
              <FadeY delay={0.4}>
                <div className="mb-8">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand flex-shrink-0">
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <Text className="font-semibold text-neutral-900 mb-1">
                        Business Hours
                      </Text>
                      <Text className="text-neutral-600">
                        Monday - Friday: 7:00 AM - 5:00 PM
                        <br />
                        Saturday - Sunday: Closed
                      </Text>
                    </div>
                  </div>
                </div>
              </FadeY>

              {/* Google Map Placeholder */}
              <FadeY delay={0.5}>
                <div className="mt-8">
                  <div className="aspect-video rounded-2xl bg-neutral-200 overflow-hidden shadow-soft">
                    {/* Google Map Embed Placeholder */}
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200">
                      <div className="text-center">
                        <svg
                          className="w-12 h-12 mx-auto mb-2 text-neutral-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                          />
                        </svg>
                        <Text size="small" className="text-neutral-500">
                          Google Map Embed
                        </Text>
                      </div>
                    </div>
                    {/* Replace above div with actual Google Maps embed:
                    <iframe
                      src="https://www.google.com/maps/embed?pb=YOUR_EMBED_URL"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    */}
                  </div>
                </div>
              </FadeY>
            </div>

            {/* Right Side - Contact Form */}
            <div className="md:col-span-3">
              <FadeY delay={0.2}>
                <div className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12">
                  <Heading level={2} className="mb-6">
                    Send Us a Message
                  </Heading>
                  <Text className="mb-8 text-neutral-600">
                    Fill out the form below and we'll get back to you as soon as
                    possible. You can also attach drawings or specifications.
                  </Text>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-neutral-900 mb-2"
                      >
                        Name <span className="text-brand">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        {...register("name")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all`}
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <Text size="small" className="text-red-500 mt-1">
                          {errors.name.message}
                        </Text>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-neutral-900 mb-2"
                      >
                        Email <span className="text-brand">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        {...register("email")}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? "border-red-500" : "border-neutral-300"
                        } focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all`}
                        placeholder="your.email@example.com"
                      />
                      {errors.email && (
                        <Text size="small" className="text-red-500 mt-1">
                          {errors.email.message}
                        </Text>
                      )}
                    </div>

                    {/* Phone & Company Row */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone Field */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-neutral-900 mb-2"
                        >
                          Phone
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          {...register("phone")}
                          className={`w-full px-4 py-3 rounded-xl border ${
                            errors.phone
                              ? "border-red-500"
                              : "border-neutral-300"
                          } focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all`}
                          placeholder="0412 345 678"
                        />
                        {errors.phone && (
                          <Text size="small" className="text-red-500 mt-1">
                            {errors.phone.message}
                          </Text>
                        )}
                      </div>

                      {/* Company Field */}
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold text-neutral-900 mb-2"
                        >
                          Company
                        </label>
                        <input
                          type="text"
                          id="company"
                          {...register("company")}
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-neutral-900 mb-2"
                      >
                        Message <span className="text-brand">*</span>
                      </label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.message
                            ? "border-red-500"
                            : "border-neutral-300"
                        } focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all resize-none`}
                        placeholder="Tell us about your project requirements..."
                      />
                      {errors.message && (
                        <Text size="small" className="text-red-500 mt-1">
                          {errors.message.message}
                        </Text>
                      )}
                    </div>

                    {/* File Upload Field */}
                    <div>
                      <label
                        htmlFor="file"
                        className="block text-sm font-semibold text-neutral-900 mb-2"
                      >
                        Attach Drawings/Specifications
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          id="file"
                          accept=".pdf,.dwg,.dxf,.jpg,.jpeg,.png"
                          className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand hover:file:bg-brand-100 cursor-pointer"
                        />
                      </div>
                      <Text size="small" className="text-neutral-500 mt-2">
                        Accepted formats: PDF, DWG, DXF, JPG, PNG (Max 10MB)
                      </Text>
                    </div>

                    {/* Submit Status */}
                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-xl ${
                          submitStatus.type === "success"
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        <Text size="small">{submitStatus.message}</Text>
                      </div>
                    )}

                    {/* Submit Button with Micro-interactions */}
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(var(--color-brand-rgb),0.3)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-soft"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg
                              className="w-5 h-5 transition-transform group-hover:translate-x-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                              />
                            </svg>
                          </>
                        )}
                      </span>
                    </Button>
                  </form>
                </div>
              </FadeY>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
