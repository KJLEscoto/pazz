<template>
  <main class="h-full min-h-screen flex items-center justify-center w-full px-4 py-10">
    <div class="space-y-8 w-full">

      <!-- app name -->
      <section class="flex flex-col items-center gap-2">
        <h1 class="font-primary text-5xl font-bold">Pazz</h1>
        <p class="text-xl text-muted-foreground">
          Random Password Generator
        </p>
      </section>

      <!-- main panel -->
      <section class="bg-[#151516] border border-white/5 p-8 rounded-[3rem] max-w-2xl mx-auto w-full space-y-6">

        <!-- password panel -->
        <div class="bg-[#0a0a0a] border border-white/10 p-8 rounded-4xl w-full space-y-6">

          <!-- status and history -->
          <section class="flex items-center justify-between w-full gap-4">
            <Status :entropy-progress="entropyProgress" :current-tag="currentTag" />
            <History />
          </section>

          <!-- generated password -->
          <section class="p-6 bg-[#0d0d0d] rounded-lg w-full text-center">
            <p :class="[
              'wrap-break-word select-text text-2xl transition-all duration-300',
              !isPasswordVisible && password !== DEFAULT_PASSWORD ? 'blur-xs select-none!' : 'blur-0'
            ]">
              {{ password }}
            </p>
          </section>

          <!-- main buttons -->
          <section class="flex items-center justify-center w-full gap-3">
            <button @click="togglePassword" type="button"
              class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer">
              <EyeOff v-if="isPasswordVisible" class="size-6 pointer-events-none" />
              <Eye v-else class="size-6 pointer-events-none" />
            </button>
            <button @click="generatePassword" type="button"
              class="main-bg-color p-4 border border-white/10 rounded-xl cursor-pointer min-w-[30%]">
              <RefreshCcw class="size-6 pointer-events-none text-black mx-auto" />
            </button>
            <button @click="copyClipboard" type="button"
              class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer">
              <ClipboardCopy class="size-6 pointer-events-none" />
            </button>
          </section>
        </div>

        <!-- entropy -->
        <Entropy :entropy-progress="entropyProgress" :current-entropy="currentEntropy" />

        <!-- slider -->
        <div class="space-y-3">
          <section class="flex items-end gap-4 justify-between w-full">
            <h2 class="text-sm text-muted-foreground">No. of Characters</h2>
            <h1 class="text-2xl font-bold">{{ passwordLength[0] }}</h1>
          </section>
          <Slider v-model="passwordLength" :max="MAX_PASSWORD_LENGTH" :step="1" :min="MIN_PASSWORD_LENGTH" />
        </div>

        <!-- options -->
        <div class="space-y-2">
          <h2 class="text-sm text-muted-foreground">Options</h2>
          <div class="grid md:grid-cols-2 grid-cols-1 gap-3">
            <Checkbox v-model="uppercase" label="Uppercase Letters (A-Z)" />
            <Checkbox v-model="lowercase" label="Lowercase Letters (a-z)" />
            <Checkbox v-model="numbers" label="Numbers (0-9)" />
            <Checkbox v-model="symbols" label="Symbols (!@#$%^&*()-+)" />
          </div>
        </div>

        <!-- secondary buttons -->
        <div class="flex md:flex-row flex-col items-center justify-center w-full gap-3">
          <button @click="generatePassword" type="button"
            class="main-bg-color p-4 border border-white/10 text-black rounded-xl cursor-pointer w-full flex items-center justify-center gap-2">
            <RefreshCcw class="size-6 pointer-events-none" />
            <p>Regenerate New Keys</p>
          </button>
          <button @click="copyClipboard" type="button"
            class="bg-accent-foreground p-4 border border-white/10 rounded-xl cursor-pointer w-full flex items-center justify-center gap-2">
            <ClipboardCopy class="size-6 pointer-events-none" />
            <p>Copy Password</p>
          </button>
        </div>

        <!-- reset -->
        <div class="w-full flex items-center justify-center">
          <button @click="resetDefault" type="button" class="w-fit cursor-pointer">
            <p class="text-muted-foreground hover:text-white transition duration-150 ease-in">Reset to Default</p>
          </button>
        </div>
      </section>

    </div>
  </main>
</template>

<script setup lang="ts">
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { ClipboardCopy, Eye, EyeOff, RefreshCcw } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

const MIN_PASSWORD_LENGTH = 4
const MAX_PASSWORD_LENGTH = 64
const DEFAULT_PASSWORD = '-'
const ENTROPY = ['LOW', 'MODERATE', 'SECURE', 'EXTREME'] // low = 0-7, moderate = 8-15, secure = 16-33, extreme = 34+
const TAG = ['VULNERABLE', 'STANDARD', 'FORTIFIED', 'MILITARY GRADE'] // low = 0-7, standard = 8-15, fortified = 16-33, military grade = 34+

const isPasswordVisible = ref(true)
const uppercase = ref(true)
const lowercase = ref(true)
const numbers = ref(true)
const symbols = ref(true)
const passwordLength = ref([MIN_PASSWORD_LENGTH])
const password = ref(DEFAULT_PASSWORD)

const entropyIndex = computed(() => {
  const length = password.value === DEFAULT_PASSWORD ? 0 : (passwordLength.value[0] ?? MIN_PASSWORD_LENGTH)

  if (length <= 7) return 0
  if (length <= 15) return 1
  if (length <= 33) return 2
  return 3
})

const currentEntropy = computed<string>(() => ENTROPY[entropyIndex.value] ?? 'LOW')
const currentTag = computed<string>(() => TAG[entropyIndex.value] ?? 'VULNERABLE')

const entropyProgress = computed<number>(() => {
  const index = entropyIndex.value
  return [15, 40, 75, 100][index] ?? 0
})

async function copyClipboard() {
  if (!password.value || password.value === DEFAULT_PASSWORD) return

  try {
    await navigator.clipboard.writeText(password.value)
    toast('Copied to clipboard!', {
      description: password.value,
    })
    // console.log("Password copied to clipboard")
  } catch (error) {
    toast.warning('Failed to copy password!', {
      description: 'Please try copying manually.',
    })
    // console.error("Failed to copy password:", error)
  }
}

function generatePassword() {
  const length = passwordLength.value[0] ?? MIN_PASSWORD_LENGTH

  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lower = "abcdefghijklmnopqrstuvwxyz"
  const nums = "0123456789"
  const syms = "!@#$%^&*()-+"

  let charset = ""

  if (uppercase.value) charset += upper
  if (lowercase.value) charset += lower
  if (numbers.value) charset += nums
  if (symbols.value) charset += syms

  if (!charset) {
    password.value = DEFAULT_PASSWORD
    return
  }

  let generated = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    generated += charset[randomIndex]
  }

  password.value = generated
}

function togglePassword() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function resetDefault() {
  uppercase.value = true
  lowercase.value = true
  numbers.value = true
  symbols.value = true
  passwordLength.value = [MIN_PASSWORD_LENGTH]
  generatePassword()
}

onMounted(() => {
  generatePassword()
})

watch([uppercase, lowercase, numbers, symbols, passwordLength], () => {
  generatePassword()
}, { deep: true })
</script>