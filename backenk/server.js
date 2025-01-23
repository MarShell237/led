const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com', // Serveur SMTP de Brevo
    port: 587, // Port SMTP (587 pour STARTTLS)
    secure: false, // False pour STARTTLS, true pour SSL/TLS
    auth: {
        user: '841d00002@smtp-brevo.com', // Identifiant SMTP
        pass: '2naqhUFTW8SkBO5J' // Mot de passe SMTP
    },
    tls: {
        rejectUnauthorized: false // Permet d'ignorer les erreurs TLS (utile en cas de configuration incorrecte du certificat)
    }
});

// Point de terminaison pour l'envoi d'emails
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Validation des données d'entrée
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

    // Options de l'email
    const mailOptions = {
        from: '"Formulaire de Contact" <841d00002@smtp-brevo.com>', // Adresse de l'expéditeur
        to: 'kerolwamba239@gmail.com', // Adresse du destinataire
        subject: `Nouveau message de ${name}`, // Objet de l'email
        text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}` // Contenu texte
    };

    try {
        // Envoi de l'email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email envoyé:', info.response);
        res.status(200).json({ message: 'Email envoyé avec succès' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' });
    }
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
