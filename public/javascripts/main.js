onload();

var form = (document.forms.formInstrumentos);

form.addEventListener('submit', function(event){
    event.preventDefault();

    let data= 
        {nombre: form.nombre.value,
        tipo: form.tipo.value,
        marca: form.marca.value,
        precio: form.precio.value}
    console.log(data);
    fetch('/instrumentos',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {
        if(res.ok){
           window.load.href = '/instrumentos/'; 
        } else {
            alert("puede que estes repitiendo el nombre o te falten datos");
        }   
    })
    .catch(err => {
        //alert("ocurrio un error en el servidor");
        console.log(err);
    })
});

function onload(){
        //let btn_delete = document.getElementsByClassName("delete");
        let btn_delete = document.querySelectorAll(".btn-danger")
        let btn_update = document.querySelectorAll(".btn-info")
        btn_delete.forEach(element => {
            element.addEventListener("click", function(event){
                event.preventDefault();
                let url = this["href"];
                fetch(url, {
                    method: 'DELETE'
                }).then(res => res.json())
                .then(res => {
                    alert("se elimino el instrumento");
                    onload();
                }).catch(err => {
                    //alert("ocurrio un error en el servidor");
                    console.log(err);
                })
            })
        })
        btn_update.forEach(element => {
            element.addEventListener("click", function(event){
                event.preventDefault();
                console.log(element.parentNode.parentNode);
                let url = this["href"];
                let data= {
                    nombre: form.nombre.value,
                    tipo: form.tipo.value,
                    marca: form.marca.value,
                    precio: form.precio.value
                }
                console.log(data);
                fetch(url,{
                    method: 'PUT',
                    body: JSON.stringify(data),
                    headers:{
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(res => {
                    if(res.ok){
                       onload(); 
                    } else {
                        alert("puede que estes repitiendo nombre o te falten datos");
                    }   
                })
                .catch(err => {
                    //alert("ocurrio un error en el servidor");
                    console.log(err);
                })
            })
        })
}