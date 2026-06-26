import { z } from "zod";

export const sendRecognitionSchema = z.object({
  recipientId: z.string().min(1, "Please select a recipient"),
  departmentId: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  toneId: z.string().min(1, "Tone of value is required"),
  valueIds: z
    .array(z.string())
    .min(1, "Select at least 1 value")
    .max(3, "You can choose a maximum of 3 values"),
  points: z.number().min(1, "Points must be greater than 0"),
  imageId: z.string().min(1, "Please select a card image"),
});

export type SendRecognitionFormValues = z.infer<typeof sendRecognitionSchema>;