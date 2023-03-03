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
          },
        });

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: env.EMAIL_USER,
            pass: env.EMAIL_PASS,
          },
        });

        const mailOptions: any = {
          from: env.EMAIL_USER,
          to: input.data.email,
          subject: "ขอบคุณที่สนใจเข้าร่วมชมรมกับเรา - KU Tech Club",
          html: `<p><span style="font-size:20px"><strong>ขอบคุณ&nbsp;${input.data.first_name_th}&nbsp;ที่สนใจเข้าร่วมชมรมกับเรา - KU Tech Club</strong></span></p>

          <p><span style="font-size:16px">ชื่อ : ${input.data.first_name_th} ${input.data.last_name_th}<br />
          คณะ : ${input.data.faculty}<br />
          สาขา : ${input.data.major}</span></p>
          
          <p><span style="font-size:16px"><strong>รอประกาศผล ใน email นี้ 🥰</strong></span></p>`,
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    }),
});
