# Backend - TP DSW 2025

##  Descripción
Este proyecto corresponde al **backend** del Trabajo Práctico de la asignatura **Desarrollo de Software (DSW) 2025**.  
Es una API REST moderna, desarrollada con **TypeScript** y **mikro-orm** para administrar los datos, orientada a la gestión y predicción de resultados de **Fórmula 1**, donde los usuarios pueden realizar predicciones, visualizar rankings y participar de una comunidad competitiva.

---

##  Tecnologías utilizadas
- **TypeScript** – Tipado estático para mayor robustez y mantenibilidad.
- **pnpm** - Gestor de paquetes rápido y eficiente.
- **mikro-orm** - Entity Framework para facilitar la creación y el uso de la base de datos.


---

##  Scripts disponibles
| Comando | Descripción |
|----------|--------------|
| `pnpm run start:dev` | Inicia el servidor de desarrollo. |
| `pnpm run build` | Compila y genera los archivos para producción. |


---
## Requisitos Previos
Es necesario previamente tener instalado:
1. El Gestor de Paquetes (para este ejemplo utilizaremos pnpm, version 10.15.0)
2. Node.js v20.19.4
3. El motor de base de datos (MySql).
La base de datos se generará automáticamente, pero es necesario un usuario con credenciales válidas.
Estas credenciales se pueden incluir en el 'ClienteURL' del archivo `src\shared\db\orm.ts`
---
##  Instalación y ejecución

1. Clonar el repositorio:
   
   `git clone https://github.com/bernardbruno/back-tp-dsw.git`

3. Entrar al directorio del proyecto:
   
    `cd nombre-repo`

4. Instalar dependencias:
   
    `pnpm install`

5. Ejecutar en modo desarrollo:
   
    `pnpm run start:dev`
