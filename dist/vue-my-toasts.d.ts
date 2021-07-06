/* eslint-disable */
declare module "vue-my-toasts" {
	interface Options {
		id?: string
		duration?: number
		position?: "bottom-right" | "bottom-left" | "top-right" | "top-left" | "top-middle" | "bottom-middle"
	}

	/**
	 * Used for typing main plugin function.
	 *
	 * @example
	 * import type { VueMyToasts } from 'vue-my-toasts'
	 * ...
	 * setup() {
	 *     const toasts = inject<VueMyToasts>('$toasts')
	 *
	 *     if (toasts) toasts.base("Heyo!")
	 * }
	 */
	export type VueMyToasts = {
		base(text: string, options?: Options): string
		success(text: string, options?: Options): string
		warning(text: string, options?: Options): string
		error(text: string, options?: Options): string
	}
}

declare module "vue-my-toasts/src/mixins/TimerMixin"
declare module "vue-my-toasts/src/mixins/ToastMixin"