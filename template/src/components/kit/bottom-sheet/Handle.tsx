import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { useColorSchemeValue } from '~/hooks/use-color-scheme-value';

const styles = StyleSheet.create({
  handle: {
    width: 56,
    height: 3,
    borderRadius: 3,
    flexGrow: 0,
  },
});

export const Handle = ({ style, ...props }: ViewProps) => {
  const backgroundColor = useColorSchemeValue(['#9295A2', '#575C70']);

  return (
    <View style={[styles.handle, style, { backgroundColor }]} {...props} />
  );
};
