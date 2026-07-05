const Auth = {

    login() {

        const mobile =
            document
                .getElementById("mobile")
                .value
                .trim();

        if (!mobile) {

            alert(
                "Please enter mobile number."
            );

            return;

        }

        document
            .getElementById("loginBtn")
            .disabled = true;

        google.script.run

            .withSuccessHandler(function(result) {

                document
                    .getElementById("loginBtn")
                    .disabled = false;

                if (!result.success) {

                    alert(result.message);

                    return;

                }

                localStorage.setItem(
                    "customer",
                    JSON.stringify(result.customer)
                );

                window.location =
                    "dashboard.html";

            })

            .withFailureHandler(function(err) {

                document
                    .getElementById("loginBtn")
                    .disabled = false;

                alert(err);

            })

            .apiLogin(mobile);

    }

};

document
    .getElementById("loginBtn")
    .addEventListener(
        "click",
        Auth.login
    );
