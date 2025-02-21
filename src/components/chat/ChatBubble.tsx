import { useState, useEffect, forwardRef } from "react";
import { Button } from "@/subframe/components/Button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageSquare, X } from "lucide-react";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/subframe/components/IconButton";
import { TextField } from "@/subframe/components/TextField"; // Use TextField instead of TextFieldUnstyled
import { ChatMessageBar } from "@/subframe/components/ChatMessageBar";
import { LinkButton } from "@/subframe/components/LinkButton";

interface ChatBubbleProps {
  prewrittenMessage: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ prewrittenMessage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (prewrittenMessage) {
      setMessage(prewrittenMessage);
      setIsOpen(true);
    }
  }, [prewrittenMessage]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage("");
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-lg"
          size="icon"
        >
          {isOpen ? <X /> : <MessageSquare />}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 h-[600px] p-0"
        side="top"
        align="end"
        sideOffset={20}
      >
        <div className="flex flex-col">
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-8 px-4 pt-4 pb-4">
            <div className="flex w-full items-center gap-4">
              <div className="flex h-12 w-12 flex-none flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-solid border-neutral-border bg-white relative">
                <span className="line-clamp-1 w-full font-['Inter'] text-[14px] font-[500] leading-[14px] text-brand-800 text-center absolute">
                  A
                </span>
                <img
                  className="h-8 w-8 flex-none object-cover absolute"
                  src="https://res.cloudinary.com/subframe/image/upload/v1739862734/uploads/2470/o2q7eqmu5kglcbavnufe.svg"
                />
              </div>
              <div className="flex grow shrink-0 basis-0 items-center gap-4">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
                  <span className="text-heading-3 font-heading-1 text-default-font">
                    DentaLab
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-body font-body text-default-font">
                    Powered by TuGenio®
                    </span>
                    
                  </div>
                </div>
                
              </div>
            </div>
          </div>
            <div className="flex-1 p-4 overflow-y-auto h-full w-full">
              <div className="space-y-4">
              <div className="bg-neutral-100 text-neutral-800 p-3 rounded-lg max-w-[80%] text-sm">
                ¡Hola! ¿Cómo podemos ayudarte hoy?
              </div>
              {messages.map((msg, index) => (
                <div key={index} className="bg-purple-500 p-3 rounded-lg max-w-[80%] text-white self-end text-sm">
                {msg}
                </div>
              ))}
              </div>
            </div>
            <div className="p-4">
              <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
              >
              
            </form>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ChatBubble;
