import messageModel from "../models/messages.model.js";

class MessageManager {

    constructor() {

    }

    async getChats() {
        try {
            const messages = await messageModel.find().lean()

            return messages

        } catch (error) {
            console.log(error);
        }
    }

    async addMessage(data) {
        try {
            //Desestructuro lo que llega por parametro
            let { user, message } = data
            console.log(user, message);

            //Consulto que los datos esten cargados
            if (!user || !message) {
                console.log({ status: "Error", error: "Faltan parametros" });
            }
            //Uso el metodo create para agregar cada uno de los campos en la coleccion
            let result = await messageModel.create({ user, message })

            //Retorno el resultado
            return result
        } catch (error) {
            console.log('Error al crear mensaje', error);
        }
    }
}

export default MessageManager