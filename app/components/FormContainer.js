import { Dimensions, KeyboardAvoidingView, StyleSheet,Platform, Text, View } from 'react-native'
import React from 'react'

const FormContainer = ({children})=>{
  return (
    <KeyboardAvoidingView  enabled  behavior={Platform.OS === "ios" ? "padding" : null}style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container:{
        width:Dimensions.get('screen').width,
        paddingHorizontal:20
       }
})

export default  FormContainer;
