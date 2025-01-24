import { ThemedView as Div } from '@/components/ThemedView'
import { ThemedText as Text } from '@/components/ThemedText'
import styles from './style'

export default function ItemsScreen() {
    return (
        <Div style  = { styles.mainContainer }>
            <Text>Items</Text>
        </Div>
    )
}