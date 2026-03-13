// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  modules: ['shadcn-nuxt', '@nuxt/fonts', 'kinwebb-attribute'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  fonts: {
    families: [
      {
        name: "Amarante",
        provider: "google",
        weights: [400],
        styles: ["normal"],
      },
      {
        name: "Roboto",
        provider: "google",
        weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
        styles: ["normal"],
      },
    ],
  },
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  app: {
    head: {
      title: "Pazz | KinWebb",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },

        // search console verification
        { name: 'google-site-verification', content: 'eMMfU0WDt9Hz-TWRGBTQY-mgFsF66m9octorJRumMzQ' },

        // SEO
        {
          name: "description",
          content:
            "A lightweight random password generator that creates strong, customizable passwords in seconds—helping you stay secure with less effort. Designed and developed by KinWebb. © 2026 Kent Joemar Escoto.",
        },

        // Open Graph (previews: FB, Discord, iMessage, etc.)
        { property: "og:type", content: "website" },
        { property: "og:title", content: "Pazz | KinWebb" },
        {
          property: "og:description",
          content:
            "A lightweight random password generator that creates strong, customizable passwords in seconds—helping you stay secure with less effort.",
        },
        // { property: "og:image", content: "/images/meta_thumbnail.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:type", content: "image/png" },

        // Twitter/X
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Remindr | KinWebb" },
        {
          name: "twitter:description",
          content:
            "A lightweight random password generator that creates strong, customizable passwords in seconds—helping you stay secure with less effort.",
        },
        { name: "twitter:image", content: "/images/meta_thumbnail.png" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/images/Icon.png" }],
    },
  },
})