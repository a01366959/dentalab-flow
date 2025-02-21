"use client";
/*
 * Documentation:
 * Default Page Layout — https://app.subframe.com/bac8225423f0/library?component=Default+Page+Layout_a57b1c43-310a-493f-b807-8cc88e2452cf
 * Dropdown Menu — https://app.subframe.com/bac8225423f0/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Sidebar with collapsible sections — https://app.subframe.com/bac8225423f0/library?component=Sidebar+with+collapsible+sections_47616606-525d-4c53-9481-68784d7159c2
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "../components/DropdownMenu";
import { SidebarWithCollapsibleSections } from "../components/SidebarWithCollapsibleSections";

interface DefaultPageLayoutRootProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

const DefaultPageLayoutRoot = React.forwardRef<
  HTMLElement,
  DefaultPageLayoutRootProps
>(function DefaultPageLayoutRoot(
  { children, className, ...otherProps }: DefaultPageLayoutRootProps,
  ref
) {
  return (
    <div
      className={SubframeCore.twClassNames(
        "flex h-screen w-full items-center",
        className
      )}
      ref={ref as any}
      {...otherProps}
    >
      <SidebarWithCollapsibleSections
        className="mobile:hidden"
        header={
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <div className="flex w-full items-center gap-4 px-3">
                <img
                  className="h-6 w-6 flex-none object-cover"
                  src="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/y2rsnhq3mex4auk54aye.png"
                />
                <div className="flex grow shrink-0 basis-0 flex-col items-start">
                  <span className="w-full text-body-bold font-body-bold text-default-font">
                    Subframe
                  </span>
                  <span className="text-caption font-caption text-subtext-color">
                    subframe.com
                  </span>
                </div>
                <SubframeCore.Icon
                  className="text-caption font-caption text-default-font"
                  name="FeatherChevronsUpDown"
                />
              </div>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="start"
                sideOffset={4}
                asChild={true}
              >
                <DropdownMenu>
                  <DropdownMenu.DropdownItem icon={null}>
                    Profile
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Settings
                  </DropdownMenu.DropdownItem>
                  <DropdownMenu.DropdownItem icon={null}>
                    Log out
                  </DropdownMenu.DropdownItem>
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        }
        footer={
          <div className="flex flex-col items-start justify-center gap-2 rounded-md bg-neutral-50 px-4 py-4">
            <SubframeCore.Icon
              className="text-body font-body text-default-font"
              name="FeatherSparkles"
            />
            <span className="text-caption-bold font-caption-bold text-default-font">
              Upgrade today to premium features &amp; more
            </span>
          </div>
        }
      >
        <div className="flex w-full flex-col items-start">
          <SidebarWithCollapsibleSections.NavItem
            selected={true}
            icon="FeatherHome"
          >
            Home
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherInbox">
            Inbox
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherBarChart2">
            Reports
          </SidebarWithCollapsibleSections.NavItem>
        </div>
        <SidebarWithCollapsibleSections.NavSection label="Analytics">
          <SidebarWithCollapsibleSections.NavItem icon="FeatherGauge">
            Dashboard
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherRocket">
            Trends
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherTent">
            Campaigns
          </SidebarWithCollapsibleSections.NavItem>
        </SidebarWithCollapsibleSections.NavSection>
        <SidebarWithCollapsibleSections.NavSection label="Settings">
          <SidebarWithCollapsibleSections.NavItem icon="FeatherBuilding">
            Company
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherDollarSign">
            Payments
          </SidebarWithCollapsibleSections.NavItem>
          <SidebarWithCollapsibleSections.NavItem icon="FeatherWebhook">
            Integrations
          </SidebarWithCollapsibleSections.NavItem>
        </SidebarWithCollapsibleSections.NavSection>
      </SidebarWithCollapsibleSections>
      {children ? (
        <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 self-stretch overflow-y-auto bg-default-background">
          {children}
        </div>
      ) : null}
    </div>
  );
});

export const DefaultPageLayout = DefaultPageLayoutRoot;
