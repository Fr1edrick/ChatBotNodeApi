import { ChatProcessUpdate } from "../db/chatProcess";
import { sendMessage } from "./messagingProcess";
import { buildPayload } from "./payloadBuilders";

const userSession: Map<string, { lastActivity: number, status: "ACTIVE" | "PENDING" | "CLOSED" }> = new Map();
const inactivityLimit: number = 60 * 1000 * 5;
const closeTime: number = 60 * 1000 * 2;
const expirationLimit: number = 10 * 60 * 1000;

const registryActivity = (userPhone: string) => {
    const now = Date.now();

    if ( !userSession.has( userPhone ) ) {
        userSession.set( userPhone, { lastActivity: now, status: "ACTIVE" } );
    } else {
        const session = userSession.get( userPhone )!;
        session.lastActivity = now;
        session.status = "ACTIVE";
    }
};

const inactivityVerify = (business_phone_number_id: string) => {
    const now = Date.now();

    userSession.forEach( (session, userId) => {
        const actualTime = now - session.lastActivity;
        if ( session.status === "ACTIVE" &&  actualTime > inactivityLimit ) {
            const payload = buildPayload(userId, "¿Aun se encuentra ahí?");
            sendMessage(business_phone_number_id, payload);
            session.status = "PENDING";
        }
    });
};

const closedSession = ( business_phone_number_id: string ) => {
    const now = Date.now();

    userSession.forEach( (session, userId) => {
        const actualTime = now - session.lastActivity;
        if ( session.status ==="PENDING" && actualTime > closeTime ) {
            const payload = buildPayload(userId, "Sesión cerrada por inactividad");
            sendMessage(business_phone_number_id, payload);
            session.status = "CLOSED";

            ChatProcessUpdate( userId, session.status ); // Cierre de chat
        }
    });
};

const cleanSessions = () => {
    userSession.forEach((session, userId) => {
        if (session.status === "CLOSED" && Date.now() - session.lastActivity > expirationLimit) {
        userSession.delete(userId);
        }
    });
};

export { registryActivity, inactivityVerify, closedSession, cleanSessions };