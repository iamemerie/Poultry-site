import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isValidEmail } from "@/lib/validate";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = isValidEmail(body.email)
    ? body.email.trim().toLowerCase()
    : null;

  if (!email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  try {
    await prisma.newsletterSubscriber.create({
      data: { email },
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return Response.json(
        { error: "You're already subscribed." },
        { status: 409 },
      );
    }
    console.error("Error creating newsletter subscription:", error);
    return Response.json(
      { error: "An error occurred while subscribing to the newsletter." },
      { status: 500 },
    );
  }
}
