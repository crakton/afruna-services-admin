import { IService } from "@/interfaces/IService";
import { FC } from "react";
import Image from "next/image";

import docImage from "@/assests/imgs/doc_upload.png";
import download from "@/assests/imgs/download.png";
import { MdRemoveRedEye } from "react-icons/md";

interface DocumentsDisplayProps {
  documents: IService;
}

const DocumentsDisplay: FC<DocumentsDisplayProps> = ({ documents }) => {
  const downloadDocs = (document: any, documentName: string) => {
    let content = `${document}`;

    const a = document.createElement("a");
    a.href = content;

    a.download = `documentName`;

    a.click();
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {documents?.insuranceCoverage?.map((document) => (
        <div
          key={document}
          className="document border p-4 rounded-md flex items-center justify-evenly w-full"
        >
          <div className="img w-8 h-8">
            <Image src={docImage} alt="document Image" />
          </div>
          <span className="font-bold">Insurance Coverage</span>
          <a href={document} target="_blank" rel="noopener noreferrer" download>
            <MdRemoveRedEye size={27} />
          </a>
        </div>
      ))}

      {documents?.licenseAndCertification?.map((document) => (
        <div
          key={document}
          className="document border p-4 rounded-md flex items-center justify-evenly w-full"
        >
          <div className="img w-8 h-8">
            <Image src={docImage} alt="document Image" />
          </div>
          <span className="font-bold">License and Certification</span>

          
          <a href={document} target="_blank" rel="noopener noreferrer" download>
            <MdRemoveRedEye size={27} />
          </a>
        </div>
      ))}
    </div>
  );
};

export default DocumentsDisplay;
