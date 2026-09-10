const http = require('http');
const port = 3000;

// IVA del 13%
const tasaIva = 0.13;

function calcularIVA(monto) {
  return Number((monto * tasaIva));
}

// Retención del Impuesto Sobre la Renta
function calcularRenta(monto) {
  if (monto <= 550.00) {
    return 0;
  }

  if (monto <= 895.24) {
    return Number((17.67 + (monto - 550.00) * 0.10));
  }

  if (monto <= 2038.10) {
    return Number((60.00 + (monto - 895.24) * 0.20));
  }

  return Number((288.57 + (monto - 2038.10) * 0.30));
}

const server = http.createServer((req, res) => {

  // GET /api/calculo/:monto
  if (req.method === 'GET' && req.url.startsWith('/api/calculo/')) {

    // Obtener el monto de la URL
    const montoTexto = req.url.split('/')[3];
    const monto = Number(montoTexto);

    // Validaciones
    if (isNaN(monto) || monto === 0 || monto < 0) {
      res.writeHead(400, {
        'Content-Type': 'application/json'
      });

      return res.end(JSON.stringify({
        error: 'El salario debe ser un número mayor a cero'
      }));
    }

    // Resultado
    const resultado = {
      monto: monto,
      iva: calcularIVA(monto),
      renta: calcularRenta(monto)
    };

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(resultado));
  }

  
});

server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});