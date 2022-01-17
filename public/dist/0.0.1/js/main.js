import{a as R,c as y,d as E}from"./chunk-WIDY5TSD.js";import{a as b,d as w,e as x,f as h,g as u,h as s,i as m,j as d}from"./chunk-PSRONZ2A.js";import{a as L}from"./chunk-YJ2DKIZS.js";var p=class{node=null;static get instance(){return p.page||(p.page=new p),p.page}get elem(){return this.node}async init(t,o){let a=t||document.body;return this.node=a.querySelector('[data-page="loader-page"]'),a}},c=p;L(c,"page",null);var f=class extends R{static get instance(){return f.layout||(f.layout=new f),f.layout}},g=f;L(g,"layout",null);function P(){document.querySelector(".splash")?.classList.remove("splash-open")}function D(e){let t=[...e].reverse(),o=g.instance;for(let a of t){if(!(a in s)||o.content!==s[a])break;o=s[a]}return o}async function M(e,t,o){let a={};for(let n of e)if(!(n in s)){let r=await import(`./views/layouts/${n}.js?time=${Date.now()}`);t=await r[y(n)]?.instance?.init?.(t,o),s[n]=r[y(n)]?.instance,a[n]=!0}return a}async function S(e,t,o,a){let n=[...o].reverse(),r=g.instance;for(let l of n)r.content!==s[l]&&await r.replaceContent(s[l]),await s[l].load?.(e,t,a[l]??!1),r=s[l];return r}async function v(e,t,o,a,n){d.page=t;let r=null,l=!1;if(!n&&(!(e in m)||!(o in u))){let i=D(a);i.content!==c.instance&&await i.replaceContent(c.instance)}if(!(e in m)){let i=await import(`./locales/${e}.js?time=${Date.now()}`);m[e]=b.create(i.default)}if(d.tr=m[e].translate.bind(m[e]),document.documentElement.lang=e,document.title=d.tr("My Routes"),!(o in u)){let i=await import(`./views/${o}.js?time=${Date.now()}`);r=await i[y(o)]?.instance?.init?.(r,n),u[o]=i[y(o)]?.instance,l=!0}let $=await M(a,r,n);if(d.page.fragment===t.fragment){let i=await S(e,t,a,$);i.content!==u[o]&&await i.replaceContent(u[o]),await u[o].load?.(e,t,l)}n&&P()}window.addEventListener("DOMContentLoaded",()=>{let e=!0;c.instance.init(null,e),x.addRoutes([{rule:`${E}/?`,async handler(t){await v(t.match?.[0]||w,t,"home-page",["main-layout"],e)}},{rule:`${E}/?sign-in`,async handler(t){await v(t.match?.[0]||w,t,"sign-in-page",[],e)}},{rule:`${E}/?sign-up`,async handler(t){await v(t.match?.[0]||w,t,"sign-up-page",[],e)}}]),h.addUriListener(),x.processUrl(h.fragment,h.query).catch(t=>console.error(t)).finally(()=>e=!1)});
