import { existsSync } from 'fs'
import { join } from 'path'

export function resolveImage(value) {
  const src = value?.trim()
  if (!src) return null
  if (/^https?:\/\//i.test(src)) return { src, remote: true }

  const webPath  = '/' + src.replace(/^\/?(public\/)?/, '')
  const diskPath = join(process.cwd(), 'public', webPath)
  return existsSync(diskPath) ? { src: webPath, remote: false } : null
}
