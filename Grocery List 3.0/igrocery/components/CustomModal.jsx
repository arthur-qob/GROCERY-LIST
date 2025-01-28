import { useState } from 'react'
import { Alert, Modal, StyleSheet, View } from 'react-native'
import { ThemedText as Text } from './ThemedText'
import { CustomButton as Button } from './CustomButton'
import { useTheme } from '@/contexts/ThemeContext'

export default function CustomModal({ modalVisible, setModalVisible }) {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    return (
        <Modal
            animationType = 'slide'
            transparent = { true }
            visible = { modalVisible }
            onRequestClose = { () => {
                Alert.alert('Modal has been closed')
                setModalVisible(!modalVisible)
            } }
        >
            <View style = {[ styles.modalView,
                    { backgroundColor: theme === 'light' ? 'rgb(239, 239, 241)' : 'rgb(37, 37, 37)' }
            ]}>
                <Text></Text>
                <View style = {{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',

                }}>
                    <Button title = 'Cancel' type = 'secondary' />

                    <Button title = 'Confirm' type = 'primary' />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalView: {
        margin: 20,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})