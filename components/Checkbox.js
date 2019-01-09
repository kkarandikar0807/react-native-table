import PropTypes from "prop-types";
import React from 'react';
import { StyleSheet } from 'react-native';

// TODO - get some better assets, this looks terrible...
const CHECKED = '☑';
const UNCHECKED = '☐';


const styles = {
    checkBox: RX.Styles.createTextStyle({
        color: 'black',
        backgroundColor: 'white',
        fontSize: 16,
        paddingBottom: 0,
        marginBottom: 0
    }),
    checked: RX.Styles.createTextStyle({
        fontSize: 11,
        marginBottom: 5
    })
};

export default class Checkbox extends RX.Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    static propTypes = {
        isChecked: PropTypes.bool.isRequired,
        onChange: PropTypes.func
    };

    onChange() {
        // Wrapped for now in case we want to add metrics or something in the future
        if (this.props.onChange) {
            this.props.onChange(!this.props.isChecked);
        }
    }

    render() {
        const style = [styles.checkBox];
        if (this.props.isChecked) {
            style.push(styles.checked);
        }
        return (
            <RX.View onPress={this.onChange}>
                <RX.Text style={style}>{this.props.isChecked ? CHECKED : UNCHECKED}</RX.Text>
            </RX.View>
        );
    }
}