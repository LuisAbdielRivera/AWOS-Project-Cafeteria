import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token } = datos

      //Enviar el email
      await transport.sendMail({
        from: 'CyberCoffe.com',
        to: email,
        subject: 'Confirma tu cuenta en CyberCoffe.com',
        text: 'Confirma tu cuenta en CyberCoffe.com',
        html: `
        <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3dbc3;
            color: #804000;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #804000;
        }

        p {
            margin: 10px 0;
            line-height: 1.6;
        }

        a {
            color: #9e6730;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
<body>
    <div class="container">
        <h1 style="color: #804000;">CyberCoffe.com</h1>
        <p>Hola ${nombre},</p>
        <p>¡Bienvenido a CyberCoffe.com!</p>
        <p>En nuestra cafetería online, nos comprometemos a ofrecer la más alta calidad en productos de café. Nos esforzamos por proporcionar a nuestros clientes una experiencia única, desde la selección de granos de café hasta la entrega en su puerta. Nos guían valores como la calidad, la sostenibilidad y la satisfacción del cliente.</p>
        <p>Tu cuenta ya está lista, solo debes confirmarla en el siguiente enlace:</p>
        <p><a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/confirmar/${token}">Confirma tu cuenta</a></p>
        <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
        <p>¡Gracias por unirte a nuestra comunidad de amantes del café!</p>
    </div>
</body>
        `
      })

}

const emailOlvidePassword = async (datos) => {

  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const { email, nombre, token } = datos

    //Enviar el email
    await transport.sendMail({
      from: 'CyberCoffe.com',
      to: email,
      subject: 'Restablece tu password en CyberCoffe.com',
      text: 'Restablece tu password en CyberCoffe.com',
      html: `
      <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f3dbc3;
            color: #804000;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #804000;
        }

        p {
            margin: 10px 0;
            line-height: 1.6;
        }

        a {
            color: #9e6730;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
    <body>
    <div class="container">
        <h1 style="color: #804000;">CyberCoffe.com</h1>
        <p>Hola ${nombre}, has solicitado reestablecer tu password en BienesRaices.com,</p>
        <p>Sigue el siguiente enlace para generar un password nuevo: </p>
        <p><a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/olvide-password/${token}">Restablecer Password </a></p>
        <p>Si tu no solicitaste el cambio de password, puedes ignorar el mensaje.</p>
    </div>
</body>
      `
    })

}

export {
    emailRegistro,
    emailOlvidePassword
  }