import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { RouteProp, ParamListBase } from '@react-navigation/core';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import Article from '../Shared/Article';
import Albums from '../Shared/Albums';

type SimpleStackParams = {
  article: { author: string };
  album: undefined;
};

type SimpleStackNavigation = NativeStackNavigationProp<SimpleStackParams>;

const ArticleScreen = ({
  navigation,
  route,
}: {
  navigation: SimpleStackNavigation;
  route: RouteProp<SimpleStackParams, 'article'>;
}) => (
  <React.Fragment>
    <View style={styles.buttons}>
      <Button
        mode="contained"
        onPress={() => navigation.push('album')}
        style={styles.button}
      >
        Push album
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Go back
      </Button>
    </View>
    <Article author={{ name: route.params.author }} />
  </React.Fragment>
);

const AlbumsScreen = ({
  navigation,
}: {
  navigation: SimpleStackNavigation;
}) => (
  <React.Fragment>
    <View style={styles.buttons}>
      <Button
        mode="contained"
        onPress={() => navigation.push('article', { author: 'Babel fish' })}
        style={styles.button}
      >
        Push article
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Go back
      </Button>
    </View>
    <Albums />
  </React.Fragment>
);

const SimpleStack = createNativeStackNavigator<SimpleStackParams>();

type Props = {
  options?: React.ComponentProps<typeof SimpleStack.Navigator>;
  navigation: NativeStackNavigationProp<ParamListBase>;
};

export default function SimpleStackScreen({ navigation, options }: Props) {
  navigation.setOptions({
    headerTransparent: false,
  });

  return (
    <SimpleStack.Navigator {...options}>
      <SimpleStack.Screen
        name="article"
        component={ArticleScreen}
        options={({ route }) => ({
          title: `Article by ${route.params.author}`,
        })}
        initialParams={{ author: 'Gandalf' }}
      />
      <SimpleStack.Screen
        name="album"
        component={AlbumsScreen}
        options={{ title: 'Album', largeTitle: true }}
      />
    </SimpleStack.Navigator>
  );
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 8,
  },
  button: {
    margin: 8,
  },
});