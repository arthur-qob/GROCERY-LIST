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
import { ref, onValue, set, get } from 'firebase/database'
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

    const [listData, setListData] = useState({
        title: '',
        items: [],
        dateCreated: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }).replace(/[/]/g, '-').split(', ')[0],
        numItems: 0,
        totalAmount: 0,
    } || null)

    const showAddItemAlert = () => {
        Alert.prompt('Add item', 'Enter item title', (title) => {
            if (title) {
                Alert.prompt('Add item', 'Enter item quantity', (quantity) => {
                    if (quantity) {
                        Alert.prompt('Add item', 'Enter item unit price', (unitPrice) => {
                            if (unitPrice) {
                                setListData({
                                    ...listData,
                                    items: [
                                        ...listData.items,
                                        {
                                            id: listData.items.length + 1,
                                            title: title,
                                            quantity: parseInt(quantity),
                                            unitPrice: parseFloat(unitPrice),
                                        }
                                    ],
                                    numItems: listData.numItems + parseInt(quantity),
                                    totalAmount: listData.totalAmount + (parseInt(quantity) * parseFloat(unitPrice)),
                                })
                            }
                        })
                    }
                })
            }
        })
    }

    const [ newListTitle, setNewListTitle ] = useState('')

    useEffect(() => {
        if (newListTitle) {
            setListData({
                ...listData,
                title: newListTitle,
            })
        }
    }, [ newListTitle ])

    useEffect(() => {
        navigation.setOptions({
            headerTitle: listData.title,
        })
    }, [ listData ])

    const handleSaveList = async () => {
        const userListRef = ref(db, `users/${userUid}/lists`)
        const listRef = ref(db, `lists${userUid}/${listData.title}`)
        const newList = {
            title: listData.title,
            items: listData.items,
            dateCreated: listData.dateCreated,
            totalAmount: listData.totalAmount,
        }

        try {
            await set(listRef, newList)
            await set(userListRef, newList)

            Toast.show({
                type: 'success',
                text1: 'List saved',
                text2: `${listData.title} saved successfully!`,
            })

            console.log('List saved successfully!')

        } catch (e) {
            Toast.show({
                type: 'error',
                text1: 'Error saving list',
                text2: e.message || 'An error occurred while saving the list.',
            })

            console.error(e)
        }
    }

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            if (list) {
                setListData({
                    title: list.title,
                    items: Array.isArray(list.items) ? list.items : [],
                    dateCreated: list.dateCreated,
                    numItems: listData.items.reduce((total, item) => total + item.quantity, 0),
                    totalAmount: listData.items.reduce((total, item) => total + (item.unitPrice * item.quantity), 0),
                })
            }
    
            navigation.setOptions({
                headerRight: () => (
                    <Button title = 'Save list' onPress = { handleSaveList } />
                ),
            })    

            setLoading(false)
        }, 2000)
    }, [])

    return (
        <Div style = { styles.mainContainer }>
            {
                loading ? (
                    <ActivityIndicator size = 'small' color = { theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)' } />
                ) : (
                    <Input style = {{ width: '90%' }} placeholder = { listData.title ? listData.title : 'Enter list title' } onChangeText = { setNewListTitle } />
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
                            <Text>{ listData.dateCreated || 'Unknown' }</Text>
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
                            <Text>{ listData.numItems } { listData.numItems.length === 1 ? 'item' : 'items' }</Text>
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