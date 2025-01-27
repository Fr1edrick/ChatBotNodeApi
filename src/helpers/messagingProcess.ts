import { facebookApi } from "../services/facebookApi";

export const sendMessage = async function (business_phone_number_id: string, payload: any) {
    await facebookApi
        .post( 
            `${business_phone_number_id}/messages`,
            payload
        )
        .then( ( { data } ) => console.log( data ))
        .catch( ( err ) => console.error( err ));
}