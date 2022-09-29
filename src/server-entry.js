import { createApp } from './app.js';
import { createMemoryHistory } from 'vue-router'
import createRouter from './router/index.js'
import { store } from './store/index.ts';
import { renderToString } from '@vue/server-renderer'

export default function (ctx) {
  return new Promise(async (resolve, reject) => {
    const app = createApp();
    const router = createRouter(createMemoryHistory())
    app.use(router);
    app.use(store);

    await router.push(ctx.url);
    await router.isReady();

    const matchedComponents = router.currentRoute.value.matched.flatMap(record => Object.values(record.components))

    if (!matchedComponents.length) {
      return reject({ code: 404 });
    }

    Promise.all(matchedComponents.map(component => {
      if (component.asyncData) {
        return component.asyncData(store)
      }
    })).then(async (res) => {
      let html = await renderToString(app);

      html += `<script>window.__INITIAL_STATE__ = ${replaceHtmlTag(JSON.stringify(store.state))}</script>`

      resolve(html);
    }).catch(() => {
      reject(html)
    })
  })
}

function replaceHtmlTag(html) {
  return html.replace(/<script(.*?)>/gi, '&lt;script$1&gt;').replace(/<\/script>/g, '&lt;/script&gt;')
}
