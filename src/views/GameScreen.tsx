import { StyleSheet, View, Text, ScrollView, Alert } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { GameContext, GameProvider } from '../context/GameContext'
import Keyboard from '../components/Keyboard'
import {CLEAR, ENTER} from '../components/constants'

const ATTEMPTS = 6
const copyArray = (arr) => {
  return [...(arr.map((rows) => [...rows]))]
}

export default function GameScreen({navigation}:any) {
  const {wordSelected, saveGame} = useContext(GameContext)
  const letters = wordSelected.split('')

  const [rows,setRows] = useState(
    new Array(ATTEMPTS).fill(new Array(letters.length).fill("")
  ))
  const [player, setPlayer] = useState('')
  const [curRow, setCurRow] = useState(0)
  const [curCol, setCurCol] = useState(0)
  const [gameState,setGameState] = useState("playing")
  //const [isVisibleWinModal, setIsVisibleWinModal] = useState(false);

  function onPress(gameState) {
    navigation.navigate("Home")
    saveGame({name:player, score:curRow, state:gameState})
  } 

  useEffect(() => {
    Alert.prompt('Ingresa tu nombre','¿Como te llamas?', (actualPlayer) => setPlayer(actualPlayer), 'plain-text')
  },[])

  useEffect(() => {
    if (curRow> 0){
      checkGameState()
    }
  }, [curRow])

  const checkGameState = () => {
    if (checkIfWon()) {
      //setIsVisibleWinModal(true)
      Alert.alert('Hurray!', 'Ganaste!' , [
        {text: 'Regresar', onPress: ()=>onPress("won")}      
      ])
    } else if (checkIfLost()){
      Alert.alert('Perdiste!', 'Más suerte a la proxima',[
        {text: 'Regresar', onPress: ()=>onPress("lost")}
      ])
    }
  }

  const checkIfWon = () => {
    const row = rows[curRow-1]

    return row.every((letter,i) => letter === letters[i])
  }

  const checkIfLost= () => {
    return curRow === rows.length
  }

  const onKeyPressed =(key) =>{
    if (gameState !== "playing"){
      return
    }

    const updatedRows = copyArray(rows)

    if (key === CLEAR){
      const prevCol = curCol-1
      if (prevCol >= 0){
        updatedRows[curRow][prevCol] = ""
        setRows(updatedRows)
        setCurCol(prevCol)
      }
      return
    }

    if (key === ENTER){
      if (curCol === rows[0].length && curRow <= 5){
        setRows(updatedRows)
        setCurCol(0)
        setCurRow(curRow+1)
      }
      return
    }

    if (curCol < rows[0].length) {
      updatedRows[curRow][curCol] = key
      setRows(updatedRows)
      setCurCol(curCol+1)
    }
  }

  const isCellActive = (row, col) => {
    return row === curRow && col === curCol
  }

  const getCellBGColor =(row, col) => {
    const letter = rows[row][col]
    if(row >= curRow){
      return '#FFFFFF'
    }
    if (letter === letters[col]){
      //setGreenCaps(oldGreenCaps => [...oldGreenCaps,letter])
      return '#6AAA64'
    }
    if (letters.includes(letter)){
      //setYellowCaps(oldYellowCaps => [...oldYellowCaps,letter])
      return '#C9B458'
    }
    //setGreyCaps(oldGreyCaps => [...oldGreyCaps,letter])
    return '#D7DADC'
  }

  const getAllLetttersWithColor = (color) => {
    return rows.flatMap((row, i) => 
      row.filter((cell,j) => getCellBGColor(i,j) === color)
    )
  }
  const greenCaps= getAllLetttersWithColor("#6AAA64")
  const yellowCaps= getAllLetttersWithColor("#C9B458") 
  const greyCaps= getAllLetttersWithColor("#D7DADC") 

  return (
    <GameProvider>
      <View style={{
        flex:1,
        alignItems:'center'
      }}>
        <Text style={styles.title}>WORDLE</Text>

        <ScrollView style={styles.map}>

          {rows.map((row, i) => (
            <View key={'row-'+i} style={styles.row}>
            {row.map((letter, j)=>(
                <View key={'cell-'+i+'-'+j} style={[styles.cell, {
                  borderColor: isCellActive(i,j) ? "#3A3A3D": "#D7DADC",
                  backgroundColor: getCellBGColor(i,j)}]}>
                  <Text style={styles.cellText}>
                    {letter.toUpperCase()}
                  </Text>
                </View>
            ))}
          </View>
          ))}
        </ScrollView>
      </View>
        <Keyboard 
          onKeyPressed={onKeyPressed} 
          greenCaps={greenCaps} 
          yellowCaps={yellowCaps}
          greyCaps={greyCaps}
        />
        <View style={{height:60}}/>
    </GameProvider>
  )
}

const styles = StyleSheet.create({
  title:{
    marginTop:100,
    textAlign:'center',
    fontSize:50,
    fontWeight:'bold'
  },
  map:{
    marginVertical:10,
    alignSelf:'stretch',
    height:100
  },
  row:{
    alignSelf:'stretch',
    flexDirection:"row",
    justifyContent:'center'
  },
  cell:{    
    borderWidth:3,
    borderColor: "#121214",
    flex:1,
    maxWidth:70,
    aspectRatio:1,
    margin:3,
    alignItems:'center',
    justifyContent:'center'
  },
  cellText:{
    color: '#121214',
    fontSize:54,
  }
})