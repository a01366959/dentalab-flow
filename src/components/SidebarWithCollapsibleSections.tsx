"use client";

import React from "react";
import * as SubframeCore from "@subframe/core";

interface SidebarWithCollapsibleSectionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const SidebarWithCollapsibleSections = React.forwardRef<
  HTMLElement,
  SidebarWithCollapsibleSectionsProps
>(function SidebarWithCollapsibleSections(
  { header, footer, children, className, ...otherProps }: SidebarWithCollapsibleSectionsProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex flex-col h-full w-64 bg-white border-r border-gray-200",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {header && <div className="p-4 border-b border-gray-200">{header}</div>}
      <div className="flex-1 overflow-y-auto">{children}</div>
      {footer && <div className="p-4 border-t border-gray-200">{footer}</div>}
    </div>
  );
});

SidebarWithCollapsibleSections.NavItem = function NavItem({
  icon,
  children,
  selected,
  ...props
}: {
  icon: string;
  children: React.ReactNode;
  selected?: boolean;
}) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex items-center p-2 text-sm font-medium rounded-md cursor-pointer",
        selected ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50"
      )}
      {...props}
    >
      <SubframeCore.Icon name={icon} className="mr-3 h-5 w-5" />
      {children}
    </div>
  );
};

SidebarWithCollapsibleSections.NavSection = function NavSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-4">
      <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase">
        {label}
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export { SidebarWithCollapsibleSections };
