import * as SubframeCore from "@subframe/core";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "@/subframe/components/Button";
import NewOrderModal from "@/components/modals/NewOrderModal";
import UploadScanModal from "@/components/modals/UploadScanModal";
import ChatBubble from "@/components/chat/ChatBubble";
import { useState } from "react";
import { Calendar } from "@/subframe/components/Calendar";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";
import { TextField } from "@/subframe/components/TextField";
import { IconButton } from "@/subframe/components/IconButton";

const Dashboard = () => {
  const [orders, setOrders] = useState([
    { id: "#001", type: "Corona", patient: "John Doe", status: "En progreso", dueDate: "2024-03-20" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleAddNewOrder = (newOrder: {
    id: string; type: string; patient: string; status: string; dueDate: string;
  }) => {
    setOrders((prev) => [...prev, newOrder]);
  };

  const filteredOrders = orders
    .filter((order) =>
      order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) => (filterStatus ? order.status === filterStatus : true))
    .sort((a, b) => {
      if (sortOption === "dueDate") return a.dueDate.localeCompare(b.dueDate);
      return 0;
    });

    

  return (
    <DashboardLayout>
      
        
      <div className="space-y-8 bg-white">

         {/* Acciones rápidas */}
       <div className="grid sm:grid-cols-8 gap-4 ">
          <NewOrderModal onAddOrder={handleAddNewOrder} />
          <UploadScanModal />
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Ordenes Activas
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                10
              </span>
              <Badge variant="success" icon="FeatherArrowUp">
                13%
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Ordenes completadas este mes
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                24
              </span>
              <Badge variant="success" icon="FeatherArrowUp">
                25%
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-subtext-color">
              Ordenes en camino
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                24
              </span>
              <Badge variant="error" icon="FeatherArrowDown">
                33%
              </Badge>
            </div>
          </div>
        </div>

    

        <div className="flex w-full flex-wrap items-center gap-4">
          <div className="flex grow shrink-0 basis-0 items-center gap-1">
            <TextField variant="filled" label="" helpText="" icon="FeatherSearch">
              <TextField.Input
                placeholder="Buscar..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <Button
              variant="neutral-tertiary"
              iconRight="FeatherChevronDown"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Últimos 7 días
            </Button>
            <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}} />
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
            <Button
              icon="FeatherPlus"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Añadir
            </Button>
          </div>
        </div>

        {/* Órdenes recientes */}
        <div className="flex w-full flex-col items-start gap-8">
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
                to
              </span>
              <SubframeCore.Popover.Root>
                <SubframeCore.Popover.Trigger asChild={true}>
                  <Button
                    variant="neutral-secondary"
                    iconRight="FeatherCalendar"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    12/31/23
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
              <Button
                variant="neutral-secondary"
                iconRight="FeatherChevronDown"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Personalizar vista
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="neutral-tertiary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Reportar problema
              </Button>
              <Button onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}>
                Descargar órdenes
              </Button>
            </div>
          </div>
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>ID de Orden</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Paciente</Table.HeaderCell>
                <Table.HeaderCell>Fecha de Orden</Table.HeaderCell>
                <Table.HeaderCell>Items</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            <Table.Row>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1724690087/uploads/302/w2ra2yihpofsdy1h4uhy.png"
                  />
                  <div className="flex flex-col items-start">
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      ORD-1001
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Confirmado
                    </span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant="success">Pagado</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Alice Johnson
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  15 de octubre de 2023
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  3 Artículos
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1723780878/uploads/302/mdjcme9tm4svgmkjv4zf.png"
                  />
                  <div className="flex flex-col items-start">
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      ORD-1002
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Procesando
                    </span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant="success">Pendiente</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Tom Carter
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  20 de octubre de 2023
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  2 Artículos
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1724690133/uploads/302/tswlwr0qfwwhkgbjwplw.png"
                  />
                  <div className="flex flex-col items-start">
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      ORD-1003
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Enviado
                    </span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant="success">Pagado</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Laura Green
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  25 de octubre de 2023
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  1 Artículo
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1723780853/uploads/302/h3glkflohcjajdl3lah6.png"
                  />
                  <div className="flex flex-col items-start">
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      ORD-1004
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Entregado
                    </span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant="success">Completo</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Mark Brown
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  27 de octubre de 2023
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  5 Artículos
                </span>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1723780859/uploads/302/hh4s5xjmsigiehqkb1uh.png"
                  />
                  <div className="flex flex-col items-start">
                    <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                      ORD-1005
                    </span>
                    <span className="text-caption font-caption text-subtext-color">
                      Pendiente
                    </span>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <Badge variant="warning">Procesando</Badge>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Anna White
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  30 de octubre de 2023
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  2 Artículos
                </span>
              </Table.Cell>
            </Table.Row>
          </Table>
        </div>

        

        

        {/* Burbuja de Chat */}
        <ChatBubble />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
