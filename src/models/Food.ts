import { Model, DataTypes } from 'sequelize';
import { db } from '../instances/mysql';

export interface UserInstance extends Model {
    id: number;
    name: string;
    protein: number;
    price:  number;
}

export const Food = db.define<UserInstance>('Food', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    name: {
        type: DataTypes.STRING
    },
    protein: {
        type: DataTypes.FLOAT
    },
    price: {
        type: DataTypes.FLOAT
    }
}, {
    tableName: 'foods',
    timestamps: false
});