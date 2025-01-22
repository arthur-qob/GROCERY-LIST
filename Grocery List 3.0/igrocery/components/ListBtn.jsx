import { View, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import { ThemedText as Text } from './ThemedText'

export default function ListBtn({ lists }) {
    const theme = useColorScheme() ?? 'light'

    return (
        <>
            { lists ? (
                <>
                    { lists.map((list, index) => (
                        <View key = { index }>
                            <TouchableOpacity style = {[ styles.list, {
                                backgroundColor: theme === 'light' ? '#f0f0f0' : '#323232',
                                borderColor: theme === 'light' ? '#e9e9e9' : '#292929',
                                
                            } ]}>
                                <View style = { styles.listBtnHeader }>
                                    <Text style = { styles.listBtnHeaderText }>{ list.name }</Text>
                                    <IonIcon name = 'chevron-forward' size = { 20 } color = { theme === 'dark' ? '#fff' : '#000'} />
                                </View>
        
                                <View style = {[ styles.listSeparator, {
                                    backgroundColor: theme === 'light' ? '#000' : '#fff',
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
                        backgroundColor: theme === 'light' ? '#f0f0f0' : '#323232',
                        borderColor: theme === 'light' ? '#e9e9e9' : '#292929',
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