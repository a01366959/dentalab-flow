"use client";
/*
 * Documentation:
 * Search Field — https://app.subframe.com/bac8225423f0/library?component=Search+Field_06a223f2-fe49-4dcc-bffc-4ee1bd924a25
 * Icon Button — https://app.subframe.com/bac8225423f0/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "./IconButton";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "placeholder"> {
  placeholder?: React.ReactNode;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input = React.forwardRef<HTMLElement, InputProps>(function Input(
  { placeholder, className, ...otherProps }: InputProps,
  ref
) {
  return (
    <input
      className={SubframeCore.twClassNames(
        "h-full w-full border-none bg-transparent text-body font-body text-default-font outline-none placeholder:text-neutral-400",
        className
      )}
      placeholder={placeholder as string}
      ref={ref as any}
      {...otherProps}
    />
  );
});

interface SearchFieldRootProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode;
  showClear?: boolean;
  className?: string;
}

const SearchFieldRoot = React.forwardRef<HTMLElement, SearchFieldRootProps>(
  function SearchFieldRoot(
    {
      children,
      showClear = false,
      className,
      ...otherProps
    }: SearchFieldRootProps,
    ref
  ) {
    return (
      <label
        className={SubframeCore.twClassNames(
          "group/06a223f2 flex h-10 w-full items-center gap-1 rounded-full border border-solid border-neutral-border bg-default-background pl-3 pr-2 focus-within:border focus-within:border-solid focus-within:border-brand-primary",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <SubframeCore.Icon
          className="text-body font-body text-subtext-color"
          name="FeatherSearch"
        />
        {children ? (
          <div className="flex grow shrink-0 basis-0 flex-col items-start self-stretch px-1">
            {children}
          </div>
        ) : null}
        <IconButton
          className={SubframeCore.twClassNames("hidden", { flex: showClear })}
          size="small"
          icon="FeatherX"
        />
      </label>
    );
  }
);

export const SearchField = Object.assign(SearchFieldRoot, {
  Input,
});
