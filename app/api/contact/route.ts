import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;
    const file = formData.get("file") as File | null;

    // Log the submission (replace with actual email/database logic later)
    console.log("=== Contact Form Submission ===");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone || "Not provided");
    console.log("Company:", company || "Not provided");
    console.log("Message:", message);

    if (file) {
      console.log("File attached:");
      console.log("  - Name:", file.name);
      console.log("  - Type:", file.type);
      console.log("  - Size:", `${(file.size / 1024).toFixed(2)} KB`);
    } else {
      console.log("No file attached");
    }
    console.log("==============================");

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Validate file size if present (max 10MB)
    if (file && file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    // Validate file type if present
    if (file) {
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/acad",
        "application/x-acad",
        "application/dxf",
        "image/vnd.dwg",
        "image/x-dwg",
      ];

      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      const allowedExtensions = ["pdf", "jpg", "jpeg", "png", "dwg", "dxf"];

      if (!allowedExtensions.includes(fileExtension || "")) {
        return NextResponse.json(
          { error: "Invalid file type. Allowed: PDF, DWG, DXF, JPG, PNG" },
          { status: 400 }
        );
      }
    }

    // TODO: Replace this section with actual email sending logic
    // Example using Nodemailer, SendGrid, or Resend:
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'noreply@virtueenclosures.com.au',
      to: 'info@virtueenclosures.com.au',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${company || 'Not provided'}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      attachments: file ? [{
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }] : [],
    });
    */

    // TODO: Save to database if needed
    /*
    await db.contactSubmissions.create({
      data: {
        name,
        email,
        phone,
        company,
        message,
        fileName: file?.name,
        submittedAt: new Date(),
      },
    });
    */

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received. We'll get back to you soon!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to process your request. Please try again later." },
      { status: 500 }
    );
  }
}
