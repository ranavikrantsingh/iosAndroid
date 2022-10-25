import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LiquidSwipe from './LiquidSwipe'

const AnimatedOnboarding = () => {
  return (
    <>
    <StatusBar translucent={true} backgroundColor={'transparent'} animated={true} barStyle={'light-content'}/>
        <LiquidSwipe/>
    </>
  )
}

export default AnimatedOnboarding

const styles = StyleSheet.create({})