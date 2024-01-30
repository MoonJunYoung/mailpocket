import amplitude from 'amplitude-js';

import { getUserData, Token } from '../api/api';

const amplitudeApiKey = 'd6e91c2b0e6fdb035d5087cbd79c5cab';

const devAmplitudeApiKey = 'a64d3e4d62617b1eca2b9ab4864cb072';

const ampKey = process.env.NODE_ENV === 'development' ? devAmplitudeApiKey : amplitudeApiKey;



export const initializeAmplitude = async () => {
  amplitude.getInstance().init(ampKey);
};

export const AmplitudeSetUserId = async () => {
  const authToken = Token();
  try {
    if (authToken) {
      const userInfo = await getUserData();
      amplitude.getInstance().setUserId(userInfo.data.identifier);
    }
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};

export const AmplitudeResetUserId = async () => {
  try {
    amplitude.getInstance().setUserId(null);
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};


export const sendEventToAmplitude = async (eventName: string, properties: any) => {
  try {
    // console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // // if (process.env.NODE_ENV === 'development') {
    // //   console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // // }
    amplitude.getInstance().logEvent(eventName, properties);
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};

