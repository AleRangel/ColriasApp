const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,26}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,12}$/, // 4 a 12 digitos.
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/, // 7 a 14 numeros.
    sinSignos : /^[a-zA-Z0-9\u00f1\s\,\¿?\¡!]+$/
}


class InicioSesion  {
    
    form = document.querySelector("form");
    nombreOrEmail = document.querySelector("input[name=userOrEmail]");
    constraseña = document.querySelector("input[name=password]");
   

    data={};
    tokenDeAccesoResponse = "";
    tokenDeAccesoLs = {};
    usuario = {};

    obtenerDatos(){
        this.form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            this.data = data;
            
            this.iniciarSesion();

        })
    };    
    
    iniciarSesion(){
       
        const respuesta = fetch('http://localhost:8080/api/auth/iniciarSesion',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},            
            body: JSON.stringify({
                usernameOrEmail: this.data.userOrEmail,
                password: this.data.password,
            }),
        }).then(response => {           
            response.json().then((result) => {
               

                if (response.ok) {
                    this.response = true;
                    this.inicioSesionTrue(result.tokenDeAcceso)
                    this.obteniendoPerfil();                    
                }else{
                    this.response = false;
                    this.notificacion("Tu usuario o contraseña son incorrectos intenta de nuevo");
                }


                
            });              
        })

        
        
    };

    inicioSesionTrue(tokenAPI){

        if (localStorage.getItem('token') == null) {
            console.log("Se guardo tu token");    
            localStorage.setItem('token', tokenAPI);            
        } else {
            console.log("Ya estas logeado");
                        
        }
        
        this.obteniendoPerfil();
    }

    alCargarPagina(){
        window.addEventListener("load", ()=>{            
                this.obteniendoPerfil();
                
        })
    }

    obteniendoPerfil(){
        const token = localStorage.getItem('token');     
        let usuario = {}   ;
        fetch('http://localhost:8080/api/auth/usuarioActual',{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token,
            }           
        }).then(response => {
            response.json().then(result =>{
                if(response.ok){
                    
                    usuario = result
                    this.usuario = usuario;

                    Swal.fire({
                        position:"center",                        
                        title: `Hola de nuevo ${this.usuario.username}`,
                        confirmButton: true,
                    }).then((result) =>{
                        if (result.isConfirmed) {
                        window.location.href="calculadoraCalorias.html";
                    }})  
                }else{
                    return false;
                }                
            })
        })
    }

    notificacion(mensaje){
        if (this.response) {           
            Swal.fire({
                position:"center",
                icon: "success",
                title: mensaje,
                confirmButton: true,
            }).then((result) =>{
                if (result.isConfirmed) {
                window.location.href="index.html";
            }})
        }else{
             Swal.fire({
                position:"center",
                icon: "error",
                title: mensaje,
                showConfirmButton: true,
            });
        }        
    };


}

class CerrarSesion {

    botonSalir = document.getElementById("salir");



    salirDeLaSesion(){
        
        this.botonSalir.addEventListener("click", ()=>{
            

            Swal.fire({
                title: 'Seguro que quieres salir?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Si',
                denyButtonText: `No salir`,
              }).then((result) => {
                
                if (result.isConfirmed) {
                    localStorage.removeItem("token");
                    Swal.fire('Hasta luego')
                    window.location.href = "index.html";
                } else if (result.isDenied) {
                  Swal.fire('Continuemos')
                }
              })


            
        })
    };


}

class Registro {
    form = document.querySelector("form");
    username = document.querySelector("input[name=username]");
    nombre = document.querySelector("input[name=nombre]");
    email = document.querySelector("input[name=email]");
    password = document.querySelector("input[name=password]");
    passwordR = document.querySelector("input[name=passwordR]");
    button = document.querySelector("button[type=submit]");

    
    dataFormulario = [];

    response = {};

