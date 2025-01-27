import cron from 'node-cron';
import express from 'express';
import {urlencoded, json} from 'body-parser';
import cors from 'cors';

import connectionFactory from './db/config';
import router from './routes';
import { cleanSessions, inactivityVerify, closedSession } from './helpers/statusProcess';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const { BUSINESS_PHONE } = process.env;

const app = express();
app.use(urlencoded({extended:false}));
app.use(json());
app.use(cors());

const port = 3000;

connectionFactory().then( () => {
    console.log("MongoDB connected");

    app.use('/api', router);

    // revisar inactividad
    cron.schedule('*/1 * * * *', () => {
        console.log("Revisando de inactividad y limpieza en la cola chats");
        inactivityVerify( String( BUSINESS_PHONE ) );
    } );
    
    // Cerrar sesiones
    cron.schedule( '*/5 * * * *', () => {
        closedSession( String( BUSINESS_PHONE ) );
    } );
    
    // eliminar sesiones expiradas
    cron.schedule( '*/5 * * * *', () => { 
        cleanSessions();
    } );

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch( err => {
    console.log("Failed to connect to mongoDB", err);
});
