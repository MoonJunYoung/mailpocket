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
    <View style={[styles.containerCenter, { gap: 10 }]}>
      <View style={[styles.containerCenter, { gap: 10 }]}>
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#1F2937' }}>어떤 뉴스레터를 좋아하세요?</Text>
        <Text style={{ fontSize: 15, color: '#777777' }}>클릭해서 최근 요약 확인하고,쉽게 구독하기</Text>
      </View>
      <Category />
    </View>

  )
}

const styles = StyleSheet.create({
  containerCenter: {
    paddingVertical: 40,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
});


export default OnbodingScreen