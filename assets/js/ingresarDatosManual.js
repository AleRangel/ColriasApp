const $formulario = document.getElementById('formulario');


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

obtenerID();

$formulario.addEventListener('submit', e=>{
    e.preventDefault();
    
    const formulario = Object.fromEntries(
        new FormData(e.target)
    )
    /* console.log(formulario); */
    
    let id = obtenerID();

    datos = {
        id: id,
        alimento: formulario.alimento,
        calorias: parseFloat(formulario.calorias),
        gramos: parseFloat(formulario.gramos),
        proteinas: parseFloat(formulario.proteinas),
    }
    guardarLS(datos);
    window.location.reload()
})


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

