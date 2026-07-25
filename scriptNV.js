
let detallesVenta = [];

const btnVenta = document.getElementById("btn-venta");

btnVenta.addEventListener("click", ()  =>{

    realizarVenta();   
});

function cargarProductos(){
        // hace una petición HTTP, parecido a Postman para hacer GET
        fetch("http://localhost:8080/api/productos")
        // cuando la respuesta llega (El GET) lo pasa de texto a objeto JS
        .then(response => response.json())
        //productos ya es lista como un array de objetos JS
        .then(productos => {

            const tProductos = document.getElementById("tabla-productos");

            tProductos.innerHTML = "";
            productos.forEach(producto => {
            
                const fila = document.createElement("tr");
                const celdaId = document.createElement("td");
                const celdaN = document.createElement("td");
                const celdaP = document.createElement("td");
                const celdaS = document.createElement("td");

                const celdaAcc = document.createElement("td");
                const inputCantidad =document.createElement("input");

                const celdaAg = document.createElement("td");
                const btnAgregarC = document.createElement("button");

                celdaAcc.appendChild(inputCantidad);

                btnAgregarC.textContent = "Agregar";
                celdaAg.appendChild(btnAgregarC);

                celdaId.textContent = producto.id;
                fila.appendChild(celdaId);
                celdaN.textContent = producto.nombre;
                fila.appendChild(celdaN);
                celdaP.textContent = producto.precio;
                fila.appendChild(celdaP);
                celdaS.textContent = producto.stock;
                fila.appendChild(celdaS);

                fila.appendChild(celdaAcc);

                fila.appendChild(celdaAg);
                

                tProductos.appendChild(fila);


                //boton agregar cantidad
                btnAgregarC.addEventListener("click", ()  =>{

                    //obtener cantidad
                    //obtener id del producto
                    //obtener id del empleado
                    const cantidad = parseInt(inputCantidad.value);
                    const id = celdaId.textContent;
                    const nombre = celdaN.textContent;
                    const precio = parseFloat(celdaP.textContent);

                    
                    if(inputCantidad <0 || isNaN(cantidad)){
                         alert("Ingrese una cantidad");
                        return;
                    }


                    detallesVenta.push({

                        id: id,
                        nombre: nombre,
                        precio: precio,
                        cantidad: cantidad
                    });

                    console.log(detallesVenta);
                    cargarDetalles();
                })

                
            }); 
        });
        }

        cargarProductos();

function cargarDetalles(){

    
    const tDetalles = document.getElementById("tabla-detalle");
    tDetalles.innerHTML="";
    let total = 0;
    detallesVenta.forEach((detallesV, index) => {
       
                
                const fila = document.createElement("tr");

                let subtotal;
                
                subtotal = detallesV.cantidad * detallesV.precio;

                total += subtotal;
                const celdaNombre = document.createElement("td");
                const celdaProducto = document.createElement("td");
                const celdaSubtotal = document.createElement("td");
                const celdaCantidad = document.createElement("td");
                const celdaPrecio = document.createElement("td");

                const celdaEliminar = document.createElement("td");
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";

                celdaEliminar.appendChild(btnEliminar);
        

                celdaNombre.textContent = detallesV.nombre;
                fila.appendChild(celdaNombre);
                celdaSubtotal.textContent = subtotal;
                fila.appendChild(celdaSubtotal);
                celdaCantidad.textContent = detallesV.cantidad;
                fila.appendChild(celdaCantidad);
                celdaPrecio.textContent = detallesV.precio;
                fila.appendChild(celdaPrecio);

                fila.appendChild(celdaEliminar);
 
                tDetalles.appendChild(fila)

                btnEliminar.addEventListener("click", () =>{

                
                   detallesVenta.splice(index, 1);

                   cargarDetalles();
                   
                });
     });

     document.getElementById("total-venta").textContent = "Total: $" + total;
}


function realizarVenta(){

    const idEmpleado = document.getElementById("IDempleado").value;
    const detallesJSON = [];

    if(idEmpleado === "" ){
     alert("Ingrese un ID de empleado válido");
    return;
    }

    detallesVenta.forEach(detalle =>{

        detallesJSON.push({
            producto: {id: detalle.id},
            cantidad: detalle.cantidad
        });
    });
 
    const venta = {
        empleado: {id: parseInt(idEmpleado)},
        detalles: detallesJSON
    };


            fetch("http://localhost:8080/api/ventas", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(venta)

        })
        .then(response => response.json())
        .then(venta => {
            console.log("Venta realizada", venta);

            detallesVenta = [];
            cargarDetalles();
            cargarProductos();
            })
            .catch(error => console.error("error al guardar" , error));

}
