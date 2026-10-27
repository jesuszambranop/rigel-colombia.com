(() => {
  'use strict';
  const products = window.RIGEL_PRODUCTS;
  const config = window.RIGEL_CONFIG;
  const params = new URLSearchParams(location.search);
  const page = document.body.dataset.page;
  let language = params.get('lang');
  if (!['es', 'en'].includes(language)) {
    try { language = localStorage.getItem('rigel-language'); } catch (_) { /* Storage is optional. */ }
  }
  if (!['es', 'en'].includes(language)) language = 'es';
  const tr = (es, en) => language === 'en' ? en : es;
  const text = value => Array.isArray(value) ? value[language === 'en' ? 1 : 0] : value;
  const esc = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const url = (file, values = {}) => {
    const query = new URLSearchParams({...values, lang: language});
    return `${file}?${query}`;
  };
  const productUrl = id => url('producto.html', {slug:id});
  const arrow = '';
  const download = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5" stroke="currentColor" stroke-width="1.6"/></svg>';
  const link = (href, label, cls = 'button primary') => `<a class="${cls}" href="${href}">${label}${arrow}</a>`;
  const crumb = title => `<div class="container breadcrumb"><a href="${url('index.html')}">${tr('Inicio','Home')}</a><span>/</span><span>${title}</span></div>`;
  const sectionHeading = (eyebrow, title, description = '') => `<div class="section-heading"><div><p class="eyebrow">${eyebrow}</p><h2>${title}</h2></div>${description ? `<p>${description}</p>` : ''}</div>`;
  const selected = products.find(p => p.id === params.get('slug'));
  let catalogType = ['printer','ink'].includes(params.get('tipo')) ? params.get('tipo') : 'all';
  let catalogSearch = '';

  function header() {
    const nav = [
      ['index.html',tr('Inicio','Home'),'home'],
      ['catalogo.html',tr('Catálogo','Catalog'),'catalog'],
      ['contacto.html',tr('Contacto','Contact'),'contact'],
      ['quienes-somos.html',tr('Quiénes somos','About us'),'about']
    ];
    document.getElementById('site-header').innerHTML = `
      <div class="header-main container">
        <a class="brand" href="${url('index.html')}" aria-label="Rigel Colombia"><img src="assets/brand/rigel-horizontal.png" alt="RIGEL" width="174" height="60"><span>COLOMBIA</span></a>
        <nav id="main-nav" aria-label="${tr('Navegación principal','Main navigation')}">${nav.map(([file,label,key]) => `<a href="${url(file.split('#')[0])}${file.includes('#') ? '#'+file.split('#')[1] : ''}" ${page===key ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>
        <div class="header-actions"><div class="language-switch" role="group" aria-label="${tr('Idioma','Language')}"><button type="button" data-language="es" aria-pressed="${language==='es'}" lang="es">ES</button><span aria-hidden="true">/</span><button type="button" data-language="en" aria-pressed="${language==='en'}" lang="en">EN</button></div><a class="header-contact" href="${url('contacto.html')}">${tr('Hablemos','Let’s talk')}${arrow}</a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav" aria-label="${tr('Abrir menú','Open menu')}"><span></span><span></span></button></div>
      </div>`;
  }

  function footer() {
    document.getElementById('site-footer').innerHTML = `
      <div class="container footer-top"><div class="footer-about"><img src="assets/brand/rigel-horizontal.png" alt="RIGEL" width="150" height="52"><p>${tr('Codificadoras y tintas para Colombia.','Coding printers and inks for Colombia.')}</p><span class="footer-country">COLOMBIA</span></div>
      <div><h2>${tr('Explora','Explore')}</h2><a href="${url('catalogo.html')}">${tr('Catálogo completo','Full catalog')}</a><a href="${productUrl('m1')}">M1 + S70</a><a href="${productUrl('rg1')}">RG1 + RCN1</a><a href="${url('guias.html')}">${tr('Guías de codificación','Coding guides')}</a><a href="${url('quienes-somos.html')}">${tr('Quiénes somos','About us')}</a></div>
      <div><h2>${tr('Te acompañamos','Here to help')}</h2><a href="${url('contacto.html')}">${tr('Asesoría y soporte','Advice and support')}</a><a href="${url('preguntas-frecuentes.html')}">${tr('Preguntas frecuentes','Frequently asked questions')}</a><a href="mailto:${esc(config.email)}">${esc(config.email)}</a>${config.whatsapp?`<a href="https://wa.me/${esc(config.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp · ${esc(config.whatsappDisplay || config.whatsapp)}</a>`:''}</div></div>
      <div class="container footer-bottom"><span>© ${new Date().getFullYear()} Rigel. ${tr('Todos los derechos reservados.','All rights reserved.')}</span><a href="https://rigelsa.com/" target="_blank" rel="noopener noreferrer">${tr('Visita Rigel Ecuador','Visit Rigel Ecuador')} ↗</a><a href="${url('privacidad.html')}">${tr('Privacidad','Privacy')}</a></div>`;
  }

  function productCard(p, index = 0) {
    return `<article class="product-card ${p.type==='ink' ? 'ink-card' : ''}"><div class="product-image"><span class="product-index">0${index+1} / ${tr(p.type==='ink'?'CONSUMIBLE':'EQUIPO',p.type==='ink'?'CONSUMABLE':'PRINTER')}</span><a href="${productUrl(p.id)}" tabindex="-1" aria-hidden="true"><img src="${p.image}" alt="" width="600" height="500" loading="lazy"></a><span class="image-model" aria-hidden="true">${p.model}</span></div><div class="product-content"><p class="eyebrow">${text(p.family)}</p><a class="product-title" href="${productUrl(p.id)}"><h3>${text(p.name)}</h3><span>${arrow}</span></a><p>${text(p.summary)}</p><div class="product-card-bottom"><span>${p.type==='printer' ? tr('Cartucho compatible','Compatible cartridge') : tr('Equipo compatible','Compatible printer')} <strong>${p.type==='printer' ? p.ink.toUpperCase() : p.printer.toUpperCase()}</strong></span><a class="text-link" href="${productUrl(p.id)}">${tr('Explorar','Explore')}${arrow}</a></div></div></article>`;
  }

  const applications = [
    ['alimentos.webp',['Alimentos','Food'],['Fechas y lotes en empaques.','Dates and batches on packaging.']],
    ['bebidas.webp',['Bebidas','Beverages'],['Identificación en botellas y envases.','Identification on bottles and containers.']],
    ['farmaceutica.webp',['Farmacéutica','Pharmaceutical'],['Códigos en cajas y envases.','Codes on cartons and containers.']],
    ['latas.webp',['Industria y empaques','Industry & packaging'],['Marcaje en metal, cartón y plástico.','Marking on metal, cardboard and plastic.']]
  ];

  const homeSlides = [
    {
      image: 'assets/slides/marcaje-fechas-lotes.webp', kind: 'marking',
      alt: ['Marcaje de fechas y lote sobre la tapa de un envase de vidrio','Date and batch marking on a glass container lid'],
      label: ['MARCAJE Y CODIFICACIÓN','MARKING & CODING'],
      title: ['Marcaje y<br>codificación.','Marking<br>and coding.'],
      description: ['Imprime fechas, lotes y códigos en tus productos. Conoce las soluciones de Rigel para Colombia.','Print dates, batches and codes on your products. Explore Rigel’s solutions for Colombia.'],
      cta: ['Explorar codificadoras','Explore coding printers'],
      href: () => url('catalogo.html',{tipo:'printer'}),
      tab: ['Fechas y lotes','Dates & batches'],
      caption: ['Identificación en cada empaque','Identification on every package']
    },
    {
      image: 'assets/slides/codificacion-manual-m1.webp', kind: 'handheld',
      alt: ['Codificadora M1 utilizada con una mano sobre un empaque','M1 coding printer used with one hand on packaging'],
      label: ['CODIFICADORA PORTÁTIL M1','M1 HANDHELD CODING PRINTER'],
      title: ['Codificadora<br>portátil M1.','M1 handheld<br>coding printer.'],
      description: ['Impresión manual con pantalla táctil y cartucho S70.','Handheld printing with a touchscreen and S70 cartridge.'],
      cta: ['Conocer la M1','Explore the M1'],
      href: () => productUrl('m1'),
      tab: ['Codificación portátil','Handheld coding'],
      caption: ['M1 + cartucho S70','M1 + S70 cartridge']
    },
    {
      image: 'assets/slides/marcaje-envases.webp', kind: 'packaging',
      alt: ['Envases cosméticos como ejemplo de superficies para marcaje','Cosmetic containers as examples of marking surfaces'],
      label: ['TU PRODUCTO. TU APLICACIÓN.','YOUR PRODUCT. YOUR APPLICATION.'],
      title: ['Identifica<br>tus envases.','Identify<br>your packaging.'],
      description: ['Vidrio, plástico, cartón o metal. Revisemos tu superficie y el mensaje que necesitas imprimir.','Glass, plastic, cardboard or metal. Let’s review your material and the message you need to print.'],
      cta: ['Consultar mi aplicación','Discuss my application'],
      href: () => url('contacto.html'),
      tab: ['Marcaje de envases','Container marking'],
      caption: ['La combinación empieza en tu material','The right match starts with your material']
    }
  ];

  function homeCarousel() {
    return `<section class="home-carousel" aria-label="${tr('Marcaje y codificación Rigel Colombia','Rigel Colombia marking and coding')}" aria-roledescription="${tr('carrusel','carousel')}">
      <h1 class="sr-only">${tr('Marcaje y codificación en Colombia. Codificadoras M1 y RG1.','Marking and coding in Colombia. M1 and RG1 coding printers.')}</h1>
      <div class="slide-stage">${homeSlides.map((slide,i)=>`<div id="home-slide-${i}" class="home-slide slide--${slide.kind}" role="group" aria-roledescription="${tr('diapositiva','slide')}" aria-label="${i+1} ${tr('de','of')} ${homeSlides.length}" ${i ? 'hidden' : ''}>
        <img class="slide-image" src="${slide.image}" alt="${text(slide.alt)}" width="2793" height="1204" ${i===0?'fetchpriority="high"':'loading="lazy"'}>
        <div class="container slide-layout"><div class="slide-copy"><h2>${text(slide.title)}</h2><p class="slide-description">${text(slide.description)}</p>${link(slide.href(),text(slide.cta),'button primary slide-cta')}</div></div>
      </div>`).join('')}
      <div class="container carousel-controls"><div class="carousel-tools"><div class="slide-dots" role="group" aria-label="${tr('Seleccionar slide','Select slide')}">${homeSlides.map((slide,i)=>`<button type="button" data-slide-target="${i}" aria-controls="home-slide-${i}" aria-pressed="${i===0}" aria-label="${text(slide.tab)}"><span></span></button>`).join('')}</div></div></div></div><span class="sr-only" id="slide-counter" aria-hidden="true">01 / 03</span><span class="sr-only" id="slide-announcement" role="status"></span></section>`;
  }

  function home() {
    return `${homeCarousel()}<section class="home-band equipment-band" id="equipos"><div class="container simple-equipment"><div class="simple-heading"><h2>${tr('Codificadoras','Coding printers')}</h2><a class="text-link" href="${url('catalogo.html')}">${tr('Ver catálogo','View catalog')}</a></div><div class="simple-product-grid">${products.filter(p=>p.type==='printer').map(p=>`<article class="simple-product"><a class="simple-product-photo" href="${productUrl(p.id)}" tabindex="-1" aria-hidden="true"><img src="${p.image}" alt="" width="800" height="650" loading="lazy"></a><h3><a href="${productUrl(p.id)}">${p.model}</a></h3><p>${p.id==='m1'?tr('Codificadora portátil con pantalla táctil de 3,5 pulgadas.','Handheld coding printer with a 3.5-inch touchscreen.'):tr('Codificadora con pantalla de 4,3 pulgadas para uso manual o integrado a una línea.','Coding printer with a 4.3-inch display for handheld or inline use.')}</p><p class="simple-product-ink">${tr('Cartucho compatible:','Compatible cartridge:')} <a href="${productUrl(p.ink)}">${p.ink.toUpperCase()}</a></p><a class="text-link" href="${productUrl(p.id)}">${tr('Ver','View')} ${p.model}</a></article>`).join('')}</div><a class="text-link compare-link" href="${url('catalogo.html')}#comparar">${tr('Comparar modelos','Compare models')}</a></div></section>
      <section class="home-band applications-band" id="aplicaciones"><div class="container simple-applications"><h2>${tr('Aplicaciones','Applications')}</h2><p>${tr('Fechas, lotes y códigos sobre diferentes empaques y materiales.','Dates, batches and codes on different packaging and materials.')}</p><div class="simple-application-grid">${applications.map(([img,title,desc])=>`<a href="${url('contacto.html',{aplicacion:text(title)})}"><img src="assets/aplicaciones/${img}" alt="${text(desc)}" width="600" height="500" loading="lazy"><h3>${text(title)}</h3></a>`).join('')}</div><p class="simple-material-note">${tr('Consulta la tinta adecuada para tu material y solicita una prueba de impresión.','Ask about the right ink for your material and a print test.')}</p></div></section><section class="home-band about-band"><div class="container home-about"><h2>Rigel Colombia</h2><p>${tr('Somos parte de Rigel, empresa fundada en Ecuador y dedicada al marcaje y la codificación de productos. En Colombia ofrecemos las codificadoras M1 y RG1, sus tintas compatibles y orientación para elegir la solución adecuada.','We are part of Rigel, a company founded in Ecuador and focused on product marking and coding. In Colombia, we offer M1 and RG1 coding printers, their compatible inks and guidance to help you choose a suitable solution.')}</p><a class="text-link" href="${url('quienes-somos.html')}">${tr('Conoce más sobre Rigel','More about Rigel')}</a></div></section>`;
  }

  function supportBlock() {
    return `<section class="container simple-contact"><div><h2>${tr('Asesoría y contacto','Advice and support')}</h2><p>${tr('Te ayudamos a elegir el equipo y la tinta para tu aplicación.','We can help you choose the printer and ink for your application.')}</p></div><a class="text-link" href="${url('contacto.html')}">${tr('Contactar a Rigel','Contact Rigel')}</a></section>`;
  }


  let carouselIndex=0;
  let carouselTimer=null;
  let carouselReducedMotion=false;
  function stopCarousel() {
    if(carouselTimer!==null) window.clearInterval(carouselTimer);
    carouselTimer=null;
  }
  function startCarousel() {
    stopCarousel();
    if(carouselReducedMotion || document.hidden || page!=='home') return;
    carouselTimer=window.setInterval(()=>showSlide(carouselIndex+1,false),5000);
  }
  function showSlide(index,manual=true) {
    carouselIndex=(index+homeSlides.length)%homeSlides.length;
    document.querySelectorAll('.home-slide').forEach((slide,i)=>{slide.hidden=i!==carouselIndex;});
    document.querySelectorAll('[data-slide-target]').forEach((button,i)=>button.setAttribute('aria-pressed',String(i===carouselIndex)));
    document.getElementById('slide-counter').textContent=`0${carouselIndex+1} / 0${homeSlides.length}`;
    if(manual) {
      document.getElementById('slide-announcement').textContent=`${carouselIndex+1} ${tr('de','of')} ${homeSlides.length}: ${text(homeSlides[carouselIndex].tab)}`;
      startCarousel();
    }
  }
  function initCarousel() {
    const carousel=document.querySelector('.home-carousel');
    if(!carousel)return;
    carouselReducedMotion=!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    carousel.addEventListener('focusin',event=>{if(event.target.closest('a'))stopCarousel();});
    carousel.addEventListener('focusout',event=>{if(!carousel.contains(event.relatedTarget))startCarousel();});
    document.addEventListener('visibilitychange',()=>document.hidden?stopCarousel():startCarousel());
    startCarousel();
  }


  function comparison() {
    const rows = [
      [['Operación','Operation'],['Portátil / manual','Handheld'],['Manual o automática','Handheld or inline']],
      [['Pantalla','Display'],['Táctil de 3,5″','3.5″ touchscreen'],['HD de 4,3″','4.3″ HD']],
      [['Altura de impresión','Print height'],['12,7 mm','12.7 mm'],['12,7 mm','12.7 mm']],
      [['Líneas de impresión','Print lines'],['1 a 4','1 to 4'],['1 a 6','1 to 6']],
      [['Batería*','Battery*'],['4 a 6 horas','4 to 6 hours'],['Hasta 16 horas','Up to 16 hours']],
      [['Cartucho','Cartridge'],['S70','S70'],['RCN1','RCN1']]
    ];
    return `<section class="section comparison" id="comparar"><div class="container">${sectionHeading(tr('COMPARA Y ELIGE','COMPARE & CHOOSE'),tr('¿M1 o RG1?','M1 or RG1?'),tr('Las diferencias que te ayudan a decidir.','The differences that help you decide.'))}<div class="table-scroll" role="region" aria-label="${tr('Comparación de equipos','Printer comparison')}" tabindex="0"><table><caption class="sr-only">${tr('Comparación de codificadoras M1 y RG1','M1 and RG1 coding printer comparison')}</caption><thead><tr><th scope="col">${tr('Característica','Feature')}</th><th scope="col">M1</th><th scope="col">RG1</th></tr></thead><tbody>${rows.map(row=>`<tr><th scope="row">${text(row[0])}</th><td>${text(row[1])}</td><td>${text(row[2])}</td></tr>`).join('')}</tbody><tfoot><tr><td></td><td><a class="text-link" href="${productUrl('m1')}">${tr('Ver M1','View M1')}${arrow}</a></td><td><a class="text-link" href="${productUrl('rg1')}">${tr('Ver RG1','View RG1')}${arrow}</a></td></tr></tfoot></table></div><p class="small muted">${tr('*Autonomía según condiciones de uso. Confirma la configuración y el contenido del kit al cotizar.','*Battery life depends on operating conditions. Confirm configuration and kit contents when requesting a quote.')}</p></div></section>`;
  }

  function catalog() {
    return `${crumb(tr('Catálogo','Catalog'))}<section class="page-intro container"><p class="eyebrow">${tr('EL PORTAFOLIO DE COLOMBIA','THE COLOMBIA RANGE')}</p><h1>${tr('Catálogo','Catalog')}</h1><p>${tr('Dos codificadoras. Sus tintas compatibles. Encuentra tu combinación.','Two coding printers. Their compatible inks. Find your combination.')}</p></section><section class="container catalog-layout"><aside class="catalog-sidebar"><h2>${tr('Explorar catálogo','Explore catalog')}</h2><div class="filter-group" role="group" aria-label="${tr('Tipo de producto','Product type')}">${[['all',tr('Todos los productos','All products'),'04'],['printer',tr('Codificadoras','Coding printers'),'02'],['ink',tr('Cartuchos de tinta','Ink cartridges'),'02']].map(([type,label,count])=>`<button data-filter="${type}" aria-pressed="${catalogType===type}">${label}<span>${count}</span></button>`).join('')}</div><div class="sidebar-help"><span class="eyebrow">${tr('¿CUÁL ELEGIR?','WHICH ONE?')}</span><p>${tr('Te ayudamos a encontrar el equipo y la tinta para tu aplicación.','We can help you find the printer and ink for your application.')}</p><a class="text-link" href="${url('contacto.html')}">${tr('Recibir asesoría','Get advice')}${arrow}</a></div></aside><div><div class="catalog-toolbar"><p id="result-count" aria-live="polite"></p><label class="search-box"><span class="sr-only">${tr('Buscar producto','Search products')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="m15 15 5 5" stroke="currentColor" stroke-width="1.5"/></svg><input type="search" id="catalog-search" placeholder="${tr('Buscar modelo o cartucho','Search model or cartridge')}" autocomplete="off"></label></div><div class="catalog-grid" id="product-results"></div></div></section>${comparison()}${supportBlock()}`;
  }

  function updateCatalog() {
    const normalized = catalogSearch.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
    const visible = products.filter(p => (catalogType==='all'||p.type===catalogType) && `${p.model} ${text(p.name)} ${text(p.family)} ${p.ink||p.printer}`.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(normalized));
    document.getElementById('result-count').textContent=tr(`${visible.length} de 4 productos`,`${visible.length} of 4 products`);
    document.getElementById('product-results').innerHTML=visible.length ? visible.map(productCard).join('') : `<div class="empty-state"><h2>${tr('Sin coincidencias','No matches')}</h2><p>${tr('Prueba con M1, RG1, S70 o RCN1.','Try M1, RG1, S70 or RCN1.')}</p><button class="button outline" id="clear-filters">${tr('Limpiar filtros','Clear filters')}</button></div>`;
    document.querySelectorAll('[data-filter]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===catalogType)));
  }

  function product() {
    if (!selected) return `${crumb(tr('Producto','Product'))}<section class="section container empty-state"><h1>${tr('Producto no encontrado','Product not found')}</h1><p>${tr('Explora los equipos y cartuchos del catálogo de Colombia.','Explore the printers and cartridges in the Colombia catalog.')}</p>${link(url('catalogo.html'),tr('Ir al catálogo','Go to catalog'))}</section>`;
    const p=selected;
    const pair=products.find(other=>other.id===(p.ink||p.printer));
    const gallery=p.gallery.length ? p.gallery : [p.image];
    return `${crumb(`<a href="${url('catalogo.html')}">${tr('Catálogo','Catalog')}</a><span>/</span>${p.model}`)}<section class="container product-detail"><div class="gallery"><div class="gallery-main"><img id="gallery-image" src="${gallery[0]}" alt="${text(p.name)}" width="800" height="750"><span class="gallery-label">RIGEL / ${p.model}</span></div>${gallery.length>1 ? `<div class="gallery-thumbs" role="group" aria-label="${tr('Imágenes del producto','Product images')}">${gallery.map((img,i)=>`<button data-gallery="${i}" aria-pressed="${i===0}" aria-label="${tr('Ver imagen','View image')} ${i+1}"><img src="${img}" alt="" width="100" height="80"></button>`).join('')}</div>` : ''}</div><div class="product-detail-copy"><p class="eyebrow">${text(p.family)}</p><h1>${p.model}<span>${tr(p.type==='printer'?'Codificadora':'Cartucho de tinta',p.type==='printer'?'Coding printer':'Ink cartridge')}</span></h1><p class="detail-summary">${text(p.summary)}</p><p>${text(p.description)}</p><ul class="highlights">${p.highlights.map(h=>`<li><span aria-hidden="true">✓</span>${text(h)}</li>`).join('')}</ul><a href="${productUrl(pair.id)}" class="compatibility"><img src="${pair.image}" alt="" width="90" height="80"><span><small>${tr(p.type==='printer'?'SU CARTUCHO COMPATIBLE':'SU EQUIPO COMPATIBLE',p.type==='printer'?'MATCHING CARTRIDGE':'MATCHING PRINTER')}</small><strong>${pair.model}</strong></span>${arrow}</a><div class="detail-actions">${link(url('contacto.html',{producto:p.id}),tr('Solicitar cotización','Request a quote'))}<a class="text-link" href="#especificaciones">${tr('Ver especificaciones','View specifications')} ↓</a></div>${p.sheet?`<a class="download-link" href="${text(p.sheet)}" target="_blank" rel="noopener noreferrer">${download}${tr('Ficha técnica (PDF)','Technical data sheet (PDF)')}</a>`:''}</div></section><section class="section specifications" id="especificaciones"><div class="container specs-grid"><div><p class="eyebrow">${tr('CONOCE LOS DETALLES','THE DETAILS')}</p><h2>${tr('Especificaciones','Specifications')}</h2><p>${tr('Especificaciones de','Specifications for')} ${p.model}.</p><p class="small muted">${tr('Las prestaciones dependen de las condiciones de operación y del material. Confirma la configuración al cotizar.','Performance depends on operating conditions and the material. Confirm your configuration when requesting a quote.')}</p></div><div><table><caption class="sr-only">${tr('Especificaciones de','Specifications for')} ${p.model}</caption><tbody>${p.specs.map(([key,value])=>`<tr><th scope="row">${text(key)}</th><td>${text(value)}</td></tr>`).join('')}</tbody></table><p class="small muted">${tr('*Si aplica, autonomía y velocidad según condiciones de uso.','*Where applicable, battery life and speed depend on operating conditions.')}</p></div></div></section><section class="section container related">${sectionHeading(tr('LA COMBINACIÓN CORRECTA','THE RIGHT COMBINATION'),tr('Productos compatibles','Compatible products'))}<div class="related-pair">${productCard(pair)}<div><h3>${p.type==='printer'?p.model:pair.model} + ${p.type==='ink'?p.model:pair.model}</h3><p>${tr('Un equipo, su tinta compatible y la orientación para tu aplicación. Cuéntanos qué necesitas imprimir.','A printer, its compatible ink and advice for your application. Tell us what you need to print.')}</p>${link(url('contacto.html',{producto:p.id}),tr('Consultar combinación','Ask about this combination'))}</div></div></section>`;
  }

  const faqs = [
    [['¿Qué productos comercializa Rigel Colombia?','Which products does Rigel Colombia offer?'],['La oferta de Colombia incluye las codificadoras M1 y RG1, junto con los cartuchos S70 para M1 y RCN1 para RG1. Consulta disponibilidad y condiciones comerciales al cotizar.','The Colombia range includes M1 and RG1 coding printers, with S70 cartridges for M1 and RCN1 cartridges for RG1. Ask about availability and commercial terms when requesting a quote.']],
    [['¿Cuál es la diferencia entre M1 y RG1?','What is the difference between M1 and RG1?'],['La M1 tiene un formato compacto para trabajo manual y pantalla táctil de 3,5 pulgadas. La RG1 es tipo pistola, tiene pantalla de 4,3 pulgadas y permite trabajo manual o integración a una banda transportadora con la configuración adecuada.','M1 is a compact handheld printer with a 3.5-inch touchscreen. RG1 has a gun-style design, a 4.3-inch display, and supports handheld use or conveyor integration with the appropriate setup.']],
    [['¿Qué cartucho necesita cada equipo?','Which cartridge does each printer need?'],['En Colombia, la combinación es M1 con S70 y RG1 con RCN1. Los cartuchos no se presentan como intercambiables entre ambos equipos.','In Colombia, the combinations are M1 with S70 and RG1 with RCN1. The cartridges are not presented as interchangeable between the two printers.']],
    [['¿Puedo imprimir sobre mi empaque?','Can I print on my packaging?'],['Estos equipos permiten codificar sobre diversos materiales. La adherencia, el secado y la calidad varían según la superficie. Describe tu material y solicita orientación para validar una muestra antes de elegir.','These printers can code on different materials. Adhesion, drying and quality vary with the surface. Describe your material and ask for guidance on testing a sample before choosing.']],
    [['¿Puedo imprimir fechas, lotes y logotipos?','Can I print dates, batch numbers and logos?'],['Sí. M1 y RG1 permiten trabajar con fechas, lotes, textos, logotipos y códigos. Confirma el formato, tamaño y número de líneas de tu aplicación con un asesor.','Yes. M1 and RG1 support dates, batch numbers, text, logos and codes. Confirm the format, size and line count required for your application with an advisor.']],
    [['¿Dónde solicito una cotización o soporte?','Where can I request a quote or support?'],['Utiliza el formulario de contacto para preparar un correo al canal de atención de Rigel Colombia. Indica el modelo, el material y la información que deseas imprimir.','Use the contact form to prepare an email to Rigel Colombia’s support channel. Include the model, material and information you need to print.']],
    [['¿Los precios, envío y garantía están incluidos?','Are pricing, shipping and warranty included?'],['Los precios, la disponibilidad, el envío, el contenido del kit y la garantía se confirman en la cotización de Colombia. No se publica una promesa de entrega o stock en este catálogo.','Pricing, availability, shipping, kit contents and warranty are confirmed in your Colombia quotation. This catalog does not promise delivery dates or stock levels.']]
  ];

  function faq() {
    return `${crumb(tr('Preguntas frecuentes','FAQ'))}<section class="page-intro container"><p class="eyebrow">${tr('RESPUESTAS CLARAS','CLEAR ANSWERS')}</p><h1>${tr('Preguntas frecuentes','Frequently asked questions')}</h1><p>${tr('Lo que necesitas saber sobre equipos, tintas y tu próxima aplicación.','What you need to know about printers, inks and your next application.')}</p></section><section class="container faq-layout"><aside><span class="eyebrow">${tr('¿OTRA PREGUNTA?','ANOTHER QUESTION?')}</span><h2>${tr('Conversemos.','Let’s talk.')}</h2><p>${tr('Cada proceso es diferente. Estamos aquí para orientarte.','Every process is different. We are here to guide you.')}</p><a class="text-link" href="${url('contacto.html')}">${tr('Contactar a Rigel','Contact Rigel')}${arrow}</a></aside><div class="faq-list">${faqs.map(([q,a],i)=>`<details ${i===0?'open':''}><summary><span>${text(q)}</span><b aria-hidden="true">+</b></summary><p>${text(a)}</p></details>`).join('')}</div></section>${supportBlock()}`;
  }

  const guides = [
    {id:'elegir',image:'assets/productos/m1/galeria-2.webp',tag:['SELECCIÓN DE EQUIPO','PRINTER SELECTION'],title:['M1 o RG1: empieza por tu proceso.','M1 or RG1: start with your process.'],intro:['El formato de trabajo es el primer paso para elegir una codificadora.','Your workflow is the first step in choosing a coding printer.'],sections:[
      [['Piensa en cómo trabajas','Think about how you work'],['Si necesitas moverte entre productos y áreas de trabajo, la M1 ofrece un formato compacto y manual. Si tu proceso requiere uso manual y la posibilidad de integración a una línea, consulta la RG1.','If you need to move between products and work areas, M1 offers a compact handheld format. If your process needs handheld use with the option of line integration, ask about RG1.']],
      [['Define tu mensaje','Define your message'],['Prepara el texto, las fechas, los lotes y los códigos que vas a imprimir. Revisa la altura y el número de líneas de cada equipo en la tabla comparativa del catálogo.','Prepare the text, dates, batch numbers and codes you need to print. Review each printer’s print height and line count in the catalog comparison table.']],
      [['Valida el material','Test the material'],['Comparte una muestra o describe tu superficie. La selección de tinta y una prueba de adherencia ayudan a confirmar la combinación adecuada.','Share a sample or describe your surface. Ink selection and an adhesion test help confirm the right combination.']]
    ]},
    {id:'tintas',image:'assets/productos/rcn1/tinta-solvente-rigel-rcn1.webp',tag:['TINTAS Y CONSUMIBLES','INKS & CONSUMABLES'],title:['Un equipo, su cartucho correcto.','Every printer has its cartridge.'],intro:['Una guía breve para identificar S70 y RCN1.','A short guide to identifying S70 and RCN1.'],sections:[
      [['M1 + S70','M1 + S70'],['La M1 se comercializa en Colombia con el cartucho S70. Consulta la página del producto para revisar sus características y la altura de impresión.','M1 is offered in Colombia with the S70 cartridge. Visit the product page to review its features and print height.']],
      [['RG1 + RCN1','RG1 + RCN1'],['La RG1 utiliza el cartucho RCN1 dentro del portafolio de Colombia. Verifica el modelo de tu codificadora antes de solicitar un reemplazo.','RG1 uses the RCN1 cartridge in the Colombia range. Check your coding printer’s model before requesting a replacement.']],
      [['Antes de imprimir','Before printing'],['La calidad final depende de la superficie, la tinta y la operación. Sigue las instrucciones del equipo y solicita orientación sobre conservación, limpieza y pruebas de impresión.','The final result depends on the material, ink and operation. Follow the printer’s instructions and ask for guidance on storage, cleaning and print tests.']]
    ]},
    {id:'aplicacion',image:'assets/aplicaciones/bebidas.webp',tag:['TU APLICACIÓN','YOUR APPLICATION'],title:['Qué preparar antes de cotizar.','What to prepare before requesting a quote.'],intro:['La información que nos ayuda a orientar mejor tu proyecto.','The information that helps us guide your project.'],sections:[
      [['El producto y el empaque','The product and packaging'],['Indica el material, su forma y si la superficie está seca, húmeda, fría o a temperatura ambiente. Una fotografía o muestra puede facilitar la evaluación.','Specify the material, shape, and whether the surface is dry, wet, cold or at room temperature. A photograph or sample can help with evaluation.']],
      [['La información que imprimes','The information you print'],['Comparte un ejemplo de tu fecha, lote, texto, logotipo o código. Indica el espacio disponible y el número de líneas que necesitas.','Share an example of your date, batch number, text, logo or code. Specify the available space and the number of lines required.']],
      [['El ritmo de trabajo','Your production pace'],['Describe el volumen aproximado, los turnos y si trabajas manualmente o con una banda transportadora. Así podemos revisar la configuración adecuada.','Describe your approximate volume, shifts, and whether you work by hand or with a conveyor. This helps us review the appropriate setup.']]
    ]}
  ];

  function guidePage() {
    const guide=guides.find(g=>g.id===params.get('articulo'));
    if (guide) return `${crumb(`<a href="${url('guias.html')}">${tr('Guías','Guides')}</a><span>/</span>${text(guide.tag)}`)}<article class="container guide-article"><header><p class="eyebrow">${text(guide.tag)}</p><h1>${text(guide.title)}</h1><p class="lead">${text(guide.intro)}</p></header><img class="article-image" src="${guide.image}" alt="${text(guide.title)}" width="1000" height="600">${guide.sections.map(([title,body])=>`<section><h2>${text(title)}</h2><p>${text(body)}</p></section>`).join('')}<div class="article-action">${link(url('contacto.html'),tr('Consultar mi aplicación','Discuss my application'))}<a class="text-link" href="${url('guias.html')}">← ${tr('Todas las guías','All guides')}</a></div></article>`;
    return `${crumb(tr('Guías','Guides'))}<section class="page-intro container"><p class="eyebrow">${tr('CONOCIMIENTO QUE AYUDA','KNOWLEDGE THAT HELPS')}</p><h1>${tr('Guías de codificación','Coding guides')}</h1><p>${tr('Ideas prácticas para dar el siguiente paso en tu codificación.','Practical guidance for the next step in your coding process.')}</p></section><section class="container guide-grid">${guides.map((g,i)=>`<article class="guide-card"><a href="${url('guias.html',{articulo:g.id})}" tabindex="-1" aria-hidden="true"><img src="${g.image}" alt="" width="500" height="360" loading="lazy"></a><p class="eyebrow">0${i+1} / ${text(g.tag)}</p><h2><a href="${url('guias.html',{articulo:g.id})}">${text(g.title)}</a></h2><p>${text(g.intro)}</p><a class="text-link" href="${url('guias.html',{articulo:g.id})}">${tr('Leer guía','Read guide')}${arrow}</a></article>`).join('')}</section>${supportBlock()}`;
  }

  function contact() {
    const chosen=products.find(p=>p.id===params.get('producto'));
    const application=params.get('aplicacion');
    return `${crumb(tr('Contacto','Contact'))}<section class="container contact-layout"><div class="contact-copy"><p class="eyebrow">${tr('HABLEMOS DE TU PRODUCCIÓN','LET’S TALK ABOUT YOUR PRODUCTION')}</p><h1>${tr('Contacto','Contact')}</h1><p class="lead">${tr('Encuentra el equipo, el cartucho y la orientación que necesitas para tu aplicación.','Find the printer, cartridge and guidance you need for your application.')}</p><div class="contact-channel"><span class="eyebrow">${tr('RIGEL COLOMBIA','RIGEL COLOMBIA')}</span><a href="mailto:${esc(config.email)}">${esc(config.email)} ↗</a><p>${tr('Consultas para Colombia y orientación de producto.','Colombia inquiries and product guidance.')}</p>${config.whatsapp ? `<a class="text-link" href="https://wa.me/${esc(config.whatsapp)}" target="_blank" rel="noopener noreferrer">WhatsApp · ${esc(config.whatsappDisplay || config.whatsapp)} ${arrow}</a>` : ''}</div><div class="contact-steps"><span>01 / ${tr('Cuéntanos tu aplicación','Tell us about your application')}</span><span>02 / ${tr('Revisamos equipo y tinta','We review the printer and ink')}</span><span>03 / ${tr('Solicita tu cotización','Request your quote')}</span></div></div><form id="contact-form" class="contact-form"><h2>${tr('Cuéntanos qué necesitas.','Tell us what you need.')}</h2><p>${tr('Todos los campos marcados con * son obligatorios.','All fields marked with * are required.')}</p><div class="form-row"><label>${tr('Nombre','Name')} *<input name="name" autocomplete="name" required maxlength="100"></label><label>${tr('Empresa','Company')}<input name="company" autocomplete="organization" maxlength="120"></label></div><label>${tr('Correo electrónico','Email address')} *<input name="email" type="email" autocomplete="email" required maxlength="150"></label><div class="form-row"><label>${tr('Ciudad','City')}<input name="city" autocomplete="address-level2" maxlength="100"></label><label>${tr('Me interesa','I’m interested in')}<select name="product"><option value="">${tr('Necesito asesoría','I need advice')}</option>${products.map(p=>`<option value="${p.id}" ${chosen?.id===p.id?'selected':''}>${text(p.name)}</option>`).join('')}</select></label></div><label>${tr('Tu aplicación o consulta','Your application or question')} *<textarea name="message" rows="5" required maxlength="3000" placeholder="${tr('¿Qué material utilizas? ¿Qué necesitas imprimir?','What material do you use? What do you need to print?')}">${application ? esc(tr(`Aplicación: ${application}. `,`Application: ${application}. `)) : ''}</textarea></label><label class="check-label"><input type="checkbox" required><span>${tr('He leído la','I have read the')} <a href="${url('privacidad.html')}">${tr('información de privacidad','privacy information')}</a> ${tr('y deseo contactar a Rigel.','and wish to contact Rigel.')} *</span></label><button class="button primary" type="submit">${tr('Preparar correo','Prepare email')}${arrow}</button><p class="form-note">${tr('Se abrirá tu aplicación de correo con el mensaje preparado. Revisa el contenido y envíalo desde allí. Este formulario no envía ni almacena tus datos en un servidor.','Your email app will open with a prepared message. Review it and send it from there. This form does not send or store your data on a server.')}</p><p id="form-status" role="status"></p><a id="email-fallback" class="text-link" hidden>${tr('Abrir correo de nuevo','Open email again')}${arrow}</a></form></section>`;
  }

  function about() {
    return `${crumb(tr('Quiénes somos','About us'))}<section class="container about-layout"><div class="about-copy"><h1>${tr('Quiénes somos','About us')}</h1><p>${tr('Rigel es una empresa dedicada a la comercialización de equipos de marcaje y codificación. Ofrecemos soluciones para identificar productos y empaques mediante la impresión de fechas, lotes, textos, logotipos y códigos.','Rigel supplies marking and coding equipment. We offer solutions for identifying products and packaging by printing dates, batch numbers, text, logos and codes.')}</p><p>${tr('Fundada en Ecuador, Rigel tiene presencia en Colombia, Brasil, Venezuela, Chile y México. Trabajamos con empresas de distintos tamaños y sectores para encontrar una solución acorde con su proceso de producción.','Founded in Ecuador, Rigel has a presence in Colombia, Brazil, Venezuela, Chile and Mexico. We work with businesses of different sizes and industries to find a solution suited to their production process.')}</p><h2>Rigel Colombia</h2><p>${tr('En Colombia comercializamos las codificadoras M1 y RG1, junto con sus cartuchos compatibles: S70 para M1 y RCN1 para RG1. Nuestro catálogo permite revisar sus características y comparar las opciones de trabajo manual e integración a una línea.','In Colombia, we offer M1 and RG1 coding printers with their compatible cartridges: S70 for M1 and RCN1 for RG1. Our catalog lets you explore their features and compare handheld operation and line integration options.')}</p><h2>${tr('Asesoría para tu aplicación','Advice for your application')}</h2><p>${tr('Te orientamos en la selección del equipo y la tinta según el material, la información que necesitas imprimir y tu forma de trabajar. También puedes consultar sobre el uso de los equipos y sus consumibles.','We help you choose a printer and ink based on your material, the information you need to print and your workflow. You can also ask about using the equipment and its consumables.')}</p><a class="text-link" href="${url('contacto.html')}">${tr('Contactar a Rigel Colombia','Contact Rigel Colombia')}</a></div><figure class="about-photo"><img src="assets/soporte/soporte-tecnico-rigel.webp" alt="${tr('Trabajo de soporte técnico de Rigel','Technical support work at Rigel')}" width="700" height="850"><figcaption>${tr('Orientación y soporte de Rigel.','Guidance and support from Rigel.')}</figcaption></figure></section>`;
  }

  function privacy() {
    return `${crumb(tr('Privacidad','Privacy'))}<article class="container policy"><p class="eyebrow">RIGEL COLOMBIA</p><h1>${tr('Tu información.','Your information.')}</h1><h2>${tr('Cómo funciona el contacto','How contact works')}</h2><p>${tr('Este sitio es un catálogo informativo. El formulario prepara un mensaje en tu aplicación de correo. No lo envía automáticamente y no guarda los campos en un servidor del sitio. Tú decides si envías el correo a Rigel.','This website is an informational catalog. The form prepares a message in your email application. It does not send it automatically or save the fields on the site’s server. You decide whether to send the email to Rigel.')}</p><p>${tr('Si envías el mensaje, Rigel recibirá la información incluida para atender tu consulta. Puedes solicitar información sobre el tratamiento de tus datos al mismo canal de contacto:','If you send the message, Rigel will receive the information included to respond to your inquiry. You can ask about the handling of your information through the same contact channel:')} <a href="mailto:${esc(config.email)}">${esc(config.email)}</a>.</p><h2>${tr('Preferencia de idioma','Language preference')}</h2><p>${tr('Se guarda únicamente tu elección de español o inglés en el almacenamiento local de tu navegador. Puedes eliminarla borrando los datos del sitio. El catálogo funciona aunque este almacenamiento no esté disponible.','Only your Spanish or English preference is saved in your browser’s local storage. You can remove it by clearing the site’s data. The catalog works even when this storage is unavailable.')}</p><h2>${tr('Servicios externos','External services')}</h2><p>${tr('Los enlaces a Rigel Ecuador y WhatsApp, abren servicios externos sujetos a sus propias políticas. El proveedor de alojamiento puede procesar registros técnicos necesarios para servir la web. No se han integrado herramientas de publicidad ni analítica en este catálogo.','Links to Rigel Ecuador and WhatsApp open external services subject to their own policies. The hosting provider may process technical logs needed to serve the website. This catalog does not integrate advertising or analytics tools.')}</p></article>`;
  }

  function render() {
    document.documentElement.lang=language;
    const titles={home:tr('Codificadoras y tintas para Colombia','Coding printers and inks for Colombia'),catalog:tr('Catálogo','Catalog'),product:selected ? text(selected.name) : tr('Producto','Product'),faq:tr('Preguntas frecuentes','FAQ'),guides:tr('Guías de codificación','Coding guides'),contact:tr('Contacto y soporte','Contact and support'),privacy:tr('Privacidad','Privacy'),about:tr('Quiénes somos','About us')};
    document.title=`${titles[page]||titles.home} | Rigel Colombia`;
    document.querySelector('meta[name="description"]').content=tr('Catálogo Rigel Colombia: codificadoras M1 y RG1, cartuchos S70 y RCN1. Explora características, compara equipos y solicita asesoría.','Rigel Colombia catalog: M1 and RG1 coding printers, S70 and RCN1 ink cartridges. Explore features, compare printers and get advice.');
    document.querySelector('.skip-link').textContent=tr('Ir al contenido','Skip to content');
    header();
    const views={home,catalog,product,faq,guides:guidePage,contact,about,privacy};
    document.getElementById('main-content').innerHTML=(views[page]||home)();
    footer();
    initCarousel();
    if(page==='catalog') updateCatalog();
    document.getElementById('contact-form')?.addEventListener('submit', event=>{
      event.preventDefault();
      const form=event.currentTarget;
      if(!form.reportValidity()) return;
      const data=new FormData(form);
      const model=products.find(p=>p.id===data.get('product'));
      const subject=tr('Consulta Colombia','Colombia inquiry')+(model?` — ${model.model}`:'');
      const body=[`${tr('Nombre','Name')}: ${data.get('name')}`,`${tr('Empresa','Company')}: ${data.get('company')}`,`${tr('Correo','Email')}: ${data.get('email')}`,`${tr('Ciudad','City')}: ${data.get('city')}`,`${tr('Producto','Product')}: ${model?text(model.name):tr('Asesoría','Advice')}`,'',data.get('message')].join('\r\n');
      const mailto=`mailto:${config.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const fallback=document.getElementById('email-fallback'); fallback.href=mailto;fallback.hidden=false;
      document.getElementById('form-status').textContent=tr('Mensaje preparado. Si no se abrió una aplicación de correo, configura una o escribe directamente al correo indicado.','Message prepared. If an email app did not open, configure one or write directly to the address shown.');
      location.href=mailto;
    });
  }

  document.addEventListener('click', event=>{
    const slideTarget=event.target.closest('[data-slide-target]');
    if(slideTarget)showSlide(Number(slideTarget.dataset.slideTarget));
    const languageButton=event.target.closest('[data-language]');
    if(languageButton && languageButton.dataset.language!==language) {
      // Carry the current product and anchor into the other language.
      const next=new URL(location.href);next.searchParams.set('lang',languageButton.dataset.language);
      try {localStorage.setItem('rigel-language',languageButton.dataset.language);} catch (_) { /* Optional preference. */ }
      location.href=next.href;
      return;
    }
    const toggle=event.target.closest('.menu-toggle');
    if(toggle) {
      const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));
      toggle.setAttribute('aria-label',tr(open?'Cerrar menú':'Abrir menú',open?'Close menu':'Open menu'));
      document.getElementById('main-nav').classList.toggle('is-open',open);
    }
    const filter=event.target.closest('[data-filter]');
    if(filter) {catalogType=filter.dataset.filter;updateCatalog();}
    if(event.target.closest('#clear-filters')) {catalogType='all';catalogSearch='';document.getElementById('catalog-search').value='';updateCatalog();}
    const thumb=event.target.closest('[data-gallery]');
    if(thumb && selected) {
      const image=document.getElementById('gallery-image');image.src=selected.gallery[Number(thumb.dataset.gallery)];
      document.querySelectorAll('[data-gallery]').forEach(button=>button.setAttribute('aria-pressed',String(button===thumb)));
    }
  });
  document.addEventListener('input',event=>{
    if(event.target.id==='catalog-search') {catalogSearch=event.target.value;updateCatalog();}
  });
  document.addEventListener('keydown',event=>{
    if(page==='home' && event.target.closest?.('.home-carousel') && ['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();showSlide(carouselIndex+(event.key==='ArrowRight'?1:-1));}
    if(event.key==='Escape') {
      const toggle=document.querySelector('.menu-toggle');toggle?.setAttribute('aria-expanded','false');
      document.getElementById('main-nav')?.classList.remove('is-open');
    }
  });
  render();
})();
