import { Request, Response } from 'express';
import { Food } from '../models/Food';
import { FoodType } from '../types/FoodType'
import { formatToNumber } from '../utilities/formatter'
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getAllFood = async (req: Request, res: Response) => {

    const foods = await Food.findAll();
    res.json({ foods: foods })
    return;
}

export const getOneFood = async (req: Request, res: Response) => {

    let { id } = req.params;

    const food = await Food.findByPk(id);
    if (food) {
        res.json({ food: food });
        return
    } else {
        res.json({ msg: "Não foi possível encontrar food com esse ID informado", name: "Não encontrado" })
    }
}

export const createFood = async (req: Request, res: Response) => {

    let { name, protein, price } = req.body;

    if (name !== "" || name !== undefined || name !== null) {
        let proteinFormatted = formatToNumber(protein);
        let priceFormatted = formatToNumber(price);
        let newFood = await Food.create({ name, protein: proteinFormatted, price: priceFormatted });
        res.status(201);
        res.json({ msg: "Criado com sucesso", food: newFood })
        return;
    } else {
        res.json({ error: "Algum erro aconteceu." });
        return;
    }

}

export const updateFood = async (req: Request, res: Response) => {

    let id = req.params.id;
    let { name, protein, price } = req.body;

    const food = await Food.findByPk(id);

    if (name === "" || name === undefined || name === null) {
        res.json({ msg: "Nao foi possivel atualizar, informe algum campo a ser atualizado." });
        return;
    }

    if (food) {

        let updatesFood: FoodType = {
            name: food.name,
            price: food.price,
            protein: food.protein
        }

        if (name) {
            updatesFood.name = name;
        }

        if (price) {
            let priceFormatted = formatToNumber(price);
            updatesFood.price = priceFormatted;
        }

        if (protein) {
            let proteinFormatted = formatToNumber(protein);
            updatesFood.protein = proteinFormatted;
        }

        //Atualizando com as infos que foram informadas apenas
        food.update({
            name: updatesFood.name, protein: updatesFood.protein, price: updatesFood.price
        }).then(() => { res.json({ msg: "Food atualizado com sucesso", food }); return })

    }

}

export const deleteFood = async (req: Request, res: Response) => {
    let id = req.params.id;

    const food = await Food.findByPk(id);

    if (food) {
        food.destroy();
        const actualFoods = await Food.findAll();
        if (actualFoods) {
            res.json({ msg: `O food com ID ${food.id} e nome ${food.name} foi removido.`, actualFoods })
        }
    } else {
        res.status(404);
        res.json({ msg: `Não existe food com o ${id} para ser removido.` })
    }
}


