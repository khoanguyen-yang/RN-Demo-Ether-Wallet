import React, { ReactNode, useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';

import { useColors } from '../hooks/useColors';

interface MButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  type?: 'primary' | 'secondary';
  loading?: boolean;
  half?: boolean;
}

const MButton = (props: MButtonProps) => {
  const {
    children,
    type = 'primary',
    loading,
    disabled,
    half,
    ...otherProps
  } = props;

  const colors = useColors();

  const backgroundColor = useMemo(() => {
    if (disabled) {
      return colors.grey;
    }
    if (type === 'secondary') {
      return colors.blue;
    }
    return colors.orange;
  }, [disabled, type, colors]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        half ? styles.halfWidth : styles.fullWidth,
        {
          backgroundColor,
          borderColor: colors.white,
        },
      ]}
      activeOpacity={0.6}
      disabled={disabled}
      {...otherProps}>
      <View style={styles.contentContainer}>
        {loading ? <ActivityIndicator style={styles.loadingIndicator} /> : null}
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
  },
  halfWidth: {
    width: '48%',
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginRight: 6,
  },
});

export default React.memo(MButton);
