<script setup lang="ts">
import type { CheckboxRootEmits, CheckboxRootProps } from "reka-ui"
import type { HTMLAttributes } from "vue"
import { reactiveOmit } from "@vueuse/core"
import { Check } from "lucide-vue-next"
import { CheckboxIndicator, CheckboxRoot, useForwardPropsEmits } from "reka-ui"
import { cn } from "@/lib/utils"

const props = defineProps<
  CheckboxRootProps & {
    class?: HTMLAttributes["class"]
    label?: string
  }
>()

const emits = defineEmits<CheckboxRootEmits>()

const delegatedProps = reactiveOmit(props, "class", "label")
const forwarded = useForwardPropsEmits(delegatedProps, emits)
</script>

<template>
  <label
    class="group flex items-center justify-between rounded-xl bg-[#0a0a0a] px-5 py-5 text-muted-foreground transition-all duration-200 hover:cursor-pointer">
    <span class="text-xs font-normal md:text-sm">
      {{ label }}
    </span>

    <CheckboxRoot v-slot="slotProps" data-slot="checkbox" v-bind="forwarded" :class="cn(
      'peer size-5 shrink-0 rounded-[6px] border border-white/10 bg-white/15 outline-none transition-all duration-200',
      'data-[state=checked]:border-white! data-[state=checked]:bg-white! data-[state=checked]:text-black',
      'focus-visible:ring-2 focus-visible:ring-white/40!',
      'disabled:cursor-not-allowed disabled:opacity-50',
      props.class,
    )
      ">
      <CheckboxIndicator data-slot="checkbox-indicator" class="grid h-full w-full place-content-center">
        <slot v-bind="slotProps">
          <Check class="size-4 text-black" />
        </slot>
      </CheckboxIndicator>
    </CheckboxRoot>
  </label>
</template>