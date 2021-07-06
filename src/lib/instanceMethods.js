import getUuid from './getUuid'
import { injectComponent } from './injectComponent'
import MyToasts from '../components/MyToasts.vue'
import { createApp, createVNode, defineComponent, h } from 'vue'

// -- Main plugin reference
// eslint-disable-next-line no-unused-vars
export let reference = null
// -- Main plugin instance
export let instance = null

/**
 * Add a new toast to the instance
 *
 * @param toast
 */
export const push = (toast) => {
  // Check if toast id is specified
  if (!toast.id) toast.id = getUuid()

  // Add toast
  instance.add(toast)
}

/**
 * Remove a toast from the instance
 *
 * @param toastId
 */
export const remove = (toastId) => {
  // Check if toastId is specified
  if (!toastId) {
    console.warn(
      'You need to provide a toastId to remove a toast programatically.'
    )

    return
  }

  // Remove toast from component
  instance.remove(toastId)
}

/**
 * Update the plugin config
 */
export const updateConfig = (app, pluginOptions, component) => {
  // Remove present root element
  const rootEl = document.querySelector('#vue-my-toasts-root')

  // Delete current instance
  if (rootEl) {
    console.log("Removing root element")
    rootEl.remove()
  }

  // Get component instance & reference
  // let componentData = injectComponent3(app, pluginOptions, component)

  const customComponent = pluginOptions.component
  console.log("Component: %o", customComponent)
  console.log("App: %o", app)

  const div = document.createElement("div")
  div.id = 'vue-my-toasts-container'
  div.style.left = 0
  div.style.top = 0
  div.style.width = '100%'
  div.style.height = '100%'
  div.style.position = 'fixed'
  div.style.overflow = 'hidden'
  div.style.zIndex = 999999
  div.style.pointerEvents = 'none'
  const definition = defineComponent({
    extends: MyToasts, components: {
      "MyToastsComponent": customComponent
    }
  })

  console.log("Definition: %o", definition)

  const toastInstance = createApp(definition, pluginOptions);
  console.log("Toast Instance: %o", toastInstance)

  // const div = createVNode(toastInstance)
  document.body.appendChild(div);
  console.log("Created element: %o", div)

  const mounted = toastInstance.mount(div);
  // document.body.appendChild(h(toastInstance));
  console.log("Mounted: %o", mounted)

  // toastInstance.unmount(div);
  // document.body.removeChild(div);

  reference = definition
  instance = mounted
}
