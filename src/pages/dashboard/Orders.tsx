import * as SubframeCore from "@subframe/core";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";
import { useState } from "react";
import { TextField } from "@/subframe/components/TextField";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { Calendar } from "@/subframe/components/Calendar";

const Orders = () => {
  const [orders, setOrders] = useState([
    { id: "#001", type: "Crown", patient: "John Doe", status: "In Progress", dueDate: "2024-03-20" },
    // ...other orders...
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.dueDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white">
        <div className="flex w-full flex-col items-start justify-center gap-4">
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
                    Nuevo
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
                        Agregar
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
          <div className="flex w-full items-center gap-4">
            <div className="flex grow shrink-0 basis-0 items-center gap-2">
              <SubframeCore.Popover.Root>
                <SubframeCore.Popover.Trigger asChild={true}>
                  <Button
                    variant="neutral-secondary"
                    iconRight="FeatherCalendar"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    01/01/23
                  </Button>
                </SubframeCore.Popover.Trigger>
                <SubframeCore.Popover.Portal>
                  <SubframeCore.Popover.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                      <Calendar
                        mode={"single"}
                        selected={new Date()}
                        onSelect={(date: Date | undefined) => {}}
                      />
                    </div>
                  </SubframeCore.Popover.Content>
                </SubframeCore.Popover.Portal>
              </SubframeCore.Popover.Root>
              <span className="text-caption-bold font-caption-bold text-default-font">
                hasta
              </span>
              <SubframeCore.Popover.Root>
                <SubframeCore.Popover.Trigger asChild={true}>
                  <Button
                    variant="neutral-secondary"
                    iconRight="FeatherCalendar"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    31/12/23
                  </Button>
                </SubframeCore.Popover.Trigger>
                <SubframeCore.Popover.Portal>
                  <SubframeCore.Popover.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                      <Calendar
                        mode={"single"}
                        selected={new Date()}
                        onSelect={(date: Date | undefined) => {}}
                      />
                    </div>
                  </SubframeCore.Popover.Content>
                </SubframeCore.Popover.Portal>
              </SubframeCore.Popover.Root>
              <Button
                variant="neutral-secondary"
                iconRight="FeatherChevronDown"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Filtrar por producto
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-8">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>ID de Orden</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Paciente</Table.HeaderCell>
                <Table.HeaderCell>Fecha de Orden</Table.HeaderCell>
                <Table.HeaderCell>Artículos</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            {filteredOrders.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-start">
                      <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                        {order.id}
                      </span>
                      <span className="text-caption font-caption text-subtext-color">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <Badge variant="success">{order.status}</Badge>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {order.patient}
                  </span>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {order.dueDate}
                  </span>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {order.type}
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Orders;
