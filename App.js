/*All the necessary libraries I need in order to perform the actions
that I want to perform. */
import React, { useState, useEffect } from 'react';
import { Dimensions, Image, Button, Pressable, StyleSheet, SafeAreaView, StatusBar, FlatList, ScrollView, ImageBackground, View, Text, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { Video, AVPlaybackStatus, Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import Animated, { withSpring, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';


class IntroPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    },
      1000);
  }



  state = {
    mute: false,
    shouldPlay: false,
    paused: true,
  }

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay
    }));
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  }

  videoBuffer = (isBuffer) => {
    console.log(isBuffer)
    //here you could set the isBuffer value to the state and then do something with it
    //such as show a loading icon
  }

  render() {

    let display = this.state.showText ? this.props.text : 'Gang';
    const { width } = Dimensions.get('window');
    const mathVideo = require('./assets/1371847907.mp4');


    return (
      <View style={{ backgroundColor: 'coral', alignItems: 'center', flex: 1, fontSize: 40, justifyContent: 'center', fontFamily: 'Futura', textAlign: 'center' }}>
        <View style={{ flex: 2, backgroundColor: 'white' }}>
          <View style={{ flex: 3, backgroundColor: 'white' }}>
            <ImageBackground style={{ width: '100%', height: '100%', position: "absolute", bottom: 0 }} source={require('./assets/business_man_animate_dribbble.gif')} />
          </View>
          <View style={{ flex: 0.5 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 10 }}>{display}</Text>
          </View>
          <View>
            <Video
              source={mathVideo}
              style={{ width, height: 400 }}
              controls={true}
              onBuffer={this.videoBuffer}
              shouldPlay={this.state.shouldPlay}
              paused={this.state.paused}
              isMuted={this.state.mute}
              play
              ref={(ref) => {
                this.player = ref
              }} />
            <MaterialIcons style={styles.controlBar1}
              name={this.state.mute ? "volume-mute" : "volume-up"}
              size={45}
              color="white"
              onPress={this.handleVolume}
            />
            <MaterialIcons style={styles.controlBar2}
              name={this.state.shouldPlay ? "pause" : "play-arrow"}
              size={45}
              color="white"
              onPress={this.handlePlayAndPause}
            />
          </View>
        </View>
      </View>
    )
  }
}

const EXHELP = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Algebra 1',
    book: 'KhanAcademy.com'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Geometry',
    book: 'FreeMathHelp.com'

  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Algebra 2',
    book: 'MathPlanet.com'
  },
  {
    id: '58694a0f-2a21-471f-bd96-145571e29d72',
    name: 'Pre-Calculus',
    book: 'Chegg.com'
  },
  /* ...Expand on this list waaaaay more. Put images,
  actual urls, fetch other API's, alldat. */

];

/*Creates the way the data will be displayed such as borders and
what not. Also, links the subject and website to a valid value type
of string name and string book. */
const HelpInfo = ({ name, book }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{'Subject : ' + name}</Text>
    <Text style={styles.title}>{'Website : ' + book}</Text>
  </View>
);

