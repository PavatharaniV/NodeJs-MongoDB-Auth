import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import FormContainer from './FormContainer'

const FormInput = (props) => {

  const { placeholder, label, error } = props
  return (
    <>

      <View style={{ flexDirection: 'row', justifyContent:'space-between' }}>

        <Text style={{ fontWeight: 'bold' }}>
        {label}
        </Text>

        {error? <Text style={{ color: 'red',fontSize:16 }}> 
        {error}
        </Text>:null}

      </View>
      
      <TextInput
        {...props}
        placeholder={placeholder} style={styles.input} />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#1b1b33',
    height: 35,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20
  }
})

export default FormInput;