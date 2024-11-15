import axios from "axios";
import { useEffect, useState } from "react";

const Users = () => {
    interface User {
        id: number;
        fname: string;
        lname: string;
        username: string;
        avatar: string;
    }

    const [apidata, setApidata] = useState<User[]>([]);
    const [editUserId, setEditUserId] = useState<number | null>(null);
    const [editData, setEditData] = useState({ fname: '', lname: '', username: '', avatar: '' });
    const [fnames, setFnames] = useState<string>('');
    const [lnames, setLnames] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emails, setEmails] = useState<string>('');
    const [avatar, setAvatar] = useState<string>('');
    const [refresh, setRefresh] = useState<boolean>(false);

   

    const handleSave = (id: number) => {
        axios.put('https://www.melivecode.com/api/users/update', {
            id: id,
            fname: editData.fname,
            lname: editData.lname,
            username: editData.username,
            avatar: editData.avatar
        })
        .then((response) => {
            alert(response.data.message);
            setEditUserId(null);
            setRefresh(!refresh);
        })
        .catch((error) => { 
            console.error("Error updating user:", error);
            alert("Error: " + (error.response?.data.message || "Unable to update user"));
        });
    };

    const deletedata = (id: number) => {
        axios.delete('https://www.melivecode.com/api/users/delete', {
            data: { id: id }
        })
        .then((response) => {
            // console.log(response);
            if(response.data.status=="error")
            alert(response.data.message); 
            // console.log(response);
            else{
                alert(response.data.message);
                setRefresh(!refresh);
            }
        })
        .catch((error) => { 
            console.error("Error deleting user:", error);
            alert("Error: " + (error.response.data.message || "Unable to delete user"));
        });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditData({ ...editData, [name]: value });
    };

    const sentdata = () => {
        const newUser = {
            fname: fnames,
            lname: lnames,
            username: username,
            password: password,
            email: emails,
            avatar: avatar
        };

        axios.post('https://www.melivecode.com/api/users/create', newUser)
            .then((response) => {
                alert(response.data.message);
                setFnames('');
                setLnames('');
                setUsername('');
                setPassword('');
                setEmails('');
                setAvatar('');
                setRefresh(!refresh); 
            })
            .catch((error) => {
                alert("Error: " + (error.response?.data.message || "Unable to create user"));
            });
    };
    const handleEdit = (user: User) => {
        setEditUserId(user.id);
        setEditData({ fname: user.fname, lname: user.lname, username: user.username, avatar: user.avatar });
    };


    useEffect(() => {
        console.log("Rerender");
        
        api()
        
    }, [refresh]);

    const api=()=>{
        axios.get('https://www.melivecode.com/api/users')
            .then((val) => { setApidata(val.data)})
            .catch((error) => { console.error("Error fetching data:", error); });
    }

   

    return (
        <div className="container">
            <div className="form-group">
                <div className="row">
                <div className="form-group">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="fname">F-Name</label>
                            <input type="text" id="fname" className="form-control" value={fnames} onChange={(e) => setFnames(e.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="lname">L-Name</label>
                            <input type="text" id="lname" className="form-control" value={lnames} onChange={(e) => setLnames(e.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" className="form-control" value={emails} onChange={(e) => setEmails(e.target.value)} />
                        </div>
                        <div className="col">
                            <label htmlFor="avatar">Avatar URL</label>
                            <input type="text" id="avatar" className="form-control" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
                        </div>
                        <div className="col">
                            <input type="button" value="Save" onClick={sentdata} className="form-control btn btn-primary mt-4" />
                        </div>
                        <div className="col">
                            <input type="button" value="Clear" className="form-control btn btn-secondary mt-4" onClick={() => { setFnames(''); setLnames(''); setUsername(''); setPassword(''); setEmails(''); setAvatar(''); }} />
                        </div>
                    </div>
                </div>
                </div>
            </div>

            <table className="table table-bordered mt-3">
                <thead className="bg-dark text-white">
                    <tr>
                        <th>Action 1</th>
                        <th>Action 2</th>
                        <th>Sl.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Avatar</th>
                    </tr>
                </thead>
                <tbody>
                    {apidata.map((item: User) => (
                        <tr key={item.id} >
                            <td>
                                {editUserId === item.id ? (
                                    <button className="btn btn-success" onClick={() => handleSave(item.id)}>Save</button>
                                )
                                 :
                               (
                                    <button className="btn btn-primary" onClick={() => handleEdit(item)}>Edit</button>
                                )}
                            </td>
                            <td><button className="btn btn-danger" onClick={() => deletedata(item.id)}>Delete</button></td>
                            <td>{item.id}</td>
                            <td>
                                {editUserId === item.id ? (
                                    <input type="text" name="fname" value={editData.fname} onChange={(e)=>handleInputChange(e)} />
                                ) : (
                                    item.fname
                                )}
                            </td>
                            <td>
                                {editUserId === item.id ? (
                                    <input type="text" name="lname" value={editData.lname} onChange={(e)=>handleInputChange(e)} />
                                ) : (
                                    item.lname
                                )}
                            </td>
                            <td>
                                {editUserId === item.id ? (
                                    <input type="text" name="username" value={editData.username} onChange={(e)=>handleInputChange(e)} />
                                ) : (
                                    item.username
                                )}
                            </td>
                            <td>
                                {editUserId === item.id ? (
                                    <input type="text" name="avatar" value={editData.avatar} onChange={(e)=>handleInputChange(e)} />
                                ) : (
                                    <img src={item.avatar} alt={`${item.fname}'s avatar`} style={{ width: "50px", height: "50px" }} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
