import { prisma } from "@/lib/prisma";
import { cleanText, isValidEmail } from "@/lib/validate";
import { ANIMALS, PRODUCTS, isOneOf } from "@/lib/enums";

const MAX_QUANTITY = 500;

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
  const phone = cleanText(body.phone, 20);
  const deliveryArea = cleanText(body.deliveryArea, 100);
  const quantity = Number(body.quantity);
  const animal =
    typeof body.animal === "string" ? body.animal.trim().toUpperCase() : "";
  const product =
    typeof body.product === "string" ? body.product.trim().toUpperCase() : "";

  if (!name) {
    return Response.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!email) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }
  if (!phone) {
    return Response.json(
      { error: "Please enter a phone number." },
      { status: 400 },
    );
  }
  if (!deliveryArea) {
    return Response.json(
      { error: "Please enter your delivery area." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QUANTITY) {
    return Response.json(
      { error: `Quantity must be between 1 and ${MAX_QUANTITY}.` },
      { status: 400 },
    );
  }
  if (!isOneOf(ANIMALS, animal)) {
    return Response.json(
      { error: "Please choose an animal." },
      { status: 400 },
    );
  }
  if (!isOneOf(PRODUCTS, product)) {
    return Response.json(
      { error: "Please choose a product." },
      { status: 400 },
    );
  }

  try {
    await prisma.preOrder.create({
      data: {
        name,
        email,
        phone,
        deliveryArea,
        quantity,
        animal,
        product,
      },
    });
    return Response.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
