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
import { ToggleGroup } from "@/subframe/components/ToggleGroup";

const UploadScanModal = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patientType, setPatientType] = useState("8e2f3aaa");

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
          <DialogTitle>Escanear</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ToggleGroup
            className="h-auto w-full flex-none"
            value={patientType}
            onValueChange={(value: string) => setPatientType(value)}
          >
            <ToggleGroup.Item icon={null} value="8e2f3aaa">
              Nuevo paciente
            </ToggleGroup.Item>
            <ToggleGroup.Item icon={null} value="89251cf2">
              Buscar paciente
            </ToggleGroup.Item>
          </ToggleGroup>
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
