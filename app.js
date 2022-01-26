//properties
var bntSubmit = document.getElementById('btn-submit');

//functions
function crear() {
    var email = document.getElementById('input-email').value;
    var password = document.getElementById('input-password').value;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(
        function (user) {
            console.log(user);
            document.location.href("home.html");
        },
        function (error) {
            console.log(error);
        }
    );
}

function login() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    firebase.auth().signInWithEmailAndPassword(email, password).then(
        function (user) {
            console.log(user);
            redireccionar(user)
        },
        function (error) {
            console.log(error);
        }
    );
}

function redireccionar(user) {
    console.log(user);
    window.location.href = "home.html"
}

//events
$('.toggle').click(function () {
    $('.formulario').animate({
        heigth: "toggle",
        'padding-top': 'toggle',
        'padding.bottom': 'toggle',
        opacity: 'toggle'
    });
});

$("#btn-submit").click(function (e) {
    e.preventDefault();
    crear();
});

$("#btn-login").click(function (e) {
    e.preventDefault();
    login();
});