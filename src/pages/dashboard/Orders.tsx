import * as SubframeCore from "@subframe/core";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";
import { useState, useEffect, useRef } from "react";
import { TextField } from "@/subframe/components/TextField";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import { Calendar } from "@/subframe/components/Calendar";
import NewOrderModal from "@/components/modals/NewOrderModal";
import ChatBubble from "@/components/chat/ChatBubble"; // Import ChatBubble
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

const supabaseUrl = 'https://vtihddyeadozaxrnmece.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWhkZHllYWRvemF4cm5tZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzAxOTMsImV4cCI6MjA1NTA0NjE5M30.P6WQsTSLDkWjlR542ZyeNI4ehWMoSUznN8_fT7i4KYc';
const supabase = createClient(supabaseUrl, supabaseKey);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // Add state for modal
  const [messages, setMessages] = useState<string[]>([]); // Add state for messages
  const chatBubbleRef = useRef<HTMLButtonElement>(null); // Add ref for chat bubble button

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*');

      if (error) {
        console.error("Error fetching orders:", error);
        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleAddOrder = (newOrder: any) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleChatClick = (order: any) => {
    const message = `Hola, necesito soporte con la orden ID: ${order.id}, Tipo: ${order.type}, Paciente: ${order.patient}, Estado: ${order.status}, Fecha de Entrega: ${order.due_date}.`;
    setMessages((prevMessages) => [...prevMessages, message]);
    // Automatically open the chat bubble and send the message
    setTimeout(() => {
      if (chatBubbleRef.current) {
        chatBubbleRef.current.click();
      }
    }, 0);
  };

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patient?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.due_date.toLowerCase().includes(searchTerm.toLowerCase())
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
              
            </div>
            <div className="flex items-center gap-4">
              <IconButton
                icon="FeatherRefreshCw"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              />
             
              <NewOrderModal
                onAddOrder={handleAddOrder}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} // Close modal
              />
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
                <Table.HeaderCell>Acciones</Table.HeaderCell> {/* Add Actions column */}
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
                    {order.due_date}
                  </span>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {order.type}
                  </span>
                </Table.Cell>
                <Table.Cell className="h-16 grow shrink-0 basis-0">
                  <IconButton
                    icon="FeatherMessageSquare"
                    onClick={() => handleChatClick(order)}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>
      <ChatBubble prewrittenMessage={messages[messages.length - 1]} messages={messages} setMessages={setMessages} chatBubbleRef={chatBubbleRef} /> {/* Add ChatBubble component */}
    </DashboardLayout>
  );
};

export default Orders;
