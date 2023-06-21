-- CreateTable
CREATE TABLE "Request" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_name_th" TEXT,
    "last_name_th" TEXT,
    "first_name_en" TEXT,
    "last_name_en" TEXT,
    "nick_name" TEXT,
    "ojectives" TEXT,
    "email" TEXT,
    "year" INTEGER,
    "faculty" TEXT,
    "major" TEXT,
    "image_path" TEXT,
    "google_id" TEXT,
    "discord_tag" TEXT,
    "google_email" TEXT,
    "is_approved" BOOLEAN DEFAULT false,
    "core_team_profile_image_path" TEXT,
    "isActive" BOOLEAN DEFAULT true,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "content" TEXT,
    "to" TEXT,
    "is_sent" BOOLEAN DEFAULT false,
    "requestId" TEXT,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestDelete" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "first_name_th" TEXT,
    "last_name_th" TEXT,
    "first_name_en" TEXT,
    "last_name_en" TEXT,
    "nick_name" TEXT,
    "ojectives" TEXT,
    "email" TEXT,
    "year" INTEGER,
    "faculty" TEXT,
    "major" TEXT,
    "image_path" TEXT,
    "google_id" TEXT,
    "discord_tag" TEXT,
    "google_email" TEXT,
    "is_approved" BOOLEAN DEFAULT false,

    CONSTRAINT "RequestDelete_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "color_id" TEXT,
    "tag_type_id" TEXT,
    "parentTagId" TEXT,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagType" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT,

    CONSTRAINT "TagType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TagColor" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "color_bg" TEXT,
    "color_text" TEXT,

    CONSTRAINT "TagColor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebConfig" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT,
    "key" TEXT,
    "status" BOOLEAN DEFAULT false,

    CONSTRAINT "WebConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShortLink" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "original_link" TEXT,
    "short_link" TEXT,
    "request_user_id" TEXT,
    "is_active" BOOLEAN DEFAULT false,
    "count" INTEGER DEFAULT 0,

    CONSTRAINT "ShortLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RequestToTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Request_first_name_th_key" ON "Request"("first_name_th");

-- CreateIndex
CREATE UNIQUE INDEX "Request_last_name_th_key" ON "Request"("last_name_th");

-- CreateIndex
CREATE UNIQUE INDEX "Request_first_name_en_key" ON "Request"("first_name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Request_last_name_en_key" ON "Request"("last_name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Request_email_key" ON "Request"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Request_image_path_key" ON "Request"("image_path");

-- CreateIndex
CREATE UNIQUE INDEX "Request_google_id_key" ON "Request"("google_id");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TagType_name_key" ON "TagType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WebConfig_title_key" ON "WebConfig"("title");

-- CreateIndex
CREATE UNIQUE INDEX "WebConfig_key_key" ON "WebConfig"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_original_link_key" ON "ShortLink"("original_link");

-- CreateIndex
CREATE UNIQUE INDEX "ShortLink_short_link_key" ON "ShortLink"("short_link");

-- CreateIndex
CREATE UNIQUE INDEX "_RequestToTag_AB_unique" ON "_RequestToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_RequestToTag_B_index" ON "_RequestToTag"("B");

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_color_id_fkey" FOREIGN KEY ("color_id") REFERENCES "TagColor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_tag_type_id_fkey" FOREIGN KEY ("tag_type_id") REFERENCES "TagType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_parentTagId_fkey" FOREIGN KEY ("parentTagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShortLink" ADD CONSTRAINT "ShortLink_request_user_id_fkey" FOREIGN KEY ("request_user_id") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToTag" ADD CONSTRAINT "_RequestToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Request"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequestToTag" ADD CONSTRAINT "_RequestToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
