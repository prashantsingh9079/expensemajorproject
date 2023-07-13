import React, { useRef, useState, useEffect } from 'react'
import { Card, Button, Nav, Table } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux';
import { expenseAction, themeAction } from '../store';
import {CSVLink} from 'react-csv'

export default function ExpenseComponent() {
   const itemState = useSelector(state => state.expense.items)

   const [themeButton,setThemeButton] = useState(false) 
   const theme = useSelector(state => state.theme.clr)
    const dispatch = useDispatch()
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
        var flag=0;
        var formData = { desc: descRef.current.value, amount: amountRef.current.value, category: categoryRef.current.value,id:Math.random() };
        if(Number(formData.amount) > 10000)
        {
            flag=1;
            formData={...formData,flag:1}
        }
        console.log(flag)
        axios.post("https://expensetracker-deb9a-default-rtdb.firebaseio.com/expense.json", formData)
        console.log(formData)
        setArr((p) => {
            let newArr = [...p];
            newArr.push(formData)
            return newArr
        })
        dispatch(expenseAction.addItem({item:formData}))
        console.log(itemState)
    }

    async function deleteItem(e) {
        e.preventDefault();
        // console.log(e.target.parentNode.parentNode)
        console.log(e.target.parentNode.parentNode.children)
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

    }

    function themeChanger()
    {
        setThemeButton((p)=>!p)
    }

    function changeThemeHandler()
    {
        dispatch(themeAction.toggleTheme())
    }

    const dataCSV = arr;
        console.log(dataCSV)
        const headers = [
            {label:'Amount', key:'amount'},
            {label:'Category',key:'category'},
            {label:'Description',key:'description'}
        ]
        const csvlink = {
            filename:'expense.csv',
            header:headers,
            data:dataCSV
        }


    return (
        <div style={{background:theme}}>
            <Nav style={{ background: 'grey',justifyContent:'space-between' }}>
                <h2 style={{ color: 'white' }} >Add Expense</h2>
                {themeButton && <Button onClick={changeThemeHandler}> Toggle Theme</Button>}
                {themeButton && <CSVLink {...csvlink} style={{color:'green'}}>Download expenses in CSV</CSVLink>  }
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
                                        {!i.flag && <td><i>Not Applicable for premium</i></td>}
                                        {i.flag && <td><Button onClick={themeChanger} >Activate Premium</Button></td>}
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </Table>
                </div>
            }
        </div>
    )
}
