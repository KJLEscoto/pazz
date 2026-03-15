<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { BrushCleaning, History, X } from 'lucide-vue-next'

const isOpen = ref(false)
</script>

<template>
  <AlertDialog :open="isOpen" @update:open="isOpen = $event">
    <AlertDialogTrigger @click="isOpen = true">
      <button type="button" class="bg-accent-foreground p-2 border border-white/10 rounded-sm cursor-pointer">
        <History class="size-4 pointer-events-none" />
      </button>
    </AlertDialogTrigger>
    <AlertDialogContent @interact-outside="isOpen = false" @escape-key-down="isOpen = false">
      <AlertDialogHeader>
        <AlertDialogTitle class="w-full flex items-end justify-between gap-4 sticky top-0 bg-[#18181b] border-b border-white/5 pt-6 pb-4">
          <section>
            Recently Copied
          </section>
          <section class="flex items-center gap-2">
            <button type="button" class="bg-accent-foreground py-2 px-4 border border-white/10 rounded-sm cursor-pointer flex items-center gap-1">
              <BrushCleaning class="size-4 pointer-events-none" />
              <p class="text-sm font-normal">Clear All</p>
            </button>
            <button type="button" @click="isOpen = false"
              class="bg-red-700 p-2 border border-white/10 rounded-sm cursor-pointer">
              <X class="size-4 pointer-events-none" />
            </button>
          </section>
        </AlertDialogTitle>
        <AlertDialogDescription class="mt-2 pb-6">
          Seems like there is nothing in here. Try copying a password!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <!-- <AlertDialogFooter>
        <AlertDialogCancel @click="isOpen = false">Cancel</AlertDialogCancel>
        <AlertDialogAction @click="isOpen = false">Continue</AlertDialogAction>
      </AlertDialogFooter> -->
    </AlertDialogContent>
  </AlertDialog>
</template>