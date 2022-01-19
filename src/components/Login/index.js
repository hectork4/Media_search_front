import React, { useEffect, useState } from 'react'
import { useLocation } from 'wouter';
import useUser from '../../hooks/useUser';
import './styles.css'

export default function Login({ onLogin = null }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [, navigate] = useLocation()
    const {login, isLogged, isLoginLoading, hasLoginError} = useUser()

    useEffect(()=>{
        if (isLogged) {
            navigate('/');
            onLogin && onLogin()
        }
    },[isLogged, navigate, onLogin])

    const handleSubmit = (e) =>{
        e.preventDefault();
        login({email, password});
    }

    return (
        <>
        {isLoginLoading && <strong>Checking credentials...</strong>}
        {!isLoginLoading &&
        <form onSubmit={handleSubmit} className='form'>
            <div className='form-group'>
                <span class="input-user-icon"></span>
                <label>
                    Correo<input placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
            </div>
            <div className='form-group'>
                <span class="input-password-icon"></span>
                <label>
                    Password<input placeholder="Password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                </label>
            </div>
            
            <button className='btn-login'>Login</button>
        </form>}
        {hasLoginError && <strong>Credentials are invalid</strong>}
        </>
    )
}
