import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import Axios from 'axios'

function Posts() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState('')
    const [items, setItems] = useState([]);
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')

    useEffect(() => {
        getData();

    }, [])
    const getData = () => {
        fetch("http://localhost:3003/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
    
    const submitHandler = (e) => {
        e.preventDefault()
        if (isEdit) {
            Axios.put(`http://localhost:3003/posts/${editId}`, {
                title: title,
                body: body
            })
                .then((res) => {
                    setIsEdit(false)
                    setEditId('')
                    setTitle('');
                    setBody('');
                    getData();
                })
                .catch((err) => {
                    console.log(err) 
                })
        } else {
            Axios.post("http://localhost:3003/posts", {
                title: title,
                body: body
            })
                .then((res) => {
                    getData();
                    setTitle('');
                    setBody('');
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    //delete
    const deleteHandler = (item) => {
        console.log(item, "s")
        Axios.delete(`http://localhost:3003/posts/${item}`)
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err)
            })
    };
    //edit//update
    const editHandler = (item) => {
        setTitle(item.title);
        setBody(item.body);
        setEditId(item.id)
        setIsEdit(true)
    }

    //error and loading state
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header />
                <div style={{ textAlign: 'center' }}>
                    <form onSubmit={submitHandler}>
                        <label for="title">Enter Title:</label><br />
                        <input type="text" required onChange={(e) => setTitle(e.target.value)} value={title} id="title" name="title" /><br />
                        <label for="body">Enter Description:</label><br />
                        <input type="text" required onChange={(e) => setBody(e.target.value)} value={body} id="body" name="body" /><br />
                        {
                            isEdit ?
                                <button type="submit" style={{backgroundColor:"aqua"}}>Update</button>
                                :
                                <button type="submit" style={{backgroundColor:"green"}}>Submit</button>
                        }
                    </form>
                </div>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <ul>
                                <li>TITLE :- {item.title}</li>
                                <li>DESCRIPTION :- {item.body}</li>
                                <button onClick={() => { deleteHandler(item.id) }} style={{backgroundColor:"red"}}><i class="material-icons">delete</i></button>
                                <button onClick={() => { editHandler(item) }} style={{backgroundColor:"blue"}}><i class="material-icons">EDIT</i></button>
                            </ul>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
export default Posts
