import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SectionHeader from "./section-header";
import Image from "next/image";
import { BookOpen, Bus, ClipboardList, DollarSign, GraduationCap, MessageSquare, Users } from "lucide-react";

const features = [
  {
    title: "Управление пользователями",
    description:
      "Полный контроль над учетными записями, ролями и правами доступа. Включает регистрацию, аутентификацию и управление профилями.",
    icon: Users,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Аналитическая панель",
    description:
      "Визуализация ключевых показателей эффективности, статистики и отчетов в реальном времени с настраиваемыми виджетами.",
    icon: GraduationCap,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Управление документами",
    description:
      "Централизованное хранение, версионирование и совместная работа над документами с продвинутым поиском и категоризацией.",
    icon: MessageSquare,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Коммуникационный центр",
    description:
      "Встроенная система обмена сообщениями, уведомлений и групповых чатов для эффективного взаимодействия команды.",
    icon: DollarSign,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Управление задачами",
    description:
      "Планирование, отслеживание и распределение задач с поддержкой дедлайнов, приоритетов и статусов выполнения.",
    icon: ClipboardList,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Финансовый модуль",
    description:
      "Учет доходов и расходов, формирование бюджетов, генерация финансовых отчетов и интеграция с платежными системами.",
    icon: Bus,
    image: "/images/placeholder.jpg",
  },
  {
    title: "Система отчетности",
    description:
      "Создание настраиваемых отчетов, экспорт данных в различных форматах и автоматическая рассылка по расписанию.",
    icon: BookOpen,
    image: "/images/placeholder.jpg",
  },
];

export default function GridFeatures() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container max-w-6xl mx-auto px-4 md:px-6">
        <SectionHeader
          title="Features"
          heading="Основные возможности"
          description="Комплексное решение для управления вашим бизнесом с интуитивно понятным интерфейсом и мощным функционалом"
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 mt-12">
          <div className="space-y-4">
            <Card className="relative overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">{features[0].title}</CardTitle>
                <p className="text-muted-foreground">{features[0].description}</p>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted rounded-lg p-2">
                  <div className="absolute left-0 top-0 bottom-0 w-16 bg-background/95 border-r flex flex-col gap-2 p-2">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full aspect-square rounded bg-muted-foreground/10 flex items-center justify-center"
                      />
                    ))}
                  </div>

                  <Image
                    src={features[0].image}
                    alt={features[0].title}
                    width={600}
                    height={400}
                    className="rounded ml-16"
                  />

                  {/* <div className="p-2">
                    <div className="h-24 rounded bg-muted" />
                  </div> */}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[1].title}</CardTitle>
                <p className="text-muted-foreground">{features[1].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[1].image}
                  alt={features[1].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[2].title}</CardTitle>
                <p className="text-muted-foreground">{features[2].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[2].image}
                  alt={features[2].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[3].title}</CardTitle>
                <p className="text-muted-foreground">{features[3].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[3].image}
                  alt={features[3].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[4].title}</CardTitle>
                <p className="text-muted-foreground">{features[4].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[4].image}
                  alt={features[4].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[5].title}</CardTitle>
                <p className="text-muted-foreground">{features[5].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[5].image}
                  alt={features[5].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{features[6].title}</CardTitle>
                <p className="text-muted-foreground">{features[6].description}</p>
              </CardHeader>
              <CardContent className="">
                <Image
                  src={features[6].image}
                  alt={features[6].title}
                  width={600}
                  height={400}
                  className="rounded w-full"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
