import { Request, Response } from 'express';
import { User } from '../models/User';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signUp = async (req: Request, res: Response) => {

    let { email, password, isAdmin = false } = req.body;

    if (email.length > 0 && password.length > 0) {
        let hasUser = await User.findOne({ where: { email } });
        if (hasUser) { res.json({ error: 'Não foi possível cadastrar, email já existe.' }); return; }
        if (!hasUser) {
            let newUser = await User.create({ email, password, isAdmin });

            const token = JWT.sign({ id: newUser.id, email: newUser.email, password: newUser.password },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: '2h'
                });

            res.status(201);
            res.json({ id: newUser.id, token });
            return;
        }
    }
};

export const login = async (req: Request, res: Response) => {

    let { email, password } = req.body;

    let user = await User.findOne({ where: { email, password } });
    if (!user) {
        res.json({ error: "Usuário com esse e-mail/senha não existe" });
        return;
    }

    if (user) {
        const token = JWT.sign({ id: user.id, email: user.email, password: user.password },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '2h'
            });

        res.json({ msg: "Logado com sucesso", status: true, token });
        return;
    }

    res.json({msg: "Não foi possível fazer o login", status: false });
    return
};

export const getAllUsers = async (req: Request, res: Response) => {

    let users = await User.findAll();

    if(users){
        res.json(users);
        return
    } else {
        res.json({msg: 'Não há usuários a serem exibidos.'})
    }
    
};


export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}
