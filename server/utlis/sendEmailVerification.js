import nodemailer from "nodemailer"
const sendEmailVerification = async (email,token) =>
{

    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.NodeMailerUser, 
          pass: process.env.NodeMailerPassword, 
        },
    });

    try {
        let info = await transporter.sendMail({
            from: 'KKR Kirana"<KKR-Kirana.com>"', // sender address
            to: email, // list of receivers
            subject: "Email Verification", // Subject line
            text: "Please click on the following link for verify your email : https://kkr-kirana.onrender.com/verify/"+token, // plain text body  
        });
        console.log("Email send successfully")
    } 
    catch (error) {
        console.log("Email can't send successfully")
    }
    
    
}

export default sendEmailVerification