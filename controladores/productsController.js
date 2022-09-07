const fs = require('fs');

const db = JSON.parse(fs.readFileSync(__dirname + '/db/db.json', 'utf8'));

const productsController = {
    listar : (req, res) => {
        res.send(db);
    },
    detalle: (req, res) => {
        let id = req.params.id;

        let filtrerId = db.filter(el => el.id == id)

        res.send(filtrerId);
    },
    crear: (req, res) => {
        let newProduct = req.body;
        let response = "No se pudo agergar el producto";

        if(newProduct.precio && newProduct.nombre){
            let id = db.at(-1).id + 1;
            let productNew = {
                id: id,
                nombre: newProduct.nombre,
                precio: newProduct.precio
            }

            db.push(productNew);

            fs.writeFileSync(__dirname + '/db/db.json',JSON.stringify(db));

            response = "Se agrego producto correctamente"
        }

        res.send(response);
    },
    editar: (req, res) => {
        let id = req.params.id;
        let product = db.filter(el => el.id == id)

        if(product){
            let data = req.body;

            if(data.nombre) product[0].nombre = data.nombre;
            if(data.precio) product[0].precio = data.precio;
            
            fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(db));

            res.send("Se edito correctamente el producto")
        }else {
            res.send("No existe el producto")
        }
    },
    borrar: (req, res) => {
        let id = req.params.id;
        
        if(db.find(el => el.id == id)){
            let products = db.filter(el => el.id != id);

            fs.writeFileSync(__dirname + '/db/db.json', JSON.stringify(products));
            res.send("Se borro correctamente el producto")
        }else {
            res.send('No se encontro el producto')
        }
    }
}

module.exports = productsController;