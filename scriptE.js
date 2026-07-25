


        let modoEdit = false;
        let idEdit = null;
       
       function cargarEmpleados(){
        // hace una petición HTTP, parecido a Postman para hacer GET
        fetch("http://localhost:8080/api/empleados")
        // cuando la respuesta llega (El GET) lo pasa de texto a objeto JS
        .then(response => response.json())
        //productos ya es lista como un array de objetos JS
        .then(empleados => {

            const tEmpleados = document.getElementById("tabla-empleados");

            tEmpleados.innerHTML = "";
            empleados.forEach(empleado => {
            
                const fila = document.createElement("tr");
                const celdaId = document.createElement("td");
                const celdaNombre = document.createElement("td");
                const celdaEdad = document.createElement("td");
                const celdaDireccion = document.createElement("td");
                const celdaCorreo = document.createElement("td");
                const celdaTelefono = document.createElement("td");
                const celdaSueldo = document.createElement("td");
                const celdaPuesto = document.createElement("td");

                const celdaAcc = document.createElement("td");
                const btnDesactivar = document.createElement("button");
                celdaAcc.className ="text-center";
                btnDesactivar.className = "btn btn-danger btn-sm me-2";

                const celdaEdit = document.createElement("td");
                const btnEdit = document.createElement("button");

                btnEdit.className = "btn btn-warning btn-sm";

                btnEdit.textContent = "Editar";
                btnDesactivar.textContent = "Desactivar";
                celdaAcc.appendChild(btnDesactivar);
                celdaAcc.appendChild(btnEdit);

                


                celdaId.textContent = empleado.id;
                fila.appendChild(celdaId);
                
                celdaNombre.textContent = empleado.nombre;
                fila.appendChild(celdaNombre);

                celdaEdad.textContent = empleado.edad;
                fila.appendChild(celdaEdad);

                celdaDireccion.textContent = empleado.direccion;
                fila.appendChild(celdaDireccion);

                celdaCorreo.textContent = empleado.correo;
                fila.appendChild(celdaCorreo);

                celdaTelefono.textContent = empleado.telefono;
                fila.appendChild(celdaTelefono);

                celdaSueldo.textContent = empleado.sueldoBase;
                fila.appendChild(celdaSueldo);

                celdaPuesto.textContent = empleado.rol;
                fila.appendChild(celdaPuesto);

                fila.appendChild(celdaAcc);

                fila.appendChild(celdaEdit);
                

                tEmpleados.appendChild(fila);

                //botón desactivar
                 btnDesactivar.addEventListener("click", () =>{

                    const id = celdaId.textContent;

                    Swal.fire({
                        title: "¿Desactivar colaborador?",
                        text: `El colaborador "${empleado.nombre}" pasará a estar inactivo.`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#dc3545", 
                        cancelButtonColor: "#6c757d",  
                        confirmButtonText: "Sí, desactivar",
                        cancelButtonText: "Cancelar"
                    }).then((result) => {
                        if (result.isConfirmed){
                        fetch("http://localhost:8080/api/empleados/" + id, {

                        method: "DELETE"
                    }).then(response => response.text())
                    .then(resultado =>{
                        console.log(resultado);

                        Swal.fire({
                            title: "Desactivado",
                            text: "El colaborador ha sido desactivado con éxito.",
                            icon:"success",
                            timer: 1500,
                            showConfirmButton: false
                        });

                        cargarEmpleados();


                    }).catch(error => console.error("error al guardar" , error));
                        }

                    });

                });


                //boton editar
                btnEdit.addEventListener("click", ()  =>{

                    const id = celdaId.textContent;

                    modoEdit = true;
                    idEdit = id;

                    document.getElementById("Nombre").value = celdaNombre.textContent;
                    document.getElementById("Edad").value = celdaEdad.textContent;
                    document.getElementById("Direccion").value = celdaDireccion.textContent;
                    document.getElementById("Correo").value = celdaCorreo.textContent;
                    document.getElementById("Telefono").value = celdaTelefono.textContent;
                    document.getElementById("Sueldo").value = celdaSueldo.textContent;
                    document.getElementById("Puesto").value = celdaPuesto.textContent;
                })
              

                
            }); 
        });
        }

        cargarEmpleados();

        const btnGuardar = document.getElementById("btn-guardarE");

        // evento del botón guardar
        btnGuardar.addEventListener("click", () =>{

        if(modoEdit === false){
            insertar();
        }else if(modoEdit === true){

            actualizar();
        }
        
     });


        function insertar(){
      
        const nom = document.getElementById("Nombre").value;
        const ed = document.getElementById("Edad").value;
        const direcc = document.getElementById("Direccion").value;
        const corr = document.getElementById("Correo").value;
        const tel = document.getElementById("Telefono").value;
        const suel = document.getElementById("Sueldo").value;
        const pues = document.getElementById("Puesto").value;

        if (nom === "" || ed === "" || direcc === "" || corr === "" || tel === "" || suel === "" || pues === ""){
            alert("Todos los campos son obligatorios");
            return;
        }

        if (ed < 18){
            alert("No puede haber empleados menores de edad");
            return;
        }

        if (suel < 0){
            alert("No puede haber sueldos negativos");
            return;
        }

        fetch("http://localhost:8080/api/empleados", {
            method: "POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: nom,
                edad: parseInt(ed),
                direccion: direcc,
                correo: corr,
                telefono: tel,
                sueldoBase: parseFloat (suel),
                rol: pues
                
            })

        })
        .then(response => response.json())
        .then(empleado => {
            console.log("Empleado guardado", empleado);
        
            
            document.getElementById("Nombre").value = "";
            document.getElementById("Edad").value = "";
            document.getElementById("Direccion").value = "";
            document.getElementById("Correo").value = "";
            document.getElementById("Telefono").value = "";
            document.getElementById("Sueldo").value = "";
            document.getElementById("Puesto").value = "";
        
            cargarEmpleados();
            })
            .catch(error => console.error("error al guardar" , error));
    }


        function actualizar(){

        const nom = document.getElementById("Nombre").value;
        const ed = document.getElementById("Edad").value;
        const direcc = document.getElementById("Direccion").value;
        const corr = document.getElementById("Correo").value;
        const tel = document.getElementById("Telefono").value;
        const suel = document.getElementById("Sueldo").value;
        const pues = document.getElementById("Puesto").value;


        if (nom === "" || ed === "" || direcc === "" || corr === "" || tel === "" || suel === "" || pues === ""){
            alert("Todos los campos son obligatorios");
            return;
        }

        if (ed < 18){
            alert("No puede haber empleados menores de edad");
            return;
        }

        if (suel < 0){
            alert("No puede haber sueldos negativos");
            return;
        }

        fetch("http://localhost:8080/api/empleados/" + idEdit, {
            method: "PUT",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nombre: nom,
                edad: parseInt(ed),
                direccion: direcc,
                correo: corr,
                telefono: tel,
                sueldoBase: parseFloat (suel),
                rol: pues
            })

        })
        .then(response => response.json())
        .then(empleado => {
            console.log("Producto guardado", empleado);
        
            limpiar();
            cargarEmpleados();
            modoEdit = false;
            idEdit = null;
            })
            .catch(error => console.error("error al guardar" , error));
    }


    function limpiar(){
            document.getElementById("Nombre").value = "";
            document.getElementById("Edad").value = "";
            document.getElementById("Direccion").value = "";
            document.getElementById("Correo").value = "";
            document.getElementById("Telefono").value = "";
            document.getElementById("Sueldo").value = "";
            document.getElementById("Puesto").value = "";
    }