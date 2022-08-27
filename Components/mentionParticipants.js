module.exports = mentionParticipants = async (client, msg) => {
    console.log(msg.body);

    if (msg.fromMe && msg.body == "!skwadoosh") {
        let og = await msg.getQuotedMessage();
        const chat = await msg.getChat();
        console.log(`${chat.name} triggered!`);
        let text = "";
        let mentions = [];

        for (let participant of chat.participants) {
            const contact = await client.getContactById(
                participant.id._serialized
            );
            mentions.push(contact);
            text += `@${participant.id.user} `;
        }

        try {
            // client.sendMessage(chat.id._serialized,text,{mentions,quotedMessageId: og.id._serialized})
            // client.sendMessage('120363019836266375@g.us',text,{mentions,quotedMessageId: 'false_120363019836266375@g.us_5F92E541412D02D8E347D46507DD39EA_919995614322@c.us'})
            og.reply(text, null, { mentions });
        } catch (err) {
            console.log(err);
        }
    }
};
