"use client";
/*
 * Documentation:
 * Avatar with badge — https://app.subframe.com/bac8225423f0/library?component=Avatar+with+badge_5a8ef5a3-9353-4067-8249-dfebd7149e65
 * Avatar — https://app.subframe.com/bac8225423f0/library?component=Avatar_bec25ae6-5010-4485-b46b-cf79e3943ab2
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { Avatar } from "./Avatar";

interface AvatarWithBadgeRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  image?: string;
  variant?: "maker" | "comment";
  className?: string;
}

const AvatarWithBadgeRoot = React.forwardRef<
  HTMLElement,
  AvatarWithBadgeRootProps
>(function AvatarWithBadgeRoot(
  {
    image,
    variant = "maker",
    className,
    ...otherProps
  }: AvatarWithBadgeRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "group/5a8ef5a3 flex flex-col flex-wrap items-center justify-center gap-2 relative",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <Avatar image={image}>A</Avatar>
      <div
        className={SubframeCore.twClassNames(
          "flex h-4 w-4 flex-none items-center justify-center gap-2 rounded-full border border-solid border-white bg-success-400 absolute -bottom-2",
          { "bg-warning-200": variant === "comment" }
        )}
      >
        <span
          className={SubframeCore.twClassNames(
            "font-['Inter'] text-[8px] font-[500] leading-[8px] text-white",
            { hidden: variant === "comment" }
          )}
        >
          M
        </span>
        <SubframeCore.Icon
          className={SubframeCore.twClassNames(
            "hidden text-body font-body text-default-font",
            {
              "inline-flex font-['Inter'] text-[9px] font-[600] leading-[10px] tracking-normal text-warning-700":
                variant === "comment",
            }
          )}
          name="FeatherMessageSquare"
        />
      </div>
    </div>
  );
});

export const AvatarWithBadge = AvatarWithBadgeRoot;
