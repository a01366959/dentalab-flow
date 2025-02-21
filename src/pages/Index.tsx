import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import React from "react";
import { ModernNavbar } from "@/subframe/components/ModernNavbar";
import { ModernNavbarMobile } from "@/subframe/components/ModernNavbarMobile";
import { Button } from "@/subframe/components/Button";
import { IconButton } from "@/subframe/components/IconButton";
import { Stepper } from "@/subframe/components/Stepper";
import { PricingPlanCard } from "@/subframe/components/PricingPlanCard";
import { ModernFooter } from "@/subframe/components/ModernFooter";
import { useNavigate } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
};

// export default Index;

function UntitledPage2() {
  const navigate = useNavigate();
  return (
    <div className="flex h-full w-full flex-col items-center bg-default-background">
      <div className="flex w-full flex-col items-center justify-center gap-2 px-6 py-6">
        <ModernNavbar />
        <ModernNavbarMobile className="hidden" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-6 px-6 py-24">
        <div className="flex w-full max-w-[1024px] flex-col items-start gap-12 px-6 py-6">
          <div className="flex w-full flex-col items-start gap-6">
            <span className="max-w-[768px] font-['Inter'] text-[56px] font-[600] leading-[62px] text-default-font -tracking-[0.04em]">
              Gestión de Laboratorio Dental sin Esfuerzo a tu Alcance
            </span>
            <span className="max-w-[576px] font-['Inter'] text-[21px] font-[500] leading-[28px] text-subtext-color -tracking-[0.03em]">
              Envía casos, rastrea pedidos y accede a recursos expertos, todo en un solo lugar.
            </span>
          </div>
          <div className="flex w-full flex-wrap items-center gap-2">
            <Button
              
              size="large"
              onClick={() => navigate("/auth")}
            >
              Regístrate Gratis
            </Button>
            <Button
              variant="neutral-tertiary"
              size="large"
              iconRight="FeatherArrowRight"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Ver Demo
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-2">
        <img
          className="h-144 w-full max-w-[1024px] flex-none object-cover"
          src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=3474&auto=format&fit=crop"
        />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-12 px-6 py-24">
        <div className="flex w-full max-w-[1024px] flex-col items-center justify-center gap-12">
          <div className="flex w-full max-w-[768px] flex-col items-center gap-1">
            <span className="font-['Inter'] text-[21px] font-[500] leading-[28px] text-default-font -tracking-[0.03em]">
              Confiado por las principales prácticas dentales en todo el mundo
            </span>
            <span className="font-['Inter'] text-[23px] font-[500] leading-[28px] text-subtext-color -tracking-[0.03em]">
              Desde practicantes individuales hasta grandes clínicas
            </span>
          </div>
          <div className="w-full items-center justify-between grid grid-cols-4">
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4 rounded-md px-6 py-6">
              <img
                className="h-10 flex-none object-cover grayscale contrast-200"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417511/shared/t4qorgih4yjwudzjfkxq.png"
              />
            </div>
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4 rounded-md px-6 py-6">
              <img
                className="h-10 flex-none object-cover grayscale contrast-200"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417508/shared/wd5ui3rofpbpbjdltzm2.png"
              />
            </div>
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4 rounded-md px-6 py-6">
              <img
                className="h-10 flex-none object-cover grayscale contrast-200"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417510/shared/esj02idt9sf1mhn7xuw8.png"
              />
            </div>
            <div className="flex grow shrink-0 basis-0 items-center justify-center gap-4 rounded-md px-6 py-6">
              <img
                className="h-10 flex-none object-cover grayscale contrast-200"
                src="https://res.cloudinary.com/subframe/image/upload/v1711417509/shared/ruza1qipiqoaiwdo6vrg.png"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 py-40 bg-gradient-to-b from-transparent via-neutral-100 to-transparent">
        <div className="flex w-full max-w-[1024px] flex-col items-start gap-16">
          <div className="flex w-full flex-wrap items-end gap-12">
            <span className="grow shrink-0 basis-0 font-['Inter'] text-[56px] font-[600] leading-[62px] text-default-font -tracking-[0.04em]">
              Todo lo que necesitas para gestionar pedidos de laboratorio
            </span>
            <span className="grow shrink-0 basis-0 font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color -tracking-[0.01em]">
              Desde escaneos digitales hasta la entrega final, simplificamos cada paso de tu flujo de trabajo de laboratorio dental.
            </span>
          </div>
          <div className="flex flex-wrap items-start gap-2">
            <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-center self-stretch overflow-hidden rounded-2xl shadow-[0px_4px_16px_-4px_#0000000a]">
              <img
                className="h-64 w-full flex-none object-cover"
                src="https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2340&auto=format&fit=crop"
              />
              <div className="flex w-full grow shrink-0 basis-0 items-end gap-2 bg-default-background px-8 py-6">
                <span className="grow shrink-0 basis-0 font-['Inter'] text-[21px] font-[500] leading-[28px] text-default-font -tracking-[0.02em]">
                  Coronas y Puentes
                </span>
                <IconButton
                  size="large"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-center self-stretch overflow-hidden rounded-2xl shadow-[0px_4px_16px_-4px_#0000000a]">
              <img
                className="h-64 w-full flex-none object-cover"
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2340&auto=format&fit=crop"
              />
              <div className="flex w-full grow shrink-0 basis-0 items-end gap-2 bg-default-background px-8 py-6">
                <span className="grow shrink-0 basis-0 font-['Inter'] text-[21px] font-[500] leading-[28px] text-default-font -tracking-[0.02em]">
                  Implantes y Guías Quirúrgicas
                </span>
                <IconButton
                  size="large"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
            <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-center self-stretch overflow-hidden rounded-2xl shadow-[0px_4px_16px_-4px_#0000000a]">
              <img
                className="h-64 w-full flex-none object-cover"
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2340&auto=format&fit=crop"
              />
              <div className="flex w-full grow shrink-0 basis-0 items-end gap-2 bg-default-background px-8 py-6">
                <span className="grow shrink-0 basis-0 font-['Inter'] text-[21px] font-[500] leading-[28px] text-default-font -tracking-[0.02em]">
                  Escaneos Digitales e Impresión 3D
                </span>
                <IconButton
                  size="large"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 py-40">
        <div className="flex w-full max-w-[1024px] flex-col items-center gap-16">
          <div className="flex w-full flex-col items-center gap-6">
            <span className="text-heading-2 font-heading-2 text-default-font">
              Cómo funciona
            </span>
            <Stepper>
              <Stepper.Step
                variant="completed"
                firstStep={true}
                stepNumber="1"
                label="Selecciona el tipo de producto"
              />
              <Stepper.Step
                variant="completed"
                stepNumber="2"
                label="Sube escaneos"
              />
              <Stepper.Step
                variant="completed"
                stepNumber="3"
                label="Elige materiales"
              />
              <Stepper.Step
                variant="completed"
                stepNumber="4"
                label="Rastrea el progreso"
              />
              <Stepper.Step
                variant="completed"
                lastStep={true}
                stepNumber="5"
                label="Recibe el pedido"
              />
            </Stepper>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-6 py-40 bg-gradient-to-b from-transparent via-neutral-100 to-transparent">
        <div className="flex w-full max-w-[1024px] flex-col items-start gap-16">
          <div className="flex w-full flex-wrap items-end gap-12">
            <span className="grow shrink-0 basis-0 font-['Inter'] text-[56px] font-[600] leading-[62px] text-default-font -tracking-[0.04em]">
              Precios simples para cada práctica
            </span>
          </div>
          <div className="flex w-full flex-wrap items-start gap-4">
            <PricingPlanCard
              className="h-auto min-w-[128px] max-w-[384px] grow shrink-0 basis-0"
              title="Básico"
              amount="$1,999.00"
              label="por mes"
              description="Ideal para pequeñas prácticas dentales."
              actions={
                <Button
                  className="h-10 w-full flex-none"
                  variant="neutral-secondary"
                  size="large"
                  icon="FeatherCheck"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Selecciona este plan
                </Button>
              }
            >
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Hasta 2 miembros del equipo
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Hasta 100 escaneos al mes
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Hasta 50GB de límite máximo de archivos
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Retención de registros de 30 días
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Acceso a soporte 8/5
              </PricingPlanCard.FeatureItem>
            </PricingPlanCard>
            <PricingPlanCard
              className="h-auto min-w-[128px] max-w-[384px] grow shrink-0 basis-0"
              title="Pro"
              amount="$4,999.00"
              label="por mes"
              description="Para prácticas dentales medianas."
              actions={
                <Button
                  className="h-10 w-full flex-none"
                  variant="brand-primary"
                  size="large"
                  icon="FeatherCheck"
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Selecciona este plan
                </Button>
              }
            >
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Miembros ilimitados del equipo
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Hasta 1000 escaneos al mes
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Hasta 250GB de límite máximo de archivos
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Retención de registros de 90 días
              </PricingPlanCard.FeatureItem>
              <PricingPlanCard.FeatureItem className="h-auto w-full flex-none">
                Acceso a soporte 24/7
              </PricingPlanCard.FeatureItem>
            </PricingPlanCard>
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-6 rounded-lg border border-solid border-neutral-border px-4 py-4">
              <div className="flex w-full flex-col items-start gap-2">
                <span className="font-['Inter'] text-[15px] font-[500] leading-[23px] text-default-font -tracking-[0.01em]">
                  Empresa
                </span>
                <span className="font-['Inter'] text-[17px] font-[500] leading-[24px] text-subtext-color -tracking-[0.01em]">
                  Precios personalizados
                </span>
              </div>
              <Button
                variant="brand-secondary"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Contactar Ventas
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-6 px-6 py-24 bg-gradient-to-t from-neutral-100 via-transparent">
        <div className="flex max-w-[1024px] grow shrink-0 basis-0 flex-wrap items-end justify-center gap-16">
          <div className="flex min-w-[320px] grow shrink-0 basis-0 flex-col items-start gap-16">
            <span className="w-full whitespace-pre-wrap font-['Inter'] text-[56px] font-[600] leading-[62px] text-default-font -tracking-[0.04em]">
              {"¿Listo para optimizar\ntu flujo de trabajo de laboratorio?"}
            </span>
          </div>
          <div className="flex grow shrink-0 basis-0 items-center justify-end gap-2">
            <Button
              variant="brand-secondary"
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Programar Demo
            </Button>
            <Button
              size="large"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
            >
              Regístrate Ahora
            </Button>
          </div>
        </div>
      </div>
      <ModernFooter />
    </div>
  );
}

export default UntitledPage2;