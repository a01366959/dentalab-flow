import * as SubframeCore from "@subframe/core";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Button } from "@/subframe/components/Button";
import NewOrderModal from "@/components/modals/NewOrderModal";
import UploadScanModal from "@/components/modals/UploadScanModal";
import ChatBubble from "@/components/chat/ChatBubble";
import DetailViewDrawerWithFieldsAndTables from "@/components/drawers/DetailViewDrawerWithFieldsAndTables"; // Import DetailViewDrawerWithFieldsAndTables
import { useState, useEffect, useRef } from "react";
import { Calendar } from "@/subframe/components/Calendar";
import { Table } from "@/subframe/components/Table";
import { Badge } from "@/subframe/components/Badge";
import { TextField } from "@/subframe/components/TextField";
import { IconButton } from "@/subframe/components/IconButton";
import { createClient } from '@supabase/supabase-js'; // Import Supabase client

const supabaseUrl = 'https://vtihddyeadozaxrnmece.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0aWhkZHllYWRvemF4cm5tZWNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk0NzAxOTMsImV4cCI6MjA1NTA0NjE5M30.P6WQsTSLDkWjlR542ZyeNI4ehWMoSUznN8_fT7i4KYc';
const supabase = createClient(supabaseUrl, supabaseKey);

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [messages, setMessages] = useState<string[]>([]); // Add state for messages
  const chatBubbleRef = useRef<HTMLButtonElement>(null); // Add ref for chat bubble button
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Add state for drawer

  const activeOrdersCount = orders.filter(order => order.status === "En progreso").length;

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('due_date', { ascending: false });

      if (error) {
        console.error("Error fetching orders:", error);
        return;
      }

      setOrders(data);
    };

    fetchOrders();
  }, []);

  const handleAddNewOrder = (newOrder: {
    id: string; type: string; patient: string; status: string; dueDate: string;
  }) => {
    setOrders((prev) => [newOrder, ...prev]);
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

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
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

  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const displayedOrders = filteredOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          patients (
            first_name,
            last_name
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white">
        {/* Acciones rápidas */}
        <div className="flex gap-4">
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
                {activeOrdersCount}
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

        {/* Órdenes recientes */}
        <div className="flex w-full flex-col items-start gap-8">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>ID de Orden</Table.HeaderCell>
                <Table.HeaderCell>Estado</Table.HeaderCell>
                <Table.HeaderCell>Paciente</Table.HeaderCell>
                <Table.HeaderCell>Fecha de Orden</Table.HeaderCell>
                <Table.HeaderCell>Items</Table.HeaderCell>
                <Table.HeaderCell>Acciones</Table.HeaderCell> {/* Add Actions column */}
              </Table.HeaderRow>
            }
          >
            {displayedOrders.map((order) => (
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
                  <IconButton
                    icon="FeatherArrowRight"
                    onClick={handleDrawerOpen}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <span className="grow shrink-0 basis-0 text-body font-body text-subtext-color">
            Mostrando {currentPage} – {totalPages} de {filteredOrders.length}
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
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Order ID</th>
                    <th className="px-6 py-3">Type</th>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Due Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-6 py-4">#{order.id.slice(0, 8)}</td>
                      <td className="px-6 py-4">{order.type}</td>
                      <td className="px-6 py-4">
                        {order.patients.first_name} {order.patients.last_name}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {order.due_date
                          ? new Date(order.due_date).toLocaleDateString()
                          : "Not set"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.status === "pending").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Completed This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.status === "completed").length || 0}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deliveries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">
                {orders?.filter((o) => o.due_date).length || 0}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Burbuja de Chat */}
        <ChatBubble prewrittenMessage={messages[messages.length - 1]} messages={messages} setMessages={setMessages} chatBubbleRef={chatBubbleRef} /> {/* Add ChatBubble component */}
        {/* Detail View Drawer */}
        <DetailViewDrawerWithFieldsAndTables open={isDrawerOpen} onOpenChange={setIsDrawerOpen} /> {/* Add DetailViewDrawerWithFieldsAndTables component */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
