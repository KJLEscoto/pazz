<script setup lang="ts">
import { Progress } from "@/components/ui/progress"

const props = defineProps<{
  entropyProgress: number
  currentEntropy: string
}>()

const entropyColor = computed(() => {
  const value = props.entropyProgress ?? 0

  if (value <= 15) return "red"
  if (value <= 40) return "orange"
  if (value <= 75) return "yellow"
  return "green"
})
</script>

<template>
  <div class="space-y-3">
    <Progress :model-value="entropyProgress" />
    <h2 class="text-sm font-bold" :class="entropyColor">
      {{ currentEntropy }}
    </h2>
  </div>
</template>