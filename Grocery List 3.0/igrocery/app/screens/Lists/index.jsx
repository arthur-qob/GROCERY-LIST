import { View, ScrollView } from 'react-native'
import styles from './style'
import ListBtn from '@/components/ListBtn'
import { ThemedText as Text } from '@/components/ThemedText'

export default function HomeScreen() {
    const lists = [
        {
            name: 'List 1',
            items: [
                'Milk',
                'Eggs',
                'Bread',
            ],
            dateCreated: '05/02/2021',
            totalAmount: 20,
        },
        {
            name: 'List 2',
            items: [
                    'Flour',
                    'Rice',
                    'Beans',
                    'Sugar',
                    'Salt',
                ],
            dateCreated: '20/01/2021',
            totalAmount: 100,
        },
    ]
    
    // const lists = null

    return (
        <ScrollView contentContainerStyle = { styles.mainContainer }>
            <Text style = { styles.title }>Lists</Text>
            <View style = { styles.listsContainer }>
                
                <ListBtn lists = { lists } />

            </View>

        </ScrollView>
    )
}