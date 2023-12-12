import { IService } from "@/interfaces/IService";
import { FC } from "react";
import Image from 'next/image'

import docImage from '@/assests/imgs/doc_upload.png'
import download from '@/assests/imgs/download.png'

interface DocumentsDisplayProps {
  documents: IService
}
 
const DocumentsDisplay: FC<DocumentsDisplayProps> = ({ documents }) => {

  const downloadDocs = (document: any, documentName: string) => {
    let content = `${document}`;

		const a = document.createElement("a");
		a.href = content;

		a.download = `documentName`;

		a.click();
  }
  
  return ( 
    <div>
      {documents?.insuranceCoverage?.map((document) => (
        <div key={document} className="document border p-4 rounded-md flex items-center justify-evenly">
          <div className="img w-8">
            <Image src={docImage} alt="document Image" />
          </div>
          <span>Insurance Coverage</span>
          <a href={document} target="_blank" rel="noopener noreferrer" download>
            <Image className="cursor-pointer w-8" src={download} alt="download icon" />
          </a>
        </div>
      ))}

      {documents?.licenseAndCertification?.map((document) => (
        <div key={document} className="document border p-4 m-4 rounded-md flex items-center justify-evenly">
          <div className="img w-8">
            <Image src={docImage} alt="document Image" />
          </div>
          <span>License and Certification</span>
          <a href={document} target="_blank" rel="noopener noreferrer" download>
            <Image className="cursor-pointer w-8" src={download} alt="download icon" />
          </a>
        </div>
      ))}
    </div>
  );
}
 
export default DocumentsDisplay;
