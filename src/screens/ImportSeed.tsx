import React, { useCallback, useState } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { NavigationProp } from '@react-navigation/native';

import MButton from '../components/MButton';
import MText from '../components/MText';
import MTextInput from '../components/MTextInput';

import { useColors } from '../hooks/useColors';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addNewAddress } from '../stores/address';
import {
  createEtherWalletFromSeed,
  storePrivateKeyToKeychain,
} from '../utils/crypto';

import { keypairController } from '../controllers/KeypairController';
import { selectIsHavingExistingAddress } from '../selectors/addressSelectors';

import { Screen } from '../navigation/navigation';
import { DeviceInfo } from '../constants/device';

const ImportSeed = ({
  navigation,
}: {
  navigation: NavigationProp<any, any>;
}) => {
  const colors = useColors();
  const dispatch = useAppDispatch();

  const [seedPhrase, setSeedPhrase] = useState('');
  const [isImporting, setIsImporting] = useState(false);

  const haveExistingAddress = useAppSelector(selectIsHavingExistingAddress);

  const onInputSeed = useCallback((value: string) => {
    setSeedPhrase(value);
  }, []);

  const onClearSeed = useCallback(() => {
    setSeedPhrase('');
  }, []);

  const onPasteSeed = useCallback(async () => {
    const clipboardData = await Clipboard.getString();
    setSeedPhrase(clipboardData.trim());
  }, []);

  const onImport = useCallback(async () => {
    setIsImporting(true);

    setTimeout(async () => {
      const wallet = await createEtherWalletFromSeed(seedPhrase.trim());

      if (wallet) {
        // store private key to keychain
        storePrivateKeyToKeychain(wallet.address, wallet.privateKey);

        // add new address to store
        dispatch(addNewAddress(wallet.address));
        // add keypair to keypair controller
        keypairController.addKeypair(wallet.address, wallet.privateKey);

        // navigate to Home screen
        if (haveExistingAddress) {
          navigation.navigate(Screen.Home);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: Screen.Home }],
          });
        }
      } else {
        Alert.alert(
          'Error',
          'Invalid seed phrase. Please check if you input it correctly',
          [
            {
              text: 'OK',
            },
          ],
        );
      }

      setIsImporting(false);
    }, 100);
  }, [seedPhrase, dispatch, haveExistingAddress, navigation]);

  return (
    <KeyboardAvoidingView behavior="height" enabled style={styles.container}>
      <MText color={colors.black}>
        Import seed phrase of 12 words. Words are seperated by single space
      </MText>

      <View style={styles.seedInputContainer}>
        <MTextInput
          style={styles.seedInput}
          value={seedPhrase}
          onChangeText={onInputSeed}
          placeholder={'Seed phrase'}
          multiline
          textAlignVertical="top"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.utilButtons}>
        <MButton
          onPress={onClearSeed}
          half
          type="secondary"
          loading={isImporting}
          disabled={isImporting}>
          <MText color={colors.white}>Clear</MText>
        </MButton>

        <MButton
          onPress={onPasteSeed}
          half
          type="secondary"
          loading={isImporting}
          disabled={isImporting}>
          <MText color={colors.white}>Paste</MText>
        </MButton>
      </View>

      <View style={styles.importButton}>
        <MButton
          onPress={onImport}
          loading={isImporting}
          disabled={isImporting}>
          <MText color={colors.white}>Import</MText>
        </MButton>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  seedInputContainer: { marginTop: 24 },
  seedInput: {
    paddingTop: 12,
    paddingBottom: 10,
    paddingHorizontal: 12,
    minHeight: 0.2 * DeviceInfo.height,
    fontSize: 18,
  },
  utilButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
  },
  importButton: {
    marginTop: 18,
  },
});

export default React.memo(ImportSeed);
