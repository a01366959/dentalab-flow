"use client";

import React from "react";
import * as SubframeCore from "@subframe/core";

interface DropdownMenuProps {
  children: React.ReactNode;
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  return (
    <div className="flex flex-col items-start gap-2 p-2 bg-white border border-gray-200 rounded-md shadow-lg">
      {children}
    </div>
  );
};

DropdownMenu.DropdownItem = function DropdownItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 p-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 rounded-md">
      {icon && <SubframeCore.Icon name={icon} className="h-5 w-5" />}
      {children}
    </div>
  );
};

export { DropdownMenu };
