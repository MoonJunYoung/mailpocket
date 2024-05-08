import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getCategorys } from '../api/api';


interface CategoryDateType {
  id: number,
  name: string,
  operating_status: boolean
}


const Category = () => {
  const [categorys, setCategorys] = useState<CategoryDateType[]>([])
  const dispatch = useDispatch();

  useEffect(() => {
    handleGetCategory()
  }, [])



  const handleGetCategory = async () => {
    try {
      const responseData = await getCategorys()
      if (responseData.status === 200) {
        dispatch({ type: 'UPDATE_CATEGORY_SUCCESS', payload: responseData.data });
        setCategorys(responseData.data)
      }
    } catch (error) {
      console.log("Category 데이터 불러오기 실패")
    }
  }

  return (
    <View>
      <Text>dkdsdfdsㄴㅇㅎㄴㅎㅇㄴㅎsdk</Text>
    </View>
  )
}

export default Category