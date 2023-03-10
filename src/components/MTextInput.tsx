import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useColors } from '../hooks/useColors';

interface MTextInputProps extends TextInputProps {}

const MTextInput = (props: MTextInputProps) => {
  const colors = useColors();

  return (
    <View style={[styles.container, { borderColor: colors.black }]}>
      <TextInput placeholderTextColor={colors.grey} {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default React.memo(MTextInput);
