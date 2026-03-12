<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Toaster position="top-center" :close-button="true" close-button-position="top-right" :duration="3000"
      :swipe-directions="['right', 'left', 'top']" rich-colors theme="light" 
      :toast-options="{
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
  </div>
</template>
