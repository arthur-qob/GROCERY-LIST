import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import { ThemedText as Text } from '@/components/ThemedText'
import { useTheme } from '@/contexts/ThemeContext'
import { CustomButton as Button } from './CustomButton'

export default function ItemCard({ items, onPress1, onPress2 }) {
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    return (
        <>
            {
                items.map((item, index) => (

                    // Change key from index to the item's id in the database
                    <View key = { index } style = {[ styles.itemCard, {
                        backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
                    } ]}>
                        <Text style = { styles.ItemCardTitle }>{ item.title }</Text>
                        {
                            item.image ? (
                                <Image source = { item.image } style = { styles.itemCardImage } />
                            ) : (
                                <View style = { styles.itemCardImage }>
                                    <ActivityIndicator size = 'large' color = { theme === 'light' ? 'rgb(255, 255, 255)' : 'grey' } />
                                </View>
                            )
                        }
                        <View style = { styles.itemCardDetails }>
                            <Text style = {[ styles.details, {
                                textAlign: 'left',
                            } ]}>{ item.description }</Text>
                            <Text style = {[ styles.details, {
                                textAlign: 'right',
                            } ]}>{ item.price }</Text>

                        </View>
                        <View style = { styles.itemCardDetailsBtnsContainer }>
                            <Button title = 'Edit' type = 'secondary' style = {{ width: '45%' }} onPress = { onPress2 } />
                            <Button title = 'Add' type = 'primary' style = {{ width: '45%' }} onPress = { onPress1 } />
                        </View>
                    </View>
                )
            )}
        </>
    )
}

const styles = StyleSheet.create({
    itemCard: {
        width: '65%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: 10,
        gap: 10,
    },
    ItemCardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    itemCardImage: {
        width: 200,
        height: 200,
        backgroundColor: 'rgb(228, 227, 233)',
        borderRadius: 10,
        alignSelf: 'center',
        marginVertical: 15,
    },
    itemCardDetails: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 5,
    },
    details: {
        width: '45%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },
    itemCardDetailsBtnsContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 5,
    },
})