    obtenerDatos(){
        this.form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            this.dataFormulario = data;              
            this.enviarRegistros();
            this.form.reset();
            
            
        })
    }

    validador(e){
        const input = e.path[0].name;
        switch (input) {
            case "username":
                if (expresiones.usuario.test(this.username.value)) {
                    console.log("valido");
                    e.path[0].style.color = "#000";                        
                    e.path[0].style.border = "1px solid #444";                        
                      
                } else {                    
                    e.path[0].style.border = "1px solid red";                        
                    e.path[0].style.color = "red";
                        
                                       
                }
                break;
            case "nombre":
                if (expresiones.nombre.test(this.nombre.value)) {
                    e.path[0].style.color = "#000";                        
                    e.path[0].style.border = "1px solid #444"; 
                        
                } else {
                    e.path[0].style.border = "1px solid red";                        
                    e.path[0].style.color = "red";      
                    
                }
                break;
            case "email":
                if (expresiones.email.test(this.email.value)) {
                    e.path[0].style.color = "#000";                        
                    e.path[0].style.border = "1px solid #444";  
                         
                } else {
                    e.path[0].style.border = "1px solid red";                        
                    e.path[0].style.color = "red";   
                        
                }
                break;
            case "password":
                if (expresiones.password.test(this.password.value)) {
                    e.path[0].style.color = "#000";                        
                    e.path[0].style.border = "1px solid #444";  
                         
                } else {
                    e.path[0].style.border = "1px solid red";                        
                    e.path[0].style.color = "red";  
                        
                }
                break;
            case "passwordR":
                if (this.passwordR.value == this.password.value) {
                    e.path[0].style.color = "#000";                        
                    e.path[0].style.border = "1px solid #444";  
                         
                } else {
                    e.path[0].style.border = "1px solid red";                        
                    e.path[0].style.color = "red";      
                        
                }
                break;    
        }
       
        
        
    }

    keyup(){
        this.form.addEventListener("keyup", (e)=>{
            this.validador(e);
        });
    }

    enviarRegistros(){
        
        fetch ("http://localhost:8080/api/auth/registro",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre: this.dataFormulario.nombre,
                username: this.dataFormulario.username,
                email: this.dataFormulario.email,
                password: this.dataFormulario.passwordR,
            })
        })
        .then(response => {
            
            

            if (response.ok) {
                this.response = true;
                this.notificacion("Tu registro fue exitoso por favor inicia seción");
            } else {
                this.response = false;        
                this.notificacion("Ocurrio un problema intenta nueva mente");
            }

        });         
    }

    notificacion(mensaje){
        if (this.response) {           
            Swal.fire({
                position:"center",
                icon: "success",
                title: mensaje,
                confirmButton: true,
            }).then((result) =>{
                if (result.isConfirmed) {
                window.location.href="index.html";
            }})
        }else{
             Swal.fire({
                position:"center",
                icon: "error",
                title: mensaje,
                showConfirmButton: true,
            });
        }        
    }
}

class Scraper{
    
    form = document.querySelector("form");    
    buttonAdd = document.getElementById("agregarDatos");  
    datosBusqueda = null;  
    loger= false;
    id = null;

    mandarBusqueda(){
        this.form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const formulario = Object.fromEntries(new FormData(e.target));
            console.log(formulario);
            this.isLoger();
            this.buscar(formulario.alimento, formulario.gramos);

        });
    };

    buscar(alimentoBuscar, cuantosGramos){
        if (this.loger) {
            fetch(`http://localhost:8080/api/buscar/${alimentoBuscar}`,{
                method: 'GET',
                headers: {"Content-Type": "application/json",}                
            }).then(resp => resp.json()).then(datos => {

                /* formatearDatos(datos, formulario.alimento, formulario.gramos); */
               this.formatearDatos(datos,alimentoBuscar,cuantosGramos);                
            });              

        } else {
            
        }
    };

    isLoger(){
        
        if (localStorage.getItem("token") == null){
            this.loger = false;
        }else{
            console.log(localStorage.getItem("token"));
            this.loger = true;
        }
        
    };

    formatearDatos(datos,alimento,gramos){  

        let datosDeAlimentos = {            
            alimento: alimento,
            gramos: parseFloat(gramos),   
        };
        
        datos.forEach(element => {        
            
            let e = element.toLowerCase();
            
            switch (e) {
                case "calorías":
                    let calorias = datos.indexOf(element) + 1;
                    
                    datosDeAlimentos.calorias = Math.floor(parseFloat(datos[calorias]) / 100 * gramos);
                    
                    break;
                case "grasas":
                    let grasas = datos.indexOf(element) + 2;
                    datosDeAlimentos.grasas = Math.floor(parseFloat(datos[grasas]) / 100 * gramos);
                    break;
                case "carbohidratos":
                    let carbohidratos = datos.indexOf(element) + 1;
                            
                    datosDeAlimentos.carbohidratos = Math.floor(parseFloat(datos[carbohidratos]) / 100.0 * gramos);
                    break;
                case "proteínas":
                    let proteinas = datos.indexOf(element) + 1;
                                
                        datosDeAlimentos.proteinas = parseFloat(datos[proteinas]) / 100.0 * gramos;
                    break;
                    default:
                        break;
                                }
                                
        });
        this.datosBusqueda = datosDeAlimentos;
        console.log(this.datosBusqueda);
        this.mostrarDatos(this.datosBusqueda);            
    }

    mostrarDatos(datosAlimentos) {
        const form = document.querySelectorAll("input");
        console.log(typeof datosAlimentos.calorias);
        if ( typeof datosAlimentos.calorias != "number") {
            this.notificacion("El Alimento no fue encontrado intenta manualmente en tu calculadora", "false");
                   
        } else {
            
            form[2].value = datosAlimentos.calorias;
            form[3].value =  datosAlimentos.grasas;
            form[4].value = datosAlimentos.carbohidratos;
            form[5].value = datosAlimentos.proteinas;
            
        }
    }

    obtenerUsuarioID(){
        const token = localStorage.getItem("token");   
        
             
        fetch('http://localhost:8080/api/auth/usuarioActual',{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token,
            }           
        }).then(response => {
            response.json().then(result =>{
            /* console.log(result.id); */
            this.id = result.id;            
    })})   
    }


    agregarDatosBD(){
        this.obtenerUsuarioID();
        this.buttonAdd.addEventListener('click',() => {
            const token = localStorage.getItem("token");  
            
            fetch(`http://localhost:8080/api/usuario/${this.id}/comida`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },body: JSON.stringify({
                    comida: this.datosBusqueda.alimento,
                    gramos: this.datosBusqueda.gramos,
                    proteinas: this.datosBusqueda.proteinas,
                    calorias: this.datosBusqueda.calorias,
                    carbohidratos: this.datosBusqueda.carbohidratos,
                })}).then(response => {
                    response.json().then(result =>{                        
                        
                        if (response.ok) {
                           
                            this.notificacion("Se guardo con exito", "true");
                        }else{
                            this.notificacion("Algo fallo intentalo nuevamente", "false");

                        }
                        /* console.log(result); */
                    });
                })
            });

    }

    notificacion(mensaje, trueOrFalse) {
        if (trueOrFalse === "true") {           
            Swal.fire({
                position:"center",
                icon: "success",
                title: mensaje,                
            }).then((result) =>{
                if (result.isConfirmed) {
                window.location.href="alimentosApi.html";
            }})
        }else{
             Swal.fire({
                position:"center",
                icon: "error",
                title: mensaje,
                showConfirmButton: true,
            }           
            );
        }        
    }
            
            
            
}
        
