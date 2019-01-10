import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DataTable from './DataTable';


export class TableComp extends Component {



    constructor(props) {
        super(props);
        this.state = {
            tableData :[
                {
                    isChecked: true,
                    testingType: ['blood', 'urine'],
                    testingWindow: "1/1/19 - 3/30/19",
                    athlete: "Chris A",
                    sport: "Mixed Martial Arts",
                    location: "New York, NY",
                    coordinator: "Brandon Buchanan"
                },
                {
                    isChecked: true,
                    testingType: ['blood', 'urine'],
                    testingWindow: "1/1/19 - 3/30/19",
                    athlete: "Chris C",
                    sport: "Mixed Martial Arts",
                    location: "Denver, CO",
                    coordinator: "Brandon Buchanan"
                },
                {
                    isChecked: true,
                    testingType: ['blood', 'urine'],
                    testingWindow: "1/1/19 - 3/30/19",
                    athlete: "Jesse G",
                    sport: "UFC",
                    location: "Colorado Springs, CO",
                    coordinator: "Brandon Buchanan"
                },
                {
                    isChecked: true,
                    testingType: ['blood', 'urine'],
                    testingWindow: "1/1/19 - 3/30/19",
                    athlete: "Kaushik K",
                    sport: "Mixed Martial Arts",
                    location: "Centinnal, CO",
                    coordinator: "Brandon Buchanan"
                }],
            tableHead: [
                {
                    name: "checkbox"
                },
                {
                    name: "Testing Type"
                },
                {
                    name:"Testing Window"
                },
                {
                    name:"Athlete",
                    sort:"desc"
                },
                {
                    name:"Sport"
                },
                {
                    name:"Location"
                },
                {
                    name:"Coordinator"
                }
            ]
        }
    }

    render() {

        return (
            <View style={styles.container}>
                {/*<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>*/}
                    {/*<Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>*/}
                    {/*<Rows data={state.tableData} textStyle={styles.text}/>*/}
                {/*</Table>*/}

                <DataTable
                    head={this.state.tableHead}
                    list={this.state.tableData}
                    dataKeys={['isChecked', 'testingType', 'testingWindow','athlete','sport','location','coordinator']}

                    onClickItemCell={(item,row, column) =>{

                        // console.log(item,row,column);
                    }}
                    onClickHeadItemCell={(item,row, column, headerCheckbox) =>{
                        // this.state.tableData.forEach(d => {
                        //     d.isChecked = headerCheckbox;
                        // })
                        // this.setState({
                        //     tableData: this.state.tableData
                        // })
                        console.log('header', headerCheckbox);

                    }}
                />
                <Text> Hello </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff', width: "100%" },
    head: { backgroundColor: '#f1f8ff', width: "100%" },
    text: { margin: 6 }
});


export default TableComp;