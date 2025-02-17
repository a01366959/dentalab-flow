import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { TextField } from "@/subframe/components/TextField";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const patients = [
    { id: 1, name: "John Doe", status: "Activo", lastVisit: "15 Oct, 2023", appointments: 3, totalSpent: "$150.00" },
    { id: 2, name: "Jane Smith", status: "Inactivo", lastVisit: "20 Oct, 2023", appointments: 2, totalSpent: "$90.00" },
    // ...other patients...
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            <Button
              variant="neutral-tertiary"
              iconRight="FeatherChevronDown"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Últimos 7 días
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <IconButton
              icon="FeatherRefreshCw"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon="FeatherSettings"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Trigger asChild={true}>
                <Button
                  variant="neutral-secondary"
                  iconRight="FeatherChevronDown"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Opciones
                </Button>
              </SubframeCore.DropdownMenu.Trigger>
              <SubframeCore.DropdownMenu.Portal>
                <SubframeCore.DropdownMenu.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <DropdownMenu>
                    <DropdownMenu.DropdownItem>Favorito</DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherPlus">
                      Añadir
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherEdit2">
                      Editar
                    </DropdownMenu.DropdownItem>
                    <DropdownMenu.DropdownItem icon="FeatherTrash">
                      Eliminar
                    </DropdownMenu.DropdownItem>
                  </DropdownMenu>
                </SubframeCore.DropdownMenu.Content>
              </SubframeCore.DropdownMenu.Portal>
            </SubframeCore.DropdownMenu.Root>
          </div>
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>ID del Paciente</Table.HeaderCell>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Última Visita</Table.HeaderCell>
              <Table.HeaderCell>Citas</Table.HeaderCell>
              <Table.HeaderCell>Total Gastado</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          {filteredPatients.map((patient) => (
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
                  {patient.name}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant={patient.status === "Activo" ? "success" : "warning"}>{patient.status}</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.lastVisit}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {patient.appointments} Citas
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <SubframeCore.Icon
                  className="text-body font-body text-success-600"
                  name="FeatherDollarSign"
                />
                <span className="whitespace-nowrap text-body font-body text-success-600">
                  {patient.totalSpent}
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
