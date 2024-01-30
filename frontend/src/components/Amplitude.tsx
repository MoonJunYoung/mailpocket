import amplitude from 'amplitude-js';

import { getUserData, Token } from '../api/api';

const amplitudeApiKey = 'a64d3e4d62617b1eca2b9ab4864cb072';

// const devAmplitudeApiKey = 'd6e91c2b0e6fdb035d5087cbd79c5cab';

// const ampKey = process.env.NODE_ENV === 'production' ? amplitudeApiKey : devAmplitudeApiKey;


export const initializeAmplitude = async () => {
  amplitude.getInstance().init(amplitudeApiKey);
};


export const AmplitudeSetUserId = async () => {
  const authToken = Token();
  try {
    if (authToken) {
      const userInfo = await fetchUserInfoFromServer();
      amplitude.getInstance().setUserId(userInfo.identifier);
    }
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};

export const AmplitudeResetUserId = async () => {
  try {
    amplitude.getInstance().regenerateDeviceId();
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};



const fetchUserInfoFromServer = async () => {
  try {
    const response = await getUserData();
    if (response.status === 200) {
      const userInfo = response.data;
      return userInfo;
    } else {
      throw new Error('사용자 정보를 가져오는 데 실패했습니다.');
    }
  } catch (error) {
    console.error('사용자 정보를 가져오는 동안 오류 발생:', error);
  }
};


export const sendEventToAmplitude = async (eventName: string, properties: any) => {
  try {
    console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // }
    amplitude.getInstance().logEvent(eventName, properties);
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};

