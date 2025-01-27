import { Request, response, Response, Router } from "express";
import { 
    ping, 
    webhookRetrieve, 
    webhookProcess 
} from "../controllers/chatbotController";
import {
    flowRetrieve, 
    flowRetrieveOne, 
    flowCreate,
} from '../controllers/flowController';

const gralRouter = Router();

gralRouter.get( '/ping', ( req: Request, res: Response ) => {
   ping( req, res ); 
});

gralRouter.get( '/flow', async ( req: Request, res: Response ) => {
    flowRetrieve( req, res );
});

gralRouter.get( '/flow/:intentId', async ( req: Request, res: Response ) => {
    flowRetrieveOne( req, res );
});

gralRouter.post( '/flow', async ( req: Request, res: Response ) => {
    flowCreate( req, res );
});

gralRouter.get( '/webhook', async (req: Request, res: Response ) => {
    webhookRetrieve( req, res );
});

gralRouter.post( '/webhook', async (req: Request, res: Response ) => {
    webhookProcess( req, res );
});

export default gralRouter;