import React, { useState } from 'react'
import register from '../../services/register'
import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as Yup from "yup";
import { useLocation } from 'wouter';

const centerStyleH2 = {
    display: 'grid',
    placeContent: 'center',
}

const SignupSchema = Yup.object().shape({
    password: Yup.string()
      .min(2, 'Too Short!')
      .max(70, 'Too Long!')
      .required('Required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Required'),
  });

export default function Register() {
    const [registered, setReg] = useState(false)
    const [, navigate] = useLocation()

    if(registered) {
        setTimeout(function(){
            navigate('/');
        }, 7000);
        return <h2>Congratulations, you have been successfully registered! </h2>
    }

    return (
        <div>
            <h2 style={centerStyleH2}>Formulario de registro</h2>
            <Formik
                initialValues={{
                    email: '',
                    password: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, actions) => {

                    return register(values).then((res)=>{
                        setReg(true)
                    }).catch(() => {
                        actions.setFieldError("email", "this email is not valid")
                    })
                }}
            >
                <Form className='form'>
                
                    <div className='form-group'>
                        <span style={{bottom: 'unset'}} className="input-user-icon"></span>
                        <label><Field name='email' placeholder="Correo" /></label>
                        <ErrorMessage name="email" />
                        <span className="input-password-icon"></span>
                        <label><Field placeholder="Password" name='password' /></label>
                        <ErrorMessage name="password" />
                    </div>

                    <button className='btn-login'>Registrarse</button>
                </Form>
                
            </Formik>
        </div>
    )
}
