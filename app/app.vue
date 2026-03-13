<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from '@/components/ui/sonner'
</script>

<template>
  <div>
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

    <div class="fixed bottom-0 left-1/2 z-50 -translate-x-1/2 translate-y-2/3">
      <div class="group relative pb-8">
        <!-- hover bridge -->
        <div class="absolute inset-x-0 bottom-0 h-20"></div>

        <a href="https://kinwebb.netlify.app/" target="_blank" rel="noopener noreferrer" class="relative flex h-10 w-fit max-w-10 items-center overflow-hidden rounded-full border border-white/10 bg-neutral-950/90
             transition-[max-width,transform,delay] duration-700 ease-out delay-100
             group-hover:max-w-[220px] group-hover:-translate-y-6">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center pr-0.5">
            <img src="/images/kinwebb_icon.png" alt="kinwebb"
              class="size-6 opacity-80 transition-all duration-300 group-hover:opacity-100" />
          </div>

          <div class="flex min-w-max items-center gap-1 whitespace-nowrap pr-3
               opacity-0 translate-x-2 transition-all duration-300 ease-in
               group-hover:opacity-100 group-hover:translate-x-0">
            <span class="text-xs text-white/50">Powered by</span>
            <span class="text-xs text-white">KinWebb</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
