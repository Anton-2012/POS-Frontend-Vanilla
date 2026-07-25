

        
        
        let modoEdit = false;
        let idEdit = null;
        
        //Función para cargar los datos en productos
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
                celdaAcc.className = "text-center";


                const btnDesactivar =document.createElement("button");

                

                btnDesactivar.textContent = "Desactivar";
                btnDesactivar.className = "btn btn-danger btn-sm"

                const celdaEdit = document.createElement("td");
                const btnEdit = document.createElement("button");

                btnEdit.textContent = "Editar";
                btnEdit.className = "btn btn-warning btn-sm";

                celdaAcc.appendChild(btnDesactivar);

                
                celdaEdit.appendChild(btnEdit);

                celdaId.textContent = producto.id;
                fila.appendChild(celdaId);
                celdaN.textContent = producto.nombre;
                fila.appendChild(celdaN);
                celdaP.textContent = producto.precio;
                fila.appendChild(celdaP);
                celdaS.textContent = producto.stock;
                fila.appendChild(celdaS);

                fila.appendChild(celdaAcc);

                fila.appendChild(celdaEdit);
                

                tProductos.appendChild(fila);

                //botón desactivar
                btnDesactivar.addEventListener("click", () =>{

                    const id = celdaId.textContent;


                    Swal.fire({
                        title:"¿DesactivarProducto",
                        text:`El producto "${producto.nombre}" pasará a estar inactivo`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#dc3545",
                        cancelButtonColor: "#6c757d",
                        confirmButtonText: "Sí, desactivar",
                        cancelButtonText: "Cancelar"
                    }).then((result) =>{
                        if(result.isConfirmed){
                        fetch("http://localhost:8080/api/productos/" + id, {

                        method: "DELETE"
                    }).then(response => response.text())
                    .then(resultado =>{
                        console.log(resultado);

                        Swal.fire({
                            title: "Desactivado",
                            text: "El producto ha sido desactivado con éxito.",
                            icon:"success",
                            timer: 1500,
                            showConfirmButton: false
                        });


                        cargarProductos();


                    }).catch(error => console.error("error al guardar" , error));


                        }
                    })


                });

                //boton editar
                btnEdit.addEventListener("click", ()  =>{

                    const id = celdaId.textContent;

                    modoEdit = true;
                    idEdit = id;

                    document.getElementById("nombre").value = celdaN.textContent;
                    document.getElementById("precio").value = celdaP.textContent;
                    document.getElementById("stock").value = celdaS.textContent;
                })

                
            }); 
        });
        }

        cargarProductos();




    const btnGuardar = document.getElementById("btn-guardar");

    // evento del botón guardar
    btnGuardar.addEventListener("click", () =>{

        if(modoEdit === false){
            insertar();
        }else if(modoEdit === true){

            actualizar();
        }
        
     });

    function actualizar(){
        const nom = document.getElementById("nombre").value;
        const pre = document.getElementById("precio").value;
        const stk = document.getElementById("stock").value;


        if (idEdit === null){
            alert("Presion editar antes de actualizar");
            return;
        }

        if (nom === "" || pre === "" || stk === ""){
            alert("Todos los campos son obligatorios");
            return;
        }

        if (pre <0 || stk <0){
            alert("No puede haber valores negativos");
            return;
        }

        fetch("http://localhost:8080/api/productos/" + idEdit, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: nom,
                precio: parseFloat(pre),
                stock: parseInt(stk)
            })

        })
        .then(response => response.json())
        .then(producto => {
            console.log("Producto guardado", producto);
        
        
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("stock").value = "";
        
            cargarProductos();
            modoEdit = false;
            idEdit = null;
            })
            .catch(error => console.error("error al guardar" , error));
    }


    function insertar(){
      
        const nom = document.getElementById("nombre").value;
        const pre = document.getElementById("precio").value;
        const stk = document.getElementById("stock").value;

        if (nom === "" || pre === "" || stk === ""){
            alert("Todos los campos son obligatorios");
            return;
        }

        if (pre <0 || stk <0){
            alert("No puede haber valores negativos");
            return;
        }

        fetch("http://localhost:8080/api/productos", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: nom,
                precio: parseFloat(pre),
                stock: parseInt(stk)
            })

        })
        .then(response => response.json())
        .then(producto => {
            console.log("Producto guardado", producto);
        
        
            document.getElementById("nombre").value = "";
            document.getElementById("precio").value = "";
            document.getElementById("stock").value = "";
        
            cargarProductos();
            })
            .catch(error => console.error("error al guardar" , error));
    }

  

   