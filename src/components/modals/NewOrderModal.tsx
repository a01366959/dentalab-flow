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
import { IconButton } from "@/subframe/components/IconButton";
import { TextField } from "@/subframe/components/TextField"; // Import TextField
import { ToggleGroup } from "@/subframe/components/ToggleGroup"; // Import ToggleGroup
import { SearchField } from "@/subframe/components/SearchField"; // Import SearchField
import * as SubframeCore from "@subframe/core";

const supabaseUrl = 'https://vtihddyeadozaxrnmece.supabase.co'; // Ensure this is correct
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWhkZHllYWRvemF4cm5tZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzAxOTMsImV4cCI6MjA1NTA0NjE5M30.P6WQsTSLDkWjlR542ZyeNI4ehWMoSUznN8_fT7i4KYc'; // Ensure this is correct
const supabase = createClient(supabaseUrl, supabaseKey); // Ensure the client is initialized correctly

const NewOrderModal = ({ onAddOrder }: { onAddOrder: (order: any) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [patient, setPatient] = useState({ first_name: "", last_name: "", email: "", phone: "" }); // Update patient state
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patientType, setPatientType] = useState("e2e3f7ca"); // Add state for patient type
  const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
  const [searchResults, setSearchResults] = useState<any[]>([]); // Add state for search results
  const [additionalNotes, setAdditionalNotes] = useState(""); // Add state for additional notes
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Add state for error message

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      // Perform search logic here, e.g., fetch from API
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .ilike('first_name', `%${query}%`);

      if (error) {
        console.error("Search error:", error);
        return;
      }

      setSearchResults(data);
    } else {
      setSearchResults([]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedType) {
      console.error("Order type is not selected");
      setErrorMessage("Por favor seleccione el tipo de orden antes de continuar");
      return;
    }

    try {
      setIsSubmitting(true);

      // Ensure the user is authenticated
      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      if (sessionError || !user) {
        console.error("User is not authenticated");
        setErrorMessage("El usuario no está autenticado");
        return;
      }

      // Check or create profile
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUp, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

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

const NewOrderModal = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientEmail: "",
    patientPhone: "",
    notes: "",
    files: [] as File[],
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        files: [...Array.from(e.target.files || [])],
      }));
    }
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedType(null);
    setFormData({
      patientFirstName: "",
      patientLastName: "",
      patientEmail: "",
      patientPhone: "",
      notes: "",
      files: [],
    });
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      const { data: { user }, error: sessionError } = await supabase.auth.getUser();
      
      if (sessionError || !user) {
        throw new Error('Please sign in again to continue');
      }

      // Check if profile exists using maybeSingle()
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (profileError) throw profileError;
      if (!profileData) {
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({ id: user.id, full_name: user.user_metadata?.full_name });
        if (createProfileError) throw createProfileError;
        await new Promise(resolve => setTimeout(resolve, 500)); // Wait for profile creation
      }

      // Create or retrieve patient
      let patientId;
      if (patientType === "e2e3f7ca") {
        // "New patient"
        const { data: newPatient, error: newPatientError } = await supabase
          .from('patients')
          .insert({
            first_name: patient.first_name,
            last_name: patient.last_name,
            email: patient.email,
            phone: patient.phone,
            dentist_id: user.id,
          })
          .select()
          .single();
        if (newPatientError) throw newPatientError;
        patientId = newPatient.id;
      } else {
        // "Existing patient" must have a valid ID
        if (!patient?.id) {
          setErrorMessage("Por favor seleccione un paciente existente válido");
          return;
        }
        patientId = patient.id;
      }

      // Prepare newOrder with patient_id
      const newOrder = {
        type: selectedType,
        patient_id: patientId,
        status: "In Progress",
        due_date: "2024-03-20",
        dentist_id: user.id,
        additional_info: additionalNotes,
        details: {
          name: patient.first_name,
          lastname: patient.last_name,
          email: patient.email,
          phone: patient.phone,
          uploads: files.map(file => file.name)
        }
      };

      console.log("Submitting order:", newOrder);

      // Insert order
      const { data, error } = await supabase
        .from('orders')
        .insert([newOrder])
        .select()
        .single();
      if (error) throw error;

      console.log("Order created:", data);
      onAddOrder(data);
      setIsSubmitted(true);
      alert("¡Orden enviada con éxito!");
      setErrorMessage(null);
    } catch (error) {
      console.error("Error creating order:", error);
      setErrorMessage(`Error al crear la orden: ${error.message}`);
    } finally {
      setIsSubmitting(false);

      if (profileError) throw profileError;

      // If profile doesn't exist, create it
      if (!profileData) {
        const { error: createProfileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            full_name: user.user_metadata.full_name
          });

        if (createProfileError) throw createProfileError;
        
        // Wait a moment for the profile to be created
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // Now create the patient
      const { data: patientData, error: patientError } = await supabase
        .from("patients")
        .insert({
          first_name: formData.patientFirstName,
          last_name: formData.patientLastName,
          email: formData.patientEmail,
          phone: formData.patientPhone,
          dentist_id: user.id,
        })
        .select()
        .single();

      if (patientError) throw patientError;

      // Create the order
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          type: selectedType!,
          patient_id: patientData.id,
          dentist_id: user.id,
          details: {
            notes: formData.notes,
          },
        });

      if (orderError) throw orderError;

      toast({
        title: "Order created successfully",
        description: "Your order has been submitted.",
      });

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      resetForm();
    } catch (error: any) {
      console.error('Error creating order:', error);
      toast({
        title: "Error creating order",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              label="Revisar"
            />
          </Stepper>

          {/* Step Content */}
          <div className="min-h-[300px] mt-6"> {/* Added margin-top */}
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

          <div className="min-h-[300px]">
            {currentStep === 0 && (
              <div className="grid grid-cols-2 gap-4">
                {["Corona", "Puente", "Implante", "Prótesis", "Otro"].map((option) => (
                    <Button
                    key={option}
                    variant="neutral-tertiary"
                    className={selectedType === option ? "h-24 border border-primary bg-brand-200 text-white" : "h-24 border"}
                    onClick={() => setSelectedType(option)}
                    >
                    {option}
                    </Button>
                ))}
              </div>
            )}
            {currentStep === 1 && (
              <div className="flex flex-col items-center w-full">
                <ToggleGroup value={patientType} onValueChange={(value: string) => setPatientType(value)}>
                  <ToggleGroup.Item className="h-7 w-32 flex-none" icon={null} value="e2e3f7ca">
                    Nuevo Paciente
                  </ToggleGroup.Item>
                  <ToggleGroup.Item className="h-7 w-32 flex-none" icon={null} value="3cecc290">
                    Paciente Existente
                  </ToggleGroup.Item>
                </ToggleGroup>
                {patientType === "e2e3f7ca" && (
                  <div className="flex w-full flex-col items-start justify-center gap-4 mt-4">
                    <div className="flex w-full items-start justify-center gap-4">
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        disabled={false}
                        error={false}
                        variant="outline"
                        label="Nombre"
                        helpText=""
                        icon="FeatherUser"
                        iconRight={null}
                      >
                        <TextField.Input
                          placeholder=""
                          value={patient.first_name}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPatient({ ...patient, first_name: event.target.value })
                          }
                        />
                      </TextField>
                      <TextField
                        className="h-auto grow shrink-0 basis-0"
                        disabled={false}
                        error={false}
                        variant="outline"
                        label="Apellido"
                        helpText=""
                        icon="FeatherUser"
                        iconRight={null}
                      >
                        <TextField.Input
                          placeholder=""
                          value={patient.last_name}
                          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                            setPatient({ ...patient, last_name: event.target.value })
                          }
                        />
                      </TextField>
                    </div>
                    <TextField
                      className="h-auto w-full flex-none"
                      disabled={false}
                      error={false}
                      variant="outline"
                      label="Correo Electrónico"
                      helpText=""
                      icon="FeatherMail"
                      iconRight={null}
                    >
                      <TextField.Input
                        placeholder=""
                        value={patient.email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setPatient({ ...patient, email: event.target.value })
                        }
                      />
                    </TextField>
                    <TextField
                      className="h-auto w-full flex-none"
                      disabled={false}
                      error={false}
                      variant="outline"
                      label="Teléfono"
                      helpText=""
                      icon="FeatherPhone"
                      iconRight={null}
                    >
                      <TextField.Input
                        placeholder=""
                        value={patient.phone}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setPatient({ ...patient, phone: event.target.value })
                        }
                      />
                    </TextField>
                    <TextField
                      className="h-auto w-full flex-none"
                      disabled={false}
                      error={false}
                      variant="outline"
                      label="Notas Adicionales"
                      helpText=""
                      icon="FeatherInfo"
                      iconRight={null}
                    >
                      <TextField.Input
                        placeholder=""
                        value={additionalNotes}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                          setAdditionalNotes(event.target.value)
                        }
                      />
                    </TextField>
                  </div>
                )}
                {patientType === "3cecc290" && (
                  <div className="w-full mt-4">
                    <SearchField showClear={false}>
                      <SearchField.Input
                        placeholder="Buscar paciente..."
                        value={searchQuery}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSearch(event.target.value)}
                      />
                    </SearchField>
                    {searchQuery.length > 0 && searchResults.length > 0 && (
                      <div className="mt-2 bg-white border rounded shadow">
                        {searchResults.map((result) => (
                          <div
                            key={result.id}
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setPatient(result);
                              setSearchQuery("");
                              setSearchResults([]);
                            }}
                          >
                            {result.first_name} {result.last_name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {patient.id && (
                  <div className="mt-4 p-4 border rounded">
                    <p><strong>Paciente Seleccionado:</strong></p>
                    <p>Nombre: {patient.first_name} {patient.last_name}</p>
                    <p>Correo Electrónico: {patient.email}</p>
                    <p>Teléfono: {patient.phone}</p>
                  </div>
                )}
              </div>
            )}
            {currentStep === 2 && (
              <div className="flex w-full flex-col items-start gap-4">
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-neutral-border px-6 py-6">
                  <SubframeCore.Icon
                    className="text-heading-1 font-heading-1 text-default-font"
                    name="FeatherUpload"
                  />
                  <div className="flex flex-col items-center justify-center gap-1">
                    <span className="text-body font-body text-default-font text-center">
                      Haga clic para seleccionar archivos o arrastre para subir
                    </span>
                    <span className="text-caption font-caption text-subtext-color text-center">
                      Hasta 100 archivos, tamaño máximo de archivo 5MB
                    </span>
                  </div>
                </div>
                <div className="flex w-full flex-col items-start gap-2">
                  <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
                    <div className="flex items-center gap-4 px-1 py-1">
                      <SubframeCore.Icon
                        className="text-body font-body text-brand-700"
                        name="FeatherCheckCircle"
                      />
                    </div>
                    <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
                      Filip Resume.pdf
                    </span>
                    <IconButton
                      size="small"
                      icon="FeatherTrash"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  </div>
                  <div className="flex w-full items-center gap-2 rounded-md bg-neutral-50 px-2 py-2">
                    <div className="flex items-center gap-4 px-1 py-1">
                      <SubframeCore.Icon
                        className="text-body font-body text-brand-700"
                        name="FeatherCheckCircle"
                      />
                    </div>
                    <span className="grow shrink-0 basis-0 text-caption-bold font-caption-bold text-default-font">
                      Filip Case Study.pdf
                    </span>
                    <IconButton
                      size="small"
                      icon="FeatherTrash"
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                    />
                  </div>
                </div>
              </div>
            )}
            {currentStep === 3 && (
              <div>
                <p>Tipo: {selectedType}</p>
                <p>Paciente: {patient.first_name} {patient.last_name}</p>
                <p>Correo Electrónico: {patient.email}</p>
                <p>Teléfono: {patient.phone}</p>
                <p>Archivos: {files.length} archivo(s) seleccionado(s)</p>

            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.patientFirstName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          patientFirstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.patientLastName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          patientLastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        patientEmail: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        patientPhone: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <FileUp className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <input
                      type="file"
                      id="files"
                      multiple
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Label
                      htmlFor="files"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                      Choose Files
                    </Label>
                    <p className="mt-2 text-sm text-gray-500">
                      or drag and drop your files here
                    </p>
                  </div>
                </div>
                {formData.files.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Selected Files:</h4>
                    <ul className="space-y-2">
                      {formData.files.map((file, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-600 flex items-center gap-2"
                        >
                          <FileUp className="h-4 w-4" />
                          {file.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Order Summary</h3>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Type:</dt>
                      <dd className="font-medium">{selectedType}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Patient:</dt>
                      <dd className="font-medium">
                        {formData.patientFirstName} {formData.patientLastName}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Files:</dt>
                      <dd className="font-medium">{formData.files.length} files</dd>
                    </div>
                  </dl>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <Button
              variant="neutral-tertiary"
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
              loading={isSubmitting} // Add loading state
            >
              {currentStep === 3 ? "Enviar Orden" : "Siguiente"}
              onClick={() => {
                if (currentStep === steps.length - 1) {
                  handleSubmit();
                } else {
                  setCurrentStep((prev) => Math.min(steps.length - 1, prev + 1));
                }
              }}
              disabled={
                (currentStep === 0 && !selectedType) ||
                (currentStep === 1 &&
                  (!formData.patientFirstName || !formData.patientLastName)) ||
                isLoading
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {currentStep === steps.length - 1 ? "Submit Order" : "Next"}
            </Button>
          </div>
        </div>
        {isSubmitting && <p>Enviando...</p>}
        {isSubmitted && (
          <div className="flex items-center justify-center mt-4">
            <IconButton icon="CheckCircle" className="w-10 h-10 text-green-500" />
            <p className="ml-2 text-green-500">¡Orden enviada con éxito!</p>
            <Button onClick={() => setIsSubmitted(false)}>Cerrar</Button> {/* Add close button */}
          </div>
        )}
        {errorMessage && ( // Display error message
          <div className="mt-4 text-red-500">
            <p>{errorMessage}</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
