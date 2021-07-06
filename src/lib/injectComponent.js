import Vue, { createApp, defineComponent } from 'vue'
import MyToasts from '../components/MyToasts.vue'

/**
 * Register toast handler component to root
 * @param pluginOptions
 * @returns {{reference: Vue | object | Record<never, any>, instance: Vue}}
 */
export const injectComponent = (app, pluginOptions, userComponent) => {
  let definition = defineComponent({
    extends: userComponent, props: pluginOptions
  })

  let div = document.createElement('div');
  app
      .$refs
      .container
      .appendChild(div);
  let thing = createApp(definition)
  let component = thing.mount(div)
  // const component = createApp(definition).mount(div)

  //
  //
  // // Inject user provided component
  // Vue.component('my-toasts-component', userComponent)
  //
  // // Create toasts layer instance
  // const vueInstance = new Vue({
  //   render: (h) => h(MyToasts, { props: pluginOptions })
  // })
  //
  // // Create component
  // const component = vueInstance.$mount()
  //
  // // Append component to body
  // document.body.appendChild(component.$el)

  // Return created instances
  return {
    reference: component,
    instance: component.$children[0]
  }
}
