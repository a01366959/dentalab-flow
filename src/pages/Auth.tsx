import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { Button } from "@/subframe/components/Button";
import { TextField } from "@/subframe/components/TextField";
import { LinkButton } from "@/subframe/components/LinkButton";
import * as SubframeCore from "@subframe/core";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });
      } else {
        result = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
      }

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error.message,
        });
      } else {
        toast({
          title: isSignUp ? "Account created" : "Welcome back!",
          description: isSignUp
            ? "Please check your email to confirm your account"
            : "You have been successfully logged in",
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An unexpected error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full flex-wrap items-center justify-center gap-12 bg-default-background px-12 py-12 mobile:flex-col mobile:flex-wrap mobile:gap-12 mobile:px-6 mobile:py-12">
      <div className="flex max-w-[576px] grow shrink-0 basis-0 flex-col items-center justify-center gap-12 self-stretch mobile:h-auto mobile:w-full mobile:max-w-[576px] mobile:flex-none">
      <div className="flex h-12 flex-col items-start justify-center gap-2 px-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
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
        </div>
        <div className="flex flex-col items-center justify-center gap-6 px-12 mobile:flex mobile:px-0 mobile:py-0">
          
          <div className="flex items-start justify-center gap-4 px-2 py-2">
            <SubframeCore.Icon
              className="text-heading-2 font-heading-2 text-brand-700"
              name="FeatherHeart"
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-brand-700">
              Cuidado Dental Integral
              </span>
              <span className="text-body font-body text-subtext-color">
              Ofrecemos una gama completa de servicios dentales para mantener tu sonrisa saludable.
              </span>
            </div>
          </div>
          <div className="flex items-start justify-center gap-4 px-2 py-2">
            <SubframeCore.Icon
              className="text-heading-2 font-heading-2 text-brand-700"
              name="FeatherSmile"
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-brand-700">
                Tecnología Avanzada
              </span>
              <span className="text-body font-body text-subtext-color">
                Utilizamos la última tecnología para ofrecer tratamientos precisos y efectivos.
              </span>
            </div>
          </div>
          <div className="flex items-start justify-center gap-4 px-2 py-2">
            <SubframeCore.Icon
              className="text-heading-2 font-heading-2 text-brand-700"
              name="FeatherHeart"
            />
            <div className="flex flex-col items-start gap-1">
              <span className="text-heading-3 font-heading-3 text-brand-700">
                Atención Personalizada
              </span>
              <span className="text-body font-body text-subtext-color">
                Nos preocupamos por cada paciente y adaptamos nuestros servicios a tus necesidades.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex max-w-[448px] grow shrink-0 basis-0 flex-col items-center justify-center gap-6 rounded-md border border-solid border-neutral-border bg-default-background px-12 py-12 shadow-lg">
        <div className="flex w-full flex-col items-center justify-center gap-8">
          <span className="w-full text-heading-3 font-heading-3 text-default-font">
            {isSignUp ? "Crea tu cuenta" : "Iniciar sesión"}
          </span>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col items-start justify-center gap-6">
            <TextField className="h-auto w-full flex-none" label="Correo Electrónico" helpText="">
              <TextField.Input
                placeholder="correo@ejemplo.com"
                {...form.register("email")}
                className="h-12" // Set height to 48px
              />
            </TextField>
            <TextField className="h-auto w-full flex-none" label="Contraseña" helpText="">
              <TextField.Input
                type="password"
                placeholder="********"
                {...form.register("password")}
                className="h-12" // Set height to 48px
              />
            </TextField>
            <Button
              type="submit"
              className="h-10 w-full flex-none"
              size="large"
              disabled={isLoading}
            >
              {isLoading
                ? "Cargando..."
                : isSignUp
                ? "Crear cuenta"
                : "Iniciar sesión"}
            </Button>
          </form>
          <div className="flex flex-wrap items-start gap-1">
            <span className="text-body font-body text-default-font">
              {isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
            </span>
            <LinkButton
              variant="brand"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Iniciar sesión" : "Regístrate"}
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
