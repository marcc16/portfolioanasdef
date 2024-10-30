'use client';

import me from "@/assets/me.png";
import { H1 } from "@/components/ui/H1";
import { Bot, Brain, Workflow, Building2, Download } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { downloadJson } from "@/utils/downloadJson";

export default function Home() {
  return (
    <main className="space-y-16 bg-[url('/background.png')] bg-cover bg-center bg-no-repeat px-4 py-8">
      {/* Hero Section */}
      <section className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <H1 className="text-center sm:text-start">Marc Bau</H1>
          <p className="text-center text-xl font-semibold text-muted-foreground sm:text-start">
            Ingeniero especializado en Inteligencia Artificial y Automatización
          </p>
          <p className="text-center text-lg text-muted-foreground sm:text-start">
            Portfolio para Anas
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Make.com</Badge>
            <Badge variant="secondary">N8N</Badge>
            <Badge variant="secondary">OpenAI</Badge>
            <Badge variant="secondary">Hugging Face</Badge>
            <Badge variant="secondary">LangChain</Badge>
            <Badge variant="secondary">MongoDB</Badge>
            <Badge variant="secondary">Pinecone</Badge>
            <Badge variant="secondary">RAG</Badge>
            <Badge variant="secondary">Python</Badge>
            <Badge variant="secondary">Next.js</Badge>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src={me}
            alt="Marc Bau"
            height={300}
            width={300}
            className="aspect-square rounded-full border-2 object-cover shadow-md dark:border-foreground"
          />
        </div>
      </section>

      {/* Projects Section */}
      <Tabs defaultValue="ai" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ai">
            <Brain className="mr-2 h-4 w-4" />
            IA Generativa
          </TabsTrigger>
          <TabsTrigger value="healthcare">
            <Building2 className="mr-2 h-4 w-4" />
            Sector Salud
          </TabsTrigger>
          <TabsTrigger value="automation">
            <Workflow className="mr-2 h-4 w-4" />
            Automatización
          </TabsTrigger>
        </TabsList>

        {/* IA Generativa Tab */}
        <TabsContent value="ai" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Desarrollo de Sistemas RAG</CardTitle>
              <CardDescription>
                Implementación de sistemas de recuperación y generación aumentada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Tecnologías principales:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>LangChain</Badge>
                  <Badge>MongoDB Atlas</Badge>
                  <Badge>Pinecone</Badge>
                  <Badge>Next.js</Badge>
                  <Badge>OpenAI</Badge>
                </div>
              </div>
              <p>
                Especializado en el desarrollo de sistemas RAG (Retrieval Augmented Generation) 
                que combinan bases de datos vectoriales con modelos de lenguaje para 
                proporcionar respuestas precisas y contextualizadas.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Healthcare Tab */}
        <TabsContent value="healthcare" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sistema de Citas Automáticas - Hospital Quirón</CardTitle>
              <CardDescription>
                Proyecto desarrollado en NTT DATA
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold">Tecnologías utilizadas:</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Python</Badge>
                  <Badge>OpenAI</Badge>
                  <Badge>OutSystems</Badge>
                  <Badge>Low-Code</Badge>
                </div>
              </div>
              <p>
                Desarrollo de un sistema inteligente para la gestión automatizada de citas 
                médicas, integrando IA para optimizar la asignación de horarios y recursos 
                hospitalarios.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="mt-4">
          <div className="grid gap-6">
            {/* Proyecto de Dietas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Generador Automático de Dietas</span>
                  <Button variant="outline" size="sm" onClick={() => downloadJson('dieta')}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar JSON
                  </Button>
                </CardTitle>
                <CardDescription>
                  Para SocialVide - David (Héctor Trainer)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer overflow-hidden rounded-lg border">
                      <Image
                        src="/make-dieta.PNG"
                        alt="Flujo de automatización de dietas"
                        width={800}
                        height={400}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Flujo de Automatización de Dietas</DialogTitle>
                      <DialogDescription>
                        Sistema completo de generación y envío de dietas personalizadas
                      </DialogDescription>
                    </DialogHeader>
                    <Image
                      src="/make-dieta.PNG"
                      alt="Flujo de automatización de dietas"
                      width={1200}
                      height={800}
                      className="rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <div className="space-y-2">
                  <h3 className="font-semibold">Características:</h3>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Generación automática de planes nutricionales personalizados</li>
                    <li>Sistema de envío automatizado de PDFs por correo</li>
                    <li>Integración con CRM y sistemas de gestión de clientes</li>
                    <li>Seguimiento y análisis de resultados</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Proyecto de Llamadas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Sistema de Evaluación de Llamadas</span>
                  <Button variant="outline" size="sm" onClick={() => downloadJson('llamadas')}>
                    <Download className="mr-2 h-4 w-4" />
                    Descargar JSON
                  </Button>
                </CardTitle>
                <CardDescription>
                  Para Dani Penas - Mentor de Ventas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="cursor-pointer overflow-hidden rounded-lg border">
                      <Image
                        src="/make-llamadas.PNG"
                        alt="Flujo de evaluación de llamadas"
                        width={800}
                        height={400}
                        className="transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Sistema de Evaluación de Llamadas</DialogTitle>
                      <DialogDescription>
                        Automatización completa del proceso de evaluación de llamadas de ventas
                      </DialogDescription>
                    </DialogHeader>
                    <Image
                      src="/make-llamadas.PNG"
                      alt="Flujo de evaluación de llamadas"
                      width={1200}
                      height={800}
                      className="rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
                <div className="space-y-2">
                  <h3 className="font-semibold">Características:</h3>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Análisis automático de grabaciones de llamadas</li>
                    <li>Evaluación de métricas clave de ventas</li>
                    <li>Generación de informes detallados de rendimiento</li>
                    <li>Sistema de retroalimentación automatizado</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Chat Section */}
      <section className="space-y-3 text-center">
        <p className="text-muted-foreground">
          ¿Quieres saber más? Haz click en el icono <Bot className="inline pb-1" /> 
          de la barra superior para chatear conmigo.
        </p>
      </section>
    </main>
  );
}