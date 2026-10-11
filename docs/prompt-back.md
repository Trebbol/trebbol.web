# PROMPT MAESTRO — Backend Architecture & Security de Trebbol Web

## 1. Rol y objetivo

Actúa como un Senior Backend Engineer especializado en Next.js App Router, React Server Components, TypeScript, PostgreSQL, Supabase Auth, Row Level Security (RLS), seguridad de aplicaciones web y arquitectura de sistemas.

Trabaja directamente sobre el repositorio existente de **Trebbol Web**.

Tu objetivo es auditar, organizar, asegurar y mejorar el backend existente para que sea mantenible, seguro y escalable, sin introducir complejidad arquitectónica innecesaria.

No quiero únicamente recomendaciones o fragmentos de código. Debes inspeccionar el repositorio, proponer un plan, implementar los cambios necesarios y ejecutar las pruebas disponibles.

## 2. Contexto del proyecto

La arquitectura documentada de Trebbol Web incluye:

- Next.js 16.4.0 con App Router.
- React 19.3.0.
- TypeScript 5.x con `strict: true`.
- Supabase como Backend as a Service.
- PostgreSQL como base de datos.
- Supabase Auth con SSR y sesiones basadas en cookies.
- `@supabase/supabase-js`.
- `@supabase/ssr`.
- Clientes Supabase para navegador, servidor y operaciones administrativas.
- Vercel para despliegue.
- GitHub Actions para CI.
- pnpm como gestor de paquetes.

La documentación identifica 23 tablas principales relacionadas con perfiles, empresas, freelancers, trabajos, productos, anuncios, pedidos, solicitudes, conversaciones, mensajes, reseñas, notificaciones y otros recursos.

**No des por hecho que la documentación coincide completamente con el código actual. Inspecciona el repositorio y verifica las versiones, tablas, relaciones, políticas y dependencias reales.**

## 3. Decisión arquitectónica principal

Mantén la arquitectura actual:

**Next.js + Supabase + PostgreSQL.**

No migres a NestJS, Express, Fastify ni otro backend independiente sin una necesidad técnica demostrable.

No añadas microservicios, Redis, Redux, colas ni otras tecnologías por anticipación.

Utiliza las funcionalidades existentes de Supabase y Next.js siempre que resuelvan correctamente los requisitos.

La arquitectura debe separar claramente:

1. Interfaz y componentes.
2. Capa de aplicación y operaciones de servidor.
3. Capa de acceso a datos (DAL).
4. Autenticación y autorización.
5. Persistencia y restricciones de PostgreSQL.

## 4. Primera etapa: auditoría del backend actual

Antes de modificar código, inspecciona:

- `package.json`.
- Lockfile y gestor de paquetes.
- `src/lib/supabase/client.ts`.
- `src/lib/supabase/server.ts`.
- `src/lib/supabase/admin.ts`.
- `src/middleware.ts` o la convención equivalente que utilice la versión instalada de Next.js.
- `src/types/database.ts`.
- Migraciones SQL.
- Tablas, relaciones, índices, vistas, funciones y triggers.
- Políticas RLS y permisos SQL.
- Server Actions existentes.
- Route Handlers existentes.
- Consultas realizadas desde componentes cliente y servidor.
- Variables de entorno y configuración de CI.
- Pruebas existentes.

Busca especialmente:

- Accesos a datos sin autorización suficiente.
- Consultas que dependan únicamente de la protección visual de una página.
- Uso incorrecto de la clave `service_role`.
- Políticas RLS ausentes o excesivamente permisivas.
- Permisos que permitan consultar o modificar recursos de otros usuarios.
- Posibilidad de que un usuario modifique su propio rol.
- Validaciones que existan solo en el cliente.
- Duplicación de lógica de negocio.
- Consultas ineficientes y ausencia de paginación.
- Secretos expuestos o importaciones administrativas desde componentes cliente.

### Informe inicial

Clasifica cada hallazgo como:

- Vulnerabilidad confirmada.
- Defecto funcional confirmado.
- Riesgo pendiente de verificar.
- Mejora recomendada.
- Control correctamente implementado.

No afirmes que existe una vulnerabilidad sin evidencia del código o de las políticas reales.

