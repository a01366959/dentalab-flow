import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import NewOrderModal from "./NewOrderModal";
import UploadScanModal from "./UploadScanModal";

const OrderActionsDropdown = () => {
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [isUploadScanOpen, setIsUploadScanOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <Button
        size="lg"
        className="flex items-center gap-2 h-auto py-4"
        onClick={() => setIsNewOrderOpen(!isNewOrderOpen)}
      >
        Add
      </Button>
      {isNewOrderOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <DialogTrigger asChild>
              <Button
                className="w-full text-left px-4 py-2 text-sm text-gray-700"
                onClick={() => setIsNewOrderOpen(false)}
              >
                New Order
              </Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button
                className="w-full text-left px-4 py-2 text-sm text-gray-700"
                onClick={() => setIsUploadScanOpen(false)}
              >
                Upload Scan
              </Button>
            </DialogTrigger>
          </div>
        </div>
      )}
      <NewOrderModal onAddOrder={() => {}} />
      <UploadScanModal />
    </div>
  );
};

export default OrderActionsDropdown;
