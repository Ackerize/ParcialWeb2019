onload();

var form = (document.forms.formInstrumentos);
var btn_clean = document.getElementById("btn_limpiar")


btn_clean.addEventListener("click", (e)=>{
    event.preventDefault();
    form.nombre.value = ""
    form.tipo.value = "cuerda"
    form.marca.value = ""
    form.precio.value = ""
})

form.addEventListener('submit', function(event){
    event.preventDefault();

    let data= {
        nombre: form.nombre.value,
        tipo: form.tipo.value,
        marca: form.marca.value,
        precio: form.precio.value
    }
    console.log(data);
    fetch('/instrumentos',{
        method: 'POST',
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
    .then(res => {

        if(Object.keys(res).length > 0){
            btn_clean.click()
            onload(); 
        } else {
            alert("puede que estes repitiendo el nombre o te falten datos");
        }   
    })
    .catch(err => {
        alert("ocurrio un error en el servidor");
    })
});



function onload(){
    fetch('/instrumentos', {
        method: 'GET'
    }).then(res => res.json())
    .then(data => {
        let filas = "";
        let i = 1
        data.forEach(element => {
            filas = filas + `
            <tr>
                <th scope="row">${i}</th>
                <td>${element.nombre}</td>
                <td>${element.tipo}</td>
                <td>${element.marca}</td>
                <td>${element.precio}</td>
                <td>
                    <a href="/instrumentos/${element.nombre}" class="update"><i class="fas fa-pen fa-fw"></i>Editar</a>
                    <a href="/instrumentos/${element.nombre}" class="delete"><i class="fas fa-eraser fa-fw"></i>Borrar</a>
                </td>
            </tr>
            `
            i += 1
        });
        var tabla = document.getElementsByClassName("cuerpo-table")[0];
        tabla.innerHTML = filas;

        let btn_delete = document.querySelectorAll(".delete")
        let btn_update = document.querySelectorAll(".update")
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
                    alert("ocurrio un error en el servidor");
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
                    if(Object.keys(res).length > 0){
                        alert("se actualizo el instrumento correctamente");
                       onload(); 
                    } else {
                        alert("puede que estes repitiendo nombre o te falten datos");
                    }   
                })
                .catch(err => {
                    alert("ocurrio un error en el servidor");
                })
            })
        })
    })
}