## 5. Modelo de autorización

Antes de modificar permisos, determina los roles y las relaciones reales del sistema.

La documentación menciona los enums:

- `user_role`.
- `system_role`.
- `profile_type`.

Inspecciona sus definiciones y usos antes de diseñar nuevas reglas.

Construye una matriz de permisos para los recursos existentes, incluyendo cuando corresponda:

- Perfiles de usuarios.
- Perfiles de freelancers.
- Perfiles de empresas.
- Trabajos.
- Solicitudes de empleo.
- Productos.
- Anuncios.
- Pedidos.
- Conversaciones.
- Mensajes.
- Reseñas.
- Notificaciones.
- Solicitudes de servicio.
- Favoritos.

Para cada recurso determina:

- Quién puede consultar sus datos.
- Quién puede crearlo.
- Quién puede modificarlo.
- Quién puede eliminarlo.
- Quién puede cambiar su estado.
- Qué reglas de propiedad se aplican.
- Qué permisos corresponden a los administradores.
- Qué operaciones requieren privilegios especiales.

No inventes roles ni permisos definitivos sin contrastarlos con el modelo de negocio existente.

Si una decisión funcional imprescindible no puede deducirse del repositorio, documenta la duda y presenta una propuesta conservadora antes de introducir cambios que puedan bloquear funcionalidades legítimas.

## 6. Supabase RLS y seguridad de PostgreSQL

RLS es una de las prioridades principales.

### Inspección

Identifica todas las tablas, vistas y funciones accesibles desde la aplicación.

Comprueba:

- Si RLS está habilitado.
- Qué políticas existen.
- Qué operaciones permite cada política.
- A qué roles SQL se aplican.
- Cómo se comprueba la identidad del usuario.
- Cómo se valida la propiedad de cada recurso.
- Si las relaciones permiten acceder indirectamente a datos privados.
- Si existen funciones `SECURITY DEFINER`.
- Si las funciones tienen privilegios `EXECUTE` adecuados.
- Si se utilizan restricciones y claves foráneas correctamente.

### Implementación

Cuando sea necesario:

- Añade o corrige políticas RLS mediante migraciones SQL versionadas.
- Restringe `SELECT`, `INSERT`, `UPDATE` y `DELETE` según los permisos reales.
- Evita que un usuario pueda suplantar otro `user_id`.
- Impide cambios de roles no autorizados.
- Utiliza restricciones de PostgreSQL para proteger la integridad de los datos.
- Revisa permisos de tablas, secuencias y funciones.
- Protege archivos y buckets de Supabase Storage si se utilizan.
- Evita políticas demasiado amplias basadas únicamente en que exista una sesión autenticada.

No habilites RLS de forma indiscriminada sin crear y probar las políticas necesarias.

No elimines políticas existentes sin analizar qué funcionalidades dependen de ellas.

No ejecutes migraciones destructivas ni cambios irreversibles sobre datos de producción.

## 7. Protección de los clientes Supabase

Conserva la separación de responsabilidades entre los clientes existentes.

### Cliente de navegador

`src/lib/supabase/client.ts`

- Debe utilizar únicamente credenciales públicas diseñadas para el cliente.
- Las consultas deben estar protegidas por las políticas RLS.
- No debe permitir operaciones administrativas privilegiadas.

### Cliente de servidor

`src/lib/supabase/server.ts`

- Debe utilizar el mecanismo SSR y las cookies correctamente.
- Debe gestionar la sesión de forma segura.
- Debe validar la identidad y los permisos necesarios para cada operación.
- Debe mantener el comportamiento correcto durante renovación, expiración y revocación de sesiones.

### Cliente administrativo

`src/lib/supabase/admin.ts`

- Debe ejecutarse exclusivamente en el servidor.
- **Obligatorio:** protege el módulo con `import 'server-only'` como primera línea del archivo. Esto es compatible con Next.js 16 y garantiza un error de build si se importa desde un componente cliente.
- Utiliza secretos privados que nunca se expongan al navegador.
- No permitas que componentes cliente importen directa o indirectamente el cliente administrativo.
- Revisa cada importación y cada operación privilegiada.
- Exige autorización del servidor antes de realizar operaciones administrativas.

