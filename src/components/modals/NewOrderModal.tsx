import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/subframe/components/Button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { FileUploader } from "@/components/FileUploader";
import { createClient } from '@supabase/supabase-js';
import { Stepper } from "@/subframe/components/Stepper"; // Import Stepper

const supabaseUrl = 'https://vtihddyeadozaxrnmece.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWhkZHllYWRvemF4cm5tZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzAxOTMsImV4cCI6MjA1NTA0NjE5M30.P6WQsTSLDkWjlR542ZyeNI4ehWMoSUznN8_fT7i4KYc';
const supabase = createClient(supabaseUrl, supabaseKey);

const NewOrderModal = ({ onAddOrder }: { onAddOrder: (order: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [patient, setPatient] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async () => {
    const user = supabase.auth.user(); // Get the authenticated user
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    const newOrder = {
      order_id: `#00${Math.floor(Math.random() * 1000)}`,
      type: selectedType,
      patient,
      status: "In Progress",
      due_date: "2024-03-20",
      dentist_id: user.id, // Set the dentist_id
    };

    console.log("Submitting order:", newOrder); // Add logging

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select();

      if (error) {
        console.error("Supabase error:", error); // Add detailed error logging
        throw error;
      }

      console.log("Order created:", data); // Add logging
      onAddOrder(data[0]);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button icon="FeatherPlus"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    >
                      Nueva orden
                    </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Nueva orden</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {/* Progress Steps */}
          <Stepper>
            <Stepper.Step
              variant={currentStep > 0 ? "completed" : "active"}
              firstStep={true}
              stepNumber="1"
              label="Tipo"
            />
            <Stepper.Step
              variant={currentStep > 1 ? "completed" : currentStep === 1 ? "active" : "inactive"}
              stepNumber="2"
              label="Paciente"
            />
            <Stepper.Step
              variant={currentStep > 2 ? "completed" : currentStep === 2 ? "active" : "inactive"}
              stepNumber="3"
              label="Archivos"
            />
            <Stepper.Step
              variant={currentStep === 3 ? "active" : "inactive"}
              lastStep={true}
              stepNumber="4"
              label="Revisión"
            />
          </Stepper>

          {/* Step Content */}
          <div className="min-h-[300px] mt-6"> {/* Added margin-top */}
            {currentStep === 0 && (
              <div className="grid grid-cols-2 gap-4">
                {["Corona", "Puente", "Implante", "Prótesis", "Otro"].map((option) => (
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
                  placeholder="Nombre del Paciente"
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
                <p>Tipo: {selectedType}</p>
                <p>Paciente: {patient}</p>
                <p>Archivos: {files.length} archivo(s) seleccionado(s)</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button
              variant="secondary"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
            >
              Anterior
            </Button>
            <Button
              onClick={() =>
                currentStep === 3 ? handleSubmit() : setCurrentStep((prev) => Math.min(3, prev + 1))
              }
              disabled={currentStep === 0 && !selectedType}
            >
              {currentStep === 3 ? "Enviar Pedido" : "Siguiente"}
            </Button>
          </div>
        </div>
        {isSubmitting && <p>Enviando...</p>}
        {isSubmitted && (
          <div className="flex items-center justify-center mt-4">
            <CheckCircleIcon className="w-10 h-10 text-green-500" />
            <p className="ml-2 text-green-500">¡Pedido enviado con éxito!</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
