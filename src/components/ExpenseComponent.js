import React,{useRef, useState} from 'react'
import { Card, Button, Nav, Table} from 'react-bootstrap'

export default function ExpenseComponent() {
    const descRef = useRef();
    const amountRef = useRef();
    const categoryRef = useRef();
    const [arr,setArr]=useState([])

    function submitHandler(e)
    {
        e.preventDefault();
        const formData = {desc:descRef.current.value,amount:amountRef.current.value, category:categoryRef.current.value};
        console.log(formData)
        setArr((p)=>{
            let newArr = [...p];
            newArr.push(formData)
            return newArr
        })
    }




    return (
        <>
            <Nav style={{ background: 'grey' }}>
                <h2 style={{ color: 'white', marginLeft: '42rem' }} >Add Expense</h2>
            </Nav>

            <Card style={{ margin: '10rem', padding: '3rem', background: 'skyblue', }}>
                <label  htmlFor="desc"><i>Item Description</i></label>
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


            {arr.length>0 && 
            <div style={{margin:'5rem'}}>
            <Table  striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Item Description</th>
                <th>Item Amount</th>
                <th>Item Category</th>
              </tr>
            </thead>
            <tbody>
                {arr.map((i) =>
                {
                    return (
                        <tr>
                            <td>{i.desc}</td>
                            <td>{i.amount}</td>
                            <td>{i.category}</td>
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
