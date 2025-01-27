import ChatStatus from "./sessionModel";

const ChatProcessCreate = async ( payloadChat: any ) => {
    try {
        const response = await ChatStatus.create( payloadChat )
        return response;
    } catch (error) {
        console.error(error, 'Error al crear la interacción en base de datos');
    }
};

const ChatProcessRetrieve = async () => {
    try {
        const response = await ChatStatus.find();
        console.log(response);
        return response;
    } catch (error) {
        console.error(error, 'Error al recuperar las interacciones desde la base de datos');
    }
};

const ChatProcessRetrieveOne = async ( userPhone: string ) => {
    try {
        const response = await ChatStatus.findOne( { user: userPhone } );
        console.log(response);
        return response;
    } catch (error) {
        console.error(error, "Error al recuperar la interacción del chat desde la base de datos");
    }
};

const ChatProcessUpdate = async ( userPhone: string, status: string) => {
    try {
        const response = await ChatStatus.findByIdAndUpdate( { user : userPhone }, { sessionState: status } );
        console.log(response);
    } catch (error) {
        console.error(error, 'Error al actualizar la interacción en la base de datos');
    }
};

export { ChatProcessCreate, ChatProcessRetrieve, ChatProcessRetrieveOne, ChatProcessUpdate };