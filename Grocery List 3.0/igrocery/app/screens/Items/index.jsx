import { TextInput, TouchableOpacity, View } from 'react-native'
import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { SymbolView } from 'expo-symbols'
import ItemCard from '@/components/ItemCard'
import { useTheme } from '@/contexts/ThemeContext'
import styles from './style'
import { useState } from 'react'
import CustomModal from '@/components/CustomModal'

export default function ItemsScreen() {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    const [ showModal, setShowModal ] = useState(false)

    const items = [
        {
            title: 'Item #1',
            image: theme === 'dark' ? require('@/assets/images/items/dark/bread-image.jpg') : require('@/assets/images/items/light/bread-image.jpg'),
            description: 'Bread integral 500g',
            price: 'R$ 5.00',
        },
        {
            title: 'Item #2',
            image: theme === 'dark' ? require('@/assets/images/items/dark/potato-image.jpg') : require('@/assets/images/items/light/potato-image.jpg'),
            description: 'Batata',
            price: 'R$ 6.50',
        },
        {
            title: 'Item #3',
            image: theme === 'dark' ? require('@/assets/images/items/dark/diet-coke-image.jpg') : require('@/assets/images/items/light/diet-coke-image.jpg'),
            description: 'Coca-Cola Zero',
            price: 'R$ 4.00',
        },
        {
            title: 'Item #4',
            image: theme === 'dark' ? require('@/assets/images/items/dark/eggs-image.jpg') : require('@/assets/images/items/light/eggs-image.jpg'),
            description: '1/2 dúzia de Ovos',
            price: 'R$ 8.00',
        }
    ]

    return (
        <Div style  = { styles.mainContainer }>
            <Text>Items</Text>

            <TouchableOpacity style = {[ styles.searchBar, {
                backgroundColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(28, 28, 30)',
            } ]}>
                <SymbolView name = "magnifyingglass" size = { 22 } tintColor = { theme === 'light' ? 'grey' : 'grey' } />
                <TextInput placeholder = "Search items" style = { styles.searchBarInput } placeholderTextColor = 'grey' />
            </TouchableOpacity>

            <CustomModal modalVisible = { showModal } setModalVisible = { setShowModal } />

            <View style = { styles.itemsContainer }>
                <ItemCard items = { items } onPress1 = { () => setShowModal } onPress2 = { () => console.log('Secondary clicked') }/>
            </View>
        </Div>
    )
}