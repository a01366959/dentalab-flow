// new file
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";

export const FileUploader = () => {
  return (
    <div className="border-2 border-dashed rounded-lg p-8 text-center">
      <FileUp className="mx-auto h-12 w-12 text-gray-400" />
      <div className="mt-4">
        <Button>Choose File</Button>
        <p className="mt-2 text-sm text-gray-500">
          or drag and drop your scan files here
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Supported formats: STL, OBJ, DCM
        </p>
      </div>
    </div>
  );
};
