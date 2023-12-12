import { IService } from "@/interfaces/IService";
import { FC } from "react";

interface DocumentsDisplayProps {
  documents: IService
}
 
const DocumentsDisplay: FC<DocumentsDisplayProps> = ({ documents }) => {
  console.log(documents)
  return ( 
    <>
      
    </>
  );
}
 
export default DocumentsDisplay;