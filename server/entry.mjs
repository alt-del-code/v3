import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_yz2X12bp.mjs';
import { manifest } from './manifest_DaoTZNHq.mjs';

const serverIslandMap = new Map([
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/keystatic/_---params_.astro.mjs');
const _page3 = () => import('./pages/blog.astro.mjs');
const _page4 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/keystatic/_---params_.astro.mjs');
const _page7 = () => import('./pages/portfolio/_slug_.astro.mjs');
const _page8 = () => import('./pages/portfolio.astro.mjs');
const _page9 = () => import('./pages/portfolio2.astro.mjs');
const _page10 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["node_modules/@keystatic/astro/internal/keystatic-api.js", _page2],
    ["src/pages/blog/index.astro", _page3],
    ["src/pages/blog/[...slug].astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["node_modules/@keystatic/astro/internal/keystatic-astro-page.astro", _page6],
    ["src/pages/portfolio/[slug].astro", _page7],
    ["src/pages/portfolio/index.astro", _page8],
    ["src/pages/portfolio2.astro", _page9],
    ["src/pages/index.astro", _page10]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///D:/krrish/v3/dist/client/",
    "server": "file:///D:/krrish/v3/dist/server/",
    "host": "127.0.0.1",
    "port": 4321,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
