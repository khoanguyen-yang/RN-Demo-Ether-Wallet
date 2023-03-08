import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

import { useColors } from '../hooks/useColors';

interface MTextProps extends TextProps {
  children: ReactNode;
  color?: string;
}

const MText = (props: MTextProps) => {
  const { children, color, style, ...otherProps } = props;

  const colors = useColors();

  return (
    <Text
      style={[styles.defaultFontSize, { color: color || colors.black }, style]}
      {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  defaultFontSize: {
    fontSize: 18,
  },
});

export default React.memo(MText);
