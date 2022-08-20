const $tabla_datos = document.getElementById('tabla_datos');
const $tabla_datos_total = document.getElementById('tabla_datos_total');
const $tabla_datos_mobile = document.getElementById('tabla_datos_mobile');
const $tabla_datos_total_mobile = document.getElementById('tabla_datos_total_mobile');






agregarDatos();
function agregarDatos() {
    const datosLS = obtenerLS();

    
    datosLS.forEach(elementos => {
        
        const tablaConDatosMobile = `
        <tr>
        <td>
            Comida
        </td>
        
        <td >
            ${elementos.alimento}
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
                ${elementos.alimento}
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
        $tabla_datos.innerHTML += tablaConDatos;
        $tabla_datos_mobile.innerHTML += tablaConDatosMobile;

        
        /* console.log(elementos); */
    });

    const $btn_eliminar = document.querySelectorAll('.btnElimina');
    $btn_eliminar.forEach(element => {
        element.addEventListener('click', (evento) =>{
            console.log("KDDDD");
            eliminarComida(evento);    });
    
    })
    
    sumandoDatos();
    
}

function sumandoDatos(){
    const datosLS = obtenerLS();
    
    let totalGramos = 0.0;
    let totalProteinas = 0.0;
    let totalCalorias = 0.0;
    for (const element of datosLS) {
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
    $tabla_datos_total.innerHTML = tablaTotal;
    $tabla_datos_total_mobile.innerHTML = tablaTotalMobile;
    
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

function eliminarLS(alimentoID) {
    let alimentosLS;
    alimentosLS = obtenerLS();
    alimentosLS.forEach(function(alimentoLS, index){
        /* console.log(alimentoLS); */
        if (alimentoLS.id === alimentoID) { 
            alimentosLS.splice(index, 1);
        }

    });
    localStorage.setItem("comidas", JSON.stringify(alimentosLS));
    window.location.reload()
}



function eliminarComida(e) {
        
    let alimento, alimentoID;

    if (e.target.classList.contains('eliminar-comida')) {
        alimento = e.target;        
        alimentoID = parseFloat( alimento.getAttribute("data-id"));
    }else{
        console.log("error");
    }
    console.log(alimentoID);
    eliminarLS(alimentoID);


}