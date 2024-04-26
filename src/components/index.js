
import ImageView from './ImageViews/index.vue';
import Sku from './XtxSku/index.vue';
export const componentsPlugin = {
  install(app) {
    app.component('ImageView', ImageView)
    app.component('Sku', Sku)
  }
}
