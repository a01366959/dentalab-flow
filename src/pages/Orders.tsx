import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // Add this import
import { createClient } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Orders = () => {
  const router = useRouter(); // Add this line
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Redirect to the Orders page
    router.push("#file:Orders.tsx"); // Add this line

    const fetchOrders = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .ilike("type", `%${search}%`)
        .eq("status", filter || undefined);
      setOrders(data);
    };
    fetchOrders();
  }, [search, filter]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Search by type"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mr-2"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded p-2"
        >
          <option value="">All</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Type</th>
            <th className="py-2">Patient</th>
            <th className="py-2">Status</th>
            <th className="py-2">Due Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2">{order.id}</td>
              <td className="py-2">{order.type}</td>
              <td className="py-2">{order.patient}</td>
              <td className="py-2">{order.status}</td>
              <td className="py-2">{order.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
