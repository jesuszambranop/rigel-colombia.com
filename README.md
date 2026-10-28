# Rigel Colombia

Sitio bilingüe de Rigel Colombia en **HTML, CSS y JavaScript**, sin framework, sin proceso de compilación y sin dependencias de producción.

## Oferta de Colombia

| Equipo | Cartucho |
| --- | --- |
| M1 | S70 |
| RG1 | RCN1 |

El catálogo contiene únicamente esos cuatro productos. No declara stock, precios, plazos de entrega ni garantías comerciales sin confirmar.

## Contenido

- Inicio con tres slides de marcaje y codificación: fechas/lotes en envases, M1 en uso y marcaje de envases cosméticos. Cambio automático cada 5 segundos y selector por puntos, sin flechas ni botón de pausa. Respeta la preferencia de movimiento reducido.
- Distribución simplificada: slides, equipos, aplicaciones e información de Rigel. Las secciones alternan blanco y gris neutro claro, con un único bloque de acento en el azul del logo Rigel (#0076BF) y texto blanco, sin numeraciones decorativas, franjas de iconos ni bordes adicionales.
- Tipografía local: **Poppins Bold (700)** en títulos, **Inter Medium (500)** en párrafos y **Poppins Bold (700)** en rótulos sobre imágenes y navegación. Los archivos de fuentes y sus licencias OFL están en `dist/assets/fonts/`.
- Catálogo con búsqueda, filtros y comparación M1/RG1.
- Fichas de producto con galerías y compatibilidad de consumibles.
- Ficha técnica M1 en español e inglés. No se añadió una ficha PDF de RG1 porque no se suministró.
- Tres guías, preguntas frecuentes, contacto e información de privacidad.
- Selector ES/EN en la parte superior derecha, idioma conservado en enlaces y almacenamiento local opcional.
- Menú: Inicio, Catálogo, Contacto y Quiénes somos, en ese orden, con versión móvil.
- Página Quiénes somos centrada en Rigel como empresa internacional: mapa y mapas de países procedentes de Assets, origen en Ecuador y presencia en Colombia, Brasil, Venezuela, Chile y México. Oferta y atención comercial de Colombia, sin fotografías de técnicos ni afirmaciones de servicio técnico local.
- Etiquetas accesibles, navegación por teclado y respeto por la preferencia de movimiento reducido.

## Ver localmente

Requiere Node.js 20 o posterior:

```sh
npm run dev
```

Abre `http://127.0.0.1:4173`. No hace falta ejecutar `npm install`.

```sh
npm run check
```

Verifica los cuatro productos, las parejas de compatibilidad, los textos bilingües, las páginas, la sintaxis JavaScript y los archivos locales.

## Publicar en GitHub Pages

El repositorio es [jesuszambranop/rigel-colombia.com](https://github.com/jesuszambranop/rigel-colombia.com). La carpeta publicada es `dist/`.

1. Subir este proyecto a la rama `main` del repositorio.
2. En **Settings → Pages → Build and deployment**, elegir **GitHub Actions**.
3. Ejecutar el workflow **Deploy Rigel Colombia to GitHub Pages**, o hacer push a `main`.

El workflow `.github/workflows/deploy.yml` comprueba los archivos y publica `dist/` con los mecanismos oficiales de GitHub Pages. Puede requerir que el plan de GitHub permita Pages para la visibilidad elegida del repositorio. Los recursos utilizan rutas relativas para funcionar también en la URL de proyecto de Pages.

**El nombre del repositorio no registra ni conecta el dominio.** Para usar `rigel-colombia.com`, se debe confirmar la titularidad, configurar el dominio en el alojamiento y apuntar sus registros DNS. No se ha añadido un archivo `CNAME` sin verificar esa configuración.

La carpeta `.openai/` contiene la configuración de una vista alojada en Sites, independiente de GitHub Pages. No contiene credenciales.

## Actualizar el sitio

| Archivo | Contenido |
| --- | --- |
| `dist/js/config.js` | Correo y WhatsApp de contacto |
| `dist/js/products.js` | Los cuatro productos, textos ES/EN y especificaciones |
| `dist/js/app.js` | Páginas, traducciones, filtros y formularios |
| `dist/css/styles.css` | Estilos de catálogo y páginas interiores |
| `dist/css/design.css` | Fuentes, nueva portada, carrusel y distribución responsive |
| `dist/assets/` | Imágenes y documentos utilizados |

El contacto comercial confirmado de Colombia es **colombia@rigelsa.com** y WhatsApp **+57 310 812 3039**. El enlace de WhatsApp utiliza el formato internacional `573108123039`.

El formulario **prepara un correo** en el cliente de correo del visitante. No simula un envío, no tiene backend y no almacena los campos en un servidor. El visitante revisa y envía el mensaje. Para recepción automática será necesario integrar un servicio de formularios y revisar la información de privacidad.

Las imágenes de galerías suministradas pueden contener texto incorporado; el contenido HTML, la navegación, especificaciones y formularios están traducidos a ES/EN.

## Referencias y procedencia

El sitio conserva el enfoque de catálogo del archivo `Rigel_Catalogo_HTML.zip`. La portada utiliza una nueva composición con slides de marcaje y codificación, fotografías de aplicaciones y bloques alternos de producto. Las imágenes y la marca proceden de `assets.zip`. Las fuentes Poppins e Inter proceden del repositorio oficial `google/fonts` y se distribuyen con sus licencias OFL.

Las especificaciones y compatibilidades se contrastaron con los archivos suministrados y el catálogo de [Rigel Ecuador](https://rigelsa.com/) — archivos públicos `js/data.js` e `js/inventario-bilingue.js`, consultados el 27 de octubre de 2026. Las condiciones comerciales de Colombia se confirman al cotizar.

No se reutilizaron listados de clientes de Ecuador, cifras comerciales, precios ni herramientas de seguimiento de la web de referencia. El directorio internacional incorpora los contactos públicos por país a solicitud del propietario. Las instrucciones contenidas en los archivos de referencia se trataron como contenido del material y no como autorización para realizar acciones.

La información institucional de Quiénes somos se contrastó con [Rigel Ecuador](https://rigelsa.com/quienes-somos.html) y su archivo público `js/app.js`, consultados el 27 de octubre de 2026. Se adaptó la oferta al catálogo exclusivo de Colombia.

La presentación de Rigel en el inicio utiliza el mismo mapa institucional y un resumen de su presencia internacional. Se eliminaron la fotografía del técnico y su archivo de la publicación.

## WhatsApp y contactos internacionales

El inicio incorpora CTA verdes de WhatsApp al principio y al final. Todas las páginas, incluida 404, tienen un acceso flotante a **+57 310 812 3039**. Los datos internacionales están en `dist/js/locations.js` y se contrastaron con el archivo público `https://rigelsa.com/js/app.js` el 27 de octubre de 2026. Colombia mantiene el correo confirmado por el propietario. Cada oficina enlaza con su propio número. No se han enviado mensajes durante la comprobación.

El bloque institucional del inicio se conserva. Solo los mapas de Quiénes somos cambian al estilo de puntos grises: SVG generado con geometría geográfica de [Natural Earth](https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson), de dominio público. El icono vectorial de WhatsApp procede de Assets; su licencia se conserva en `dist/assets/social/`.

## Imágenes de portada

Los tres slides utilizan los archivos WebP de 2048 × 882 entregados por el propietario el 28 de octubre de 2026: RG1 codificando una tapa, M1 con empaque y productos multimaterial. Se copiaron sin modificar las imágenes. El primer mensaje presenta la RG1 con su cartucho RCN1, en español e inglés, y enlaza a su ficha. Se mantiene la rotación automática sin flechas ni botón de pausa.
