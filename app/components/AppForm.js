import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View, Dimensions, Animated } from 'react-native';
import FormSelectorButton from './FormSelectorButton';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import FormHeader from './FormHeader';
import AppLoader from './AppLoader';


const { width } = Dimensions.get('screen');

export default function AppForm({ navigation }) {
  const animation = useRef(new Animated.Value(0)).current;

  const scrollView = useRef()

  const fetchApi = async () => {
    try {
      const res = await axios.get('http://192.168.1.6:8000/')
      console.log(res.data)

    } catch (error) {

    }

  }

  useEffect(() => {
    fetchApi()
  }, [])

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0]
  })

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40]
  })

  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20]
  })

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)']
  })

  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)']
  })

  return (
    <>
      <View style={{ flex: 1, paddingTop: 120 }}>
        <View style={{ height: 100 }}>
          <FormHeader
            leftHeading="Welcome"
            rightHeading="Back"
            subHeading="Workerr"
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX={leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View style={{ flexDirection: 'row', padding: 20, marginBottom: 20 }}>
          <FormSelectorButton
            backgroundColor={loginColorInterpolate}
            title="Login"
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorButton
            backgroundColor={signupColorInterpolate}
            title="Signup"
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: animation } } }],
            { useNativeDriver: false })}
        >
          <LoginForm navigation={navigation} />
          <ScrollView>
            <SignupForm navigation={navigation} />
          </ScrollView>

        </ScrollView>
      </View>      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
