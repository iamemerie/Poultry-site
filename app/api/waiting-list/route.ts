import { Prisma } from "@prisma/client";
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
  const notes = cleanText(body.notes, 500);

  if (!name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  try {
    // Note what is NOT here: the visitor cannot set status. The database default (PENDING) applies.
    await prisma.waitingListEntry.create({
      data: { name, email, notes },
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    // P2002 is Prisma's code for "unique constraint failed", i.e. duplicate email.
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "P2002"
    ) {
      return Response.json(
        { error: "This email is already on the waiting list." },
        { status: 409 },
      );
    }
    console.error(err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
