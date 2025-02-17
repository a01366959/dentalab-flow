"use client";

import React from "react";
import * as SubframeCore from "@subframe/core";
import { DropdownMenu } from "@/subframe/components//DropdownMenu";
import { SidebarWithCollapsibleSections } from "@/subframe/components/SidebarWithCollapsibleSections";
import { Button } from "@/subframe/components/Button";
import { NavLink, useLocation } from "react-router-dom";

const handleLogout = () => {
  // Add your logout logic here
  console.log("Usuario desconectado");
};

const Sidebar = () => {
  const location = useLocation();

  return (
    <SidebarWithCollapsibleSections
      className="fixed top-0 left-0 h-full z-50"
      header={
        <SubframeCore.DropdownMenu.Root>
          <SubframeCore.DropdownMenu.Trigger asChild={true}>
            <div className="flex w-full items-center gap-4 px-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48" fill="none">
                <path d="M22.5 11.3438C22.5 9.00938 20.6157 7.125 18.2813 7.125C16.4813 7.125 15.3843 7.63125 14.5124 8.025C13.8656 8.30625 13.3875 8.53125 12.6563 8.53125C11.925 8.53125 11.4469 8.30625 10.8001 8.025C9.92822 7.63125 8.83134 7.125 7.03125 7.125C4.69678 7.125 2.8125 9.00938 2.8125 11.3438C2.8125 14.0718 3.23447 17.3625 4.10634 21.1875L1.6875 22.9313L7.11581 34.35H18.1969L23.7189 22.9313L21.2062 21.1875C22.078 17.3625 22.5 14.0718 22.5 11.3438ZM43.8937 21.1875C44.7655 17.3625 45.1875 14.0718 45.1875 11.3438C45.1875 9.00938 43.3032 7.125 40.9688 7.125C39.1688 7.125 38.0718 7.63125 37.1999 8.025C36.5531 8.30625 36.075 8.53125 35.3438 8.53125C34.6125 8.53125 34.1344 8.30625 33.4876 8.025C32.6157 7.63125 31.5188 7.125 29.7188 7.125C27.3843 7.125 25.5 9.00938 25.5 11.3438C25.5 14.0718 25.922 17.3625 26.7938 21.1875L24.2813 22.9313L29.8033 34.35H40.8844L46.3127 25.7438L43.8937 21.1875Z" fill="url(#paint0_linear_4678_4230)"/>
                <path d="M43.8937 21.1875C43.7813 21.75 43.6406 22.3405 43.5 22.9313C42.2904 27.7125 40.9405 31.3687 40.8842 31.5375C40.6593 32.0719 40.1531 32.4375 39.5624 32.4375H39.4779C38.8593 32.4094 38.353 31.9592 38.1843 31.3688C37.7342 29.5124 36.4405 26.8125 35.3437 26.8125C34.2468 26.8125 32.9531 29.5124 32.503 31.3688C32.3343 31.9593 31.828 32.4094 31.2094 32.4375C30.5624 32.4656 30.028 32.1 29.8031 31.5375C29.7468 31.3687 28.3969 27.7125 27.1873 22.9313C27.0467 22.3406 26.9062 21.7501 26.7937 21.1875H21.2061C21.0937 21.75 20.953 22.3405 20.8124 22.9313C19.6028 27.7125 18.2529 31.3687 18.1966 31.5375C17.9717 32.0719 17.4655 32.4375 16.8748 32.4375H16.7903C16.1717 32.4094 15.6654 31.9592 15.4967 31.3688C15.0466 29.5124 13.7529 26.8125 12.6561 26.8125C11.5592 26.8125 10.2655 29.5124 9.81544 31.3688C9.64669 31.9593 9.14044 32.4094 8.52178 32.4375C7.90294 32.4656 7.34044 32.1 7.11553 31.5375C7.05919 31.3687 5.70928 27.7125 4.49972 22.9313C4.35938 22.3405 4.21875 21.75 4.10634 21.1875C1.82822 21.2437 0 23.1 0 25.4062V36.6562C0 38.9904 1.88428 40.875 4.21875 40.875H43.7812C46.1157 40.875 48 38.9904 48 36.6562V25.4062C48 23.1 46.1718 21.2437 43.8937 21.1875ZM1.40625 18.375H11.25V19.7812C11.25 20.5585 11.879 21.1875 12.6562 21.1875C13.4335 21.1875 14.0625 20.5585 14.0625 19.7812V18.375H33.9375V19.7812C33.9375 20.5585 34.5665 21.1875 35.3438 21.1875C36.121 21.1875 36.75 20.5585 36.75 19.7812V18.375H46.5938C47.371 18.375 48 17.746 48 16.9688C48 16.1915 47.371 15.5625 46.5938 15.5625H36.75V14.1562C36.75 13.379 36.121 12.75 35.3438 12.75C34.5665 12.75 33.9375 13.379 33.9375 14.1562V15.5625H14.0625V14.1562C14.0625 13.379 13.4335 12.75 12.6562 12.75C11.879 12.75 11.25 13.379 11.25 14.1562V15.5625H1.40625C0.628969 15.5625 0 16.1915 0 16.9688C0 17.746 0.628969 18.375 1.40625 18.375Z" fill="url(#paint1_linear_4678_4230)"/>
                <defs>
                  <linearGradient id="paint0_linear_4678_4230" x1="24" y1="34.35" x2="24" y2="7.125" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFBEF9"/>
                    <stop offset="1" stop-color="#FFF1FF"/>
                  </linearGradient>
                  <linearGradient id="paint1_linear_4678_4230" x1="24" y1="40.875" x2="24" y2="12.75" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#A93AFF"/>
                    <stop offset="1" stop-color="#FF81FF"/>
                  </linearGradient>
                </defs>
              </svg>
              <div className="flex grow shrink-0 basis-0 flex-col items-start">
                <span className="w-full text-body-bold font-body-bold text-default-font">
                  DentaLab
                </span>
                <span className="text-caption font-caption text-subtext-color">
                  dentalab.com
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
                <DropdownMenu.DropdownItem icon={null}>Perfil</DropdownMenu.DropdownItem>
                <DropdownMenu.DropdownItem icon={null}>Configuración</DropdownMenu.DropdownItem>
                <DropdownMenu.DropdownItem icon={null}>Cerrar sesión</DropdownMenu.DropdownItem>
              </DropdownMenu>
            </SubframeCore.DropdownMenu.Content>
          </SubframeCore.DropdownMenu.Portal>
        </SubframeCore.DropdownMenu.Root>
      }
      //footer={
      //  <Button icon="FeatherLogOut" onClick={handleLogout}>Cerrar sesión</Button>
      //}
    >
      <div className="flex w-full flex-col items-start gap-2">
        <SidebarWithCollapsibleSections.NavItem selected={location.pathname === "/dashboard"} icon="FeatherHome">
          <NavLink to="/dashboard">Inicio</NavLink>
        </SidebarWithCollapsibleSections.NavItem>
        <SidebarWithCollapsibleSections.NavItem selected={location.pathname === "/dashboard/orders"} icon="FeatherFileText">
          <NavLink to="/dashboard/orders">Órdenes</NavLink>
        </SidebarWithCollapsibleSections.NavItem>
        <SidebarWithCollapsibleSections.NavItem selected={location.pathname === "/dashboard/patients"} icon="FeatherUser">
          <NavLink to="/dashboard/patients">Pacientes</NavLink>
        </SidebarWithCollapsibleSections.NavItem>
        <SidebarWithCollapsibleSections.NavItem selected={location.pathname === "/dashboard/messages"} icon="FeatherMessageCircle">
          <NavLink to="/dashboard/messages">Mensajes</NavLink>
        </SidebarWithCollapsibleSections.NavItem>
        <SidebarWithCollapsibleSections.NavItem selected={location.pathname === "/dashboard/learning-hub"} icon="FeatherBookOpen">
          <NavLink to="/dashboard/learning-hub">Aprendizaje</NavLink>
        </SidebarWithCollapsibleSections.NavItem>
      </div>
      
      <SidebarWithCollapsibleSections.NavSection label="Configuración">
        <SidebarWithCollapsibleSections.NavItem icon="FeatherBuilding">
          Consultorio
        </SidebarWithCollapsibleSections.NavItem>
        <SidebarWithCollapsibleSections.NavItem icon="FeatherDollarSign">
          Pagos
        </SidebarWithCollapsibleSections.NavItem>
        
      </SidebarWithCollapsibleSections.NavSection>
    </SidebarWithCollapsibleSections>
  );
};

export default Sidebar;
