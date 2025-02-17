import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/subframe/components/Button";
import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";

const UploadScanModal = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleUpload = () => {
    // Handle file upload logic here
    setIsSubmitted(true);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
      <Button variant="neutral-secondary" icon="FeatherScan"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    >
                     Escanear
                    </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Scan</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <FileUploader />
          <div className="flex justify-end mt-6">
            <Button onClick={handleUpload}>Upload</Button>
          </div>
          {isSubmitted && (
            <div className="flex items-center justify-center mt-4">
              <CheckCircleIcon className="w-10 h-10 text-green-500" />
              <p className="ml-2 text-green-500">Scan uploaded successfully!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadScanModal;
