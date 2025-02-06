import { View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import { CustomButton as Button } from '@/components/CustomButton'
import styles from './style'
import { useState } from 'react'

export default function HomeScreen() {
    const navigation = useNavigation()

    const Section = ({ children, style }) => {
        return (
            <View style = { style }>
                { children }
            </View>
        )
    }


    const [ weekDay ] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long' }))

    return (
        <Div style = { styles.mainContainer }>
            <Section style = { styles.sectionContainers }>

                <Text type = 'title' style = { styles.sectionTitles }>THIS SCREEN IS IN DEVELOPMENT</Text>

                <Text type = 'title' style = { styles.sectionTitles }>Quick Actions</Text>

                <View style = { styles.section1BtnsContainer }>
                    <Button title = 'New list' type = 'primary' style = { styles.section1Btns } onPress = { () => navigation.navigate('List') } />
                    <Button title = 'New item' type = 'primary' style = { styles.section1Btns } />
                </View>

            </Section>

            <Section style = { styles.sectionContainers }>
                <Text type = 'title' style = { styles.sectionTitles }>Recent Activities</Text>
            </Section>

            <Section style = { styles.sectionContainers }>
                <Text type = 'title' style = { styles.sectionTitles }>Suggestions</Text>

                {
                    weekDay === 'Thursday' ? (
                        <Button title = 'New gorcery list' type = 'primary' onPress = { () => navigation.navigate('') } />
                    ) : (
                        <Button title = 'No suggestions' type = 'primary' />
                    )
                }
            </Section>
        </Div>
    )
}