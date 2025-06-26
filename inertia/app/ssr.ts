import { createInertiaApp, Link } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import { Icon } from '@iconify/vue'
import AppLayout from '@/layouts/AppLayout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'Shule Dynamics'

export default function render(page: any) {
  return createInertiaApp({
    page,
    title: (title) => `${title} - ${appName}`,
    render: renderToString,
    resolve: async (name) => {
      const page = await resolvePageComponent(
        `../pages/${name}.vue`,
        import.meta.glob<DefineComponent>('../pages/**/*.vue')
      )

      page.default.layout = page.default.layout || AppLayout

      return page
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) })
        .use(plugin)
        .component('Link', Link)
        .component('Icon', Icon)
    },
  })
}
