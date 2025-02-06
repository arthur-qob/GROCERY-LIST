import { View } from 'react-native'
import styles from './style'
import ListBtn from '@/components/ListBtn'
import { ThemedText as Text } from '@/components/ThemedText'
import { ThemedView as Div } from '@/components/ThemedView'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useNavigation } from '@react-navigation/native'
import { list } from 'firebase/storage'

export default function ListsScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    const navigation = useNavigation()
    
    const [ lists, setLists ] = useState([])

    useEffect(() => {
        setLists([
            {
            id: 1,
            title: 'List 1',
            items: [
                { id: 1, title: 'Milk', quantity: 1, unitPrice: 2 },
                { id: 2, title: 'Eggs', quantity: 12, unitPrice: 0.2 },
                { id: 3, title: 'Bread', quantity: 2, unitPrice: 1.5 },
            ],
            dateCreated: '05-02-2021',
            totalAmount: 20,
            },
            {
            id: 2,
            title: 'List 2',
            items: [
                { id: 4, title: 'Flour', quantity: 1, unitPrice: 3 },
                { id: 5, title: 'Rice', quantity: 2, unitPrice: 1.5 },
                { id: 6, title: 'Beans', quantity: 3, unitPrice: 2 },
                { id: 7, title: 'Sugar', quantity: 1, unitPrice: 1 },
                { id: 8, title: 'Salt', quantity: 1, unitPrice: 0.5 },
            ],
            dateCreated: '20-01-2021',
            totalAmount: 100,
            },
            {
            id: 3,
            title: 'List 3',
            items: [
                { id: 9, title: 'Milk', quantity: 1, unitPrice: 2 },
                { id: 10, title: 'Eggs', quantity: 12, unitPrice: 0.2 },
                { id: 11, title: 'Bread', quantity: 2, unitPrice: 1.5 },
                { id: 12, title: 'Flour', quantity: 1, unitPrice: 3 },
                { id: 13, title: 'Rice', quantity: 2, unitPrice: 1.5 },
                { id: 14, title: 'Beans', quantity: 3, unitPrice: 2 },
                { id: 15, title: 'Sugar', quantity: 1, unitPrice: 1 },
                { id: 16, title: 'Salt', quantity: 1, unitPrice: 0.5 },
            ],
            dateCreated: '15-03-2021',
            totalAmount: 120,
            },
            {
            id: 4,
            title: 'List 4',
            items: [
                { id: 17, title: 'Milk', quantity: 1, unitPrice: 2 },
                { id: 18, title: 'Eggs', quantity: 12, unitPrice: 0.2 },
                { id: 19, title: 'Bread', quantity: 2, unitPrice: 1.5 },
                { id: 20, title: 'Flour', quantity: 1, unitPrice: 3 },
                { id: 21, title: 'Rice', quantity: 2, unitPrice: 1.5 },
                { id: 22, title: 'Beans', quantity: 3, unitPrice: 2 },
                { id: 23, title: 'Sugar', quantity: 1, unitPrice: 1 },
                { id: 24, title: 'Salt', quantity: 1, unitPrice: 0.5 },
            ],
            dateCreated: '15-03-2021',
            totalAmount: 120,
            },
            {
            id: 5,
            title: 'List 5',
            items: [
                { id: 25, title: 'Milk', quantity: 1, unitPrice: 2 },
                { id: 26, title: 'Eggs', quantity: 12, unitPrice: 0.2 },
                { id: 27, title: 'Bread', quantity: 2, unitPrice: 1.5 },
            ],
            dateCreated: '16-03-2021',
            totalAmount: 50,
            },
        ])
    }, [])
    

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
                                    <ListBtn list = { list } onPress = { () => navigation.navigate('List', { list }) } />
                                        <View style = {[ styles.listsSeparator, {
                                            borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                                        } ]}></View>
                                </React.Fragment>
                            ) : (
                                    <ListBtn key = { list.id } list = { list } onPress = { () => navigation.navigate('List', { list }) } />
                                )
                            ))
                    ) : (
                        <ListBtn key = { list.id } list = { null } />
                    )
                }
                

            </View>
        </Div>
    )
}