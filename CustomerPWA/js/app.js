/**
 * ==========================================================
 * APPLICATION
 * ==========================================================
 */

const App = {

    customer: null,



    async initialize() {

        this.customer =
            Auth.getCustomer();

        if (!this.customer) {

            window.location.href =
                "index.html";

            return;

        }

        try {

            const result =
                await API.profile(
                    this.customer.id
                );

            if (!result.success) {

                alert(
                    result.message
                );

                Auth.logout();

                return;

            }

            this.customer =
                result.customer;

            localStorage.setItem(

                "customer",

                JSON.stringify(
                    this.customer
                )

            );

            this.updateHeader();

        }

        catch (e) {

            console.error(e);

            alert(
                "Unable to load customer information."
            );

        }

    },



    updateHeader() {

        const name =
            document.getElementById(
                "customerName"
            );

        if (name) {

            name.textContent =
                this.customer.name;

        }

    }

};



document.addEventListener(

    "DOMContentLoaded",

    function () {

        App.initialize();

    }

);
