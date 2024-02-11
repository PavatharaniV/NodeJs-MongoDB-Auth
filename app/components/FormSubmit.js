import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const FormSubmit = ({title,submitting, onPress}) => {
  const backgroundColor = submitting ? 'rgba(27,27,51,0.4)' : 'rgba(27,27,51,1)' 
  return (
    <TouchableOpacity onPress={ !submitting ? onPress : null} style={[styles.container,{backgroundColor}]}>
      <Text style={{fontSize:18,color:"#ffffff"}}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        height:45,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center'

    }
})

export default  FormSubmit;