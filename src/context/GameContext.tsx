import {createContext, useEffect, useState} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ContextProps{
    wordSelected: String
    listScore: Score[]
    saveGame: (value: Score) => Promise<void>
    getGame: () => Promise<void>
    eraseGame: () => Promise<void>
}

export const GameContext = createContext({} as ContextProps)

interface Score{
    name: string,
    score: number,
    state: string,
}

export const GameProvider = ({children}:any)=>{

    const words = ["carro","lugar","fuego",'hacer','reloj','claro']
    const [wordSelected,setWordSelected]= useState(words[Math.floor(Math.random()*words.length)])
    const [listScore,setListScore] = useState([] as Score[])

    useEffect(()=>{
       getGame() 
    }, [])

    const saveGame = async (value: Score) => {
        try{
            setListScore([...listScore, value])
            await AsyncStorage.setItem('listScore',JSON.stringify([...listScore, value]))
            setWordSelected(words[Math.floor(Math.random()*words.length)])
        } catch (error){
            console.log(error)
        }
    }

    const eraseGame = async () => {
        try{
            setListScore([])
            await AsyncStorage.clear()
        } catch (error){
            console.log(error)
        }
    }

    const getGame =async()=>{
        try{
            const response = await AsyncStorage.getItem('listScore')
            if (response !== null) return setListScore(JSON.parse(response))
        } catch(e){
            console.log(e)
        }
    }

    return <GameContext.Provider
        value={{
            wordSelected,
            listScore,
            saveGame,
            getGame,
            eraseGame
        }}
        >
    {children}
    </GameContext.Provider>
}