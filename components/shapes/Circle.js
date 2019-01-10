import React from 'react';
import { View, StyleSheet} from 'react-native';
//
// const styles = StyleSheet.create({
//
// })

export default class Circle extends React.Component {
    render() {
        return (
            <View style={this.props.style}/>
        )
    }
}