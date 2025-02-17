import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase.from("messages").select("*");
      setMessages(data);
    };
    fetchMessages();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="border p-4 rounded">
            <h2 className="text-xl font-semibold mb-2">{message.subject}</h2>
            <p>{message.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
