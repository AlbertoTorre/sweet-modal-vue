import { SweetModal, SweetModalTab } from './main.js'

// Exportación de los componentes individualmente
export { SweetModal, SweetModalTab }

// Instalación de la librería como un plugin
export function install(Vue) {
	Vue.component('SweetModal', SweetModal)
	Vue.component('SweetModalTab', SweetModalTab)
}

if (typeof window !== 'undefined' && window.Vue) {
  Vue.use({ install });
}

// Exportación de la librería como plugin
export default { install: install }