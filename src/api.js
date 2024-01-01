// import Item from "antd/es/list/Item";
import React, { useEffect, useState } from "react";
import axios from "axios";

export function Api() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [records, setRecordss] = useState(JSON.parse(localStorage.getItem("dataa")) || []);
    const [inputData, setInputData] = useState({
        fname: "",
        sname: "",
        pass: "",
        email: "",
    });

    const handleOnChange = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value })
    }

    console.log(inputData);

    const buttondelete = (index) => {
        axios.delete(`https://jsonplaceholder.typicode.com/posts/${index}`)
            .then((res) => {
                console.log(res);
                getData()
            })
            .catch((e) => console.log(e))
        const deletedata = records.filter((item, ind) => ind !== index);
        setRecordss(deletedata);
    }
    const [isEdit, setIsEdit] = useState(-1);

    const handleSubmit = () => {
        if (isEdit !== -1) {
            const update = records.map((idx, index) => {
                if (index === isEdit) {
                    return inputData;
                }
                return idx;
            });
            setRecordss(update);
            localStorage.setItem("dataa", JSON.stringify(update))
            setIsEdit(-1);
        }
        else {
            axios.post("https://jsonplaceholder.typicode.com/posts", records)
                .then((res) => { console.log(res) })
                .catch((e) => { console.log(e) })
            setRecordss([...records, inputData]);
            localStorage.setItem("dataa", JSON.stringify([...records, inputData]))
        }

    }

    const handleEdit = (index) => {
        setIsEdit(index);
        const editData = records.find((item, index1) => { return index1 === index });
        setInputData(editData);
    }


    const getData = () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then((res) => console.log(res))
            .catch((e) => console.log(e))
    }
    useEffect(() => {
        getData()
    }, [records])

    return (

        <div style={{ padding: '3%', backgroundColor: "lightpink" }}>
            <div style={{ marginTop: "10px" }}>
                <label>fname</label>
                <input type="text" name="fname" value={inputData.fname} onChange={(e) => handleOnChange(e)} />
            </div>
            <div style={{ marginTop: "10px" }}>
                <label >sname</label>
                <input type="text" name="sname" value={inputData.sname} onChange={(e) => handleOnChange(e)} />
            </div>
            <div style={{ marginTop: "10px" }}>
                <label>password</label>
                <input type="password" name="pass" value={inputData.pass} onChange={(e) => handleOnChange(e)} />
            </div>

            <div style={{ marginTop: "10px" }} >
                <label>Email</label>
                <input type="email" name="email" value={inputData.email} onChange={(e) => handleOnChange(e)} />
            </div>

            <div style={{ marginTop: "10px" }}>
                <button type="button" onClick={handleSubmit}>tuch</button>
            </div>

            <table>
                <thead style={{ border: "2px solid black" }}>
                    <input type="checkbox" id="check" name="check" ></input>
                    <th style={{ border: "2px solid black" }}>Name</th>
                    <th style={{ border: "2px solid black" }}>Sname</th>
                    <th style={{ border: "2px solid black" }}>Email</th>
                    <th style={{ border: "2px solid black" }}>pass</th>
                </thead>
                <tbody style={{ border: "2px solid black" }}>
                    {records?.map((item, index) => {
                        return (
                            <tr>

                                <td >{item.fname}</td>
                                <td>{item.sname}</td>
                                <td>{item.email}</td>
                                <td>{item.pass}</td>
                                <td><button onClick={() => buttondelete(index)}>delete</button></td>
                                <td><button type="button" onClick={() => handleEdit(index)}>Edit</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}











































