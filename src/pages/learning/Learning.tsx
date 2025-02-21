import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconButton } from "@/subframe/components/IconButton";
import { SearchField } from "@/subframe/components/SearchField";
import { DropdownMenu } from "@/subframe/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { Button } from "@/subframe/components/Button";

const Learning = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todo");

  const categories = ["Todo", "Tutoriales", "Videos", "Blogs", "Publicaciones"];
  const content = [
    { id: 1, title: "Cómo usar la plataforma", category: "Tutoriales", description: "Aprende lo básico para usar la plataforma de manera efectiva.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 2, title: "Uso avanzado de herramientas", category: "Videos", description: "Domina las herramientas avanzadas disponibles en la plataforma.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 3, title: "Actualizaciones de la plataforma", category: "Blogs", description: "Mantente actualizado con los últimos cambios y mejoras.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 4, title: "Experiencias de usuarios", category: "Publicaciones", description: "Lee sobre las experiencias de otros usuarios.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 5, title: "Comenzando con la API", category: "Tutoriales", description: "Una guía para principiantes sobre el uso de la API de la plataforma.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 6, title: "Recorrido por las funciones", category: "Videos", description: "Un recorrido detallado por las funciones de la plataforma.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 7, title: "Boletín mensual", category: "Blogs", description: "Ponte al día con las últimas noticias y actualizaciones.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 8, title: "Historias de la comunidad", category: "Publicaciones", description: "Historias y testimonios de nuestra comunidad.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 9, title: "Consejos de integración de la API", category: "Tutoriales", description: "Consejos y trucos para integrar la API.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 10, title: "Sesión de preguntas y respuestas en vivo", category: "Videos", description: "Mira nuestra sesión de preguntas y respuestas en vivo con los desarrolladores.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 11, title: "Hoja de ruta del producto", category: "Blogs", description: "Una visión general de nuestra hoja de ruta del producto.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 12, title: "Comentarios de los usuarios", category: "Publicaciones", description: "Comentarios y sugerencias de nuestros usuarios.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 13, title: "Uso avanzado de la API", category: "Tutoriales", description: "Aprende técnicas avanzadas para usar la API.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 14, title: "Demostración de funciones", category: "Videos", description: "Una demostración de las últimas funciones.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 15, title: "Blog de desarrolladores", category: "Blogs", description: "Ideas y actualizaciones de nuestros desarrolladores.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 16, title: "Consejos de usuarios", category: "Publicaciones", description: "Consejos y trucos de nuestros usuarios.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 17, title: "Mejores prácticas de la API", category: "Tutoriales", description: "Mejores prácticas para usar la API.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 18, title: "Grabación de seminario web", category: "Videos", description: "Mira la grabación de nuestro último seminario web.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 19, title: "Notas de la versión", category: "Blogs", description: "Notas de la versión detalladas para la última actualización.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 20, title: "Estudios de caso de usuarios", category: "Publicaciones", description: "Estudios de caso de nuestros usuarios.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 21, title: "Seguridad de la API", category: "Tutoriales", description: "Aprende sobre las mejores prácticas de seguridad de la API.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 22, title: "Destacados de funciones", category: "Videos", description: "Destacados de las últimas funciones.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
    { id: 23, title: "Blog de la empresa", category: "Blogs", description: "Actualizaciones y noticias de nuestra empresa.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780559/uploads/302/tkyvdicnwbc5ftuyysc0.png" },
    { id: 24, title: "Discusiones de usuarios", category: "Publicaciones", description: "Únete a la discusión con otros usuarios.", imageUrl: "https://res.cloudinary.com/subframe/image/upload/v1723780835/uploads/302/kr9usrdgbwp9cge3ab1f.png" },
  ];

  const filteredContent = content.filter(
    (item) =>
      (selectedCategory === "Todo" || item.category === selectedCategory) &&
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-8 bg-white p-4">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-wrap items-center justify-center gap-6">
            <SearchField className="h-10 w-auto flex-none" showClear={false}>
              <SearchField.Input
                placeholder="Buscar"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchField>
            <div className="flex grow shrink-0 basis-0 flex-wrap items-center justify-end gap-1">
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-tertiary"
                    iconRight="FeatherChevronDown"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Filtrar
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherPlus">
                        Añadir filtro
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-tertiary"
                    iconRight="FeatherChevronDown"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Ordenar
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherPlus">
                        Añadir orden
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <SubframeCore.DropdownMenu.Root>
                <SubframeCore.DropdownMenu.Trigger asChild={true}>
                  <Button
                    variant="neutral-tertiary"
                    iconRight="FeatherChevronDown"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                  >
                    Agrupar por
                  </Button>
                </SubframeCore.DropdownMenu.Trigger>
                <SubframeCore.DropdownMenu.Portal>
                  <SubframeCore.DropdownMenu.Content
                    side="bottom"
                    align="start"
                    sideOffset={4}
                    asChild={true}
                  >
                    <DropdownMenu>
                      <DropdownMenu.DropdownItem icon="FeatherCircleDot">
                        Estado
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherUser">
                        Propietario
                      </DropdownMenu.DropdownItem>
                      <DropdownMenu.DropdownItem icon="FeatherDollarSign">
                        Cantidad
                      </DropdownMenu.DropdownItem>
                    </DropdownMenu>
                  </SubframeCore.DropdownMenu.Content>
                </SubframeCore.DropdownMenu.Portal>
              </SubframeCore.DropdownMenu.Root>
              <Button
                variant="neutral-tertiary"
                icon="FeatherSettings2"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Personalizar
              </Button>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center gap-2">
          <Button
            variant={selectedCategory === "Todo" ? "brand-secondary" : "neutral-secondary"}
            onClick={() => setSelectedCategory("Todo")}
          >
            Todo
          </Button>
          <Button
            variant={selectedCategory === "Tutoriales" ? "brand-secondary" : "neutral-secondary"}
            icon="FeatherInfo"
            onClick={() => setSelectedCategory("Tutoriales")}
          >
            Tutoriales
          </Button>
          <Button
            variant={selectedCategory === "Videos" ? "brand-secondary" : "neutral-secondary"}
            icon="FeatherFilm"
            onClick={() => setSelectedCategory("Videos")}
          >
            Videos
          </Button>
          <Button
            variant={selectedCategory === "Publicaciones" ? "brand-secondary" : "neutral-secondary"}
            icon="FeatherFile"
            onClick={() => setSelectedCategory("Publicaciones")}
          >
            Publicaciones
          </Button>
          <Button
            variant={selectedCategory === "Blogs" ? "brand-secondary" : "neutral-secondary"}
            icon="FeatherMessageCircle"
            onClick={() => setSelectedCategory("Blogs")}
          >
            Blogs
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredContent.map((item) => (
            <Card key={item.id}>
              <div className="flex w-full items-start gap-4 p-6">
                <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md">
                 
                  <div className="flex w-full flex-col items-start gap-2">
                    <div className="flex w-full items-center justify-between">
                      <CardTitle>{item.title}</CardTitle>
                      <IconButton
                        size="small"
                        icon="FeatherBookmark"
                        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                      />
                    </div>
                    <span className="line-clamp-2 text-body font-body text-subtext-color">
                      {item.description}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Learning;
