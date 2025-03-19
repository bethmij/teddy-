import { z } from "zod";
  const getUser = z.object({
    params: z.object({
        email: z.string().min(5, "Username is required")
    })
  });

  const deleteUser = z.object({
    params: z.object({
        email: z.string().min(2, "Username is required")
    })
  });

export {
    getUser,
    deleteUser,
};