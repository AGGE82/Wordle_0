import { View, Text } from 'react-native'
import React from 'react'
import { GameProvider } from './src/context/GameContext'
import GameScreen from './src/views/GameScreen'
import AppNavigation from './src/routes/AppNavigation'

export default function () {
  return (
    <GameProvider>
      <AppNavigation/>
    </GameProvider>
  )
}