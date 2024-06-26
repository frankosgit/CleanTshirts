const mongodb = require("mongodb");

let instance = null;

class DatabaseConnection {
    constructor() {
        this.client = null;
        this.url = null;
        this.debugId = Math.floor(Math.random() * 1000000)
    }

    static getInstance() {
        if (!instance) {
            instance = new DatabaseConnection()
        }
        return instance
    }

    setUrl(url) {
        this.url = url
    }

    async connect() {
        if (!this.client) {
            this.client = new mongodb.MongoClient(this.url);
            await this.client.connect()
            console.log("DB connected" + this.debugId)
        }
        return this.client.db("shop")
    }

    async getAll(aCollection) {
        await this.connect();
        let db = this.client.db("shop");
        const collection = db.collection(aCollection)
        let pipeline = []
        let documents = collection.aggregate(pipeline);
        let returnArray = [];
        for await (const document of documents) {
            returnArray.push(document)
        }
        return returnArray
    }



    async getAllActive(aCollection) {
        await this.connect();
        let db = this.client.db("shop");
        const collection = db.collection(aCollection)
        let activeArray = await collection.find({ "status": true }).toArray()
        return activeArray
    }

    async save(aCollection, aId, aData) {
        try {
            await this.connect()
            let db = this.client.db("shop");
            const collection = db.collection(aCollection)
            if (aId) {
                console.log("im editing", aData, aId)
                const updateResult = await collection.updateOne({ "_id": new mongodb.ObjectId(aId) }, {
                    "$set": {
                        ...aData
                    }
                })
                return await updateResult

            } else {
                console.log("im creating", aData, aId)
                const insertResult = await collection.insertOne(aData)
                console.log(insertResult)

                return insertResult
            }
        }
        catch (error) {
            console.error('Failed to save:', error);
            throw new Error('Failed to save ' + error.message);
        }
    }

    async getDocument(aCollection, aId) {
        await this.connect()
        let db = this.client.db("shop");
        const collection = db.collection(aCollection)

        let results = await collection.find({ "_id": aId }).toArray()
        return results[0]

    }

    async loadFromDatabase(aCollection, id) {
        try {
            await this.connect();
            const db = this.client.db("shop");
            const collection = db.collection(aCollection);
            if (aCollection === "cart") {
                const cart = await collection.findOne({ userId: id });
                if (cart) {
                    return cart;
                } else {
                    return { userId, lineItems: [] };
                }
            } else if (aCollection === "orders") {
                const data = await collection.find({ userId: id }).toArray();
                return data
            }
        } catch (error) {
            console.error('Failed to load data:', error);
            throw new Error('Failed to load data');
        }
    }


    async delete(aCollection, aId) {
        try {
            await this.connect()
            let db = this.client.db("shop");
            const collection = db.collection(aCollection)
            const result = await collection.deleteOne({ "_id": new mongodb.ObjectId(aId) });
            return result
        }
        catch (error) {
            console.error('Failed to delete product:', error);
            throw new Error('Failed to delete product');
        }
    }


    async updateOne(aCollection, idData, updates){
        console.log("IM UPDATING AFTER CONFIRMATION", aCollection, idData, updates)
        await this.connect()
        let db = this.client.db("shop");
        const collection = db.collection(aCollection)
        const result = await collection.updateOne({...idData}, { $set: updates})
        return result
    }

}

module.exports = DatabaseConnection