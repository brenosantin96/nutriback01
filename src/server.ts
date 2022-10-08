import { Request, Response } from 'express';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import {db} from './instances/mysql';

dotenv.config();

const server = express();


//rota estática, cors, requests e responses, routes.
server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(apiRoutes);


server.listen(process.env.PORT, () => {
    console.log("Server iniciado.")
});

//Test DB
db.authenticate().then(()=> {console.log("Autenticado no DB com sucesso")})
.catch((err)=> {
    console.log(`Deu algum erro na hora de autenticar: ${err}`);
})

