// ------------------------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------------------------
import { defineComponent } from 'vue'
import { instance, push, reference, remove, updateConfig } from './lib/instanceMethods'
import helperMethods from './lib/helperMethods'
import { injectComponent } from "./lib/injectComponent";
import MyToasts from "./components/MyToasts.vue";

// ------------------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------------------
const version = '__VERSION__'
let pluginOptions = {
  width: '400px',          // CSS variable
  padding: '1rem',         // CSS variable
  position: 'bottom-right' // top-left, top-right, bottom-left, bottom-right, top-middle, bottom-middle
}

// ------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------

const install = (app, options) => {
  // Overriding default config by user provided one
  pluginOptions = {
    ...pluginOptions,
    ...options
  }

  // import {defineComponent,createApp} from 'vue'

  // const component = defineComponent({
  //   extends: MyToasts
  // })

  // const div = document.createElement('div');
  // this.$refs.container.appendChild(div);
  // createApp(buttonView ).mount(div)

  // Initialize config
  updateConfig(app, pluginOptions, MyToasts)

  const toasts = {
    push,
    remove,
    ...helperMethods,

    /**
     * Update the used toasts config
     *
     * @param newOptions
     */
    // updateConfig: (newOptions, userComponent = component) => {
    //   pluginOptions = {
    //     ...pluginOptions,
    //     ...newOptions
    //   }
    //
    //   updateConfig(pluginOptions, userComponent)
    // }
  }

  // Inject into app instance
  app.config.globalProperties.$toasts = toasts
  app.provide("$toasts", toasts)
}

// ------------------------------------------------------------------------------
// EXPORTS
// ------------------------------------------------------------------------------

/**
 * Vue plugin functions, default component and mixins
 *
 * @type {{
 *  install: install,
 *  version: string
 * }}
 */
const plugin = {
  install,
  version
}

export default plugin

// export default {
//   install: (app, options) => {
//     app.config.globalProperties.$toasts = MyToasts
//     app.provide("$toasts", MyToasts)
//   }
// }

/**
 * Try to auto-inject if Vue is loaded as a script tag.
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
