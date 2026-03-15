<script setup lang="ts">
import type { SliderRootEmits, SliderRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { SliderRange, SliderRoot, SliderThumb, SliderTrack, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<SliderRootProps & { class?: HTMLAttributes["class"] }>()
const emits = defineEmits<SliderRootEmits>()

const delegatedProps = reactiveOmit(props, "class")
const forwarded = useForwardPropsEmits(delegatedProps, emits)

// Entropy thresholds matching your App.vue logic:
// LOW: 0-7, MODERATE: 8-15, SECURE: 16-33, EXTREME: 34+
const MARKERS = [
  { value: 4, color: 'bg-red-500' }, // MIN (vulnerable)
  { value: 7.7, color: 'bg-orange-500' }, // moderate starts
  { value: 15.4, color: 'bg-yellow-500' }, // secure starts
  { value: 32.5, color: 'bg-green-500' }, // extreme starts
]

const markerPositions = computed(() => {
  const min = (props.min as number) ?? 0
  const max = (props.max as number) ?? 100

  return MARKERS.map(marker => ({
    ...marker,
    left: `${((marker.value - min) / (max - min)) * 100}%`,
  }))
})
</script>

<template>
  <SliderRoot v-slot="{ modelValue }" data-slot="slider" :class="cn(
    'relative cursor-pointer flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
    props.class,
  )" v-bind="forwarded">
    <SliderTrack data-slot="slider-track"
      class="bg-accent-foreground relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-3 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-3">
      <SliderRange data-slot="slider-range"
        class="bg-white absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
    </SliderTrack>

    <!-- dynamic markers -->
    <div v-for="marker in markerPositions" :key="marker.value" class="absolute h-3 w-1 ml-2" :class="marker.color"
      :style="{ left: marker.left }" />

    <SliderThumb v-for="(_, key) in modelValue" :key="key" data-slot="slider-thumb"
      class="bg-white border-primary ring-ring/50 block size-5 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-5 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50" />
  </SliderRoot>
</template>