import { Model, Table, Column, DataType } from "sequelize-typescript";

@Table({
    tableName: 'Users'
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
    firstName? : string;

    @Column({
        type: DataType.STRING(16),
        allowNull: true,
        field: "lastName"
    })
    lastName? : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "email"
    })
    email? : string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "username"
    })
    username? : string

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: "password"
    })
    password? : string
}