import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from 'react';
import { Table, Badge, TextField, Button } from "@/subframe/components";
import { useRouter } from 'next/router';

const OrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all orders from API or state
    // Example:
    // fetchAllOrders().then(setOrders);
  }, []);

  const filteredOrders = orders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.patient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRowClick = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Orders</h1>
          <TextField
            variant="filled"
            label=""
            helpText=""
            icon="FeatherSearch"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Patient</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Items</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          {filteredOrders.map((order) => (
            <Table.Row key={order.id} onClick={() => handleRowClick(order.id)}>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <div className="flex items-center gap-4">
                  <img
                    className="h-8 w-12 flex-none rounded-sm object-cover"
                    src="https://res.cloudinary.com/subframe/image/upload/v1724690087/uploads/302/w2ra2yihpofsdy1h4uhy.png"
                  />
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
                  {order.orderDate}
                </span>
              </Table.Cell>
              <Table.Cell className="h-16 grow shrink-0 basis-0">
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {order.items} Items
                </span>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table>
      </div>
    </DashboardLayout>
  );
};

export default OrdersPage;
