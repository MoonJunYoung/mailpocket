import React from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Category from '../components/Category';



const OnbodingScreen = () => {
  return (
    <View style={[styles.containerCenter, { gap: 12 }]}>
      <Text style={{ marginTop: 60, fontSize: 20, fontWeight: 'bold', color: 'black' }}>어떤 뉴스레터를 좋아하세요?</Text>
      <Text style={{ fontSize: 15, color: '#777777' }}>클릭해서 최근 요약 확인하고,쉽게 구독하기</Text>
      <Category />
      
    </View>

  )
}

const styles = StyleSheet.create({
  containerCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default OnbodingScreen