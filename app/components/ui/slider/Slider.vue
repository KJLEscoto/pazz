<script setup lang="ts">
import { computed } from "vue"
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SliderRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

const MARKERS = [
  { value: 4, color: 'bg-red-500' },
  { value: 7.7, color: 'bg-orange-500' },
  { value: 15.4, color: 'bg-yellow-500' },
  { value: 32.5, color: 'bg-green-500' },
]

const markerPositions = computed(() => {
  const min = (props.min as number) ?? 0
  const max = (props.max as number) ?? 100
  return MARKERS.map(marker => ({
    ...marker,
    left: `${((marker.value - min) / (max - min)) * 100}%`,
  }))
})

let audioCtx: AudioContext | null = null
let unlocked = false

function getAudioCtx() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()
  }
  return audioCtx
}

// iOS requires a silent buffer played inside a real touchstart to unlock audio
function unlockAudio() {
  if (unlocked) return
  const ctx = getAudioCtx()
  if (!ctx) return

  const buffer = ctx.createBuffer(1, 1, 22050)
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(ctx.destination)
  source.start(0)

  ctx.resume().then(() => {
    unlocked = true
  })
}

function playTick() {
  const ctx = getAudioCtx()
  if (!ctx) return

  // resume in case it got suspended (common on iOS after inactivity)
  if (ctx.state === 'suspended') {
    ctx.resume()
  }

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(500, ctx.currentTime)
  gain.gain.setValueAtTime(0.1, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + 0.03)
}
</script>

<template>
  <SliderRoot v-slot="{ modelValue }" data-slot="slider" :class="cn(
    'relative cursor-pointer flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    props.class,
  )" v-bind="forwarded" @touchstart.passive="unlockAudio" @update:model-value="playTick">
    <SliderTrack data-slot="slider-track"
      class="bg-accent-foreground relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3">
      <SliderRange data-slot="slider-range"
        class="bg-white absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
    </SliderTrack>

    <div v-for="marker in markerPositions" :key="marker.value" class="absolute rounded-full h-1.5 w-1.5 ml-2"
      :class="marker.color" :style="{ left: marker.left }" />

    <SliderThumb data-slot="slider-thumb"
      class="bg-white border-primary ring-ring/50 block size-5 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-5 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>