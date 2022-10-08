import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import {User} from '../models/User';

dotenv.config();

interface JwtPayload {
    id: string
  }
  

export const Auth = {

    private: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if (req.headers.authorization) {
            // Pegando o conteúdo do headers.authorization e dividir com o ' ' espaço, criar uma variável para cada.
            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string);
                    console.log("Decoded: ", decoded);
                    success = true;
                } catch (error) {
                    console.log("Deu erro em algo:", error);
                }
            }
        }

        if(success){
            next();
        } else {
            res.status(403);
            res.json({error: "Não autorizado"});
        }

    },

    privateAdmin: async (req: Request, res: Response, next: NextFunction) => {
        let success = false;

        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(' ');
            if (authType === 'Bearer') {
                try {
                    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
                    console.log("Decoded: ", decoded); 
                  
                    const userAdmin = await User.findOne({where: {id: decoded.id}})
                  
                    if(userAdmin?.isAdmin === true){
                        success = true;
                    }
                    if(userAdmin?.isAdmin !== true) {
                        success = false;
                    }
                    
                    
                } catch (error) {
                    console.log("Deu erro em algo:", error);
                }
            }
        }

        if(success){
            next();
        } else {
            res.status(403);
            res.json({error: "Este usuário não tem permissão de admin."});
        }

    }

}
