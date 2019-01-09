import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {fetchOfferedAssignments} from "../actions/offeredassignments";

const styles = StyleSheet.create({
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    button: {
        width: "50%"
    }
});


function mapDispatchToProps(dispatch) {
    return {
        fetchData: () => dispatch(fetchOfferedAssignments())
    }
};

function mapStateToProps(state) {

    console.log(state);
    return {
        data: state.offeredAssignments
    }
}


export class Dashboard extends React.Component {

    static propTypes = {
        fetchData: PropTypes.func.isRequired
    }


    render() {
        const assign  = this.props.data.map((d, i) => (
            <Text key={i}> {d.value} </Text>
        ))
        return (
                <View>
                    <Text> {assign} </Text>
                        <TouchableOpacity onPress={this.props.fetchData}>
                            <Text>Get Data!</Text>
                        </TouchableOpacity>
                </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)