export function useSound() {
  function play(src: string, volume = 1) {
    if (import.meta.client) {
      const audio = new Audio(src)
      audio.volume = volume
      audio.play().catch(() => {}) // silently fail if browser blocks autoplay
    }
  }

  return { play }
}