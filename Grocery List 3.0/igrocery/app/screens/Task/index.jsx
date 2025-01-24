import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import styles from './style'

export default function Task() {
    return (
        <Div style = { styles.mainContainer }>
            <Text>Add, edit and delete your tasks here.</Text>
        </Div>
    )
}