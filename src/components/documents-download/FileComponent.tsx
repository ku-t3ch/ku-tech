import { Document, File } from "@/interfaces/HygraphDocumentInterface";
import { Icon } from "@iconify/react";
import { Button } from "antd";
import { NextPage } from "next";
import { useMediaQuery } from "usehooks-ts";
import { saveAs } from "file-saver";
import { FileIcon, defaultStyles } from "react-file-icon";
import { fileMimeTypeToType } from "@/utils/fileMimeTypeToType";

interface Props {
  document: Document;
}

const FileComponent: NextPage<Props> = ({ document: documentFile }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const onDownload = () => {
    documentFile.file.map((file: File) => {
      setTimeout(() => {
        saveAs(file.url!, file.fileName);
      }, 1000);
    });
  };

  return (
    <div className="flex w-full flex-row justify-between gap-2 md:gap-5">
      <div className="flex gap-5 items-center">
        <div className="w-[48px]">
          <FileIcon extension={fileMimeTypeToType(documentFile.file[0]!.mimeType!)!} type="document" color="aliceblue" />
        </div>
        <div className="flex flex-col ">
          <div className="w-[80%] md:w-[100%]">{documentFile.name}</div>
          <div className="flex gap-5 text-gray-400">
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Icon icon="material-symbols:file-copy" />
              {documentFile.file.length} file(s)
            </div>
            <div className="flex items-center gap-1 whitespace-nowrap">
              <Icon icon="ic:round-access-time" />
              {new Date(documentFile.createdAt!).toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </div>
      </div>
      <Button onClick={onDownload} size={isMobile ? "middle" : "large"}>
        Download
      </Button>
    </div>
  );
};

export default FileComponent;
