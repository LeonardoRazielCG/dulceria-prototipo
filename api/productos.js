const { MongoClient } = require('mongodb');

// Cargamos la URL desde la variable de entorno que pusimos en Vercel
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
    try {
        await client.connect();
        // IMPORTANTE: Asegúrate de que tu base de datos se llame 'Dulceria' en MongoDB Atlas
        const database = client.db('Dulceria');
        const collection = database.collection('Inventario');

        const productos = await collection.find({}).toArray();

        // Enviamos los datos al frontend
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Fallo al conectar con la base de datos' });
    } finally {
        await client.close();
    }
}