import { SweetModal, SweetModalTab } from './main.js'

function install(Vue) {

  if (install.installed) return;
  install.installed = true;

  Vue.component('SweetModal', SweetModal)
  Vue.component('SweetModalTab', SweetModalTab)
}

const plugin = {
  install
};

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.vue;
}

if (GlobalVue) {
  GlobalVue.use(plugin);
}

SweetModal.install = install;

export default { SweetModal, SweetModalTab } ;