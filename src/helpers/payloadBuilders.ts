const buildPayloadChat = (user: string, sessionState: string, currentFlow:string) => {
    return {
        user,
        sessionState,
        currentFlow
    };
};

const buildPayloadMessaging = ( userPhone: string, mesagge: string, messageId?: string) => {
    return {
        messaging_product: 'whatsapp',
        to: userPhone,
        text: { body: mesagge },
        context: {
            message_id: messageId
        }
    };
};

const buildPayload = (userId: string, message: string) => {
    return {
        messaging_product: "whatsapp",
        to: userId,
        text: { body: message }
    }
};

const buildPayloadReadMessage = (messageId: string) => {
    return {
        messaging_product: 'whatsapp',
        status: "read",
        message_id: messageId
    }
}

export { buildPayloadChat, buildPayloadMessaging, buildPayload, buildPayloadReadMessage };