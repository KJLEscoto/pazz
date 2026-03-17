<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { BrushCleaning, ClipboardCopy, History, X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const isOpen = ref(false)
const { history, clearHistory } = usePasswordHistory()
const isPending = ref(false)

const { play } = useSound()

function formatDate(iso: string) {
  const date = new Date(iso)

  const time = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)

  const day = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

  return `${time} • ${day}`
}

async function copyEntry(pw: string) {
  try {
    await navigator.clipboard.writeText(pw)
    play('/audio/success.mp3', 0.5)
    toast.success('Copied to clipboard!', { description: pw })
  } catch {
    play('/audio/error.mp3', 0.5)
    toast.warning('Failed to copy password!')
  }
}

async function confirmClearHistory() {
  clearHistory()
  toast('History cleared!')
  isPending.value = true
  await new Promise(resolve => setTimeout(resolve, 600))
  isPending.value = false
}

watch(isOpen, async (val) => {
  if (!val) return
  isPending.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  isPending.value = false
})
</script>

<template>
  <AlertDialog :open="isOpen" @update:open="isOpen = $event">
    <AlertDialogTrigger @click="isOpen = true">
      <button type="button" class="btn-hover bg-accent-foreground p-2 border border-white/10 rounded-sm cursor-pointer">
        <History class="size-4 pointer-events-none" />
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent @interact-outside="isOpen = false" @escape-key-down="isOpen = false">
      <AlertDialogHeader>
        <AlertDialogTitle
          class="w-full flex items-end justify-between gap-4 sticky top-0 bg-[#18181b] border-b border-white/5 pt-6 pb-4">
          <section>
            Recently Copied
            <span v-if="isPending" class="text-sm text-muted-foreground">
              (0/0)
            </span>
            <span v-else class="text-sm text-muted-foreground">({{ history.length }}/20)</span>
          </section>
          <section class="flex items-center gap-2">
            <button v-if="!isPending && history.length > 0" @click="confirmClearHistory" type="button"
              class="btn-hover bg-red-700 py-2 px-4 border border-white/10 rounded-sm cursor-pointer flex items-center gap-1">
              <BrushCleaning class="size-4 pointer-events-none" />
              <p class="text-sm font-normal">Clear All</p>
            </button>
            <button type="button" @click="isOpen = false"
              class="btn-hover bg-accent-foreground p-2.5 border border-white/10 rounded-sm cursor-pointer">
              <X class="size-4 pointer-events-none" />
            </button>
          </section>
        </AlertDialogTitle>

        <AlertDialogDescription class="mt-2 pb-6">

          <!-- skeleton -->
          <ul v-if="isPending" class="space-y-2">
            <li v-for="n in 2" :key="n"
              class="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-lg px-4 py-3 animate-pulse">
              <div class="flex flex-col gap-2 min-w-0 flex-1">
                <div class="h-4 w-3/4 bg-white/10 rounded" />
                <div class="h-3 w-1/3 bg-white/5 rounded" />
              </div>
              <div class="shrink-0 bg-white/10 p-2 rounded-sm size-8" />
            </li>
          </ul>

          <!-- empty -->
          <div v-else-if="history.length === 0"
            class="flex flex-col items-center justify-center py-10 gap-2 text-muted-foreground">
            <ClipboardCopy class="size-8 opacity-40" />
            <p class="text-sm">No history yet. Try copying a password.</p>
          </div>

          <!-- list -->
          <ul v-else class="space-y-2">
            <li v-for="(entry, index) in history" :key="index"
              class="flex items-center justify-between gap-10 bg-white/5 border border-white/10 rounded-lg px-4 py-3">
              <div class="flex flex-col gap-1 min-w-0">
                <p class="text-sm font-mono truncate text-white">{{ entry.password }}</p>
                <p class="text-xs text-muted-foreground">{{ formatDate(entry.copiedAt) }}</p>
              </div>
              <button @click="copyEntry(entry.password)" type="button"
                class="btn-hover shrink-0 bg-accent-foreground p-3 border border-white/10 rounded-sm cursor-pointer">
                <ClipboardCopy class="size-4 pointer-events-none" />
              </button>
            </li>
          </ul>

        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>