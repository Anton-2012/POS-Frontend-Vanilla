        
        let todasLasVentas = [];

        const btnBuscar = document.getElementById("BtnVenta");
        
        //busqueda de ventas;
        btnBuscar.addEventListener("click", () =>{

            const termino = document.getElementById("Bventa").value.toLowerCase();

            const resultado = todasLasVentas.filter(venta =>{
                return venta.empleado.nombre.toLowerCase().includes(termino) ||
                venta.idVenta.toString().includes(termino);
            });
                mostrarVentas(resultado);
            
        });


        
        function fetchVentas(){
        // hace una petición HTTP, parecido a Postman para hacer GET
        fetch("http://localhost:8080/api/ventas")
        // cuando la respuesta llega (El GET) lo pasa de texto a objeto JS
        .then(response => response.json())
        //productos ya es lista como un array de objetos JS
        .then(ventas => {

            todasLasVentas = ventas;
            mostrarVentas(ventas);

        });
        }

        fetchVentas();
        //mostrarVentas();

    function mostrarVentas(ventas){
            
            const tVentas = document.getElementById("tabla-ventas");

            tVentas.innerHTML = "";
            ventas.forEach(venta => {
            
                const fila = document.createElement("tr");
                const celdaId = document.createElement("td");
                const celdaFecha = document.createElement("td");
                const celdaTotal = document.createElement("td");
                const celdaIdEmple = document.createElement("td");

                const celdaAcc = document.createElement("td");
                celdaAcc.className = "text-center"
                const btnDesactivar =document.createElement("button");

                btnDesactivar.textContent = "Desactivar";
                btnDesactivar.className = "btn btn-danger btn-sm";
                celdaAcc.appendChild(btnDesactivar);


                celdaId.textContent = venta.idVenta;
                fila.appendChild(celdaId);
                celdaFecha.textContent = venta.fechaVenta;
                fila.appendChild(celdaFecha);
                celdaTotal.textContent = venta.total;
                fila.appendChild(celdaTotal);
                celdaIdEmple.textContent = venta.empleado.nombre;
                fila.appendChild(celdaIdEmple);

                fila.appendChild(celdaAcc);
                

                tVentas.appendChild(fila);

                //botón desactivar
btnDesactivar.addEventListener("click", () => {
            const id = venta.idVenta;

            Swal.fire({
                title: "¿Desactivar Venta?",
                text: `La venta #${id} pasará a estar inactiva en el sistema.`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#dc3545",
                cancelButtonColor: "#6c757d",
                confirmButtonText: "Sí, desactivar",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    // La petición Fetch va dentro del bloque confirmado
                    fetch("http://localhost:8080/api/ventas/" + id, {
                        method: "PUT"
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Error en la respuesta del servidor");
                        }
                        return response.json();
                    })
                    .then(resultado => {
                        console.log("Venta desactivada:", resultado);

                        Swal.fire({
                            title: "Desactivada",
                            text: "La venta ha sido desactivada con éxito.",
                            icon: "success",
                            timer: 1500,
                            showConfirmButton: false
                        });

                        // Recargamos la lista actualizada
                        fetchVentas();
                    })
                    .catch(error => {
                        console.error("Error al desactivar la venta:", error);
                        Swal.fire({
                            title: "Error",
                            text: "No se pudo desactivar la venta.",
                            icon: "error"
                        });
                    });
                }
            });
        });
    });
}