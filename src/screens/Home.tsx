import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Icon from 'react-native-vector-icons/AntDesign';
import { NavigationProp } from '@react-navigation/native';

import ScreenContainer from '../components/ScreenContainer';
import MText from '../components/MText';
import MButton from '../components/MButton';

import { useAppSelector } from '../hooks/redux';
import useNativeBalance from '../hooks/useNativeBalance';
import { selectCurrentActiveAddress } from '../selectors/addressSelectors';
import { useColors } from '../hooks/useColors';

import { ChainId } from '../constants/ChainId';
import { Screen } from '../navigation/navigation';

const Home = ({ navigation }: { navigation: NavigationProp<any, any> }) => {
  const colors = useColors();

  const [isCopying, setIsCopying] = useState(false);

  const currentActiveAddress = useAppSelector(selectCurrentActiveAddress);

  const { formattedBalance } = useNativeBalance(
    currentActiveAddress,
    ChainId.ETH,
  );

  const onCopyAddress = useCallback(() => {
    Clipboard.setString(currentActiveAddress);
    setIsCopying(true);
    setTimeout(() => {
      setIsCopying(false);
    }, 500);
  }, [currentActiveAddress]);

  const onManageAccount = useCallback(() => {
    navigation.navigate(Screen.ManageAccount);
  }, [navigation]);

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.addressOuterContainer}>
        <MText>Address:</MText>
        <View
          style={[
            styles.addressInnerContainer,
            { borderColor: colors.black, backgroundColor: colors.grey },
          ]}>
          <View style={styles.addressTextContainer}>
            <MText color={colors.white}>{currentActiveAddress}</MText>
          </View>
          <TouchableOpacity activeOpacity={0.6} onPress={onCopyAddress}>
            <Icon
              name={isCopying ? 'checkcircleo' : 'copy1'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.balanceContainer}>
        <MText>ETH balance: {formattedBalance} ETH</MText>
      </View>

      <MButton onPress={onManageAccount} type="primary">
        <MText color={colors.white}>Manage accounts</MText>
      </MButton>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  addressOuterContainer: {
    marginBottom: 24,
  },
  addressInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWith: 1,
    marginTop: 4,
  },
  addressTextContainer: { maxWidth: '90%' },
  balanceContainer: {
    marginBottom: 8,
  },
});

export default React.memo(Home);
