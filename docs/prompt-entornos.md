# Prompt — Configurar GitHub, ramas y entornos de Trebbol Web

## Contexto del proyecto

Estoy desarrollando Trebbol Web, una aplicación construida con:

- Next.js 16 con App Router.
- React 19 y TypeScript.
- pnpm como gestor de paquetes.
- Supabase como backend y base de datos PostgreSQL.
- GitHub como repositorio del proyecto.
- Vercel para despliegues.
- Dominio de producción: `https://www.trebbol.com/`.

Necesito organizar correctamente el flujo de trabajo entre desarrollo local, GitHub, staging y producción.

## Objetivo

Analiza la configuración actual del repositorio y prepara un flujo de trabajo Git profesional, seguro y sencillo de mantener para un desarrollador individual.

La estructura deseada es:

- `main`: rama de producción, conectada a `www.trebbol.com`.
- `staging`: rama para integrar y probar cambios antes de producción.
- `feature/*`: ramas para funcionalidades específicas, creadas desde `staging`.
- `fix/*`: ramas para correcciones puntuales, creadas desde `staging`.

## 1. Auditar antes de modificar

Antes de realizar cualquier cambio:

1. Inspecciona el estado actual de Git, las ramas locales y remotas, los últimos commits y los cambios pendientes.
2. Revisa la configuración del repositorio de GitHub y los archivos de configuración de Vercel disponibles en el proyecto.
3. Comprueba si existe una rama `main`, `staging` o ramas de trabajo.
4. Identifica cómo se ejecutan actualmente las validaciones de CI, las instalaciones de dependencias y los despliegues.
5. Revisa `package.json`, `pnpm-lock.yaml`, `.github/workflows/` y `vercel.json`, si existen.
6. Identifica si el repositorio está conectado al proyecto de Vercel que sirve la web de producción.

Presenta un diagnóstico y un plan de acciones antes de modificar la configuración.

## 2. Configurar el flujo de ramas

Implementa o documenta esta estrategia:

- `main`: únicamente código aprobado para producción.
- `staging`: código integrado pendiente de validación final.
- `feature/nombre`: funcionalidades independientes, creadas desde `staging`.
- `fix/nombre`: correcciones específicas, creadas desde `staging`.

Flujo de trabajo:

1. Crear rama `feature/*` o `fix/*` desde `staging`.
2. Desarrollo local con pruebas y validaciones.
3. Push al remoto.
4. Merge directo a `staging` (sin PR obligatorio — es un solo desarrollador).
5. Validación en el entorno de staging (Vercel Preview).
6. Pull Request de `staging` hacia `main` (con CI obligatorio).
7. Merge y despliegue automático a producción.

Si las ramas ya existen, verifica su estado antes de crear o cambiar cualquiera de ellas.

No sobrescribas ramas, no elimines commits y no utilices `git reset --hard`, `git push --force` ni comandos destructivos.

Incluye los comandos Git necesarios para crear ramas, cambiar entre ellas, actualizarse desde el remoto, confirmar cambios, subirlos y resolver conflictos de forma segura.

## 3. Configurar GitHub Actions

Revisa el workflow de CI existente y reutilízalo cuando sea posible.

Debe ejecutar, según los scripts disponibles en `package.json`:

- Instalación reproducible de dependencias con pnpm.
- Typecheck.
- Lint.
- Tests.
- Build de producción.

Evita duplicar workflows o modificar scripts sin una justificación técnica.

Verifica la compatibilidad entre la versión de pnpm declarada en el proyecto (10.20.0) y la utilizada en GitHub Actions (actualmente v9). Corrígelo si es necesario.

Configura las validaciones para que los Pull Requests a `main` no puedan mergearse si las comprobaciones requeridas fallan.

## 4. Configurar Vercel

El objetivo es mantener el proyecto de Vercel existente y utilizar sus despliegues de Preview para probar cambios antes de producción.

Verifica la configuración actual antes de proponer modificaciones.

Comportamiento deseado:

- `main`: despliegue de producción.
- Cualquier otra rama: despliegues Preview automáticos de Vercel (sin necesidad de subdominio dedicado para staging).

No modifiques el dominio de producción ni la rama de producción sin autorización explícita.

Evita configurar un segundo mecanismo de despliegue mediante GitHub Actions si Vercel ya realiza los despliegues automáticamente mediante su integración con GitHub.

## 5. Separar staging y producción en Supabase

Comprueba cómo se configuran actualmente las variables de entorno y los proyectos de Supabase.

La configuración deseada es:

- Producción: proyecto Supabase de producción y sus credenciales.
- Staging/desarrollo: proyecto Supabase independiente y credenciales de pruebas.

No asumas que staging debe compartir la base de datos de producción. Recomienda proyectos separados para evitar que las pruebas alteren datos reales.

### Variables de entorno

Aclara la convención de archivos de entorno:

- `.env.local`: fuente de verdad para desarrollo local (no se sube a Git).
- `.env`: valores por defecto no sensibles (puede subirse a Git si no contiene secretos).
- `.env.test`: credenciales del proyecto Supabase de pruebas.

Verifica las variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`, únicamente donde sea necesaria y siempre del lado servidor.

No muestres secretos en logs, código, commits ni informes. No copies credenciales de producción a staging y no modifiques datos reales.

## 6. Seguridad y protección de ramas

Reglas de protección:

**`main` (protegida):**
- Prohibir pushes directos.
- Exigir Pull Request.
- Exigir que pasen las comprobaciones de CI antes de merge.

**`staging` (sin protección estricta):**
- Permitir merges directos desde `feature/*` y `fix/*` para agilizar el desarrollo individual.
- CI se ejecuta en push para validar, pero no bloquea el merge.

No afirmes que una regla está activa sin verificarlo en GitHub.

## 7. Entregables

Al finalizar, entrega:

1. Diagnóstico de la configuración actual.
2. Diagrama del flujo de ramas y despliegues.
3. Lista de cambios realizados y archivos modificados.
4. Comandos Git para el trabajo diario.
5. Configuración requerida en GitHub, Vercel y Supabase.
6. Lista de tareas que debo ejecutar manualmente en los paneles externos.
7. Pruebas realizadas y resultados.
8. Riesgos pendientes y recomendaciones.

## Restricciones obligatorias

- No reemplaces el proyecto ni reorganices su arquitectura general.
- No elimines ramas, commits ni archivos existentes.
- No hagas despliegues de producción durante la configuración inicial.
- No modifiques el dominio público `www.trebbol.com`.
- No alteres la base de datos de producción.
- No realices migraciones destructivas.
- No inventes credenciales, identificadores de proyectos ni registros DNS.
- No afirmes que un entorno está configurado hasta comprobarlo.
- Si una acción requiere acceso a GitHub, Vercel, DNS o Supabase y no puedes ejecutarla desde el entorno disponible, proporciona instrucciones precisas para realizarla manualmente.

**Primero audita y presenta el plan. Después implementa únicamente los cambios locales y de repositorio que sean seguros, reversibles y estén autorizados. Detente y solicita confirmación antes de cualquier acción que pueda afectar producción, credenciales, permisos o datos reales.**
