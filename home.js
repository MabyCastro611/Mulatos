// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC8wuejWTjXlrqi7QUkMQIpcgwgHCQrO8Y",
    authDomain: "registro-mulatos.firebaseapp.com",
    projectId: "registro-mulatos"
  });
  
  var db = firebase.firestore();

  //agregar 
  function agregar(){
      var nombre = document.getElementById('nombre').value;
      var serie = document.getElementById('serie').value;
      var capitulo = document.getElementById('capitulo').value;

    db.collection("users").add({
        nombre: nombre,
        serie: serie,
        capitulo: capitulo
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        document.getElementById('nombre').value = '';
        document.getElementById('serie').value = '';
        document.getElementById('capitulo').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });  
  }

  //ver tabla

  var tabla = document.getElementById('tabla');
  db.collection("users").onSnapshot((querySnapshot) => {
      tabla.innerHTML = ''; 
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().nombre}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().nombre}</td>
        <td>${doc.data().serie}</td>
        <td>${doc.data().capitulo}</td>
        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="Editar('${doc.id}','${doc.data().nombre}','${doc.data().serie}','${doc.data().capitulo}')">Editar</button></td>
    </tr>
    `
});
});

// eliminar

function eliminar(id){
db.collection("users").doc(id).delete().then(function() {
    console.log("Document successfully deleted!");
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}

//editar

function Editar(id, nombre, serie,capitulo) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('serie').value = serie;
    document.getElementById('capitulo').value = capitulo;

    var boton = document.getElementById('boton')
    boton.innerHTML = 'Editar';
    boton.onclick = function () {
        var washingtonRef = db.collection("users").doc(id);
        // Set the "capital" field of the city 'DC'
        var nombre = document.getElementById('nombre').value;
        var serie = document.getElementById('serie').value;
        var capitulo = document.getElementById('capitulo').value
        return washingtonRef.update({
        nombre: nombre,
        serie: serie,
        capitulo: capitulo,
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'agregar';
                document.getElementById("nombre").value = " ";
                document.getElementById("serie").value = " ";
                document.getElementById("capitulo").value = " ";

            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            }); test.firestore.js

    }
}

function mostrar(){
    var mostrar = document.getElementById('chat');
 
    mostrar.innerHTML = `
    <div class="container card col-6">
 
     <div id="mensajes">
     </div>
 
     <div class="row p-2">
         <input type="text" class="form-control  col" id="mensaje" placeholder="Escribe un mensaje">
         <button id="enviar" class="btn btn-success col-2" onclick="guardarmensaje()">Enviar</button>
     </div>
    </div>
    
    `
    leermensaje()
   
 }

 function guardarmensaje(){
    var mensaje = document.getElementById("mensaje").value;
    
    if(!mensaje){
        alert('esta vacio')
    }else{
        db.collection("mensaje").add({
            messages: mensaje,
            
        })
            .then(function (docRef) {
                console.log("Document written with ID: ", docRef.id);
               
            })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });
    

    }
   
}

function leermensaje(){

    var mensajes = document.getElementById('mensajes');
db.collection("mensaje").onSnapshot((querySnapshot) => {
    mensajes.innerHTML = '';
    querySnapshot.forEach((doc) => {
        
        mensajes.innerHTML += `
        <ul>
            <li>
            <span>${doc.data().messages} </span>
            </li>
        </ul>
        
        
    `
    });




});

    
}

   
