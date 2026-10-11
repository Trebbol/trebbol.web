'use server'

import { redirect } from '@/i18n/navigation'
import { getLocale } from 'next-intl/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'

// ---------------------------------------------------------------------------
// Inline Zod schemas (no auth schema exists in @/server/schemas yet)
// ---------------------------------------------------------------------------

const signInSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

const signUpSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
  name: z.string().min(1, 'El nombre es requerido').max(200),
})

// ---------------------------------------------------------------------------
// signInAction
// ---------------------------------------------------------------------------

/**
 * Server action — inicia sesión con email y contraseña.
 *
 * Valida los campos con Zod antes de llamar a Supabase.
 * En caso de éxito redirige a /dashboard (redirect() lanza internamente).
 * En caso de error retorna `{ error: string }`.
 *
 * @param formData - FormData con los campos `email` y `password`.
 * @returns `{ error: string }` si la autenticación falla. No retorna en éxito
 *          porque redirect() interrumpe la ejecución.
 *
 * @example
 * // En un Client Component con useTransition:
 * const [error, setError] = useState<string | undefined>()
 * const [isPending, startTransition] = useTransition()
 *
 * function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
 *   e.preventDefault()
 *   const formData = new FormData(e.currentTarget)
 *   startTransition(async () => {
 *     const result = await signInAction(formData)
 *     if (result?.error) setError(result.error)
 *   })
 * }
 */
export async function signInAction(
  formData: FormData
): Promise<{ error?: string }> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const parsed = signInSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { error: firstIssue?.message ?? 'Datos inválidos' }
  }

  const { email, password } = parsed.data

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    // Mensaje genérico — no exponer detalles internos de Supabase
    // (evita email enumeration: "Email not confirmed", "User not found", etc.)
    return { error: 'Correo o contraseña incorrectos' }
  }

  // redirect() throws a NEXT_REDIRECT error internally — this is expected.
  // Next.js catches it and issues the actual HTTP redirect response.
  const locale = await getLocale()
  redirect({ href: '/dashboard', locale })
  return {}
}

// ---------------------------------------------------------------------------
// signUpAction
// ---------------------------------------------------------------------------

/**
 * Server action — registra un nuevo usuario con email, contraseña y nombre.
 *
 * Valida los campos con Zod antes de llamar a Supabase.
 * En caso de éxito retorna `{ success: true }` — el usuario debe confirmar
 * su email antes de poder iniciar sesión.
 * En caso de error retorna `{ error: string }`.
 *
 * @param formData - FormData con los campos `email`, `password` y `name`.
 * @returns `{ success: true }` en éxito, `{ error: string }` en fallo.
 *
 * @example
 * const result = await signUpAction(formData)
 * if (result.error) showError(result.error)
 * if (result.success) showConfirmEmailMessage()
 */
export async function signUpAction(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  }

  const parsed = signUpSchema.safeParse(raw)
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]
    return { error: firstIssue?.message ?? 'Datos inválidos' }
  }

  const { email, password, name } = parsed.data

  const supabase = await createClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    },
  })

  if (error) {
    // Mensaje genérico para no filtrar si el email ya está registrado
    return { error: 'No pudimos crear tu cuenta. Intenta con otro correo.' }
  }

  return { success: true }
}

// ---------------------------------------------------------------------------
// signOutAction
// ---------------------------------------------------------------------------

/**
 * Server action — cierra la sesión del usuario y redirige a /.
 *
 * No retorna un valor: redirect() interrumpe la ejecución internamente.
 *
 * @example
 * // En un botón de formulario (Server Action directo):
 * <form action={signOutAction}>
 *   <button type="submit">Cerrar sesión</button>
 * </form>
 *
 * @example
 * // En un Client Component:
 * startTransition(() => { void signOutAction() })
 */
// ---------------------------------------------------------------------------
// forgotPasswordAction
// ---------------------------------------------------------------------------

/**
 * Server action — envía un correo de restablecimiento de contraseña.
 * Retorna `{ success: true }` siempre que no haya error técnico,
 * sin revelar si el email está registrado (evita email enumeration).
 */
export async function forgotPasswordAction(
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email')?.toString() ?? ''
  const parsed = z.string().email().safeParse(email)
  if (!parsed.success) {
    return { error: 'Correo electrónico inválido' }
  }

  const supabase = await createClient()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, {
    redirectTo: `${siteUrl}/reset-password`,
  })

  if (error) {
    return { error: 'No pudimos enviar el correo. Intenta de nuevo.' }
  }

  return { success: true }
}

// ---------------------------------------------------------------------------
// signOutAction
// ---------------------------------------------------------------------------

export async function signOutAction(): Promise<void> {
  const supabase = await createClient()
  await supabase.auth.signOut()

  // redirect() throws a NEXT_REDIRECT error internally — this is expected.
  const locale = await getLocale()
  redirect({ href: '/', locale })
}
