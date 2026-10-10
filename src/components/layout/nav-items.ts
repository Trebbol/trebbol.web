import {
  LayoutDashboard,
  Users,
  Briefcase,
  ShoppingBag,
  Megaphone,
  ShoppingCart,
  MessageSquare,
  Star,
} from 'lucide-react'

export const navItems = [
  {
    title: 'Overview',
    href: '/dashboard/overview',
    icon: LayoutDashboard,
  },
  {
    title: 'Usuarios',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    title: 'Empleos',
    href: '/dashboard/jobs',
    icon: Briefcase,
  },
  {
    title: 'Productos',
    href: '/dashboard/products',
    icon: ShoppingBag,
  },
  {
    title: 'Anuncios',
    href: '/dashboard/ads',
    icon: Megaphone,
  },
  {
    title: 'Pedidos',
    href: '/dashboard/orders',
    icon: ShoppingCart,
  },
  {
    title: 'Conversaciones',
    href: '/dashboard/conversations',
    icon: MessageSquare,
  },
  {
    title: 'Reseñas',
    href: '/dashboard/reviews',
    icon: Star,
  },
]
