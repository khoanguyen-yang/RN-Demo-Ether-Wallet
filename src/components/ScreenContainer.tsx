import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

interface ScreenContainerProps extends ViewProps {}

const ScreenContainer = (props: ScreenContainerProps) => {
  const { children, style, ...otherProps } = props;
  return (
    <View style={[styles.container, style]} {...otherProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
  },
});

export default React.memo(ScreenContainer);
