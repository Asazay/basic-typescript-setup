import React, {FormEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as UserActions from "../../actions/user.ts";
import './Homepage.css'

export default function Homepage() {
    const dispatch = useDispatch();
    // @ts-ignore
    let user = useSelector((state) => state.rootReducer.user)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    useEffect(() => {
        // @ts-ignore
        dispatch(UserActions.getUsers()).then(data => {
            console.log(data)
        }).catch((e: any) => console.log(e))
    }, []);

    useEffect((
    ) => {console.log(user)}, [user])

    function createUser(e : FormEvent){
        e.preventDefault()

        let userData = {
            firstName,
            lastName,
            email,
            username,
            password
        }

            // @ts-ignore
            dispatch(UserActions.createUser(userData)).then(data => {
                console.log(data)
            }).catch((e : any) => {
                throw new Error(e)
            })

            setFirstName('')
            setLastName('')
            setEmail('')
            setUsername('')
            setPassword('')
    }

    function deleteUser(e : any, userId : number){
        e.preventDefault();

        // @ts-ignore
        dispatch(UserActions.deleteUser(userId)).then(data => {
            console.log(data)
        }).catch((e : any) => console.log(e))
    }

    return (
        <div>
            <h1>Basic Typescript Setup</h1>
            <h2>This is the homepage :)</h2>
            <form onSubmit={(e) => createUser(e)}>
                <h2>Create a user</h2>
                <div>
                    <label>First name: </label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>Last name: </label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>Email: </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"/>
                </div>
                <div>
                    <label>Username: </label>
                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
                </div>
                <div>
                    <label>Password: </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                </div>
                <button>Submit</button>
            </form>
            <div>
                <h2>User's Table</h2>
                <div>
                    <table>
                        <thead>
                        <tr>
                        <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Username</th>
                        </tr>
                        </thead>
                        <tbody>
                        {user && Object.values(user) && Object.values(user).map((el : any) => (
                            <tr key={el.id}>
                                <th scope='row'>{el.firstName}</th>
                                <td>{el.lastName}</td>
                                <td>{el.email}</td>
                                <td>{el.username}</td>
                                <td><button onClick={(e) => deleteUser(e, parseInt(el.id))}>Delete</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}