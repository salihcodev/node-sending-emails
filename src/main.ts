// import pks:
import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import nodemailer from 'nodemailer';

// >>>> port that app is using:
const PORT = process.env.PORT || 8080;

// *******
// >>>> INITIALIZING EXPRESS APP:
const app = express();

// *******
// >>>> APPLY THE MIDDLEWARES:
// use cors
app.use(cors());

// >>>> parsing the body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// HTTPs logger:
app.use(morgan('tiny'));
// *******
//

// >>>> SETUP ROUTES:
// initial route:
app.get('/', (req: Request, res: Response): void => {
    res.send(`Initial`);
});

// Email controller route:
app.post('/contact', async (req: Request, res: Response): Promise<void> => {
    const { email: _emailToSend } = req.body;

    // >>>> SETUP NODEMAILER:
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '@@#@gmail.com',
                pass: '@#@$$#',
            },
        });

        const mailOptions = {
            from: '@@#@gmail.com',
            to: _emailToSend,
            subject: `Hello, ${_emailToSend.split("@")[0]}`,
            html: '<h3>Another Email</h3> </br> <p>Some apps and devices use less secure sign-in technology</p>',
        };

        // send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);

        res.status(200).json({
            message: `Email sent successfully to ${_emailToSend}`,
            emailId: info.messageId,
        });
    } catch (err) {
        res.status(200).json({
            message: `Failed to send the given email to: ${_emailToSend}`,
            error: err,
        });
    }
});

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
