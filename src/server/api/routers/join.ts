import { z } from "zod";
import nodemailer from "nodemailer";

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
  add: protectedProcedure
    .input(z.object({ token: z.string(), data: FormDataZod }))
    .mutation(async ({ input, ctx }) => {
      try {
        const detectedIp = requestIp.getClientIp(ctx.req);

        let formData = new FormData();
        formData.append("secret", env.RECAPTCHA_SECRET);
        formData.append("response", input.token);
        formData.append("remoteip", detectedIp!);

        let { data } = await axios({
          method: "post",
          maxBodyLength: Infinity,
          url: "https://www.google.com/recaptcha/api/siteverify",
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
            google_id: ctx.session.user.sub,
          },
        });

        if (
          email?.first_name_en ||
          email?.last_name_en ||
          email?.first_name_th ||
          email?.last_name_th ||
          email?.faculty ||
          email?.major
        ) {
          throw new Error("คุณสมัครไปเรียบร้อยแล้ว");
        }

        await prisma.request.update({
          where: {
            google_id: ctx.session.user.sub,
          },
          data: {
            ...input.data,
            google_email: ctx.session.user.email,
          },
        });

      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
  checkApprove: protectedProcedure.query(async ({ ctx }) => {
    const dataDB = await prisma.request.findUnique({
      where: {
        google_id: ctx.session.user.sub,
      },
    });

    let isRegisted = false;

    if (
      dataDB?.first_name_en ||
      dataDB?.last_name_en ||
      dataDB?.first_name_th ||
      dataDB?.last_name_th ||
      dataDB?.faculty ||
      dataDB?.major
    ) {
      isRegisted = true;
    }

    let message = {
      line: "" as string | null,
      discord: "" as string | null,
    };

    if (isRegisted && isRegisted) {
      if (dataDB?.is_approved) {
        message.line = "https://line.me/ti/g/gbU_JbD-DV";
        message.discord = "https://discord.gg/aGBphyVEUg";
      } else {
        message.line = null;
        message.discord = null;
      }
    }

    return {
      isRegisted,
      isApproved: dataDB?.is_approved || false,
      message,
    };
  }),
});
