# Supabase Migrations

Este directorio almacena las migraciones SQL versionadas del proyecto.

## Convención de nombres

```
YYYYMMDDHHMMSS_descripcion.sql
```

Ejemplo: `20261010120000_add_rls_to_user_profiles.sql`

## Estado actual

El esquema inicial fue creado directamente en el dashboard de Supabase.
Las tablas existentes están documentadas en `src/types/database.ts` (auto-generado).

### Tablas existentes

- `user_profiles` — Perfiles de usuario con `user_role` y `system_role`
- `company_profiles` — Perfiles de empresa
- `freelancer_profiles` — Perfiles de freelancer
- `user_profile_types` — Tipos de perfil por usuario
- `jobs` — Listados de trabajo
- `job_applications` — Solicitudes de empleo
- `products` — Productos del marketplace
- `ads` — Anuncios
- `orders` — Pedidos
- `conversations` + `conversation_participants` — Mensajería
- `messages` — Mensajes individuales
- `reviews` — Reseñas
- `notifications` — Notificaciones
- `service_requests` + `service_proposals` — Solicitudes de servicio
- `service_categories` — Categorías de servicios
- `profile_services` — Servicios por perfil
- `skills_catalog` — Catálogo de habilidades
- `vacation_periods` — Periodos de vacaciones
- `work_experiences` — Experiencia laboral

### Funciones PostgreSQL existentes

- `is_admin()` → boolean
- `has_profile_type(p_type)` → boolean
- `get_my_conversations()` → tabla
- `get_or_create_conversation(other_user_id)` → string
- `get_my_unread_count()` → number
- `add_to_quotation_room(p_freelancer_id, p_request_id)` → string

## Pendiente verificar en Supabase dashboard

- [ ] RLS habilitado en todas las tablas con datos sensibles
- [ ] Política que impida a usuarios modificar su propio `system_role`
- [ ] Política que impida a usuarios leer perfiles privados de otros usuarios
- [ ] Permisos de funciones `SECURITY DEFINER`
- [ ] Buckets de Storage y sus políticas

## Cómo aplicar una migración

```bash
# Aplicar en desarrollo local (Supabase CLI)
supabase db push

# O ejecutar directamente en el dashboard de Supabase → SQL Editor
```