La clave administrativa de Supabase puede omitir RLS. Por ello, nunca debe utilizarse como sustituto de la autorización de la aplicación.

No cambies los nombres de variables de entorno sin comprobar primero todos sus usos.

## 8. Capa de acceso a datos (DAL)

Organiza las operaciones de datos mediante módulos con responsabilidades claras.

Utiliza esta estructura como referencia y adáptala a la organización existente:

```text
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   └── auth/
│       ├── permissions.ts
│       └── require-user.ts
├── server/
│   ├── dal/
│   │   ├── users.ts
│   │   ├── jobs.ts
│   │   ├── products.ts
│   │   ├── orders.ts
│   │   └── conversations.ts
│   ├── actions/
│   │   ├── jobs.ts
│   │   ├── products.ts
│   │   └── orders.ts
│   └── schemas/
│       ├── jobs.ts
│       └── products.ts
└── types/
    └── database.ts
```

### Reglas de la DAL

- Centraliza las operaciones de acceso a datos.
- Comprueba identidad y autorización cuando corresponda.
- No confíes en los identificadores o roles enviados por el cliente.
- Deriva la identidad del usuario de una sesión verificada.
- Aplica restricciones de propiedad a las operaciones que lo requieran.
- Evita duplicar consultas y reglas de negocio.
- Utiliza los tipos reales generados a partir de Supabase.
- Mantén las operaciones privilegiadas separadas de las consultas normales.
- Evita abstraer cada consulta trivial si eso aumenta innecesariamente la complejidad.

La DAL debe ser una frontera de aplicación útil, no una capa de archivos sin responsabilidad real.

## 9. Server Actions y Route Handlers

Utiliza Server Actions para operaciones iniciadas desde la interfaz cuando sean apropiadas.

Utiliza Route Handlers cuando exista una necesidad concreta de HTTP, como integraciones externas, webhooks o APIs consumidas por otros clientes.

Toda operación sensible debe:

1. Validar la entrada recibida.
2. Obtener la identidad desde una sesión verificada.
3. Comprobar los permisos necesarios.
4. Comprobar la propiedad del recurso cuando corresponda.
5. Ejecutar la operación.
6. Devolver una respuesta segura.
7. Gestionar errores sin filtrar secretos o detalles internos.

No asumas que una Server Action está protegida porque solo se utiliza desde un formulario interno.

No confíes exclusivamente en el middleware o Proxy para proteger datos y operaciones.

Si una acción requiere el cliente administrativo, comprueba todos los permisos necesarios antes de utilizarlo.

### Rate limiting

Las Server Actions y Route Handlers expuestos públicamente deben tener protección contra abuso. Evalúa mecanismos simples como limitación por IP o por sesión antes de introducir infraestructura adicional. Supabase ya incluye rate limiting a nivel de API; verifica su configuración y complementa en la capa de aplicación solo cuando sea necesario.

## 10. Validación de entradas con Zod

Utiliza **Zod** como biblioteca de validación de datos. Es el estándar para Next.js + Server Actions y no existe una alternativa instalada en el proyecto.

Aplícalo en:

- Server Actions.
- Route Handlers.
- Parámetros de búsqueda.
- Cambios de estado.
- Creación y actualización de recursos.

Reglas:

- Valida en el servidor, aunque también exista validación en el cliente.
- Rechaza valores inesperados y campos que el usuario no puede modificar.
- Evita asignar directamente al registro completo objetos recibidos del cliente.
- Define esquemas específicos para cada operación.
- Conserva `strict: true`.
- Evita `any` salvo justificación técnica.
- No dupliques tipos si pueden derivarse de los esquemas o de la base de datos.
- Conserva la generación de tipos de Supabase y actualízalos cuando corresponda.

## 11. Integridad de datos y rendimiento

Revisa las consultas de los recursos principales y busca:

- Consultas repetidas.
- Cargas innecesarias de columnas.
- Falta de paginación.
- Ausencia de índices para filtros frecuentes.
- Consultas costosas en listados administrativos.
- Relaciones que deban protegerse mediante claves foráneas.
- Operaciones que requieran transacciones.
- Actualizaciones que puedan provocar estados inconsistentes.

