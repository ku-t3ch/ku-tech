import { NextPage } from "next";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onDropFile(file: File[]): void;
}

const DropFile: NextPage<Props> = ({ onDropFile }) => {
  const [Files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    onDropFile(acceptedFiles);
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg", ".JPG"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    // accept: "image/jpeg,image/png,image/gif",
  });

  return (
    <>
      <div
        className="border-green2/40 text-green2/40 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-3"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <i className="fa-solid fa-image text-6xl"></i>
        </div>
        {isDragActive ? (
          <div className="text-xl font-bold">วางไฟล์ตรงนี้....</div>
        ) : (
          <>
            {Files.length !== 0 ? (
              <>{Files.slice(0, 5).length} file</>
            ) : (
              <div className="text-xl font-bold">
                วางไฟล์ / กดเพื่ออัปโหลดไฟล์
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default DropFile;
