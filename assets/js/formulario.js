const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
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

    

    obtenerDatos(){
        this.form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            console.log(data);
        })
    };
    
    keyup(){
        this.nombreOrEmail.addEventListener("keyup", (e)=>{
            this.validar();
        });
    }

}


class Registro {
    form = document.querySelector("form");
    username = document.querySelector("input[name=username]");
    nombre = document.querySelector("input[name=nombre]");
    email = document.querySelector("input[name=email]");
    password = document.querySelector("input[name=password]");
    passwordR = document.querySelector("input[name=passwordR]");
    button = document.querySelector("input[type=button]");

    obtenerDatos(){
        this.form.addEventListener("submit", (e)=>{
            e.preventDefault();
            const data = Object.fromEntries(
                new FormData(e.target)
            )
            console.log(data);
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
                    console.log("No Valido");                    
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
}





export  {InicioSesion, Registro, expresiones};