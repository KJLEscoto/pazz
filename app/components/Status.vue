
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'

const props = defineProps < {
  entropyProgress: number
  currentTag: string
} > ()

const badgeColor = computed(() => {
  const value = props.entropyProgress ?? 0

  if (value <= 15) return "red bg-red-500/5"
  if (value <= 40) return "orange bg-orange-500/5"
  if (value <= 75) return "yellow bg-yellow-500/5"
  return "green bg-green-500/5"
})
</script>

<template>
    <Badge variant="default" class="text-xs font-bold rounded-sm" :class="badgeColor">{{ currentTag }}</Badge>
</template>