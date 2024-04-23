import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GameContext, GameProvider } from '../context/GameContext'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function StatsScreen() {

    const {listScore, eraseGame} = useContext(GameContext)
    const [leaderboard,setLeaderboard] = useState([])

    useEffect(()=>{
        setLeaderboard(((listScore.filter((item)=> item.state === "won").sort((a,b) => a.score - b.score))).concat(listScore.filter((item)=> item.state === 'lost')))
     }, [])

     function getScore(score,state){
        if(state==='won'){
            return score
        } else {
            return 'PERDIO'
        }
     }

  return <GameProvider>
            <View style={{height:50}}/>
            <View style={{flex:1}}>
                <Text style={{
                    alignSelf:'center',
                    margin:20,
                    fontSize:50,
                    fontWeight:'bold'
                }}>Ranking</Text>
                <View style={{
                    flexDirection:'row',
                    marginLeft:35
                }}>
                    <View style ={{ //key
                        height:40,
                        width:50,
                        alignItems:'center',
                        padding:10
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize:18,
                        }}></Text>
                    </View>
                    <View style ={{ // name
                        width:200,
                        height:50,
                        padding:10
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize:20
                        }}>Nombre</Text>
                    </View>
                    <View style ={{// score/state
                        width:110,
                        height:50,
                        alignItems:'center',
                        padding:10
                    }}>
                        <Text style={{
                            fontWeight:'bold',
                            fontSize:20
                        }}>Puntaje</Text>
                    </View>
                </View>
                <ScrollView>
                {
                    leaderboard.map((item,i)=> (
                        <View key={i}style={{
                            flexDirection:'row',
                            marginLeft:35
                        }}>          
                            <View style ={{ //key
                                height:40,
                                width:50,
                                alignItems:'center',
                                padding:10
                            }}>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:18,
                                }}>{i+1+"."}</Text>
                            </View>
                            <View style ={{ // name
                                width:200,
                                height:50,
                                padding:10
                            }}>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:18
                                }}>{item.name}</Text>
                            </View>
                            <View style ={{// score/state
                                width:110,
                                height:50,
                                alignItems:'center',
                                padding:10
                            }}>                           
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:18,
                                    color: item.state == 'lost' ? '#B91717' : '#000000' 
                                }}>{getScore(item.score,item.state)}</Text>
                            </View>
                        </View>
                    ))
                }
                </ScrollView>
                <View>
                    <TouchableOpacity
                            onPress={()=> eraseGame()}
                            style={{
                                borderRadius:25,
                                backgroundColor:'#3943B7',
                                alignSelf:'flex-end',
                                flexDirection:'column-reverse',
                                alignContent:'flex-end',
                                margin:20,
                                padding:10
                            }}
                        >
                        <FontAwesome6 name='trash-can' color='#FFFFFF' size={30}/>
                    </TouchableOpacity>
                </View>
            </View>
        </GameProvider>
}