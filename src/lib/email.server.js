/*----------------------------------------------- #||--email--|| */


// #\-IMPORTS-\

    // --SVELTE

    // --LIB
    import { EMAIL, EMAIL_PASSWORD } from '$env/static/private'

    // --CONTEXTS

    // --JS
    import nodemailer from 'nodemailer'

//=======@COMPONENTS|

    // --*


// #\-EXPORTS-\

    // --THIS
    export default email_getTransporter()


// #\-CONSTANTES-\

    // --THIS


// #\-VARIABLES-\

    // --THIS


// #\-FUNCTIONS-\

    // --SET

    // --GET
    function email_getTransporter()
    {
        const TRANSPORTER = nodemailer.createTransport(
        {
            host  : 'smtp.gmail.com',
            port  : 587,
            secure: false,
            auth  :
            {
                user: EMAIL,
                pass: EMAIL_PASSWORD
            }
        })

        return TRANSPORTER
    }

    // --UPDATES


//=======@UTILS|

    // --*