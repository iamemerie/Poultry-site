import { prisma } from "@/lib/prisma";
import { cleanText, isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = cleanText(body.name, 100);
  const email = isValidEmail(body.email)
    ? body.email.trim().toLowerCase()
    : null;
  const message = cleanText(body.message, 2000);
  const subject = cleanText(body.subject, 150);

  if (!name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (!subject) {
    return Response.json({ error: "Please enter a subject." }, { status: 400 });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        subject,
        message,
      },
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating contact:", error);
    return Response.json(
      { error: "An error occurred while sending your message." },
      { status: 500 },
    );
  }
}
