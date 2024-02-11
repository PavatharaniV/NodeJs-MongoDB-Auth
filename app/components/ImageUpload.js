import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';
import { StackActions } from '@react-navigation/native';

const ImageUpload = (props) => {
  const [ profileImage,setProfileImage] = useState('');
  const [progress,setProgress] = useState(0);
  const {token} = props.route.params

    const openImageLibrary = async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();

       if(status !== 'granted'){
        alert('Sorry, we need camera roll permissions to make this work!');
      }

      if(status === 'granted'){
        const response = await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
          allowsEditing:true,
          aspect:[4,3],
          quality:1
        });

        console.log(response); 

        if(!response.canceled){
          setProfileImage(response.assets)
          //throw Error("Camera was cancelled");
        } 
      }
    };

    //<form encType='multipart/form-data'></form>

    const uploadProfileImage = async() =>{

      const formData = new FormData();
      formData.append('profile',{
        name: new Date() + "_profile",
        uri:profileImage[0].uri,
        type:'image/jpg'
      })

      try {
        const res = await client.post('/upload-profile',formData,{
          headers:{
            Accept:'application/json',
            "Content-Type":'multipart/form-data',
            authorization:`JWT ${token}`,

          }
        });

       if(res.data.success){
          props.navigation.dispatch(
            StackActions.replace('UserProfile')
          );
        }
      } catch (error) {
        console.log(error.message);
      }
    }


 return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={openImageLibrary} style={styles.uploadbtn}>
            {profileImage ? <Image source={{uri:profileImage[0].uri}} style={{width:'100%',height:'100%'}}/> : <Text style={{textAlign:'center',fontSize:16,opacity:0.3,fontWeight:'bold'}}>
                Upload Profile Image
            </Text>}
        </TouchableOpacity>
        <Text style={styles.skiip}> 
            Skip
        </Text>

       {profileImage ? <Text 
       onPress={uploadProfileImage}
       style={[styles.skiip, {backgroundColor:'red',color:'white',borderRadius:8}]}>
            Upload
        </Text> : null}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1,
      alignItems:'center',
      justifyContent:'center',
    },
    uploadbtn:{
      height:150,
      width:150,
      borderRadius:125/2,
      justifyContent:'center',
      alignItems:'center',
      borderStyle:'dashed',
      borderWidth:1,
      overflow:'hidden'
    },
    skiip:{
      textAlign:'center',
      padding: 10,
      fontSize:16,
      fontWeight:'bold',
      textTransform:'uppercase',
      letterSpacing:2,
      opacity:0.5
    }
})


export default  ImageUpload