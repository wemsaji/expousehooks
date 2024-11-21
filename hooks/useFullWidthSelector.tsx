import { useState } from 'react';
import { StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

/**
 * genericsを使ってる。
 * Tには任意の型が入れられるため、
 * valueが文字列だったり数値だったりできる。
 */
export type SelectorItem<T> = {
    label: string;
    value: T;
};

/**
 * useXXXをReactではhooksと言う。
 * 引数を受け取って初期化して、その戻り値としてコンポーネントや値や関数を返せる。
 * つまり、useStateと同じ仕組み。
 * @param selectorItems 選択対象リスト
 * @returns selectedItem 選択された項目
 * @returns openSelector リストを開く関数
 * @returns closeSelector リストを閉じる関数
 * @returns Selector リストを表示させるコンポーネント
 */
export const useFullWidthSelector = <T,>({
    selectorItems,
}: {
    selectorItems: SelectorItem<T>[];
}) => {

    // 選択された項目
    const [selectedItem, setSelectedItem] = useState<SelectorItem<T>>();

    // ここを display じゃなくて height にして、アニメーションしてみよう
    // glwm1 の AppContainer で fadeAnim に注目してみてみてね！
    const [height, setHeight] = useState<StyleProp<ViewStyle>>({ display: 'none' });
    const openSelector = () => setHeight({ display: 'flex' });
    const closeSelector = () => setHeight({ display: 'none' });

    // リストの表示コンポーネント
    const Selector = () =>
        <View style={[styles.list, height]}>{selectorItems.map(item =>
            <TouchableOpacity key={item.label} style={styles.item}
                onPress={() => setSelectedItem(item)}>
                <Text>{item.label}</Text>
            </TouchableOpacity>
        )}</View>;

    return { selectedItem, openSelector, closeSelector, Selector };
};

const styles = StyleSheet.create({
    list: {
        width: '100%',
        backgroundColor: 'green',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
    },
    item: {
        width: '100%',
        backgroundColor: 'orange',
        paddingVertical: 4,
    },
});