class TablaCalculadora{

    $tabla_datos = document.getElementById('tabla_datos');
    $tabla_datos_total = document.getElementById('tabla_datos_total');
    $tabla_datos_mobile = document.getElementById('tabla_datos_mobile');
    $tabla_datos_total_mobile = document.getElementById('tabla_datos_total_mobile');
    $form = document.querySelector('form');

    datosFormulario = {};
    datosDB = {};
    id = null;

    alCargarPagina(){
        window.addEventListener("load", ()=>{
            this.obtenerUsuarioID();            
           
        })
    }

    obtenerUsuarioID(){
        const token = localStorage.getItem("token");   
        
             
        fetch('http://localhost:8080/api/auth/usuarioActual',{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token,
            }           
        }).then(response => {
            response.json().then(result =>{
            
            this.id = result.id;  
            this.obtenerDatos();        
    })})   
    }

    obtenerDatos(){
        const token = localStorage.getItem("token");
        
        fetch(`http://localhost:8080/api/usuario/${this.id}/comidas`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token
            }
        }).then(response => {
            response.json().then(result =>{
                this.datosDB = result
                console.log(this.datosDB);
                this.agregarDatos();
            })
        })
    }


    agregarDatos() {
        const data = this.datosDB;
    
        
        data.forEach(elementos => {
            
            const tablaConDatosMobile = `
            <tr>
            <td>
                Comida
            </td>
            
            <td >
                ${elementos.comida}
            </td>
            <td style="text-align:center; width:30px;">
            <button " class="eliminar-comida btnElimina" type="button"
             style="
             text-align:center;
             border:none;
             width:auto;
             padding: 0;
             background: none;                
             ";
            >
            <i class="bi bi-x-square eliminar-comida"  data-id="${elementos.id}" ></i>
            </button>                 
         </td>
            
        <tr>
            <td>
                Gr.
            </td>
            <td>
                ${elementos.gramos}
            </td>
            <td></td>
            
        </tr>
        <tr>
    
            <td>
                Prot.
            </td>
            <td>
                ${elementos.proteinas}
            </td>
            <td></td>
        </tr>
        <tr>
            <td>
                Kcal.
            </td>
            
            <td>
                ${elementos.calorias}
                
            </td>      
            <td></td>
        </tr>
        
            `;
    
            const tablaConDatos = `
            <tr>
                <td>
                    ${elementos.comida}
                </td>
                <td>
                    ${elementos.gramos}
                </td>
                <td>
                    ${elementos.proteinas}
                </td>
                <td>
                    ${elementos.calorias}
                </td>
                <td style="text-align:center; width:30px;">
                   <button " class="eliminar-comida btnElimina" type="button"
                    style="
                    text-align:center;
                    border:none;
                    width:auto;
                    padding: 0;
                    background: none;                
                    ";
                   >
                   <i class="bi bi-x-square eliminar-comida"  data-id="${elementos.id}" ></i>
                   </button>                 
                </td>
            </tr>
            `;
            this.$tabla_datos.innerHTML += tablaConDatos;
            this.$tabla_datos_mobile.innerHTML += tablaConDatosMobile;
    
            
            /* console.log(elementos); */
        });
    
        const $btn_eliminar = document.querySelectorAll('.btnElimina');
        $btn_eliminar.forEach(element => {
            element.addEventListener('click', (evento) =>{
                console.log("KDDDD");
                this.eliminarComida(evento);    
            });
        
        })
        
        this.sumandoDatos();
        
    }

    sumandoDatos(){
        
        
        let totalGramos = 0.0;
        let totalProteinas = 0.0;
        let totalCalorias = 0.0;
        for (const element of this.datosDB) {
            const elementos = element;
            
            totalGramos += elementos.gramos;
            totalProteinas += elementos.proteinas;
            totalCalorias += elementos.calorias;
    
        }
        /* console.log(totalGramos,  totalProteinas, totalCalorias); */
    
        const tablaTotalMobile = `
                        <tr>
                            <td>
                                Comida
                            </td>
                            <td>
                                Total
                            </td>
                            <td></td>
                            
                        </tr>
                        <tr>
                            <td>
                                Gr.
                            </td>
                            <td>
                                ${totalGramos}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
    
                            <td>
                                Prot.
                            </td>
                            <td>
                                ${totalProteinas}
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                Kcal.
                            </td>
                            <td>
                                ${totalCalorias}
                            </td>
                            <td></td>
                        </tr>
        `
    
        const tablaTotal = `
        <th colspan="5" class="text-center">Total</th>
        <tr>
            <td>
            Comidas
            </td>
            <td>
            ${totalGramos}
            </td>
            
            <td>
            ${totalProteinas}
            </td>
            <td>
            ${totalCalorias}            
            </td>
            <td></td>
            
        </tr>
        
        `
        this.$tabla_datos_total.innerHTML = tablaTotal;
        this.$tabla_datos_total_mobile.innerHTML = tablaTotalMobile;
        
    }

    eliminarComida(e) {
        
        let alimento, alimentoID;
        console.log("xdddddd");
        if (e.target.classList.contains('eliminar-comida')) {
            alimento = e.target;        
            alimentoID = parseFloat( alimento.getAttribute("data-id"));
        }else{
            console.log("error");
        }
        console.log(alimentoID + " xdd");
        this.eliminarDeBD(alimentoID);
    }

    eliminarDeBD(alimentoID){
        const token = localStorage.getItem('token')
        console.log(alimentoID);
        fetch(`http://localhost:8080/api/comida/${alimentoID}`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json',
                      'Authorization': 'Bearer ' + token}
        }).then(response => {
            if (response.ok) {
               Swal.fire("Se borro con exito");
               window.location.reload();
            }else{
                Swal.fire("Ocurrio un ERROR!");
                window.location.reload();

            }

        });
        

    }


    obtenerDatosform(){
        this.$form.addEventListener('submit',(e)=>{
            e.preventDefault();
            console.log(this.$form);
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            console.log(data);
            this.agregarDatosBD(data);
            this.$form.reset();
        })
    }



    agregarDatosBD(data){
        this.obtenerUsuarioID();
        
            const token = localStorage.getItem("token");  
            
            fetch(`http://localhost:8080/api/usuario/${this.id}/comida`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + token,
                },body: JSON.stringify({
                    comida: data.alimento,
                    gramos: data.gramos,
                    proteinas: data.proteinas,
                    calorias: data.calorias,
                    carbohidratos: data.carbohidratos,
                })}).then(response => {
                    response.json().then(result =>{                        
                        
                        if (response.ok) {
                           
                            this.notificacion("Se guardo con exito", "true");
                        }else{
                            this.notificacion("Algo fallo intentalo nuevamente", "false");

                        }
                        /* console.log(result); */
                    });
                });
            

    }

    notificacion(mensaje, trueOrFalse) {
        if (trueOrFalse === "true") {           
            Swal.fire({
                position:"center",
                icon: "success",
                title: mensaje,                
            }).then((result) =>{
                if (result.isConfirmed) {
                window.location.href="calculadoraCalorias.html";
            }})
        }else{
             Swal.fire({
                position:"center",
                icon: "error",
                title: mensaje,
                showConfirmButton: true,
            });
        }        
    }


}        
        
        
        


export  {InicioSesion, Registro, expresiones, CerrarSesion, Scraper, TablaCalculadora};