import IonIcons from '@expo/vector-icons/IonIcons'
import React from 'react'
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native'

const MAPPING = {
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
}

export function IconSymbol({ name, size = 24, color, style }) {
  return <IonIcons color = { color } size = { size } name = { MAPPING[name] } style = { style } />
}
