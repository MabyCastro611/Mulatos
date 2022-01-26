

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC_tL1QQgZFIc09-76KeJG2sLYXl3XrbBw",
    authDomain: "mi-primer-proyecto-2f365.firebaseapp.com",
    projectId: "mi-primer-proyecto-2f365",
});
var db = firebase.firestore();


//agregamos datos
function agregar() {
    var city = document.getElementById("city").value;
    var name = document.getElementById("name").value;

    db.collection("cafe").add({
        city: city,
        name: name,
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            document.getElementById("city").value = " ";
            document.getElementById("name").value = " ";
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}


//leer documentos
var tabla = document.getElementById('tabla');
db.collection("cafe").onSnapshot((querySnapshot) => {
    tabla.innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().name}`);
        tabla.innerHTML += `
        <tr>
        <th scope="row">${doc.id}</th>
        <td>${doc.data().city}</td>
        <td>${doc.data().name}</td>
        <td><button class="btn btn-danger" onclick="eliminare('${doc.id}')">Eliminar</button></td>
        <td><button class="btn btn-warning" onclick="Editar('${doc.id}','${doc.data().city}','${doc.data().name}')">Editar</button></td>
    </tr>
    `
    });




});

//borrar documento
function eliminare(id) {
    db.collection("cafe").doc(id).delete().then(function () {
        console.log("Document successfully deleted!");
    }).catch(function (error) {
        console.error("Error removing document: ", error);
    });

}

//editar Documento
function Editar(id, city, name) {
    document.getElementById('city').value = city;
    document.getElementById('name').value = name;
    var boton = document.getElementById('boton')
    boton.innerHTML = 'Editar';
    boton.onclick = function () {
        var washingtonRef = db.collection("cafe").doc(id);
        // Set the "capital" field of the city 'DC'
        var city = document.getElementById('city').value;
        var name = document.getElementById('name').value
        return washingtonRef.update({
            city: city,
            name: name,
        })
            .then(function () {
                console.log("Document successfully updated!");
                boton.innerHTML = 'agregar';
                document.getElementById("city").value = " ";
                document.getElementById("name").value = " ";
            })
            .catch(function (error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            }); test.firestore.js

    }

}







function Salir() {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.

        window.location = "login.html";
        console.log('sesion cerrada');
    }).catch(function (error) {
        console.log(error);
    });
}

