import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TextField } from "@/subframe/components/TextField";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

const supabaseUrl = 'https://vtihddyeadozaxrnmece.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWhkZHllYWRvemF4cm5tZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzAxOTMsImV4cCI6MjA1NTA0NjE5M30.P6WQsTSLDkWjlR542ZyeNI4ehWMoSUznN8_fT7i4KYc';
const supabase = createClient(supabaseUrl, supabaseKey);

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [newPatient, setNewPatient] = useState({ first_name: "", last_name: "", date_of_birth: "", email: "", phone: "", dentist_id: "" }); // Add dentist_id
  const [confirmationMessage, setConfirmationMessage] = useState(""); // State for confirmation message
  const [patients, setPatients] = useState([]);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Add state for current page
  const patientsPerPage = 10; // Number of patients per page

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();
  }, []);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase
        .from('patients')
        .select('*');

      if (error) {
        console.error("Error fetching patients:", error);
        return;
      }

      setPatients(data);
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(patient =>
    `${patient.first_name} ${patient.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleAddPatient = async () => {
    if (!newPatient.date_of_birth) {
      setConfirmationMessage("Error al añadir paciente: La fecha de nacimiento es obligatoria.");
      return;
    }

    try {
      if (!user) {
        setConfirmationMessage("Error al añadir paciente: Usuario no autenticado.");
        return;
      }

      // Use the user's UUID as the dentist_id
      const patientData = { ...newPatient, dentist_id: user.id };

      // Make an API call to add the new patient to Supabase
      const { data, error } = await supabase
        .from('patients')
        .insert([patientData])
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("No data returned from Supabase");
      }

      // Update the patients state with the new patient
      setPatients([...patients, { ...patientData, id: data[0].id, status: "Activo", lastVisit: "N/A", appointments: 0, totalSpent: "$0.00" }]);
      setIsModalOpen(false);
      setConfirmationMessage("Paciente añadido con éxito."); // Set confirmation message
    } catch (error) {
      console.error("Error adding patient:", error);
      setConfirmationMessage(`Error al añadir paciente: ${error.message}`); // Set detailed error message
    }
  };

  // Pagination logic
  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = filteredPatients.slice(indexOfFirstPatient, indexOfLastPatient);

  const totalPages = Math.ceil(filteredPatients.length / patientsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex w-full flex-col items-start gap-8">
        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="flex grow shrink-0 basis-0 items-center gap-1">
            <TextField variant="filled" label="" helpText="" icon="FeatherSearch">
              <TextField.Input
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value)}
              />
            </TextField>
            
          </div>
          <div className="flex items-center gap-4">
            <IconButton
              icon="FeatherRefreshCw"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            
            
            <Button
              variant="primary"
              iconRight="FeatherPlus"
              onClick={() => setIsModalOpen(true)}
            >
              Añadir Paciente
            </Button>
          </div>
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>ID del Paciente</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Correo</Table.HeaderCell>
              <Table.HeaderCell>Teléfono</Table.HeaderCell>
              <Table.HeaderCell>Fecha de Nacimiento</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          {currentPatients.map((patient) => (
            <Table.Row key={patient.id}>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <NavLink to={`/dashboard/patients/${patient.id}`}>
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      {patient.id}
                    </span>
                  </NavLink>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.first_name} {patient.last_name}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.email}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.phone}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.date_of_birth}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
        <div className="flex w-full items-center justify-center gap-4">
          <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color">
            Showing {indexOfFirstPatient + 1} – {Math.min(indexOfLastPatient, filteredPatients.length)} of {filteredPatients.length}
          </span>
          <div className="flex items-center justify-center gap-2">
            <Button
              variant="neutral-secondary"
              icon="FeatherArrowLeft"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            />
            <Button
              variant="neutral-secondary"
              icon="FeatherArrowRight"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Añadir Nuevo Paciente</Modal.Header>
        <Modal.Body>
          {confirmationMessage && <div className="mb-4 text-red-600">{confirmationMessage}</div>} {/* Display confirmation message */}
          <TextField label="Nombre">
            <TextField.Input
              name="first_name"
              value={newPatient.first_name}
              onChange={handleInputChange}
            />
          </TextField>
          <TextField label="Apellido">
            <TextField.Input
              name="last_name"
              value={newPatient.last_name}
              onChange={handleInputChange}
            />
          </TextField>
          <TextField label="Fecha de Nacimiento">
            <TextField.Input
              name="date_of_birth"
              type="date"
              value={newPatient.date_of_birth}
              onChange={handleInputChange}
            />
          </TextField>
          <TextField label="Correo">
            <TextField.Input
              name="email"
              value={newPatient.email}
              onChange={handleInputChange}
            />
          </TextField>
          <TextField label="Teléfono">
            <TextField.Input
              name="phone"
              value={newPatient.phone}
              onChange={handleInputChange}
            />
          </TextField>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="neutral-secondary" onClick={() => setIsModalOpen(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAddPatient}>
            Añadir
          </Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
};

export default Patients;
