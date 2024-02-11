import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmit from './FormSubmit'
import { isValidEmail, isValidObjField, updateError } from '../utils/methods'
import client from '../api/client'
import { useLogin } from '../context/LoginProvider'
import { signIn } from '../api/user'

const LoginForm = ()=> {

  const {setIsLoggedIn, setProfile} = useLogin()

  const [userInfo,setUserInfo] = useState({
    email:'',
    password:''
  })

  const [error,setError] = useState('')

  const {email,password} = userInfo;

  const handleOnChangeText = (value,fieldName)=>{
    setUserInfo({...userInfo, [fieldName]: value})
  }

  const isValidForm = () =>{
    if(!isValidObjField(userInfo)) return updateError('Require all fields!',setError)

    if(!isValidEmail(email)) return updateError('Invalid email',setError) 

    if(!password.trim() || password.length<8) return updateError('Invalid password!',setError)

    return true;
  }

  const submitForm = async()=>{
     if(isValidForm()){
      try {
        const res = await signIn(userInfo.email,userInfo.password)

        if(res.data.success){
          setUserInfo({email:'',password:''});
          setProfile(res.data.user);
          setIsLoggedIn(true);
        }
        console.log(res.data)
      } catch (error) {
        console.log(error.message)
      }
      
     }
  }

  return (
    <FormContainer>
      {error ? <Text style={{color:'red', fontSize:18, textAlign:'center'}}>{error}</Text> : null}
        <FormInput 
         value={email} 
         label='Email' 
         onChangeText={(value)=> handleOnChangeText(value,'email')}
         placeholder='example@gmail.com'
         autoCapitalize='none'
        />
        <FormInput 
         value={password} 
         onChangeText={(value)=> handleOnChangeText(value,'password')}
         label='Password' 
         placeholder='**********'
         autoCapitalize='none'
         securityTextEntry
        />
        <FormSubmit onPress={submitForm} title='Login'/>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
    input:{
        borderWidth:1,
        borderColor:'#1b1b33', 
        height:35,
        borderRadius:10, 
        fontSize:16,
        paddingLeft:10
    }
})

export default LoginForm;