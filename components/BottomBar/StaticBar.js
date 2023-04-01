import * as React from "react";
import {
  View, StyleSheet, Text, TouchableWithoutFeedback, Animated, Dimensions,
} from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get("window");


export default class StaticTabbar extends React.PureComponent {
  values = [];
  name = "";
  tabs = [];
  value = "";

  constructor(props) {
    super(props);
    const { tabs } = this.props;
    this.values = tabs.map((tab, index) => new Animated.Value(index === 0 ? 1 : 0));
  }


  render() {
   
    const { tabs, value } = this.props;
    const { state, descriptors, navigation } = this.props
    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
      return null;
    }

    return (
      <View style={styles.container}>
        {
          state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const tabOption = tabs[index];

            const tabWidth = width / tabs.length;
            const cursor = tabWidth * index;
            const opacity = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
              outputRange: [1, 0, 1],
              extrapolate: "clamp",
            });
            const translateY = this.values[index].interpolate({
              inputRange: [0, 1],
              outputRange: [64, 0],
              extrapolate: "clamp",
            });
            const opacity1 = this.values[index].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            });

            const isFocused = state.index === index;

            const onPress = (index) => {
              //const { value, tabs } = this.props;
              //const tabWidth = width / tabs.length;
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }

              Animated.sequence([
                Animated.parallel(
                  this.values.map(v => Animated.timing(v, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: true,
                  })),
                ),
                Animated.parallel([
                  Animated.spring(value, {
                    toValue: tabWidth * index,
                    useNativeDriver: true,
                  }),
                  Animated.spring(this.values[index], {
                    toValue: 1,
                    useNativeDriver: true,
                  }),
                ]),
              ]).start();
            }
            const key = index;
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => onPress(index)}>
                  <Animated.View style={[styles.tab, { opacity }]}>
                    <Icon name={tabOption.name} color="white" size={28} />
                    <Text style={{ fontSize: 11, color: 'white' }}>{tabOption.text}</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -7,
                    left: tabWidth * index,
                    width: tabWidth,
                    height: 64,   // Tab bar height
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: opacity1,
                    transform: [{ translateY }],
                  }}
                >
                  <View style={styles.activeIcon}>
                    <Icon name={tabOption.name} color="#004c40" size={25} />
                  </View>
                </Animated.View>
              </React.Fragment>
            )
          })
          /*
          tabs.map((tab, key) => {
            const tabWidth = width / tabs.length;
            const cursor = tabWidth * key;
            const opacity = value.interpolate({
              inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
              outputRange: [1, 0, 1],
              extrapolate: "clamp",
            });
            const translateY = this.values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [64, 0],
              extrapolate: "clamp",
            });
            const opacity1 = this.values[key].interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
              extrapolate: "clamp",
            });
            return (
              <React.Fragment {...{ key }}>
                <TouchableWithoutFeedback onPress={() => onPress(key)}>
                  <Animated.View style={[styles.tab, { opacity }]}>    
                    <Icon name={tab.name} color="white" size={28} />
                    <Text style={{fontSize:11, color:'white'}}>{tab.text}</Text>
                  </Animated.View>
                </TouchableWithoutFeedback>
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -7,
                    left: tabWidth * key,
                    width: tabWidth,
                    height: 64,   // Tab bar height
                    justifyContent: "center",
                    alignItems: "center",
                    opacity: opacity1,
                    transform: [{ translateY }],
                  }}
                >
                  <View style={styles.activeIcon}>
                    <Icon name={tab.name} color="#004c40" size={25} />
                  </View>
                </Animated.View>
              </React.Fragment>
            );
          })
          */
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 62, // Location of icons from top border of view
  },
  activeIcon: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
