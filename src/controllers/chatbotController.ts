import { Request, Response } from 'express';

import { ChatProcessCreate, ChatProcessRetrieveOne } from '../db/chatProcess';
import { flowProcessRetrieveOne } from '../db/flowProcess';
import { registryActivity } from '../helpers/statusProcess';
import { sendMessage } from '../helpers/messagingProcess';
import { buildPayloadChat, buildPayloadMessaging, buildPayloadReadMessage } from '../helpers/payloadBuilders';

const ping = ( _req: Request, res:Response ) => {
    console.log('Test Ping to API');
    res.json('pong');
};

const webhookProcess = async ( req:Request, res: Response ) => {
    try {
        console.log('Incoming webhook message: ' + JSON.stringify(req.body, null, 2));

        const messageData = req.body.entry?.[0]?.changes[0]?.value;
        const message = messageData?.messages?.[0];

        if ( message?.type !== 'text') {
            res.status(400).json( { message: "Sólo se aceptan mensaje de texto" } );
        }

        // buscar conversación
        const business_phone_number_id = messageData?.metadata?.phone_number_id;
        const clientPhoneNumber = message.from;
        
        const currentClient: any = ChatProcessRetrieveOne( clientPhoneNumber );
        let activeChat: any, flowChat: any;
        
        if ( (currentClient != null || currentClient != undefined ) && currentClient.status !== "CLOSE" ) {
            // Mantenga la sesión y vuelva al estado actual
            registryActivity( clientPhoneNumber );

            flowChat = flowProcessRetrieveOne( currentClient.currentFlow );
            
            const payloadMessage = buildPayloadMessaging( clientPhoneNumber, flowChat.message, '');
            sendMessage( business_phone_number_id, payloadMessage );
            
            const payloadRead = buildPayloadReadMessage( message.id );
            sendMessage( business_phone_number_id, payloadRead );

            res.status(200).json( { message: `Se crea nueva sessión para: ${clientPhoneNumber}` } );
            
        } else {
            // registre actividad y creer la sesión o actualicela
            // luego persista y envíe el mensaje pertinente
            registryActivity( clientPhoneNumber );

            const chat = buildPayloadChat( clientPhoneNumber, "ACTIVE", currentClient.currentFlow )
            activeChat = ChatProcessCreate( chat );

            flowChat = flowProcessRetrieveOne( "SALUDO" );
            
            const payloadMessage = buildPayloadMessaging( clientPhoneNumber, flowChat.message, message.id);
            sendMessage( business_phone_number_id, payloadMessage );

            const payloadRead = buildPayloadReadMessage( message.id );
            sendMessage( business_phone_number_id, payloadRead );

            res.status(200).json( { message: `Se envia al usuario ${ clientPhoneNumber } a la sessión abierta` } );

        }
    } catch (error) {
        console.error(error);
        res.status(500).json( { message: "Error al guardar la sesión" } );
    }
};

const webhookRetrieve = async ( req:Request, res: Response ) => {
    try {
        if (
            req.query['hub.mode'] == 'subscribe' &&
            req.query['hub.verify_token'] == 'token'
          ) {
            res.send(req.query['hub.challenge']);
          } else {
            res.sendStatus(400);
          }
    } catch (error) {
        console.error(error);
        res.status(500).json( { message: "Error al recuperar la sesión" } );
    }
};

export { ping, webhookRetrieve, webhookProcess};