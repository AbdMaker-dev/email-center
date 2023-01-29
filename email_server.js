const dotenv = require('dotenv');
dotenv.config();
const app = require('./app');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
const { PORT } = process.env;


const transporterConf = () => {
    return nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'bld.hitech@gmail.com',
            pass: 'jlhvaxscwbfskefb'
        }
    }));
}

const userToBhitechConf = (useremail, object, message) => {
    return mailOptions = {
        from: useremail,
        to: 'bld.hitech@gmail.com',
        subject: object,
        text: message
    };
}

const bhitecTechToUserConf = (useremail, object, nom) => {
    return mailOptions = {
        from: 'bld.hitech@gmail.com',
        to: useremail,
        subject: object,
        text: `Bonjour/Bonsoir Mr/Mm ${nom} nous vous remercions de nous avoir contacté.\nVotre demande a bien été prise en compte, nous reviendrons vers vous dans les plus brefs délais.`
    };
}

const sendMail = () => {
    transporterConf().sendMail(optionConf('daaratechconsulting@gmail.com', 'aliounebadaradiouf7@gmail.com'), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}


// module.exports = { sendMail };

app.post(`/send-email`, (req, res) => {
    const { first_name, last_name, email, message, objectMessage } = req.body;
    if (!(email && message)) {
        res.status(400).send({ message: "Missing infos" });
    }
    transporterConf().sendMail(userToBhitechConf(email, objectMessage, `Prenom : ${first_name}\nNom : ${last_name}\nObjet: ${objectMessage}\nMessage : ${message}`), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    transporterConf().sendMail(bhitecTechToUserConf(email, objectMessage,last_name), function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.status(200).send({ message: "Message sent successfully." });
});

app.listen(PORT || 3001, () => {
    console.log(`l'Application is running ont port: ${PORT}`);
});


module.exports = app;