const productos= [
    {
     id:1, 
     nombre:"Combo Café Molido Brasil y Tipo Italiano 250gr",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/157815-800-auto?v=638277292938700000&width=800&height=auto&aspect=true",
     precio:13251,
 },
 {
     id:2, 
     nombre:"Combo Café Molido Suave 260g x2 packs",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/157698-800-auto?v=638211466391500000&width=800&height=auto&aspect=true",
     precio:11089,
 },
 {
     id:3, 
     nombre:"Combo Café Molido Selecto 250 gs x 2 packs",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/159008-800-auto?v=638340291225030000&width=800&height=auto&aspect=true",
     precio:15980,
 },{
     id:4, 
     nombre:"Cápsulas LUNGO compatibles con máquinas",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/157003-800-auto?v=637855373255100000&width=800&height=auto&aspect=true",
     precio:8180,
 },{
     id:5, 
     nombre:"Combo 80 Cápsulas Cafe Martinez",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/159013-800-auto?v=638342907382700000&width=800&height=auto&aspect=true",
     precio:70740,
 },{
     id:6, 
     nombre:"Combo 60 Cápsulas 1933",
     imagen:"https://cafemartinez.vtexassets.com/arquivos/ids/159121-1600-auto?v=638350672779000000&width=1600&height=auto&aspect=true",
     precio:37176,
 }
 ];

const guardarProductosLS = (productos) => {
    localStorage.setItem("productos", JSON.stringify(productos));
}

const obtenerProductosLS = () => {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

const guardarCarritoLS = (productos) => {
    localStorage.setItem("carrito", JSON.stringify(productos));
}

const obtenerCarritoLS = () => {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

const obtenerIdProductoLS = () => {
    return JSON.parse(localStorage.getItem("producto")) || 0;
}

const obtenerIdCategoriaLS = () => {
    return JSON.parse(localStorage.getItem("categoria")) || "todos";
}

const cantTotalProductos = () => {
    const carrito = obtenerCarritoLS();

    return carrito.length;
}

const sumaTotalProductos = () => {
    const carrito = obtenerCarritoLS();
    
    return carrito.reduce((acumulador, item) => acumulador += item.precio, 0);
}

const eliminarCarrito = () => {
    localStorage.removeItem("carrito");
    renderCarrito();
    renderBotonCarrito();
    notificacion("Carrito Eliminado!");
}

const verProducto = (id) => {
    localStorage.setItem("producto", JSON.stringify(id));
}

const verProductosPorCategoria = (id) => {
    localStorage.setItem("categoria", JSON.stringify(id));
}

const buscarProducto = () => {
    const productos = obtenerProductosLS();
    const id = obtenerIdProductoLS();
    const producto = productos.find(item => item.id === id);

    return producto;
}

const agregarProductoCarrito = () => {
    const producto = buscarProducto();
    const carrito = obtenerCarritoLS();
    carrito.push(producto);
    guardarCarritoLS(carrito);
    renderBotonCarrito();
    notificacion("Producto Agregado!");
}

const eliminarProductoCarrito = (id) => {
    const carrito = obtenerCarritoLS();
    const carritoActualizado = carrito.filter(item => item.id != id);
    guardarCarritoLS(carritoActualizado);
    renderCarrito();
    renderBotonCarrito();
    notificacion("Producto Eliminado!");
}

const renderBotonCarrito = () => {
    document.getElementById("totalCarrito").innerHTML = cantTotalProductos();
}

const finalizarCompra = () => {
    Swal.fire({
        title: "Gracias por tu Compra!",
        text: "El total a pagar es $" + sumaTotalProductos() + " pesos.",
        imageUrl: "https://centrofranchising.com/wp-content/uploads/2018/01/CAFE-MARTINEZ-Franquicias-LOGO.png",
        imageWidth: 160,
        imageAlt: "Cafe Martinez",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Aceptar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCarrito();
            }
        });
}

const notificacion = (texto) => {
    Swal.fire({
        position: "top-end",
        title: texto,
        showConfirmButton: false,
        timer: 1000
    });
}

guardarProductosLS(productos);