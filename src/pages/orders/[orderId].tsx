import { useRouter } from 'next/router';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useEffect, useState } from 'react';
import { Badge, Button, Calendar, Table, TextField, IconButton } from "@/subframe/components";
import ChatBubble from "@/components/chat/ChatBubble";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Fetch order details from API or state
    // Example:
    // fetchOrderDetails(orderId).then(setOrder);
  }, [orderId]);

  if (!order) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Order Details - {order.id}</h1>
          <Button onClick={() => router.back()}>Back to Dashboard</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-xl font-semibold">Order Overview</h2>
            <p>Order ID: {order.id}</p>
            <p>Creation Date: {order.creationDate}</p>
            <p>Last Update: {order.lastUpdate}</p>
            <p>Estimated Completion Date: {order.estimatedCompletionDate}</p>
            <p>Patient Reference Number: {order.patientReferenceNumber}</p>
            <Badge variant="info">{order.status}</Badge>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Progress Tracker</h2>
            {/* Progress Tracker Component */}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Uploaded Scans & Attachments</h2>
          {/* File Upload and 3D Viewer Component */}
        </div>
        <div>
          <h2 className="text-xl font-semibold">Case Notes & Instructions</h2>
          <TextField
            variant="filled"
            label="Special Instructions"
            value={order.instructions}
            onChange={(e) => {}}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Messaging & Support</h2>
          <ChatBubble />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Order History & Logs</h2>
          <Table>
            <Table.HeaderRow>
              <Table.HeaderCell>Timestamp</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>User</Table.HeaderCell>
              <Table.HeaderCell>Notes</Table.HeaderCell>
            </Table.HeaderRow>
            {order.history.map((log) => (
              <Table.Row key={log.timestamp}>
                <Table.Cell>{log.timestamp}</Table.Cell>
                <Table.Cell>{log.action}</Table.Cell>
                <Table.Cell>{log.user}</Table.Cell>
                <Table.Cell>{log.notes}</Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={() => {}}>Download Order</Button>
          <Button onClick={() => {}}>Print Order</Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default OrderDetails;
