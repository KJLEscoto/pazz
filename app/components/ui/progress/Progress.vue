<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { computed } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ProgressIndicator, ProgressRoot } from "reka-ui"
import { cn } from "@/lib/utils"

type Props = ProgressRootProps & {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
})

const delegatedProps = reactiveOmit(props, "class")

const progressColor = computed(() => {
  const value = props.modelValue ?? 0

  if (value <= 15) return "bg-red-500"
  if (value <= 40) return "bg-orange-500"
  if (value <= 75) return "bg-yellow-500"
  return "bg-green-500"
})
</script>

<template>
  <ProgressRoot data-slot="progress" v-bind="delegatedProps" :class="cn(
    'bg-accent-foreground relative h-2 w-full overflow-hidden rounded-full',
    props.class,
  )
    ">
    <ProgressIndicator data-slot="progress-indicator" class="h-full w-full flex-1 transition-all duration-500" :class="progressColor"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>