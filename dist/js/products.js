window.RIGEL_PRODUCTS = [
  {
    id: 'm1', model: 'M1', type: 'printer', ink: 's70', image: 'assets/productos/m1/principal.webp',
    gallery: ['assets/productos/m1/principal.webp','assets/productos/m1/galeria-1.webp','assets/productos/m1/galeria-2.webp'],
    name: ['Codificadora M1','M1 coding printer'], family: ['Portátil y compacta','Compact handheld'],
    summary: ['Toda tu información, en la palma de tu mano.','All your product information, in the palm of your hand.'],
    description: ['Una codificadora portátil con pantalla táctil de 3,5 pulgadas para imprimir fechas, lotes, textos, logotipos y códigos sobre diferentes superficies. Su formato compacto facilita el trabajo de una mano.','A handheld coding printer with a 3.5-inch touchscreen for printing dates, batch numbers, text, logos and codes on different materials. Its compact design makes one-handed operation easy.'],
    highlights: [['Pantalla táctil de 3,5″','3.5″ touchscreen'],['De 1 a 4 líneas','1 to 4 print lines'],['Cartucho S70','S70 cartridge']],
    specs: [
      [['Operación','Operation'],['Manual / portátil','Handheld']],
      [['Pantalla','Display'],['Táctil de 3,5 pulgadas','3.5-inch touchscreen']],
      [['Altura de impresión','Print height'],['12,7 mm','12.7 mm']],
      [['Líneas de impresión','Print lines'],['1 a 4','1 to 4']],
      [['Longitud de impresión','Print length'],['Hasta 1,5 m','Up to 1.5 m']],
      [['Resolución','Resolution'],['1000 / 600 DPI','1000 / 600 DPI']],
      [['Batería','Battery'],['4 a 6 horas*','4 to 6 hours*']],
      [['Peso','Weight'],['218 g','218 g']],
      [['Formatos de imagen','Image formats'],['JPG, BMP y PNG','JPG, BMP and PNG']],
      [['Cartucho para Colombia','Cartridge for Colombia'],['S70','S70']]
    ],
    sheet: ['assets/productos/m1/ficha-tecnica.pdf','assets/productos/m1/technical-data-sheet.pdf']
  },
  {
    id: 'rg1', model: 'RG1', type: 'printer', ink: 'rcn1', image: 'assets/productos/rg1/codificadora-portatil-rg1-rigel.webp',
    gallery: ['assets/productos/rg1/codificadora-portatil-rg1-rigel.webp','assets/productos/rg1/codificadora-rg1-fechas-lotes-codigos.webp','assets/productos/rg1/kit-codificadora-rg1-maletin-accesorios.webp'],
    name: ['Codificadora RG1','RG1 coding printer'], family: ['Manual y automática','Handheld and inline'],
    summary: ['De tu mano a tu línea de producción.','From your hand to your production line.'],
    description: ['Codificadora tipo pistola con pantalla de alta definición de 4,3 pulgadas y puerto para fotosensor. Trabaja de forma manual o se integra a una banda transportadora con la configuración adecuada.','A handheld gun-style coding printer with a 4.3-inch high-definition display and a photoelectric sensor port. Operate it by hand or integrate it into a conveyor with the appropriate setup.'],
    highlights: [['Pantalla HD de 4,3″','4.3″ HD display'],['De 1 a 6 líneas','1 to 6 print lines'],['Cartucho RCN1','RCN1 cartridge']],
    specs: [
      [['Operación','Operation'],['Manual o automática','Handheld or inline']],
      [['Pantalla','Display'],['HD de 4,3 pulgadas','4.3-inch HD display']],
      [['Altura de impresión','Print height'],['12,7 mm','12.7 mm']],
      [['Líneas de impresión','Print lines'],['1 a 6','1 to 6']],
      [['Longitud de impresión','Print length'],['Hasta 1 m','Up to 1 m']],
      [['Resolución','Resolution'],['600 / 300 DPI','600 / 300 DPI']],
      [['Velocidad de impresión','Print speed'],['Hasta 30 m/min*','Up to 30 m/min*']],
      [['Batería','Battery'],['Hasta 16 horas*','Up to 16 hours*']],
      [['Peso','Weight'],['420 g','420 g']],
      [['Cartucho para Colombia','Cartridge for Colombia'],['RCN1','RCN1']]
    ]
  },
  {
    id: 's70', model: 'S70', type: 'ink', printer: 'm1', image: 'assets/productos/s70/principal.webp', gallery: [],
    name: ['Cartucho de tinta S70','S70 ink cartridge'], family: ['Tinta solvente · M1','Solvent ink · M1'],
    summary: ['El cartucho para tu codificadora M1.','The cartridge for your M1 coding printer.'],
    description: ['Tinta solvente de secado rápido para impresión de fechas, lotes, textos, logotipos y códigos. El cartucho S70 es la opción comercializada por Rigel Colombia para la codificadora M1.','Fast-drying solvent ink for dates, batch numbers, text, logos and codes. S70 is the cartridge offered by Rigel Colombia for the M1 coding printer.'],
    highlights: [['Secado rápido','Fast drying'],['Altura de 12,7 mm','12.7 mm print height'],['Compatible con M1','Compatible with M1']],
    specs: [
      [['Tecnología','Technology'],['Inyección térmica TIJ','TIJ thermal inkjet']],
      [['Tipo de tinta','Ink type'],['Solvente de secado rápido','Fast-drying solvent ink']],
      [['Altura de impresión','Print height'],['12,7 mm / 0,5″','12.7 mm / 0.5″']],
      [['Equipo compatible','Compatible printer'],['M1','M1']]
    ]
  },
  {
    id: 'rcn1', model: 'RCN1', type: 'ink', printer: 'rg1', image: 'assets/productos/rcn1/tinta-solvente-rigel-rcn1.webp', gallery: [],
    name: ['Cartucho de tinta RCN1','RCN1 ink cartridge'], family: ['Tinta solvente · RG1','Solvent ink · RG1'],
    summary: ['La tinta original para tu RG1.','Original ink for your RG1.'],
    description: ['Cartucho de tinta solvente RIGEL de secado rápido para una impresión definida sobre distintas superficies. La combinación comercializada por Rigel Colombia es RG1 con cartucho RCN1.','An original RIGEL fast-drying solvent ink cartridge for sharp printing on different materials. Rigel Colombia offers the RG1 with the RCN1 cartridge.'],
    highlights: [['Tinta original RIGEL','Original RIGEL ink'],['Secado rápido','Fast drying'],['Compatible con RG1','Compatible with RG1']],
    specs: [
      [['Tecnología','Technology'],['Inyección térmica TIJ','TIJ thermal inkjet']],
      [['Tipo de tinta','Ink type'],['Solvente de secado rápido','Fast-drying solvent ink']],
      [['Altura de impresión','Print height'],['12,7 mm / 0,5″','12.7 mm / 0.5″']],
      [['Equipo compatible','Compatible printer'],['RG1','RG1']]
    ]
  }
];
