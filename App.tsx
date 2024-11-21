import { Button, StyleSheet, View } from 'react-native';
import { useFullWidthSelector } from './hooks/useFullWidthSelector';
import { useEffect, useState } from 'react';

export default function App() {
  // ボタン名 兼 選択された項目の表示
  const [button1Title, setButton1Title] = useState<string>('Selector1');
  const [button2Title, setButton2Title] = useState<string>('Selector2');
  const [button3Title, setButton3Title] = useState<string>('Selector3');

  // hooksの戻り値オブジェクト
  const Selector1 = useFullWidthSelector<string>({
    selectorItems: [
      { label: '文字列：あああ', value: 'あああ' },
      { label: '文字列：いいい', value: 'いいい' },
    ]
  });
  const Selector2 = useFullWidthSelector<number>({
    selectorItems: [
      { label: '数値：100', value: 100 },
      { label: '数値：200', value: 200 },
    ]
  });
  const Selector3 = useFullWidthSelector<boolean>({
    selectorItems: [
      { label: '真偽値：true', value: true },
      { label: '真偽値：false', value: false },
    ]
  });

  // ボタンが押されたら、リストを開いて、他方を閉じる
  const button1OnPress = () => {
    Selector1.openSelector();
    Selector2.closeSelector();
    Selector3.closeSelector();
  };
  const button2OnPress = () => {
    Selector1.closeSelector();
    Selector2.openSelector();
    Selector3.closeSelector();
  };
  const button3OnPress = () => {
    Selector1.closeSelector();
    Selector2.closeSelector();
    Selector3.openSelector();
  };

  // 選択された項目が変わったら、ボタン名を変えて、リストを閉じる
  useEffect(() => {
    if (Selector1.selectedItem) {
      setButton1Title(Selector1.selectedItem.label);
      Selector1.closeSelector();
    }
  }, [Selector1.selectedItem]);
  useEffect(() => {
    if (Selector2.selectedItem) {
      setButton2Title(Selector2.selectedItem.label);
      Selector2.closeSelector();
    }
  }, [Selector2.selectedItem]);
  useEffect(() => {
    if (Selector3.selectedItem) {
      setButton3Title(Selector3.selectedItem.label);
      Selector3.closeSelector();
    }
  }, [Selector3.selectedItem]);


  return (
    <View style={styles.container}>
      <Button title={button1Title} onPress={button1OnPress} />
      <Button title={button2Title} onPress={button2OnPress} />
      <Selector1.Selector />
      <Selector2.Selector />
      <Button title={button3Title} onPress={button3OnPress} />
      <Selector3.Selector />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
