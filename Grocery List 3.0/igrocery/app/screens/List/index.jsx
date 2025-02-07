import { ActivityIndicator, Alert, Platform, TouchableOpacity, View } from 'react-native'
import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomTextInput as Input } from '@/components/CustomTextInput'
import { Button } from 'react-native'
import { Collapsible } from '@/components/Collapsible'
import { useRoute, useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import styles from './style'
import { useTheme } from '@/contexts/ThemeContext'
import { Ionicons } from '@expo/vector-icons'
import { SymbolView } from 'expo-symbols'
import { db } from '@/firebaseConfig'
import { ref, set, push } from 'firebase/database'
import { useUser } from '@/contexts/UserContext'
import Toast from 'react-native-toast-message'

export default function ListScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    const { userUid } = useUser()

    const navigation = useNavigation()

    const route = useRoute()
    const { list } = route.params || {}

    const [ loading, setLoading ] = useState(false)

    const [ refresh, setRefresh ] = useState(false)

    const handleRefresh = () => {
        setRefresh(prev => !prev)
    }

    const [listData, setListData] = useState({
        title: '',
        items: [],
        dateCreated: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(/[/]/g, '-').replace(', ', ' | '),
        numItems: 0,
        totalAmount: 0,
    } || null)


    const showAddItemAlert = () => {
        Alert.prompt('Add item', 'Enter item title', (title) => {
            if (title) {
                Alert.prompt('Enter item quantity', 'Enter item quantity', (quantity) => {
                    if (quantity && !isNaN(quantity)) {
                        Alert.prompt('Enter item unit price', 'Enter item unit price', (unitPrice) => {
                            if (unitPrice && !isNaN(unitPrice)) {
                                const newItem = {
                                    id: listData.items.length + 1,
                                    title: title,
                                    quantity: parseInt(quantity),
                                    unitPrice: parseFloat(unitPrice),
                                }
    
                                setListData(prevListData => ({
                                    ...prevListData,
                                    items: [...prevListData.items, newItem],
                                    numItems: prevListData.numItems + parseInt(quantity),
                                    totalAmount: prevListData.totalAmount + (parseInt(quantity) * parseFloat(unitPrice)),
                                }))
                            } else {
                                Toast.show({ type: 'error', text1: 'Invalid unit price' })
                            }
                        })
                    } else {
                        Toast.show({ type: 'error', text1: 'Invalid quantity' })
                    }
                })
            } else {
                Toast.show({ type: 'error', text1: 'Item title is required' })
            }
        })
    }

    useEffect(() => {
        listData.title !== '' && navigation.setOptions({
            headerTitle: listData.title,
        })

        listData.items.length > 0 && console.log('list items', listData.items)
    }, [ listData ])

    const handleSaveList = async () => {
        handleRefresh()
        console.log('Updating list data')
        const newList = {
            title: listData.title,
            owner: userUid,
            collaborators: {
                [userUid]: 'true',
            },
            items: listData.items,
            dateCreated: listData.dateCreated,
            totalAmount: listData.totalAmount,
        }

        try {
            const userRef = ref(db, `users/${userUid}/lists`)
            const listRef = ref(db, 'lists')
            const newListRef = push(listRef)

            console.log('list id:', newListRef.key)
            console.log('list data:', newList)
            console.log('list ref:', newListRef)
    
            await set(newListRef, newList)
            await push(userRef, newListRef.key)
    
            Toast.show({
                type: 'success',
                text1: 'List saved',
                text2: `"${ listData.title }" saved successfully!`,
            })
        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Error saving list',
                text2: e?.message || 'An error occurred while saving the list.',
            })
            console.error(e)
        }
    }
    
    useEffect(() => {
        setLoading(true)

        navigation.setOptions({
            headerRight: () => (
                <Button title = 'Save list' onPress = { handleSaveList } />
            ),
        })
    
        setTimeout(() => {
            if (list) {
                setListData({
                    title: list.title,
                    items: Array.isArray(list.items) ? list.items : [],
                    dateCreated: list.dateCreated,
                    numItems: list.items?.reduce((total, item) => total + item.quantity, 0) || 0,
                    totalAmount: list.items?.reduce((total, item) => total + (item.unitPrice * item.quantity), 0) || 0,
                })
            }
    
            setLoading(false)
        }, 2000)
    }, [])
    

    return (
        <Div style = { styles.mainContainer }>
            {
                loading ? (
                    <ActivityIndicator size = 'small' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                ) : (
                    <Input style = {{ width: '90%' }} placeholder = { listData.title ? listData.title : 'Enter list title' } onChangeText = {
                        (text) => { setListData({
                            ...listData,
                            title: text,
                    }) } } />
                )
            }
            <View style = {[ styles.listDataContainer, {
                backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(30, 30, 30)',
            } ]}>

                <View style = { styles.listDataRows }>
                    <Text>Date created:</Text>
                    {
                        loading ? (
                            <ActivityIndicator size = 'small' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                        ) : (
                            <Text>{ (listData.dateCreated).split(' | ')[0] || 'Unknown' }</Text>
                        )
                    }
                </View>
                
                <View style = {[ styles.listDataSeparator, {
                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)'
                } ]}></View>

                <View style = { styles.listDataRows }>
                    <Text>Nº of items:</Text>
                    {
                        loading ? (
                            <ActivityIndicator size = 'small' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                        ) : (
                            <Text>{ listData.numItems } { listData.numItems === 1 ? 'item' : 'items' }</Text>
                        )
                    }
                </View>
                
                <View style = {[ styles.listDataSeparator, {
                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)'
                } ]}></View>

                <View style = { styles.listDataRows }>
                    <Text>Total amount:</Text>
                    {
                        loading ? (
                            <ActivityIndicator size = 'small' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                        ) : (
                            <Text>R${ (listData.totalAmount).toFixed(2) }</Text>
                        )
                    }
                </View>
            </View>
                {
                    loading ? (
                        <ActivityIndicator size = 'large' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                    ) : (
                        (listData.items.length > 0 ? (
                            <Collapsible title = 'Items' headerRight = {(
                                <TouchableOpacity onPress = { showAddItemAlert }>
                                        {
                                            Platform.OS === 'ios' ? (
                                                <SymbolView name = 'plus.circle' size = { 24 } />
                                            ) : (
                                                <Ionicons name = 'add-circle' size = { 24 } color = 'rgb(10, 132, 255)' />
                                            )
                                        }
                                    </TouchableOpacity>
                            )} style = {[ styles.collapsibleContainer, {
                                backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(30, 30, 30)',
                            } ]}>
                                {
                                    listData.items.map((item, index) => (
                                        index !== listData.items.length - 1 ? (
                                            <React.Fragment key = { item.id }>
                                                <View style = { styles.collapsibleRows }>
                                                    <Text style = {{ flex: 1 }}>{ item.title }</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>{ item.quantity }</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>R${(item.unitPrice).toFixed(2)}</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>R${(item.unitPrice * item.quantity).toFixed(2)}</Text>
                                                </View>
                                                <View style = {[ styles.listDataSeparator, {
                                                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)'
                                                } ]}></View>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key = { item.id }>
                                                <View style = { styles.collapsibleRows }>
                                                <Text style = {{ flex: 1 }}>{ item.title }</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>{ item.quantity }</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>R${(item.unitPrice).toFixed(2)}</Text>
                                                    <Text style = {{ flex: 1, textAlign: 'right' }}>R${(item.unitPrice * item.quantity).toFixed(2)}</Text>
                                                </View>
                                            </React.Fragment>
                                        )
                                    ))
                                }
                            </Collapsible>
                        ) : (
                            <View style = {[ styles.listDataContainer, {
                                backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(30, 30, 30)',
                            } ]}>
                                <View style = { styles.listDataRows }>
                                    <Text>Items</Text>
                                    <TouchableOpacity onPress = { showAddItemAlert }>
                                        {
                                            Platform.OS === 'ios' ? (
                                                <SymbolView name = 'plus.circle' size = { 24 } />
                                            ) : (
                                                <Ionicons name = 'add-circle' size = { 24 } color = 'rgb(10, 132, 255)' />
                                            )
                                        }
                                    </TouchableOpacity>
                                </View>
                                
                                <View style = {[ styles.listDataSeparator, {
                                    borderBottomColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)'
                                } ]}></View>

                                <View style = { styles.listDataRows }>
                                    <Text>No items added</Text>
                                </View>
                            </View>
                        ))
                    )
                }
        </Div>
    )
}