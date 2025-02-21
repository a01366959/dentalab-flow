"use client";
/*
 * Documentation:
 * Chat Message Bar — https://app.subframe.com/bac8225423f0/library?component=Chat+Message+Bar_9c21d184-68b5-4d91-b85a-3a161659e33a
 * Dropdown Menu — https://app.subframe.com/bac8225423f0/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/bac8225423f0/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 * Text Field Unstyled — https://app.subframe.com/bac8225423f0/library?component=Text+Field+Unstyled_abb07b95-d67f-418c-aea5-aba353cce0d4
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "./DropdownMenu";

interface ChatMessageBarRootProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const ChatMessageBarRoot = React.forwardRef<
  HTMLElement,
  ChatMessageBarRootProps
>(function ChatMessageBarRoot(
  { children, className, ...otherProps }: ChatMessageBarRootProps,
  ref
) {
  return children ? (
    <div
      className={SubframeCore.twClassNames(
        "flex w-full max-w-[768px] items-center justify-center gap-2 rounded-full bg-neutral-100 px-2 py-2",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      {children}
    </div>
  ) : null;
});

export const ChatMessageBar = ChatMessageBarRoot;
