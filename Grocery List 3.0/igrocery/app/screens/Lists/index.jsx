import { View } from 'react-native'
import styles from './style'
import ListBtn from '@/components/ListBtn'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import React, { useCallback, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { db } from '@/firebaseConfig'
import { get, ref } from 'firebase/database'
import { useUser } from '@/contexts/UserContext'

export default function ListsScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    const navigation = useNavigation()
    
    const [ lists, setLists ] = useState([])

    const { userLists } = useUser()

    
    useFocusEffect(
        useCallback(() => {
            const fetchLists = async () => {
                if (!userLists) return
    
                try {
                    if (Array.isArray(userLists)) {
                        const listsData = await Promise.all(
                            userLists.map(async (listId) => {
                                const snapshot = await get(ref(db, `lists/${listId}`))
                                return snapshot.exists() ? { id: listId, ...snapshot.val() } : null
                            })
                        )
                        setLists(listsData.filter(Boolean))
                    } else {
                        const snapshot = await get(ref(db, `lists/${userLists}`))
                        setLists(snapshot.exists() ? [{ id: userLists, ...snapshot.val() }] : [])
                    }
                } catch (error) {
                    console.error("Error fetching lists:", error)
                    setLists([])
                }
            }
    
            fetchLists()
    
        }, [userLists])
    )    
    
    return (
        <Div style = { styles.mainContainer }>
            <Text type = 'title'>Completed Lists</Text>
            <View style = {[ styles.listsContainer, {
                backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
            } ]}>
                {
                    lists.length > 0 ? (
                        lists.map((list, index) => (
                            (index !== lists.length - 1) ? (
                                <React.Fragment key = { list.id }>
                                    <ListBtn list = { list } onPress = {() => navigation.navigate('List', { list })} />
                                    <View style = {[ styles.listsSeparator, { borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } ]} />
                                </React.Fragment>
                            ) : (
                                <ListBtn key = { list.id } list = { list } onPress = {() => navigation.navigate('List', { list })} />
                            )
                        ))
                    ) : (
                        <ListBtn list = { null } />
                    )
                }
            </View>
        </Div>
    )
}