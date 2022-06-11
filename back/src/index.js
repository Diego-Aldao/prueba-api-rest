const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const productos = [
  {
    id: 1,
    nombre: "monitor samsung 24'",
    precio: 38000,
    imagen: "/back/images/monitor.png",
    disponible: true,
    vendedor: "samsung",
    cuotas: [3, 6, 12],
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quas quia dolore harum aperiam sunt necessitatibus",
    colores: ["black", "gray", "darkblue"],
  },
  {
    id: 5,
    nombre: "mouse gamer redragon RGB",
    precio: 5600,
    imagen: "/back/images/mouse.png",
    disponible: false,
    vendedor: "mercado libre",
    cuotas: [1, 3, 6, 12],
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quas quia dolore harum aperiam sunt necessitatibus",
    colores: ["gray", "black", "red", "yellow"],
  },
  {
    id: 8,
    nombre: "teclado logitech inalambrico",
    precio: 7800,
    imagen: "/back/images/teclado.png",
    disponible: false,
    vendedor: "fravega",
    cuotas: [1, 3, 6, 12],
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quas quia dolore harum aperiam sunt necessitatibus",
    colores: ["red", "black", "gray", "white"],
  },
  {
    id: 15,
    nombre: "impresora HP multifunción",
    precio: 45000,
    imagen: "/back/images/impresora.png",
    disponible: true,
    vendedor: "compumundo",
    cuotas: [6, 12],
    descripcion:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam quas quia dolore harum aperiam sunt necessitatibus",
    colores: ["black", "gray"],
  },
];
//FUNCION PARA CUANDO EL METODO PIDE UN ID
const buscarProducto = (request, jsonProductos) => {
  const productoId = request.params.id;
  const productoEspecifico = jsonProductos.find(
    (producto) => producto.id == productoId
  );
  return productoEspecifico;
};

//METODOS GET
app.get("/productos", (req, res) => {
  res.json(productos);
});

app.get("/productos/:id", (req, res) => {
  res.json(buscarProducto(req, productos));
});

//METODOS POST
app.post("/productos", (req, res) => {
  res.json({ message: "Producto agregado correctamente" });
});

//METODOS PUT
app.put("/productos/:id", (req, res) => {
  res.json({
    message: `${
      buscarProducto(req, productos).nombre
    } ha sido modificado correctamente`,
  });
});

//METODOS DELETE
app.delete("/productos/:id", (req, res) => {
  res.json({
    message: `${
      buscarProducto(req, productos).nombre
    } ha sido eliminado correctamente`,
  });
});

app.listen(8000);
