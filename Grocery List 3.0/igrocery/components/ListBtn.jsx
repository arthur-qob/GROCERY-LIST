import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import { useTheme } from '@/contexts/ThemeContext'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ThemedText as Text } from './ThemedText'

export default function ListBtn({ lists }) {
    // const currentTheme = useColorScheme() ?? 'light'
    const { currentTheme } = useTheme()
    const theme = currentTheme === 'light' ? 'light' : 'dark'

    return (
        <>
            { lists ? (
                <>
                    { lists.map((list, index) => (
                        <View key = { index }>
                            <TouchableOpacity style = {[ styles.list, {
                                backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
                                // borderColor: theme === 'light' ? '#e9e9e9' : '#292929',
                                
                            } ]}>
                                <View style = { styles.listBtnHeader }>
                                    <Text style = { styles.listBtnHeaderText }>{ list.name }</Text>
                                    <IonIcon name = 'chevron-forward' size = { 20 } color = { theme === 'dark' ? 'rgb(142, 142, 147)' : 'rgb(228, 227, 233)'} />
                                </View>
        
                                <View style = {[ styles.listSeparator, {
                                    backgroundColor: theme === 'light' ? 'rgb(228, 227, 233)' : 'rgb(142, 142, 147)',
                                } ]} />
        
                                <View style = { styles.listBtnFooter }>
                                    <Text style = { styles.listBtnFooterText }>{ list.items.length } { list.items.length > 1 ? 'items' : 'item'}</Text>
                                    <Text style = { styles.listBtnFooterText }>{ list.dateCreated }</Text>
                                    <Text style = { styles.listBtnFooterText }>{ list.totalAmount }</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    ) )}
                </>
            ) : (
                <>
                    <View style = {[ styles.listNotFoundContainer, {
                        backgroundColor: theme === 'light' ? 'rgb(255, 255, 255)' : 'rgb(28, 28, 30)',
                        // borderColor: theme === 'light' ? '#e9e9e9' : '#292929',
                    } ]}>
                        <Text style = { styles.listNotFoundContainerText }>No lists found</Text>
                    </View>
                </>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent',
        gap: 10,
    },
    listNotFoundContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 100,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'transparent',
    },
    listNotFoundContainerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listBtnHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    listBtnHeaderText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    listSeparator: {
        width: '100%',
        height: 1,
        marginVertical: 5,
    },
    listBtnFooter: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    listBtnFooterText: {
        fontSize: 14,
    }
})