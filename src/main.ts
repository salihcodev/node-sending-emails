// import pks:
import cors from 'cors';
import morgan from 'morgan';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

// import utils:

// >>>> port that app is using:
const PORT = process.env.PORT || 8080;

// *******
//
//
// >>>> INITIALIZING EXPRESS APP:
const app = express();

// *******
//
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
//

// >>>> SETUP ROUTES:
// initial route:
app.get('/', (req: Request, res: Response): void => {
    res.send(`Initial`);
});

// Email controller route:
app.post('/contact', async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body

    res.send(`Email: ${email}`);
});

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
