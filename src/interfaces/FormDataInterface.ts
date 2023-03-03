export interface FormDataInterface {
  first_name_th: string;
  last_name_th: string;
  first_name_en: string;
  last_name_en: string;
  nick_name: string;
  ojectives: string;
  email: string;
  year: number;
  faculty: string;
  major: string;
}

import { z } from "zod";

export const FormDataZod = z.object({
  first_name_th: z.string(),
  last_name_th: z.string(),
  first_name_en: z.string(),
  last_name_en: z.string(),
  nick_name: z.string(),
  ojectives: z.string(),
  email: z.string(),
  year: z.number(),
  faculty: z.string(),
  major: z.string(),
  token: z.string().optional(),
});
