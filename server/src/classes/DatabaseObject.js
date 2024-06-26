const mongodb = require("mongodb");
const DatabaseConnection = require('../repositories/dataBaseConnection')


class DatabaseObject {
    constructor() {
        this.collection = null;
        this.id = null;
    }

    setId(id) {
        this.id = id
    }


    setObjectId(idString) {
        this.id = new mongodb.ObjectId(idString);
        return this
    }

    getSaveData() {
        console.warn("should be overriden")
        return {}
    }

    async save() {
        const data = this.getSaveData()
        return await DatabaseConnection.getInstance().save(this.collection, this.id, data);
    }

    getAll() {
        const resData = DatabaseConnection.getInstance().getAll(this.collection)
        return resData
    }


    getAllActive(){
        const resData = DatabaseConnection.getInstance().getAllActive(this.collection)
        return resData
    }


    delete() {
        const response = DatabaseConnection.getInstance().delete(this.collection, this.id)
        return response
    }

    async ensureHasId() {
        if (!this.id) {
            const newDocument = await DatabaseConnection.getInstance().save(this.collection, null, {});
            this.id = newDocument.insertedId
        }
    }

    getObjectId(id) {
        if (!id) {
            return null
        }
        if (id instanceof mongodb.ObjectId) {
            return id
        }
        return new mongodb.ObjectId(id);
    }

    async getDatabaseData() {
        return await DatabaseConnection.getInstance().getDocument(this.collection, this.id);
    }

    async loadFromDatabase(id) {
        return await DatabaseConnection.getInstance().loadFromDatabase(this.collection, id)
    }

    async updateBySessionID( sessionId, data){
        return await DatabaseConnection.getInstance().loadFromDatabase(this.collection, sessionId, data)
    }

    async updateOneFromDB(idData, data){
        return await DatabaseConnection.getInstance().updateOne(this.collection, idData, data)
    }
}

module.exports = DatabaseObject;