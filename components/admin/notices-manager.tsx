'use client'

import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trash2 } from 'lucide-react'

type Notice = {
  id: string
  message: string
  color: string
  active: boolean
  createdAt: string
}

type NoticesManagerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NoticesManager({ open, onOpenChange }: NoticesManagerProps) {
  const [notices, setNotices] = useState<Notice[]>([])
  const [message, setMessage] = useState('')
  const [color, setColor] = useState('#000000')
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const fetchNotices = async () => {
    try {
      const res = await fetch('/api/notices')
      const data = await res.json()
      if (data?.success && Array.isArray(data.notices)) {
        setNotices(data.notices)
      }
    } catch (e) {
      console.error('Failed to fetch notices', e)
    }
  }

  useEffect(() => {
    if (open) {
      fetchNotices()
    }
  }, [open])

  const handleCreate = async () => {
    if (!message.trim()) return
    setLoading(true)
    try {
      const res = await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: message.trim(), color }),
      })
      const data = await res.json()
      if (data?.success) {
        toast({ title: 'Notice created', description: 'Notice has been published.' })
        setMessage('')
        setColor('#000000')
        fetchNotices()
      } else {
        toast({ title: 'Failed', description: data.error || 'Could not create notice.', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Could not create notice.', variant: 'destructive' })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/notices/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data?.success) {
        setNotices((prev) => prev.filter((n) => n.id !== id))
        toast({ title: 'Deleted', description: 'Notice removed.' })
      } else {
        toast({ title: 'Failed', description: data.error || 'Could not delete notice.', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Could not delete notice.', variant: 'destructive' })
    }
  }

  const handleToggleActive = async (id: string, active: boolean) => {
    try {
      const res = await fetch(`/api/notices/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !active }),
      })
      const data = await res.json()
      if (data?.success) {
        setNotices((prev) => prev.map((n) => n.id === id ? { ...n, active: !active } : n))
      } else {
        toast({ title: 'Failed', description: data.error || 'Could not update notice.', variant: 'destructive' })
      }
    } catch (e) {
      toast({ title: 'Error', description: 'Could not update notice.', variant: 'destructive' })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-none w-[95vw] md:w-[700px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif font-bold text-foreground">Notices</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 p-4">
          <div className="space-y-4 border-b border-border pb-6">
            <div className="space-y-2">
              <Label htmlFor="notice-message" className="text-sm font-semibold">Notice Message</Label>
              <Input
                id="notice-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter notice text..."
                className="border-2 border-slate-200 focus:border-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notice-color" className="text-sm font-semibold">Text Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="notice-color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-14 cursor-pointer rounded-md border border-slate-200"
                />
                <span className="text-sm text-foreground/70 font-mono">{color}</span>
              </div>
            </div>
            <Button onClick={handleCreate} disabled={loading || !message.trim()} className="w-full bg-secondary text-foreground hover:bg-secondary/90">
              {loading ? 'Saving...' : 'Publish Notice'}
            </Button>
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">Existing Notices</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto">
              <AnimatePresence>
                {notices.length === 0 && (
                  <p className="text-sm text-foreground/60">No notices yet.</p>
                )}
                {notices.map((notice) => (
                  <motion.div
                    key={notice.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-lg border border-border bg-slate-50 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-sm" style={{ color: notice.color || '#000000' }}>{notice.message}</p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleToggleActive(notice.id, notice.active)}
                          className={`text-xs ${notice.active ? 'bg-red-50 text-red-700 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}
                        >
                          {notice.active ? 'Hide' : 'Show'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(notice.id)}
                          className="h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-xs text-foreground/50">
                      {notice.active ? 'Visible' : 'Hidden'} • {new Date(notice.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
