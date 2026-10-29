"use server";

import { prisma } from "@/lib/prisma";
import { Animal, Product } from "@prisma/client";

export async function joinWaitingList(formData: {
  name: string;
  email: string;
  phone: string;
  animal: Animal;
  product: Product;
  quantity: number;
  deliveryArea: string;
}) {
  try {
    await prisma.preOrder.create({
      data: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        animal: formData.animal,
        product: formData.product,
        quantity: Number(formData.quantity),
        deliveryArea: formData.deliveryArea,
      },
    });
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Failed to join the waiting list. Please try again.",
    };
  }
}
