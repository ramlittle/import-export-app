// COMPONENTS
import MyButton from './components/MyButton'
import MyInput from './components/MyInput'
import MyLabel from './components/MyLabel'

// DEPENDECIES
import { useState,useEffect } from 'react';

const MyPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // FUNCTIONS
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log('hooray you submiited', firstName, lastName)
        alert(`hooray you submiited ${firstName}, ${lastName}`)
    }

    const handleClear=()=>{
        setFirstName('');
        setLastName('only last name left')
    }
    
    return (
        <>
            <form onSubmit={(e)=>handleSubmit(e)}
                className='bg-red-500'
            >
                <div>
                    <MyLabel
                        htmlFor='firstName'
                        value='First Name'
                    />
                    <MyInput
                        type='text'
                        name='fistName'
                        placeholder='enter first name'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </div>
                <div>
                    <MyLabel
                        htmlFor='lastName'
                        value='Last Name'
                    />
                    <MyInput
                        type='text'
                        name='lastName'
                        placeholder='enter last name'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>

                <MyButton
                    type='submit'
                    value='Submit'
                />
            </form>
            <MyInput
                type='button'
                name='clear'
                value='Clear'
                onClick={handleClear}
            />
            {firstName} {lastName}
        </>
    )
}

export default MyPage;