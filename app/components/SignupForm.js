import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'
import { isValidEmail, isValidObjField, updateError } from '../utils/methods'
import { Formik } from 'formik'
import * as yup from 'yup'

import client from '../api/client'
import { StackActions } from '@react-navigation/native'
import { signIn } from '../api/user'

const validationSchema = yup.object({
    fullname: yup.string().trim().min(3,'Invalid name').required('Name is required!'),
    email:yup.string().email('Invalid email').required('email is required'),
    password:yup.string().trim().min(8,'Password should be of minimul length 8').required('Password required!'),
    confirmPassword:yup.string().equals([yup.ref('password'),null],'password does not match')

})

const SignupForm = ({navigation}) => {

    const userInfo ={
        fullname: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const { fullname, email, password, confirmPassword } = userInfo

    const handleOnChangeText = (value, fieldName) => {
        setUserInfo({ ...userInfo, [fieldName]: value })
    }

    const isValidForm = () => {
        //check all fields
        if (!isValidObjField(userInfo)) return updateError('Require all fields!', setError)

        //name
        if (!fullname.trim() || fullname.length < 3) return updateError('Invalid name field!', setError);

        //email
        if (!isValidEmail(email)) return updateError('Invalid email field!', setError);

        //password
        if (!password.trim() || password.length < 8) return updateError('Invalid password field!', setError);

        //confirmPassword
        if (password !== confirmPassword) return updateError('Password does not match', setError);

        return true;
    }

    const [error, setError] = useState('')

    const submitForm = () => {
        if (isValidForm()) {
            console.log(userInfo)
        }
    }

    const signUp = async (values,formikActions)=>{
        const res = await client.post('/create-user',{
            ...values,
        });

        if(res.data.success){
            const signInRes = await signIn(values.email,values.password)
            if (signInRes.data.success) {
                 navigation.dispatch(
                StackActions.replace('ImageUpload', {
                  token: signInRes.data.token,
                })
              );
            }
           
        }
        console.log(res.data)
        formikActions.resetForm();
        formikActions.setSubmitting(false);
    }

    return (
        <FormContainer>
            <Formik 
             initialValues={userInfo} 
             validationSchema={validationSchema} 
             onSubmit={signUp}
             >
                {({values,errors,isSubmitting,touched,handleChange,handleBlur,handleSubmit}) => {

                    console.log(values);

                    const {fullname,email,password,confirmPassword} = values

                    return <>
                        <FormInput
                            value={fullname}
                            error={touched.fullname && errors.fullname}
                            onChangeText={ handleChange('fullname')}
                            title='Full Name'
                            placeholder='Taylor Swift'
                            onBlur={handleBlur('fullname')}
                        />
                        <FormInput
                            value={email}
                            error={touched.email && errors.email}
                            onChangeText={handleChange('email')}
                            title='Email'
                            autoCapitalize='none'
                            placeholder='example@gmail.com'
                            onBlur={handleBlur('email')}
                        />
                        <FormInput
                            value={password}
                            error={touched.password && errors.password}
                            onChangeText={handleChange('password')}
                            title='Password'
                            autoCapitalize='none'
                            secureTextEntry
                            placeholder='**********'
                            onBlur={handleBlur('password')}
                        />
                        <FormInput
                            value={confirmPassword}
                            error={touched.confirmPassword && errors.confirmPassword}
                            onChangeText={handleChange('confirmPassword')}
                            title='Confirm Password'
                            autoCapitalize='none'
                            placeholder='**********'
                            onBlur={handleBlur('confirmPassword')}
                        />
                        <FormSubmit submitting={isSubmitting} onPress={handleSubmit} title='Signup' />
                    </>
                }}
            </Formik>

        </FormContainer>
    )
}

const styles = StyleSheet.create({

})

export default SignupForm;