const Steps = () => {
  function impactAsync(style) {
    switch (style) {
      default:
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        break;
    }
  }

  const renderItem = ({ item }) => (
    <HelpInfo name={item.name} book={item.book} />
  );

  /*Creates variable to allow me to create the plum border that 
  separates each item.*/
  const SeparatorComponent = () => {
    return <View style={styles.separatorLine} />
  }

  /*Allows me to put a header title explaining what the data list is
  for. */
  const HeaderComponent = () => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>GUIDE TO FINDING YOUR LOST ITEMS</Text>
      </View>
    );
  };

  /*Now I can actually implement the FlatList component and add extra
  props on top of data, renderItem, keyExtractor. One example that I 
  will end up adding is the renderItemSeparator to create borders for
  the data display.
  */
  return (
    <SafeAreaView>
      <ImageBackground style={{ flex: 1, width: '100%', height: '100%', position: "absolute", bottom: 0 }} source={require('./assets/location-3.gif')} />
      <TouchableOpacity onPress={() => impactAsync('heavy')}>
        <FlatList
          data={EXHELP}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

class FirstSug extends React.Component {

  state = {
    mute: false,
    shouldPlay: false,
    paused: true,
  }

  handlePlayAndPause = () => {
    this.setState((prevState) => ({
      shouldPlay: !prevState.shouldPlay
    }));
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,
    }));
  }

  videoBuffer = (isBuffer) => {
    console.log(isBuffer)
    //here you could set the isBuffer value to the state and then do something with it
    //such as show a loading icon
  }

  render() {

    const { width } = Dimensions.get('window');
    const mathVideo = require('./assets/1371847907.mp4');


    return (
      <View style={{ backgroundColor: 'coral', alignItems: 'center', flex: 1, fontSize: 40, justifyContent: 'center', fontFamily: 'Futura', textAlign: 'center' }}>
        <View style={{ flex: 2 }}>
          <ImageBackground style={{ width: '100%', height: '100%', position: "absolute", bottom: 0 }} source={require('./assets/giphy.gif')} />
          <View style={{ flex: 2 }}>
          </View>
          <Text style={styles.sectionTitle}> FINDING LOST ITEMS</Text>
          <View>
            <Video
              source={mathVideo}
              style={{ width, height: 400 }}
              controls={true}
              onBuffer={this.videoBuffer}
              shouldPlay={this.state.shouldPlay}
              paused={this.state.paused}
              isMuted={this.state.mute}
              play
              ref={(ref) => {
                this.player = ref
              }} />
            <MaterialIcons style={styles.controlBar1}
              name={this.state.mute ? "volume-mute" : "volume-up"}
              size={45}
              color="white"
              onPress={this.handleVolume}
            />
            <MaterialIcons style={styles.controlBar2}
              name={this.state.shouldPlay ? "pause" : "play-arrow"}
              size={45}
              color="white"
              onPress={this.handlePlayAndPause}
            />
          </View>
        </View>
      </View>
    )
  }
}

const Tab = createMaterialBottomTabNavigator();

//Stylesheet to make it easier to style some of the things in my code.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'flex-start',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: 'white',
    paddingTop: 2,
  },
  sectionContainer: {
    marginTop: 40,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    fontFamily: 'Chalkduster',
    color: 'black',
    textAlign: 'center',
  },

  sectionTitle2: {
    fontSize: 38,
    fontWeight: '600',
    color: 'black',
    fontFamily: 'Chalkduster',
    color: 'black',
    textAlign: 'center',
  },
  heavy: {
    color: '#ffffff',
    fontSize: 20,
    width: 300,
    height: 100,
    backgroundColor: 'red',
    marginVertical: 10,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
  nonsenseItem: {
    backgroundColor: 'red',
    margin: 8,
  },
  itemText: {
    backgroundColor: 'blue',
    fontSize: 20,
    padding: 20,
  },
  headerWrapper: {
    position: 'absolute',
    backgroundColor: 'red',
    height: 200,
    left: 0,
    right: 0,
  },

  listItem: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFF",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5
  },
  box: {
    marginVertical: 25,
    width: 100,
    height: 100,
    backgroundColor: 'aquamarine',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 350,
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlBar1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  controlBar2: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  }
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Intro') {
            iconName = focused ? 'md-videocam' : 'md-videocam-outline';
          } else if (route.name === 'Track') {
            iconName = focused ? 'grid' : 'grid-outline';
          }
          else if (route.name === 'Product') {
            iconName = focused ? 'scan' : 'scan-circle';
          }
          return <Ionicons name={iconName} size={20} color={'white'} />;
        },
      })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Intro" component={IntroPage} />
        <Tab.Screen name="Track" component={Steps} />
        <Tab.Screen name="Product" component={FirstSug} />

      </Tab.Navigator>
    </NavigationContainer>
  );
}
