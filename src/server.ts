import { Request, Response } from 'express';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import { db } from './instances/mysql';
import { User } from './models/User';

dotenv.config();

const server = express();


//rota estática, cors, requests e responses, routes.
server.use(cors());
server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(apiRoutes);



server.listen(process.env.PORT, () => {
    console.log("Server iniciado.")
});

//Populate DB
db.sync(({ alter: true })).then(() => {
    User.bulkCreate([
        { email: "breno@gmail.com", password: "1234", isAdmin: true },
        { email: "bruno@gmail.com", password: "4321", isAdmin: false },
    ], { ignoreDuplicates: true })
        .then(() => {
            console.log("Users created successfully");
        })
        .catch((err) => {
            console.log("Algum erro na sync: ", err);
        })
})

//Test DB
db.authenticate().then(() => { console.log("Autenticado no DB com sucesso") })
    .catch((err) => {
        console.log(`Deu algum erro na hora de autenticar: ${err}`);
    })

