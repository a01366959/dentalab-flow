"use client";

import React from "react";
import { DrawerLayout } from "@/subframe/layouts/DrawerLayout";
import { Breadcrumbs } from "@/subframe/components/Breadcrumbs";
import { IconButton } from "@/subframe/components/IconButton";
import { DataFieldHorizontal } from "@/subframe/components/DataFieldHorizontal";
import { Avatar } from "@/subframe/components/Avatar";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/subframe/components/Button";
import { ButtonPlaceholder } from "@/subframe/components/ButtonPlaceholder";

function DetailViewDrawerWithFieldsAndTables({ open, onOpenChange }) {
  return (
    <DrawerLayout open={open} onOpenChange={onOpenChange} className="z-50">
      <div className="flex h-full w-144 flex-col items-start bg-default-background overflow-hidden">
        <div className="flex w-full flex-wrap items-start justify-between border-b border-solid border-neutral-border px-6 py-6 mobile:flex-row mobile:flex-wrap mobile:gap-4">
          <div className="flex items-center gap-2 self-stretch">
            <Breadcrumbs>
              <Breadcrumbs.Item>Órdenes</Breadcrumbs.Item>
              <Breadcrumbs.Divider />
              <Breadcrumbs.Item active={true}>Pablo Escalante</Breadcrumbs.Item>
            </Breadcrumbs>
          </div>
          <div className="flex items-center justify-end gap-4">
            <IconButton
              icon="FeatherMoreHorizontal"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon="FeatherStar"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            />
            <IconButton
              icon="FeatherX"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => onOpenChange(false)}
            />
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-12 bg-default-background px-8 py-8 overflow-auto mobile:px-6 mobile:py-6">
          <div className="flex w-full flex-col items-start gap-6">
            <div className="flex w-full items-center gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                Pablo Escalante
              </span>
            </div>
            <div className="flex w-full flex-wrap items-start gap-2">
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                <DataFieldHorizontal icon="FeatherCalendar" label="Fecha">
                  <span className="whitespace-nowrap text-body font-body text-default-font">
                    Febrero 21
                  </span>
                </DataFieldHorizontal>
                <DataFieldHorizontal icon="FeatherHourglass" label="Hora">
                  <span className="whitespace-nowrap text-body font-body text-default-font">
                    13:23
                  </span>
                </DataFieldHorizontal>
              </div>
              <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                <DataFieldHorizontal icon="FeatherUser" label="Usuario">
                  <Avatar
                    size="small"
                    image="https://res.cloudinary.com/subframe/image/upload/v1711417507/shared/fychrij7dzl8wgq2zjq9.avif"
                  >
                    A
                  </Avatar>
                  <IconButton
                    size="small"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  />
                </DataFieldHorizontal>
                <DataFieldHorizontal icon="FeatherFlag" label="Prioridad">
                  <SubframeCore.Icon
                    className="text-body font-body text-warning-700"
                    name="FeatherFlag"
                  />
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-warning-700">
                    Alta
                  </span>
                </DataFieldHorizontal>
              </div>
            </div>
          </div>
          <div className="flex w-full grow shrink-0 basis-0 flex-col items-start gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-6 py-6 shadow-sm">
            <span className="w-full text-heading-3 font-heading-3 text-default-font">
              Orden
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-caption font-caption text-subtext-color">
                Fecha y hora estimada de entrega
              </span>
              <div className="flex w-full items-center gap-4">
                <Button
                  variant="brand-secondary"
                  icon="FeatherCalendar"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  24 febrero 2025
                </Button>
                <Button
                  variant="brand-secondary"
                  icon="FeatherClock"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Antes de las 14:00 hrs
                </Button>
              </div>
            </div>
            <div className="flex w-full flex-col items-start">
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-default-background" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <div className="flex w-full flex-col items-start">
                    <span className="w-full text-body-bold font-body-bold text-default-font">
                      Orden recibida
                    </span>
                    <span className="w-full text-body font-body text-default-font">
                      Hemos recibido tu orden
                    </span>
                  </div>
                  <span className="text-caption font-caption text-subtext-color">
                    Hace 3 horas
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-brand-600" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-600" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-brand-600" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <div className="flex w-full flex-col items-start">
                    <span className="w-full text-body-bold font-body-bold text-default-font">
                      Imagen verificada
                    </span>
                    <span className="w-full text-body font-body text-default-font">
                      Hemos verificado la imagen
                    </span>
                  </div>
                  <span className="w-full text-caption font-caption text-subtext-color">
                    Hace 5 minutos
                  </span>
                  <Button
                    variant="neutral-secondary"
                    iconRight="FeatherChevronRight"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Ver detalles
                  </Button>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-brand-600" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-brand-primary" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <div className="flex w-full flex-col items-start">
                    <span className="w-full text-body-bold font-body-bold text-default-font">
                      Diseño
                    </span>
                    <span className="w-full text-body font-body text-default-font">
                      Estamos trabajando el diseño de tu orden
                    </span>
                  </div>
                  <span className="w-full text-caption font-caption text-subtext-color">
                    Ahora
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-neutral-200" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-neutral-300" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <span className="w-full text-body-bold font-body-bold text-subtext-color">
                    Elaboración
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-neutral-200" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-neutral-300" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <span className="w-full text-body-bold font-body-bold text-subtext-color">
                    Sintetización
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-0.5 w-0.5 flex-none flex-col items-center gap-2 bg-neutral-200" />
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-neutral-300" />
                  <div className="flex w-0.5 grow shrink-0 basis-0 flex-col items-center gap-2 bg-neutral-200" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2 pb-6">
                  <span className="w-full text-body-bold font-body-bold text-subtext-color">
                    En camino para entrega
                  </span>
                </div>
              </div>
              <div className="flex w-full items-start gap-4">
                <div className="flex flex-col items-center self-stretch">
                  <div className="flex h-4 w-4 flex-none flex-col items-start gap-2 rounded-full border-2 border-solid border-neutral-300" />
                </div>
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-2">
                  <span className="w-full text-body-bold font-body-bold text-subtext-color">
                    Sintetización
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background px-2 py-2 shadow-sm">
            <div className="flex w-full items-center gap-2 px-3 py-2">
              <SubframeCore.Icon
                className="text-body-bold font-body-bold text-neutral-400"
                name="FeatherFile"
              />
              <span className="text-body font-body text-subtext-color">
                Agregar notas
              </span>
            </div>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full flex-wrap items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Productos
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  icon="FeatherMaximize2"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <IconButton
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <div className="flex w-full flex-wrap items-center rounded-md border border-solid border-neutral-border bg-default-background shadow-sm">
              <div className="flex min-w-[240px] grow shrink-0 basis-0 items-center gap-2 px-4 py-3">
                <SubframeCore.Icon
                  className="text-body-bold font-body-bold text-default-font"
                  name="FeatherBox"
                />
                <span className="line-clamp-1 grow shrink-0 basis-0 text-body font-body text-default-font">
                  Corona
                </span>
              </div>
              <div className="flex w-px flex-none flex-col items-center gap-2 self-stretch bg-neutral-200" />
            </div>
            <ButtonPlaceholder>Agregar producto a la orden</ButtonPlaceholder>
          </div>
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between">
              <span className="text-heading-3 font-heading-3 text-default-font">
                Documentos
              </span>
              <div className="flex items-center gap-2">
                <IconButton
                  icon="FeatherMaximize2"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
                <IconButton
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <ButtonPlaceholder>Agregar documentos</ButtonPlaceholder>
          </div>
        </div>
      </div>
    </DrawerLayout>
  );
}

export default DetailViewDrawerWithFieldsAndTables;