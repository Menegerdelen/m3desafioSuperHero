// boton para buscar numero
let botonBuscar = document.querySelector('#buscarNumero');

botonBuscar.addEventListener("click", function(){
    let cardMostrar = document.querySelector('#cardSuperHero');
    cardMostrar.style.display='block';
    let txtIngresaNumero  = document.querySelector('#ingresaNumero');

    solicitud(txtIngresaNumero);
});

function solicitud(txtIngresaNumero){
    $.ajax({
        type: "GET",
        url: `https://superheroapi.com/api.php/325d4e1f393e49845f706880b97b7e3c/${txtIngresaNumero.value}`,
        dataType: "json",
        success: function (response) {
            console.log(response);
            console.log(response.name);
            console.log(response.powerstats);
            imagenSuperHero(response);
            crearGrafico(response);
            cardInfo(response);
    
            
            
        }
    });

};



function crearGrafico(response){
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: `Estatidisticas de Poder para ${response.name}`
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: response.powerstats.intelligence, label: Object.keys(response.powerstats)[0]},
                { y: response.powerstats.strength, label: Object.keys(response.powerstats)[1] },
                { y: response.powerstats.speed, label: Object.keys(response.powerstats)[2] },
                { y: response.powerstats.durability, label: Object.keys(response.powerstats)[3] },
                { y: response.powerstats.power, label: Object.keys(response.powerstats)[4] },
                { y: response.powerstats.combat, label: Object.keys(response.powerstats)[5] },
            ]
        }]
    });
    chart.render();
    
    };


// datos card
function imagenSuperHero(response){
    let imgSuperHero = document.querySelector('#imgSuperHero');
    imgSuperHero.src = response.image.url ;
};

function cardInfo(response){
    let nombreSuperhero = document.querySelector('#nombreSuperhero');
    nombreSuperhero.innerHTML =  ` Nombre: ${response.name} ` ;

    let conexionesSuperHero = document.querySelector('#conexionesSuperHero');
    conexionesSuperHero.innerHTML =  `Conexiones: ${response.connections[`group-affiliation`]} `;

    let publicadoSH = document.querySelector('#publicadoSH');
    publicadoSH.innerHTML =  `Publicado por: ${response.biography[`publisher`]} `;

    let ocupacionSH = document.querySelector('#ocupacionSH');
    ocupacionSH.innerHTML =  `Ocupacion: ${response.work[`occupation`]} `;

    let primeraAparacionSH = document.querySelector('#primeraAparacionSH');
    primeraAparacionSH.innerHTML =  `Primera aparicion: ${response.biography[`first-appearance`]} `;

    let alturaSH = document.querySelector('#alturaSH');
    alturaSH.innerHTML =  `Altura: ${response.appearance.height[0]} - ${response.appearance.height[1]}`;

    let pesoSH = document.querySelector('#pesoSH');
    pesoSH.innerHTML =  `Peso: ${response.appearance.weight[0]} - ${response.appearance.weight[1]} `;

    let alianzasSH = document.querySelector('#alianzasSH');
    alianzasSH.innerHTML =  `Alianzas: ${response.biography[`aliases`]} `;


};


// validacion

function validarNumerosIsNan (valorCaja){
    if(!isNaN(valorCaja)){
        return true;
    }
    return false;
};

function validarNumerosRegEx (valorCaja){
    let regex = new RegExp(`[0-9](3)$`);
    if(regex.test(valorCaja)){
        return true;
    }
    return false;
};

function validarRangoNumero (valorCaja){
    if(valorCaja >= 1 && valorCaja <= 732){
        return true;
    }
    return false;
};

function validarRangoError (response){
    if(response.response === "success"){
        return true;
    }
    return false;
};

function validarVacio (valorCaja){
    if(valorCaja === ''){
        return false;
    }
    return true;
};







