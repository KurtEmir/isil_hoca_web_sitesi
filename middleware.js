import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import { supabaseUrl, supabaseAnonKey, isSupabaseConfigured } from '@/lib/supabase/config'

export async function middleware(request) {
  if (!isSupabaseConfigured) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() { return request.cookies.getAll() },
      setAll(list) {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  const { data: { user } } = await supabase.auth.getUser()
  const isLoginPage = request.nextUrl.pathname === '/admin/login'

  if (!user && !isLoginPage) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  if (user && isLoginPage) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return response
}

export const config = { matcher: ['/admin/:path*'] }
