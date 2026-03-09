<script setup lang="ts">
import type { ProgressRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { ProgressIndicator, ProgressRoot } from "reka-ui"
import { cn } from "@/lib/utils"

type Props = ProgressRootProps & {
  class?: HTMLAttributes["class"]
  color?: "bg-white" | "bg-green-500" | "bg-red-500"
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: 0,
  color: "bg-white",
})

const delegatedProps = reactiveOmit(props, "class", "color")
</script>

<template>
  <ProgressRoot data-slot="progress" v-bind="delegatedProps" :class="cn(
    'bg-accent-foreground relative h-2 w-full overflow-hidden rounded-full',
    props.class,
  )
    ">
    <ProgressIndicator data-slot="progress-indicator" class="h-full w-full flex-1 transition-all" :class="props.color"
      :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`" />
  </ProgressRoot>
</template>