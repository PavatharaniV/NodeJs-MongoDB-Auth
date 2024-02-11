import { View, Text, StyleSheet } from 'react-native'
import React, { useRef } from 'react'

import animationData from '../../assets/Animation - 1706679474944.json'

import LottieView from 'lottie-react-native'

const AppLoader = () => {
  const lottieViewRef = useRef(null)
  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
      <LottieView 
       source={animationData} 
       autoPlay 
       loop
       onError={(error)=> console.log('error',error)}
       style={{flex:1}}
       ref={lottieViewRef}
       onLayout={() => lottieViewRef.current?.play()}
       speed={1}
       />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgda(0,0,0,0.3)',
        zIndex:1,
        width: 100, height: 100
    }
})

export default  AppLoader;