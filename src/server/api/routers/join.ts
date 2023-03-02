import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { FormDataZod } from "@/interfaces/FormDataInterface";
import { prisma } from "@/server/db";
import axios from "axios";
import { env } from "@/env.mjs";
import requestIp from "request-ip";
import FormData from "form-data";

export const joinRouter = createTRPCRouter({
  add: publicProcedure
    .input(z.object({ token: z.string(), data: FormDataZod }))
    .mutation(async ({ input, ctx }) => {
      try {
        const detectedIp = requestIp.getClientIp(ctx.req);

        let formData = new FormData();
        formData.append("secret", env.CT_SECRET);
        formData.append("response", input.token);
        formData.append("remoteip", detectedIp!);

        let { data } = await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "https://challenges.cloudflare.com/turnstile/v0/siteverify",
          headers: {
            ...formData.getHeaders(),
          },
          data: formData,
        });

        if (!data.success) {
          throw new Error("คุณไม่ผ่านการตรวจสอบ");
        }

        const email = await prisma.request.findUnique({
          where: {
            email: input.data.email,
          },
        });

        if (email) {
          throw new Error("คุณสมัครไปเรียบร้อยแล้ว");
        }

        await prisma.request.create({
          data: { ...input.data },
        });
        
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
});
