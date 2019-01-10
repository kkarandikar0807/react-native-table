import React from 'react';
import { View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    circle: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'red'
    }
})

export default class Circle extends React.Component {
    render() {
        return (
            <View style={styles.circle}/>
        )
    }
}