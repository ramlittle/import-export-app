import {useState,useEffect} from 'react'
const ShoppingCart=()=>{
    const [cart,setCart]=useState([]);

    function handleClick(e){
        const item=e.target.value;
        console.log('item lcick',item)
        setCart([...cart,item])
    }
    useEffect(()=>{
        console.log('hers the list',cart)
    },[cart])
    return (
        <>
            <button onClick={handleClick} value='Ram'>Ram</button>
            <button onClick={handleClick} value='Rica'>Rica</button>
            <button onClick={handleClick} value='Rash'>Rash</button>
            <button onClick={handleClick} value='Renz'>Renz</button>
            <button onClick={handleClick} value='Gretch'>Gretch</button>
            <button onClick={handleClick} >hooray</button>
            <label>Input
                <input type='text' onClick={handleClick} value='Input'/>
            </label>

            <div>
                {
                    cart.map((cart)=>(
                        <div>
                            {cart}
                        </div>
                    ))
                }
            </div>
        </>
    )

}
export default ShoppingCart;