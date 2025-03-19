import { z } from "zod";
  const getProduct = z.object({
    params: z.object({
      itemName: z.string().min(2, "itemName is required")
    })
  });

  const deleteProduct = z.object({
    params: z.object({
      itemName: z.string().min(2, "itemName is required")
    })
  });

export {
  getProduct,
  deleteProduct,
};