No añadas índices o cachés indiscriminadamente. Justifica las optimizaciones con las consultas reales y los requisitos del producto.

Ten especial cuidado con los datos privados de usuarios, mensajes y pedidos.

Evita utilizar caché compartida para información personalizada si puede provocar que un usuario reciba datos de otro.

## 12. Pruebas de seguridad

Amplía las pruebas existentes cuando sea posible.

Incluye pruebas positivas y negativas para:

- Usuarios autenticados y no autenticados.
- Acceso a recursos propios y ajenos.
- Usuarios con roles diferentes.
- Cambios de rol no autorizados.
- Actualizaciones de recursos sin permisos.
- Server Actions invocadas directamente.
- Consultas directas a Supabase sujetas a RLS.
- Sesiones expiradas o revocadas.
- Operaciones administrativas.
- Datos inválidos o incompletos.
- Integridad de relaciones y estados.

Utiliza un entorno de prueba aislado con datos ficticios.

No ejecutes pruebas destructivas sobre producción.

No dependas únicamente de mocks que simulen las políticas de seguridad. Verifica las políticas reales con pruebas de integración cuando el entorno lo permita.

## 13. Entornos y despliegue

Mantén Vercel y Supabase como plataformas principales.

Verifica que existan entornos apropiados para desarrollo, pruebas y producción.

- No compartas credenciales de producción con pruebas locales.
- No utilices datos reales innecesariamente en desarrollo.
- Mantén las variables privadas fuera del cliente.
- Revisa los permisos de GitHub Actions.
- Versiona las migraciones SQL.
- Define un procedimiento seguro para aplicarlas.
- Evita que una migración experimental se ejecute accidentalmente contra producción.
- Ejecuta tipado, lint, pruebas y build según los scripts reales del proyecto.

No afirmes que una comprobación ha pasado si no se ha ejecutado.

## 14. Forma de trabajo

### Fase A — Auditoría

Inspecciona el repositorio y documenta los hallazgos reales antes de modificar el backend.

### Fase B — Modelo de permisos

Construye una matriz de roles, recursos, operaciones y reglas de propiedad basada en el esquema real.

### Fase C — Plan de implementación

Identifica los archivos y migraciones necesarios. Prioriza las vulnerabilidades confirmadas.

### Fase D — Implementación incremental

Implementa primero los controles críticos, después la DAL, las validaciones y las pruebas.

No hagas una reescritura completa del backend.

### Fase E — Validación

Ejecuta las comprobaciones disponibles y corrige los errores causados por los cambios.

### Fase F — Informe final

Entrega:

- Hallazgos confirmados.
- Riesgos pendientes.
- Archivos creados y modificados.
- Migraciones SQL añadidas.
- Políticas RLS revisadas.
- Modelo de permisos implementado.
- Pruebas ejecutadas y resultados reales.
- Dependencias añadidas o modificadas.
- Limitaciones y decisiones pendientes.
- Recomendaciones para producción.

## 15. Restricciones obligatorias

- No migres a otro backend sin justificación.
- No desactives RLS para facilitar consultas.
- No expongas claves administrativas.
- No confíes únicamente en el middleware.
- No inventes tablas, roles o políticas.
- No modifiques el esquema sin analizar el impacto.
- No realices migraciones destructivas sin autorización.
- No elimines funcionalidades existentes.
- No añadas dependencias redundantes.
- No afirmes que el sistema es seguro sin pruebas suficientes.
- No modifiques datos de producción durante la auditoría.
- Conserva las funcionalidades del frontend y el dashboard.

## Resultado esperado

Un backend de Trebbol Web organizado alrededor de Next.js y Supabase, con:

- Autorización verificable.
- RLS correctamente configurado.
- Uso seguro de los clientes Supabase (`server-only` obligatorio en admin).
- DAL y lógica de negocio organizadas.
- Validación de entradas con Zod.
- Rate limiting en endpoints públicos.
- Integridad de datos.
- Pruebas de seguridad.
- Migraciones versionadas.
- CI/CD coherente.
- Documentación técnica útil.

**Comienza auditando el código real. Implementa los cambios de forma incremental, prioriza los riesgos de seguridad confirmados y verifica cada modificación antes de darla por terminada.**
