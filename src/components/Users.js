import React from 'react'
import Header from './Header'
import { useState, useEffect } from 'react'
import Axios from 'axios'

function Users() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState('')

    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');

    // address
    const [street, setStreet] = useState('');
    const [suite, setSuite] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    //address//geo
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    //company
    const [companyName, setCompanyName] = useState('');
    const [catchPhrase, setCatchPhrase] = useState('');
    const [bs, setBs] = useState('');

    useEffect(() => {
        getData();

    }, [])

    const getData = () => {
        fetch("http://localhost:3003/users")
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
            Axios.put(`http://localhost:3003/users/${editId}`, {
                name: name,
                username: username,
                email: email,
                address: {
                    street: street,
                    suite: suite,
                    city: city,
                    zipcode: zipcode,
                    geo: {
                        lat: lat,
                        lng: lng,
                    }
                },
                phone: phone,
                website: website,
                company: {
                    name: companyName,
                    catchPhrase: catchPhrase,
                    bs: bs
                }
            })
                .then((res) => {
                    setIsEdit(false)
                    setEditId('')
                    setName('');
                    setUsername('');
                    setEmail('');
                    setPhone('');
                    setWebsite('');
                    setStreet('');
                    setSuite('');
                    setCity('');
                    setZipcode('');
                    setLat('');
                    setLng('');
                    setCompanyName('');
                    setCatchPhrase('');
                    setBs('');
                    getData();
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            Axios.post("http://localhost:3003/users", {
                name: name,
                username: username,
                email: email,
                address: {
                    street: street,
                    suite: suite,
                    city: city,
                    zipcode: zipcode,
                    geo: {
                        lat: lat,
                        lng: lng,
                    }
                },
                phone: phone,
                website: website,
                company: {
                    name: companyName,
                    catchPhrase: catchPhrase,
                    bs: bs
                }
            })
                .then((res) => {
                    getData();
                    setName('');
                    setUsername('');
                    setEmail('');
                    setPhone('');
                    setWebsite('');
                    setStreet('');
                    setSuite('');
                    setCity('');
                    setZipcode('');
                    setLat('');
                    setLng('');
                    setCompanyName('');
                    setCatchPhrase('');
                    setBs('');
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }
    //delete
    const deleteHandler = (item) => {
        console.log(item, "s")
        Axios.delete(`http://localhost:3003/users/${item}`)
            .then((res) => {
                getData();
            })
            .catch((err) => {
                console.log(err)
            })
    };
    //edit//update
    const editHandler = (item) => {
        setName(item.name);
        setUsername(item.username);
        setEmail(item.email);
        setPhone(item.phone);
        setWebsite(item.website);
        setStreet(item.street);
        setSuite(item.suite);
        setCity(item.city);
        setZipcode(item.zipcode);
        setLat(item.lat);
        setLng(item.lng);
        setCompanyName(item.companyName);
        setCatchPhrase(item.catchPhrase);
        setBs(item.bs);
        setEditId(item.id)
        setIsEdit(true)
    }

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
                        <div className="row">
                            <div className="col-md-4">
                                <label for="Name">Enter Name:</label><br />
                                <input type="text" required onChange={(e) => setName(e.target.value)} id="Name" value={name} name="Name" /><br />
                                <label for="Username">Enter Username:</label><br />
                                <input type="text" required onChange={(e) => setUsername(e.target.value)} id="Username" value={username} name="Username" /><br />
                                <label for="Email">Enter Email:</label><br />
                                <input type="email" required onChange={(e) => setEmail(e.target.value)} id="Email" value={email} name="Email" /><br />
                                <label for="phone">Enter Phone:</label><br />
                                <input type="text" required onChange={(e) => setPhone(e.target.value)} id="Phone" value={phone} name="Phone" /><br />
                                <label for="Website">Enter Website:</label><br />
                                <input type="text" required onChange={(e) => setWebsite(e.target.value)} id="Website" value={website} name="Website" /><br />
                            </div>

                            <div className="col-md-4">
                                <h5>Enter Address</h5>
                                <label for="street">Enter Street:</label><br />
                                <input type="text" required onChange={(e) => setStreet(e.target.value)} id="street" value={street} name="street" /><br />
                                <label for="Suite">Enter Suite:</label><br />
                                <input type="text" required onChange={(e) => setSuite(e.target.value)} id="Suite" value={suite} name="Suite" /><br />
                                <label for="City">Enter City:</label><br />
                                <input type="text" required onChange={(e) => setCity(e.target.value)} id="City" value={city} name="City" /><br />
                                <label for="Zipcode">Enter Zipcode:</label><br />
                                <input type="text" required onChange={(e) => setZipcode(e.target.value)} id="Zipcode" value={zipcode} name="Zipcode" /><br />

                                <div>
                                    <h5>Enter Geo</h5>
                                    <label for="Lat">Enter Lat:</label><br />
                                    <input type="text" required onChange={(e) => setLat(e.target.value)} id="Lat" value={lat} name="Lat" /><br />
                                    <label for="Lng">Enter Lng:</label><br />
                                    <input type="text" required onChange={(e) => setLng(e.target.value)} id="Lng" value={lng} name="Lng" /><br />
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h5>Enter Company Name</h5>
                                <label for="companyName">Enter companyName:</label><br />
                                <input type="text" required onChange={(e) => setCompanyName(e.target.value)} id="companyName" value={companyName} name="companyName" /><br />
                                <label for="catchPhrase">Enter CatchPhrase:</label><br />
                                <input type="text" required onChange={(e) => setCatchPhrase(e.target.value)} id="catchPhrase" value={catchPhrase} name="catchPhrase" /><br />
                                <label for="bs">Enter Bs:</label><br />
                                <input type="text" required onChange={(e) => setBs(e.target.value)} id="bs" value={bs} name="bs" /><br />
                            </div>
                        </div>
                        {
                            isEdit ?
                                <button type="submit">Update</button>
                                :
                                <button type="submit">Submit</button>
                        }
                    </form>
                </div>

                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <ul>
                                <li>Name: {item.name}</li>
                                <li>Email: {item.email}</li>
                                <li>Username: {item.username}</li>
                                <button onClick={() => { deleteHandler(item.id) }}><i class="material-icons">delete</i></button>
                                <button onClick={() => { editHandler(item) }}><i class="material-icons">EDIT</i></button>
                            </ul>
                        </li>
                    ))}
                </ul>
            </>
        );
    }
}
export default Users
