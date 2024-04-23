import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function HomeScreen({navigation}:any) {
  return (
    <View style={{
        flex:1,
        flexDirection:'column',
        alignItems:'center'
    }}>
        <Image source={require('C:/Desarrollo Movil/react/Wordle/Wordle/assets/animation.gif')} style={{width:500, height:133}}></Image>
        <Text style={{
            fontSize:80,
            fontWeight:'bold',
            alignSelf:'center',
            marginTop:55,
            margin:70
        }}>
            Juegos
        </Text>
      <TouchableOpacity
            onPress={()=>navigation.navigate("Game")}
            style={{
                maxWidth:200,
                borderRadius:25,
                backgroundColor:'#6AAA64',
                margin:50
            }}
        >
            <Text style ={{
                        margin:15,
                        textAlign: 'center',
                        color:'#FFFFFF',
                        fontSize:50,
                        fontWeight:'bold'
                    }}>
                        {"Wordle"}
                    </Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>navigation.navigate("Stats")}
            style={{
                maxWidth:270,
                borderRadius:25,
                backgroundColor:'#C9B458',
                margin:50,
                marginBottom:80
            }}
        >
            <Text style ={{
                        margin:15,
                        textAlign: 'center',
                        color:'#FFFFFF',
                        fontSize:30,
                        fontWeight:'bold'
                    }}>
                        {"Estadisticas"}
                    </Text>
            </TouchableOpacity>
        <Image source={require('C:/Desarrollo Movil/react/Wordle/Wordle/assets/animation.gif')} style={{width:500, height:230}}></Image>
    </View>
  )
}