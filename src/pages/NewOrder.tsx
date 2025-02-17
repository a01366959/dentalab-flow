import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/FileUploader";

const steps = [
  {
    title: "Select Order Type",
    description: "Choose the type of dental work needed",
    options: ["Crown", "Bridge", "Implant", "Denture", "Other"],
  },
  {
    title: "Patient Information",
    description: "Enter patient details and requirements",
  },
  {
    title: "Upload Files",
    description: "Upload necessary scans and images",
  },
  {
    title: "Review & Submit",
    description: "Review order details before submission",
  },
];

const NewOrder = ({ onAddOrder }: { onAddOrder: (order: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [patient, setPatient] = useState("");
  const [files, setFiles] = useState<File[]>([]);

  const handleSubmit = () => {
    const newOrder = {
      id: `#00${Math.floor(Math.random() * 1000)}`,
      type: selectedType,
      patient,
      status: "In Progress",
      dueDate: "2024-03-20",
    };
    onAddOrder(newOrder);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">New Order - {steps[currentStep].title}</h1>
      <div className="mt-4">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className={cn(
                "flex flex-col items-center space-y-2",
                index <= currentStep ? "text-primary" : "text-gray-400"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center border-2",
                  index <= currentStep
                    ? "border-primary bg-primary text-white"
                    : "border-gray-300"
                )}
              >
                {index + 1}
              </div>
              <span className="text-xs text-center hidden sm:block">
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[300px]">
          {currentStep === 0 && (
            <div className="grid grid-cols-2 gap-4">
              {steps[0].options.map((option) => (
                <Button
                  key={option}
                  variant={selectedType === option ? "default" : "outline"}
                  className="h-24"
                  onClick={() => setSelectedType(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          {currentStep === 1 && (
            <div>
              <input
                type="text"
                placeholder="Patient Name"
                value={patient}
                onChange={(e) => setPatient(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}
          {currentStep === 2 && (
            <FileUploader />
          )}
          {currentStep === 3 && (
            <div>
              <p>Type: {selectedType}</p>
              <p>Patient: {patient}</p>
              <p>Files: {files.length} file(s) selected</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              currentStep === steps.length - 1 ? handleSubmit() : setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1))
            }
            disabled={currentStep === 0 && !selectedType}
          >
            {currentStep === steps.length - 1 ? "Submit Order" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
