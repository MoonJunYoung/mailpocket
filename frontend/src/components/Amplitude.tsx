import amplitude from 'amplitude-js';

import { getUserData, Token } from '../api/api';

const amplitudeApiKey = 'a64d3e4d62617b1eca2b9ab4864cb072';

// const devAmplitudeApiKey = 'd6e91c2b0e6fdb035d5087cbd79c5cab';

// const ampKey = process.env.NODE_ENV === 'production' ? amplitudeApiKey : devAmplitudeApiKey;


export const initializeAmplitude = async () => {
  amplitude.getInstance().init(amplitudeApiKey);
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
    console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // if (process.env.NODE_ENV === 'development') {
    //   console.log(`${eventName}: ${JSON.stringify(properties || {})}`)
    // }
    amplitude.getInstance().logEvent(eventName, properties);
  } catch (error) {
    console.error('Amplitude 초기화 중 오류 발생:', error);
  }
};

