import React, { useCallback } from 'react';
import { NavigationProp } from '@react-navigation/native';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import MText from '../components/MText';
import ScreenContainer from '../components/ScreenContainer';
import { keypairController } from '../controllers/AccountController';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { useColors } from '../hooks/useColors';
import {
  selectAddresses,
  selectCurrentActiveAddress,
} from '../selectors/addressSelectors';
import { setCurrentActiveAddress } from '../stores/address';
import MButton from '../components/MButton';
import { Screen } from '../navigation/navigation';

const ManageAccount = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const colors = useColors();
  const dispatch = useAppDispatch();

  const addresses = useAppSelector(selectAddresses);
  const currentActiveAddress = useAppSelector(selectCurrentActiveAddress);

  const onSelectAddress = useCallback(
    (address: string) => {
      dispatch(setCurrentActiveAddress(address));
      keypairController.setCurrentActiveAddress(address);
      navigation.goBack();
    },
    [dispatch, navigation],
  );

  const onImport = useCallback(() => {
    navigation.navigate(Screen.ImportSeed);
  }, [navigation]);

  const renderItem = useCallback(
    ({ item }: { item: string }) => {
      return (
        <TouchableOpacity
          style={[
            styles.itemContainer,
            { borderColor: colors.black, backgroundColor: colors.grey },
          ]}
          onPress={() => onSelectAddress(item)}>
          <View style={styles.addressTextContainer}>
            <MText color={colors.white}>{item}</MText>
          </View>
          {currentActiveAddress === item ? (
            <Icon name="checkcircleo" size={24} color={colors.white} />
          ) : null}
        </TouchableOpacity>
      );
    },
    [colors, currentActiveAddress, onSelectAddress],
  );

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.importButtonContainer}>
        <MButton onPress={onImport} type="primary">
          <MText color={colors.white}>Import another account</MText>
        </MButton>
      </View>
      <FlatList data={addresses} renderItem={renderItem} />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  importButtonContainer: {
    marginBottom: 24,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWith: 1,
    marginBottom: 2,
  },
  addressTextContainer: { maxWidth: '90%' },
});

export default React.memo(ManageAccount);
