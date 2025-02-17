import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";

const PatientDetail = () => {
  const { patientId } = useParams();
  const patient = { id: patientId, name: "John Doe" }; // Fetch patient details based on patientId
  const orders = [
    { id: "#001", type: "Corona", status: "En progreso", dueDate: "2024-03-20" },
    // ...other orders...
  ];

  return (
    <DashboardLayout>
      <div>
        <h1>Detalles del Paciente: {patient.name}</h1>
        <h2>Órdenes</h2>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.id} - {order.type} - {order.status} - {order.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default PatientDetail;
