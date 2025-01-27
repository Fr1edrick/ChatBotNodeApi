import { Request, Response } from 'express';
import { flowProcessCreate, flowProcessRetrieve, flowProcessRetrieveOne } from '../db/flowProcess';

const flowCreate = async (req: Request, res: Response) => {
    try {
        const response = await flowProcessCreate( req )
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json( { message: "Error al guardar el flujo" } );
    }
};

const flowRetrieve = async (_req: Request, res: Response) => {
    try {
        const response = await flowProcessRetrieve();
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json( { message: "Error al recuperar los flujos" } );
    }
};

const flowRetrieveOne = async (req: Request, res: Response) => {
    try {
        const intentId: string = req.params.intentId;
        const response = await flowProcessRetrieveOne( intentId );
        console.log(response);
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json( { message: "Error al recuperar el flujo" } );
    }
};

export { flowCreate, flowRetrieve, flowRetrieveOne };