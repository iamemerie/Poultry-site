"use server";

import { prisma } from "@/lib/prisma";

export async function joinWaitingList(formData: {
  name: string;
  email: string;
  phone: string;
  species: string;
  quantity: number;
}) {
  try {
    await prisma.preorder.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        species: formData.species,
        quantity: Number(formData.quantity),
      },
    });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: "Failed to join the waiting list. Please try again.",
    };
  }
}
