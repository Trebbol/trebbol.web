'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from './nav-items'

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-gray-200 bg-white">
      <div className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-bold tracking-tight">Trebbol</h1>
        <p className="text-xs text-gray-600">Admin Dashboard</p>
      </div>

      <nav className="p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? 'bg-brand-50 text-brand-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-gray-200 px-4 py-3">
        <p className="text-xs text-gray-600">trebbol-web v0.1.0</p>
      </div>
    </aside>
  )
}
