const express = require('express');
const app = express();
const port = 3001;


const tarifas = {
    elsalvador: 1.50,
    guatemala: 2.00,
    honduras: 2.25,
    nicaragua: 2.50,
    costarica: 3.00,
    panama: 3.50
};



function calcularEnvio(pais, peso) {

    const tarifa = tarifas[pais];

    let costo = tarifa * peso;

    
    if (peso > 20) {
        costo = costo - (costo * 0.10);
    }

    
    if (peso < 1) {
        costo = costo + 5;
    }

    return Number(costo.toFixed(2));
}



app.get('/api/envio/:pais/:peso', (req, res) => {

    try {

        const pais = req.params.pais.toLowerCase();
        const peso = Number(req.params.peso);


        // Validación del país
        if (!tarifas[pais]) {
            return res.status(400).json({
                error: 'País no permitido. Los países permitidos son: El Salvador, Guatemala, Honduras, Nicaragua, Costa Rica y Panama.'
            });
        }


        // Validación del peso
        if (isNaN(peso)) {
            return res.status(400).json({
                error: 'El peso debe ser un número.'
            });
        }


        // Validación de peso mayor a cero
        if (peso <= 0) {
            return res.status(400).json({
                error: 'El peso debe ser mayor a 0 kg.'
            });
        }


        
        const costo = calcularEnvio(pais, peso);


       
        res.json({
            pais: pais,
            peso: peso,
            tarifa: tarifas[pais],
            costoEnvio: costo
        });


    } catch (error) {

        res.status(500).json({
            error: 'Ocurrió un error al calcular el costo de envío.'
        });

    }

});



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});