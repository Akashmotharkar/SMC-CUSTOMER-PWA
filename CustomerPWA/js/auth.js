/**
 * ==========================================================
 * AUTHENTICATION
 * ==========================================================
 */

const Auth = {

    async login() {

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

        const button =
            document.getElementById(
                "loginBtn"
            );

        button.disabled = true;

        button.innerText =
            "Please wait...";

        try {

            const result =
                await API.login(
                    mobile
                );

            button.disabled = false;

            button.innerText =
                "Login";

            if (!result.success) {

                alert(
                    result.message
                );

                return;

            }

            localStorage.setItem(

                "customer",

                JSON.stringify(
                    result.customer
                )

            );

            window.location.href =
                "dashboard.html";

        }

        catch (e) {

            button.disabled = false;

            button.innerText =
                "Login";

            alert(
                "Unable to connect to server."
            );

            console.error(e);

        }

    },



    logout() {

        localStorage.removeItem(
            "customer"
        );

        window.location.href =
            "index.html";

    },



    getCustomer() {

        const customer =
            localStorage.getItem(
                "customer"
            );

        if (!customer) {

            return null;

        }

        return JSON.parse(customer);

    },



    isLoggedIn() {

        return this.getCustomer() !== null;

    }

};



document
    .getElementById("loginBtn")
    .addEventListener(
        "click",
        function () {

            Auth.login();

        }
    );
