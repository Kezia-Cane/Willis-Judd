const state={quantity:1,price:92,name:'6 Magnets Per Link'};
const money=value=>`$${value}`;
const all=selector=>[...document.querySelectorAll(selector)];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initializeMotion(){
  const intro=document.querySelector('.page-intro');
  const revealTargets=all([
    '.fact-rail > *','.section-heading','.construction-grid > *',
    '.video-copy > *','.video-shell','.compare-card','.included-image',
    '.included-copy > *','.clasp-section > img','.clasp-section > div > *',
    '.review-summary > *','.review-gallery figure','.safety-section > *',
    '.faq-intro','.faq-list details','.final-cta > *','.site-footer > *'
  ].join(','));

  if(reducedMotion){
    document.body.classList.add('intro-complete');
    intro?.remove();
    revealTargets.forEach(element=>element.classList.add('is-visible'));
    return;
  }

  revealTargets.forEach((element,index)=>{
    element.classList.add('motion-reveal');
    element.style.setProperty('--reveal-delay',`${(index%4)*80}ms`);
  });

  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -7%'});
  revealTargets.forEach(element=>observer.observe(element));

  requestAnimationFrame(()=>document.body.classList.add('motion-ready'));
  window.setTimeout(()=>{
    document.body.classList.add('intro-complete');
    window.setTimeout(()=>intro?.remove(),850);
  },900);

  const progress=document.querySelector('.scroll-progress span');
  let ticking=false;
  const paintProgress=()=>{
    const distance=document.documentElement.scrollHeight-innerHeight;
    const value=distance>0?Math.min(1,scrollY/distance):0;
    progress?.style.setProperty('--scroll-progress',value);
    ticking=false;
  };
  addEventListener('scroll',()=>{
    if(!ticking){requestAnimationFrame(paintProgress);ticking=true;}
  },{passive:true});
  paintProgress();
}

function updateProductUI(){
  all('.quantity output,.mobile-quantity output').forEach(output=>output.textContent=state.quantity);
  const total=money(state.quantity*state.price);
  const single=money(state.price);
  all('.add-button strong,.mobile-add strong').forEach(node=>node.textContent=total);
  const sticky=document.querySelector('.mobile-sticky');
  if(sticky){
    sticky.querySelector('b').textContent=`${state.name} · ${single}`;
    sticky.querySelector('button').textContent=`Add · ${total}`;
  }
}

function chooseVariant(price,name){
  state.price=Number(price);
  state.name=name;
  all('input[name="variant"],input[name="mobile-variant"]').forEach(input=>{
    input.checked=Number(input.value)===state.price;
    input.closest('.variant-card,.mobile-option')?.classList.toggle('is-selected',input.checked);
  });
  updateProductUI();
}

all('[data-qty],[data-mobile-qty]').forEach(button=>button.addEventListener('click',()=>{
  const change=Number(button.dataset.qty||button.dataset.mobileQty);
  state.quantity=Math.max(1,Math.min(9,state.quantity+change));
  updateProductUI();
}));

all('input[name="variant"],input[name="mobile-variant"]').forEach(input=>input.addEventListener('change',()=>{
  chooseVariant(input.value,input.dataset.name);
}));

all('[data-select-variant]').forEach(button=>button.addEventListener('click',()=>{
  const price=Number(button.dataset.selectVariant);
  chooseVariant(price,price===92?'6 Magnets Per Link':'4 Elements');
  document.querySelector(innerWidth<=760?'.mobile-buybox':'#purchase')?.scrollIntoView({behavior:'smooth',block:'center'});
}));

function addToCart(){
  all('.cart-count,.mobile-cart b').forEach(node=>node.textContent=state.quantity);
  const toast=document.querySelector('.toast');
  toast.textContent=`${state.quantity} × ${state.name} added to cart`;
  toast.classList.add('is-visible');
  window.setTimeout(()=>toast.classList.remove('is-visible'),2400);
}

all('.add-button,.mobile-add,.mobile-sticky button').forEach(button=>button.addEventListener('click',addToCart));
all('[data-dialog-open]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.dialogOpen).showModal()));
all('[data-dialog-close]').forEach(button=>button.addEventListener('click',()=>button.closest('dialog').close()));
updateProductUI();
initializeMotion();
