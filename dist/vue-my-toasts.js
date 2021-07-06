import { resolveComponent, openBlock, createBlock, createVNode, TransitionGroup, Fragment, renderList, mergeProps, createCommentVNode, withScopeId, defineComponent, createApp } from 'vue';

/**
 * Get a toast uuid, useful when no `id` is provided by the user.
 *
 * @returns {string}
 */
function getUuid () {
  return 'toast-' + Date.now() + '-' + Math.floor(Math.random() * 10)
}

var script = {
  name: 'MyToasts',

  props: {
    padding: {
      type: String,
      required: false,
      default: '1rem'
    },
    width: {
      type: String,
      required: false,
      default: '400px'
    },
    position: {
      type: String,
      required: false,
      default: 'bottom-right'
    }
  },

  data: function () { return ({
    toasts: []
  }); },

  methods: {
    /**
     * Add toast to instance
     *
     * @param toast
     */
    add: function add(toast) {
      // Push the toast data to the toasts list
      this.toasts.push(toast);
    },
    /**
     * Remove toast from instance
     *
     * @param toastId
     */
    remove: function remove(toastId) {
      if ( toastId === void 0 ) toastId = null;

      // Break if there is no toast to delete
      if (this.toasts.length === 0) { return }

      // Get last toast id if no toastId is provided
      toastId = toastId || this.toasts[0].id;

      // Filter the toasts
      this.toasts = this.toasts.filter(function (toast) { return toast.id !== toastId; });
    }
  }
};

var _withId = /*#__PURE__*/withScopeId("data-v-2c7e9c28");

var render = /*#__PURE__*/_withId(function (_ctx, _cache, $props, $setup, $data, $options) {
  var _component_my_toasts_component = resolveComponent("my-toasts-component");

  return (_ctx.toasts.length > 0)
    ? (openBlock(), createBlock("div", {
        key: 0,
        ref: "root",
        id: "vue-my-toasts-root",
        class: ['vue-my-toasts', $props.position],
        style: {
      '--vueMyToastsWidth': $props.width,
      '--vueMyToastsPadding': $props.padding
    }
      }, [
        createVNode(TransitionGroup, {
          duration: "350",
          name: $props.position.includes('middle') ? 'fade-vertical' : 'fade-horizontal',
          tag: "ul",
          class: ['vue-my-toasts-wrapper', $props.position]
        }, {
          default: _withId(function () { return [
            (openBlock(true), createBlock(Fragment, null, renderList(_ctx.toasts, function (toast, index) {
              return (openBlock(), createBlock(_component_my_toasts_component, mergeProps({
                class: [
          $props.position.includes('middle') ? 'fade-vertical' : 'fade-horizontal',
          $props.position
        ],
                key: toast.id,
                index: index,
                position: $props.position
              }, toast, {
                onRemove: function ($event) { return ($options.remove(toast.id)); }
              }), null, 16 /* FULL_PROPS */, ["class", "index", "position", "onRemove"]))
            }), 128 /* KEYED_FRAGMENT */))
          ]; }),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["name", "class"])
      ], 6 /* CLASS, STYLE */))
    : createCommentVNode("v-if", true)
});

script.render = render;
script.__scopeId = "data-v-2c7e9c28";
script.__file = "src/components/MyToasts.vue";

// -- Main plugin instance
var instance = null;

/**
 * Add a new toast to the instance
 *
 * @param toast
 */
var push = function (toast) {
  // Check if toast id is specified
  if (!toast.id) { toast.id = getUuid(); }

  // Add toast
  instance.add(toast);
};

/**
 * Remove a toast from the instance
 *
 * @param toastId
 */
var remove = function (toastId) {
  // Check if toastId is specified
  if (!toastId) {
    console.warn(
      'You need to provide a toastId to remove a toast programatically.'
    );

    return
  }

  // Remove toast from component
  instance.remove(toastId);
};

/**
 * Update the plugin config
 */
var updateConfig = function (app, pluginOptions, component) {
  // Remove present root element
  var rootEl = document.querySelector('#vue-my-toasts-root');

  // Delete current instance
  if (rootEl) {
    console.log("Removing root element");
    rootEl.remove();
  }

  // Get component instance & reference
  // let componentData = injectComponent3(app, pluginOptions, component)

  var customComponent = pluginOptions.component;
  console.log("Component: %o", customComponent);
  console.log("App: %o", app);

  var div = document.createElement("div");
  div.id = 'vue-my-toasts-container';
  div.style.left = 0;
  div.style.top = 0;
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.position = 'fixed';
  div.style.overflow = 'hidden';
  div.style.zIndex = 999999;
  div.style.pointerEvents = 'none';
  var definition = defineComponent({
    extends: script, components: {
      "MyToastsComponent": customComponent
    }
  });

  console.log("Definition: %o", definition);

  var toastInstance = createApp(definition, pluginOptions);
  console.log("Toast Instance: %o", toastInstance);

  // const div = createVNode(toastInstance)
  document.body.appendChild(div);
  console.log("Created element: %o", div);

  var mounted = toastInstance.mount(div);
  // document.body.appendChild(h(toastInstance));
  console.log("Mounted: %o", mounted);
  instance = mounted;
};

/**
 * The following 4 functions are helpers.
 * base(), success(), warning(), error() accepts `message` as first argument, and `options` as a second one.
 */
var helperMethods = {
  base: function (message, options) {
    if ( options === void 0 ) options = {};

    push(Object.assign({}, {type: 'base',
      message: message},
      options));
  },
  success: function (message, options) {
    if ( options === void 0 ) options = {};

    push(Object.assign({}, {type: 'success',
      message: message},
      options));
  },
  warning: function (message, options) {
    if ( options === void 0 ) options = {};

    push(Object.assign({}, {type: 'warning',
      message: message},
      options));
  },
  error: function (message, options) {
    if ( options === void 0 ) options = {};

    push(Object.assign({}, {type: 'error',
      message: message},
      options));
  }
};

// ------------------------------------------------------------------------------

// ------------------------------------------------------------------------------
// VARIABLES
// ------------------------------------------------------------------------------
var version = '1.1.0';
var pluginOptions = {
  width: '400px',          // CSS variable
  padding: '1rem',         // CSS variable
  position: 'bottom-right' // top-left, top-right, bottom-left, bottom-right, top-middle, bottom-middle
};

// ------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------

var install = function (app, options) {
  // Overriding default config by user provided one
  pluginOptions = Object.assign({}, pluginOptions,
    options);

  // import {defineComponent,createApp} from 'vue'

  // const component = defineComponent({
  //   extends: MyToasts
  // })

  // const div = document.createElement('div');
  // this.$refs.container.appendChild(div);
  // createApp(buttonView ).mount(div)

  // Initialize config
  updateConfig(app, pluginOptions);

  var toasts = Object.assign({}, {push: push,
    remove: remove},
    helperMethods);

  // Inject into app instance
  app.config.globalProperties.$toasts = toasts;
  app.provide("$toasts", toasts);
};

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
var plugin = {
  install: install,
  version: version
};

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
  window.Vue.use(plugin);
}

export default plugin;
