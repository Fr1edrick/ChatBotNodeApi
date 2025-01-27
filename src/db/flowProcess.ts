import { Request } from 'express';
import ChatFlow from './flowModel';

const flowProcessCreate = async ( req: Request ) => {
    try {
        const body = req.body;
        const response = await ChatFlow.create(body)
        return response;
    } catch (error) {
        console.error(error);
    }
};

const flowProcessRetrieve = async () => {
    try {
        const response = await ChatFlow.find();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

const flowProcessRetrieveOne = async ( intentId: string ) => {
    try {
        // const intentId: string = req.params.intentId;
        const response = await ChatFlow.findOne( { intent: intentId } );
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
};

export { flowProcessCreate, flowProcessRetrieve, flowProcessRetrieveOne };