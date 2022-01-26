function Register() {
    window.addEventListener('submit', function (e) {
        e.preventDefault();

        var email = document.getElementById('email2').value;
        var password = document.getElementById('password2').value;

        auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);

        });
        console.log('usuario creado: ' + email);
    });
}

function Login() {
    window.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;

        auth.signInWithEmailAndPassword(email, password).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            alert (errorMessage);
        });

    });


}

