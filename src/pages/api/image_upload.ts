import fileUpload from "express-fileupload";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import nc from "next-connect";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import sharp from "sharp";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { S3Interface } from "@/interfaces/S3Interface";
import { getLogger } from "@/utils/logging";

const logger = getLogger("home");
export interface FileUploadRequest extends NextApiRequest {
  files: File1;
}

interface File1 {
  [key: string]: any;
}

async function constraintImage(
  buffer: Buffer,
  quality = 82,
  drop = 2
): Promise<Buffer> {
  const done = await sharp(buffer)
    .resize({
      width: 1000,
      height: 1000,
      fit: sharp.fit.inside,
    })
    .png({
      quality,
    })
    .toBuffer();

  if (done.byteLength > 1000000) {
    return constraintImage(buffer, quality - drop);
  }

  return done;
}

const handler = nc<FileUploadRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(fileUpload())
  .post(async (req, res) => {
    let S3_ENV = JSON.parse(env.S3) as S3Interface;

    let token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET!,
    });
    if (!token) {
      res.status(401).end("Unauthorized");
      return;
    }

    if (!req.files) {
      res.status(400).end("No files were uploaded.");
      return;
    }

    let file = req.files.file;

    const fileTypes = /jpeg|jpg|png|gif/;
    const extName = fileTypes.test(
      file.name.substring(file.name.lastIndexOf(".") + 1)
    );
    if (!extName) {
      res.status(400).end("Only image files are allowed!");
      return;
    }

    try {
      const s3 = new S3Client({
        credentials: {
          accessKeyId: S3_ENV.accessKey,
          secretAccessKey: S3_ENV.secretKey,
        },
        endpoint: S3_ENV.url,
        forcePathStyle: true,
        region: "ap-southeast-1",
      });

      let dbData = await prisma.request.findUnique({
        where: {
          google_id: token.sub,
        },
      });

      if (!dbData) {
        dbData = await prisma.request.create({
          data: {
            google_id: token.sub,
            image_path: token.sub + ".png",
          },
        });
      }
      logger.info(`upload : idcard/${dbData.image_path!}`);

      await s3.send(
        new PutObjectCommand({
          Bucket: `idcard`,
          Key: dbData.image_path!,
          Body: await constraintImage(file.data),
        })
      );

      res.status(200).send("Ok");
    } catch (error: any) {
      logger.error(`upload : ${error.message}`);
      throw new Error(error.message);
    }
  });

export default handler;

export const config = {
  api: {
    bodyParser: false,
  },
};
