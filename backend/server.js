import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import CookieParser from 'cookie-parser';
import cors from "cors"
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import adminRoute from './routes/admin.js'
import extractionRoute from './routes/extraction.js'
import configurationRoute from './routes/configuration.js'
import nodeMailer from 'nodemailer'

const app = express()

dotenv.config()

const PORT = process.env.PORT

const connect = async () => {
    try {
        await mongoose.connect(process.env.DB)
        console.log("Connected To MongoDB")
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB Disonnected")
})

mongoose.connection.on("connected", () => {
    console.log("MongoDB Connected")
})

app.use(cors())
app.use(CookieParser())
app.use(express.json())

app.use("/auth", authRoute)
app.use("/users", userRoute)
app.use("/admins", adminRoute)
app.use("/extractions", extractionRoute)
app.use("/configurations", configurationRoute)


// // Configurez le transporteur en utilisant un service de messagerie comme Gmail
// const transporter = nodeMailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: "omar.aloui@fsegn.ucar.tn", // Votre adresse email stockée dans les variables d'environnement
//       pass: 14654139, // Votre mot de passe stocké dans les variables d'environnement
//     },
//   });
  
//   // Fonction pour envoyer un email
//   const envoyerEmail = async (emailDestinataire, sujet, message) => {
//     try {
//       const mailOptions = {
//         from: "omar.aloui@fsegn.ucar.tn",
//         to: emailDestinataire,
//         subject: sujet,
//         text: message,
//       };
  
//       await transporter.sendMail(mailOptions);
//       console.log('Email envoyé avec succès');
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi de l\'email:', error);
//     }
//   };
  
//   // Exemple d'utilisation de la fonction envoyerEmail
//   envoyerEmail('azizaloui149@gmail.com', 'Sujet de l\'email', 'Bonjour, voici un message important pour vous.');














  

app.listen(PORT, () => {
    connect()
    console.log("Server Running On Port ", PORT)
})