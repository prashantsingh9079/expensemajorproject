import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Nav, Table } from 'react-bootstrap'
import axios from 'axios'

export default function ExpenseComponent() {
    const descRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const [arr, setArr] = useState([])
    useEffect(() => {
        async function fetchData() {

            const res = await axios.get("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json")
            // console.log(res)
            if (res.status === 200) {
                setArr((p) => {
                    let na = []
                    for (let i in res.data) {
                        na.push(res.data[i])
                    }

                    return na;
                })
            }
            else {
                alert("something went wrong in loading previous data !!!")
            }

        }
        fetchData()
    }, [arr])

    function submitHandler(e) {
        e.preventDefault();
        const formData = { desc: descRef.current.value, amount: amountRef.current.value, category: categoryRef.current.value,id:Math.random() };
        axios.post("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json", formData)
        console.log(formData)
        setArr((p) => {
            let newArr = [...p];
            newArr.push(formData)
            return newArr
        })
    }

    async function deleteItem(e) {
        e.preventDefault();
        // console.log(e.target.parentNode.parentNode)
        console.log(e.target.parentNode.parentNode.children[1].textContent)
        const tamount = (e.target.parentNode.parentNode.children[1].textContent)
        const res = await axios.get("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json")
        console.log(res.data)
        for (let i in res.data) {
            if (res.data[i]['amount'] === tamount) {
                var _id = i;
                console.log(_id)
                break;
            }
        }
        const resd = await axios.delete("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense/" + _id + ".json/")
        console.log(resd)
        setArr((p) => {
            let na = []
            for (let i in res.data) {
                na.push(res.data[i])
            }

            return na;
        })
    }

    async function editItem(e) {
        console.log(e.target.parentNode.parentNode.children[0].textContent)
        const identifier  = e.target.parentNode.parentNode.children[0].textContent

        const r  = await axios.get("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json");
        console.log(r.data)
        var av=''
        var dv=''
        var cv=''
        var _id=''
        for(let i in r.data)
        {
            if(r.data[i]['desc'] === identifier)
            {
                 _id = i;
                 dv = r.data[i]['desc'];
                 av = Number(r.data[i]['amount'])
                 cv = r.data[i]['category']
                break;
            }
        }
        descRef.current.value=dv;
        amountRef.current.value=av;
        categoryRef.current.value=cv;

        
        await axios.delete("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense/"+_id+".json/")
        // const re = await axios.post("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json/",{
        //     desc:descRef.current.value,
        //     amount:amountRef.current.value,
        //     category:categoryRef.current.value
        // })
        
        // console.log(re)
        // setArr((p) => {
        //     let na = []
        //     for (let i in r.data) {
        //         na.push(r.data[i])
        //     }

        //     return na;
        // })
    }


    return (
        <>
            <Nav style={{ background: 'grey' }}>
                <h2 style={{ color: 'white', marginLeft: '42rem' }} >Add Expense</h2>
            </Nav>

            <Card style={{ margin: '10rem', padding: '3rem', background: 'skyblue', }}>
                <label htmlFor="desc"><i>Item Description</i></label>
                <input id='desc' type="text" placeholder='Expense Desciption' ref={descRef} />
                <br /><br />
                <label htmlFor="amount"><i>Item Amount</i></label>
                <input id='amount' type="number" placeholder='Expense Amount' ref={amountRef} />
                <br /><br />
                <select name="expenseMenu" id="menu" ref={categoryRef}>
                    <option value="Food">Food</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Misc">Misc*</option>
                </select>
                <br /><br />
                <Button onClick={submitHandler} style={{ background: 'green', borderColor: 'white', borderWidth: '2px' }}>Add Expense</Button>
            </Card>


            {arr.length > 0 &&
                <div style={{ margin: '5rem' }}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Item Description</th>
                                <th>Item Amount</th>
                                <th>Item Category</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {arr.map((i) => {
                                return (
                                    <tr key={i.id}>
                                        <td>{i.desc}</td>
                                        <td>{i.amount}</td>
                                        <td>{i.category}</td>
                                        <td><Button onClick={deleteItem}>Delete</Button></td>
                                        <td><Button onClick={editItem}>Edit</Button></td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </div>
            }
        </>
    )
}
