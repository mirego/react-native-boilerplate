declare module 'react-native-config' {
  export interface NativeConfig {
    API_URL?: string;

    KILLSWITCH_API_KEY_ANDROID?: string;
    KILLSWITCH_API_KEY_IOS?: string;
    KILLSWITCH_API_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
