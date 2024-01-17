// /api/new-meetup
import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        // const {title, image, address, desciption} = data;

        // connect db
        const client = await MongoClient.connect('mongodb+srv://dbUser:0iADezfSusnnoT6g@cluster0.oohuv7j.mongodb.net/meetup?retryWrites=true&w=majority');

        const db = client.db();

        const meetupCollection = db.collection('meetup');

        const result = await meetupCollection.insertOne(data);

        console.log('result : ', result);
        // result :  {
        //     acknowledged: true,
        //     insertedId: new ObjectId('65a61467ca8cf34a1b8b2b81')
        //   }

        client.close();

        res.status(201).json({message: 'Meetup inserted!'});
    }
}

export default handler;