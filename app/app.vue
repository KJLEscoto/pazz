<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'

const booting = ref(true)

let timer: ReturnType<typeof setTimeout> | null = null

onMounted(() => {
  timer = setTimeout(() => {
    booting.value = false
  }, 1400)

  watch(
    booting,
    (value) => {
      document.body.style.overflow = value ? 'hidden' : ''
      document.documentElement.style.overflow = value ? 'hidden' : ''
    },
    { immediate: true }
  )
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)

  if (import.meta.client) {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
  }
})
</script>

<template>
  <div>
    <div :class="{ 'animate-pulse pointer-events-none select-none': booting }">
      <NuxtRouteAnnouncer />
      <NuxtPage />
      <Toaster position="top-center" :close-button="true" close-button-position="top-right" :duration="3000"
        :swipe-directions="['right', 'left', 'top']" rich-colors theme="light" :toast-options="{
          style: {
            background: '#18181b',
            color: '#fafafa',
            border: '1px solid #27272a'
          },
          classes: {
            description: '!text-zinc-300',
            actionButton: '!bg-violet-600 !text-white',
            cancelButton: '!bg-zinc-800 !text-zinc-100'
          }
        }" />

      <KinwebbAttribute />
    </div>

    <div v-if="booting"
      class="fixed inset-0 z-[9999] grid place-items-center bg-black/85 backdrop-blur-md h-screen overflow-hidden">
      <Loader />
    </div>
  </div>
</template>