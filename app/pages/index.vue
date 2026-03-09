<template>
  <main class="h-full min-h-screen flex items-center justify-center w-full px-4 py-10">
    <div class="space-y-10 w-full">

      <!-- app name -->
      <section class="flex flex-col items-center gap-2">
        <Skeleton class="w-25 h-25 rounded-full bg-white/10" />
        <h1 class="font-primary text-5xl font-bold">Pazz</h1>
        <p class="text-xl text-muted-foreground">
          Random Password Generator
        </p>
      </section>

      <!-- main panel -->
      <section class="bg-[#151516] border border-white/5 p-8 rounded-[3rem] max-w-2xl mx-auto w-full space-y-6">

        <!-- password panel -->
        <div class="bg-[#0a0a0a] border border-white/10 p-8 rounded-4xl w-full space-y-6">

          <!-- status -->
          <section class="flex items-center justify-between w-full gap-4">
            <Badge variant="default" class="text-xs font-bold">MILITARY GRADE</Badge>
            <div class="flex items-center gap-2 text-muted-foreground">
              <Skeleton class="size-2 rounded-full bg-[#00d200]" />
              Encrypted
            </div>
          </section>

          <!-- generated password -->
          <section class="p-6 bg-[#0d0d0d] rounded-lg w-full text-center">
            <p class="wrap-break-word select-text text-2xl">password here</p>
          </section>

          <!-- buttons -->
          <section class="flex items-center justify-center w-full gap-3">
            <button @click="copyClipboard" type="button"
              class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer">
              <ClipboardCopy class="size-6 pointer-events-none" />
            </button>
            <button @click="generatePassword" type="button"
              class="bg-[#00d200] p-4 border border-white/10 rounded-xl cursor-pointer min-w-[30%]">
              <RefreshCcw class="size-6 pointer-events-none text-black mx-auto" />
            </button>
            <button @click="togglePassword" type="button"
              class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer">
              <EyeOff class="size-6 pointer-events-none" />
            </button>
          </section>
        </div>

        <!-- entropy -->
        <div class="space-y-3">
          <Progress :model-value="57" />
          <h2 class="text-sm text-muted-foreground">Entropy: <span class="text-white font-bold">SECURE</span></h2>
        </div>

        <div class="space-y-3">
          <section class="flex items-end gap-4 justify-between w-full">
            <h2 class="text-sm text-muted-foreground">No. of Characters</h2>
            <h1 class="text-2xl font-bold">33</h1>
          </section>
          <Slider :default-value="[33]" :max="100" :step="1" />
        </div>

        <!-- options -->
        <div class="space-y-2">
          <h2 class="text-sm text-muted-foreground">Options</h2>
          <div class="grid grid-cols-2 gap-3">
            <Checkbox v-model:checked="uppercase" label="Uppercase Letters (A-Z)" />
            <Checkbox v-model:checked="lowercase" label="Lowercase Letters (a-z)" />
            <Checkbox v-model:checked="numbers" label="Numbers (0-9)" />
            <Checkbox v-model:checked="symbols" label="Symbols (!@#$%^&*()-+)" />
          </div>
        </div>

        <!-- buttons -->
        <div class="flex items-center justify-center w-full gap-3">
          <button @click="generatePassword" type="button"
            class="bg-[#00d200] p-4 border border-white/10 text-black rounded-xl cursor-pointer w-full flex items-center justify-center gap-2">
            <RefreshCcw class="size-6 pointer-events-none" />
            <p>Regenerate New Keys</p>
          </button>
          <button @click="copyClipboard" type="button"
            class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer w-full flex items-center justify-center gap-2">
            <ClipboardCopy class="size-6 pointer-events-none" />
            <p>Copy Password</p>
          </button>
        </div>

        <div class="w-full flex items-center justify-center">
          <button @click="resetDefault" type="button" class="text-muted-foreground w-fit cursor-pointer">
            <p>Reset to default</p>
          </button>
        </div>
      </section>


    </div>
  </main>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import { Slider } from '@/components/ui/slider'
import { ClipboardCopy, EyeOff, RefreshCcw } from 'lucide-vue-next';


const uppercase = ref(true)
const lowercase = ref(true)
const numbers = ref(false)
const symbols = ref(true)

function copyClipboard() {
  console.log('copying to clipboard')
}

function generatePassword() {
  console.log('generating password')
}

function togglePassword() {
  console.log('toggling password visibility')
}

function resetDefault() {
  uppercase.value = true
  lowercase.value = true
  numbers.value = true
  symbols.value = true
}
</script>