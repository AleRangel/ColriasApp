


const form = document.querySelector('form');
const $btnAgregar = document.getElementById("agregarDatos");
let guardarDatos = {};


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    $btnAgregar.addEventListener("click", (e) => {
       
        e.preventDefault();    
        guardarLS(guardarDatos)
        alert("Agregado con exito REVISA TU CALCULADORA!")
        window.location.reload();
    })

    fetchAlimentos();


    function fetchAlimentos () {
        
        const formulario = Object.fromEntries(
            new FormData(e.target)
            )
            console.log(formulario);
            
            console.log(formulario.alimento);
            
            const alimento = formulario.alimento;
            const token = localStorage.getItem("token");

            return fetch (`http://localhost:8080/api/buscar/${alimento}`,{
                headers:{
                    'Content-Type': 'application/json',
                    /* 'Authorization': 'Bearer ' + token, */
                }
            }).then(resp => resp.json()).then(datos => {

                /* formatearDatos(datos, formulario.alimento, formulario.gramos); */
                const data = formatearDatos(datos, formulario.alimento, formulario.gramos);
                return data
            });  
        }
                     
    
        
})




function formatearDatos(datos, alimento, gramos) {
    let id = obtenerID();

    let datosDeAlimentos = {
        id: id,
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
                        guardarDatos = datosDeAlimentos;
                        console.log(datosDeAlimentos);
                        mostrarDatos(datosDeAlimentos)
                        
                        return datosDeAlimentos;
                        
                        
}

function mostrarDatos(datosAlimentos) {
    const form = document.querySelectorAll("input");

    form[2].value = datosAlimentos.calorias;
    form[3].value =  datosAlimentos.grasas;
    form[4].value = datosAlimentos.carbohidratos;
    form[5].value = datosAlimentos.proteinas;
    
    /* console.log(form); */
    
}



function obtenerID() {
    let id;
    let datosLS = obtenerLS();
    if (datosLS.length === 0) {
        id = 1 ;
    }else{
        let ultimo = (datosLS.length - 1); 
        
        id = datosLS[ultimo].id;
        
        id++; 
    }
    
    return id;
}
 

function obtenerLS() {
    let alimentoLS;
    if (localStorage.getItem("comidas") === null) {
        alimentoLS=[]
        
    }else{
        alimentoLS = JSON.parse(localStorage.getItem("comidas"))
    }
    return alimentoLS

}

function guardarLS(alimento) {
   let alimentos;
   alimentos = obtenerLS();
   alimentos.push(alimento);
   localStorage.setItem("comidas",JSON.stringify(alimentos))
    
}

