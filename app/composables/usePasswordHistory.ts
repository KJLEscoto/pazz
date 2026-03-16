import type { HistoryEntry } from '~/utils/history'

const MAX_HISTORY = 20

export function usePasswordHistory() {
  const historyCookie = useCookie<HistoryEntry[]>('pazz_history', {
    default: () => [],
    maxAge: 60 * 60 * 24 * 30, // 30 days in seconds
    sameSite: 'lax',
  })

  function addEntry(password: string) {
    const isDuplicate = historyCookie.value.some(entry => entry.password === password)
    if (isDuplicate) return

    const entry: HistoryEntry = {
      password,
      copiedAt: new Date().toISOString(),
    }

    historyCookie.value = [entry, ...historyCookie.value].slice(0, MAX_HISTORY)
  }

  function clearHistory() {
    historyCookie.value = []
  }

  return {
    history: historyCookie,
    addEntry,
    clearHistory,
  }
}