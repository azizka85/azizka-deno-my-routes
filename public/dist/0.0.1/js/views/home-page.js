import{a,b as s,c as r}from"../chunk-HW5UVLCA.js";import{h as o,l as i}from"../chunk-46XYY3JI.js";import{a as c}from"../chunk-YJ2DKIZS.js";var t=class{node=null;scrollTopBtn=null;scrollTopBtnClickHandler;windowScrollHandler;currScroll=0;static get instance(){return t.page||(t.page=new t),t.page}constructor(){this.scrollTopBtnClickHandler=()=>{o["main-layout"]?.performAction?.(a,null)},this.windowScrollHandler=e=>{let l=e.detail;l.currScroll<=0?this.scrollTopBtn?.classList.add("btn-exited"):this.scrollTopBtn?.classList.remove("btn-exited"),this.currScroll=l.currScroll}}get elem(){return this.node}async init(e,l){let n=await i(e,l,["main-layout"]);return this.node=n.querySelector('[data-page="home-page"]')||null,this.scrollTopBtn=this.node?.querySelector('[data-button="scroll-top"]')||null,n}async mount(){this.scrollTopBtn?.addEventListener("click",this.scrollTopBtnClickHandler),o["main-layout"]?.listen?.(r,this.windowScrollHandler)}async unmount(){this.scrollTopBtn?.removeEventListener("click",this.scrollTopBtnClickHandler),o["main-layout"]?.unlisten?.(r,this.windowScrollHandler)}async load(e,l,n){o["main-layout"]?.performAction?.(s,{top:this.currScroll,noSmooth:!0})}},d=t;c(d,"page",null);export{d as HomePage};
