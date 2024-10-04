import {Model, Table, Column, DataType, DefaultScope, Scopes} from "sequelize-typescript";


@DefaultScope(() => ({
    attributes: ['id', 'firstName', 'lastName', 'email', 'username']
}))

@Table({
    tableName: 'Users',
})

export default class User extends Model{
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    })
    declare id? : number;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
        field: "firstName"
    })
    declare firstName? : string;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
        field: "lastName"
    })
    declare lastName? : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "email"
    })
    declare email? : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "username"
    })
    declare username? : string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "password"
    })
    declare password? : string
}