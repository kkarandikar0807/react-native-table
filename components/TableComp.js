import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import DataTable from './DataTable';




export class TableComp extends Component {



    constructor(props) {
        super(props);
        this.state = {
            tableDatas :[{
                line1: "1/1/19 - 3/30/19",
                line2: "John Smith",
                line3: "Mixed Martial Arts",
                line4: "Denver, CO",
                line5: "Brandon Buchanan/ Ext. 2205"
            },
                {
                    line1: "1/1/19 - 3/30/19",
                    line2: "John Smith",
                    line3: "Mixed Martial Arts",
                    line4: "Denver, CO",
                    line5: "Brandon Buchanan/ Ext. 2205"
                },
                {
                    line1: "1/1/19 - 3/30/19",
                    line2: "John Smith",
                    line3: "Mixed Martial Arts",
                    line4: "Denver, CO",
                    line5: "Brandon Buchanan/ Ext. 2205"
                },
                {line1: "1/1/19 - 3/30/19",
                    line2: "John Smith",
                    line3: "Mixed Martial Arts",
                    line4: "Denver, CO",
                    line5: "Brandon Buchanan/ Ext. 2205"
                }],
            tableHead: ['Testing Window', 'Athlete', 'Sport', 'Location', 'Coordinator/Phone Number'],
            tableData: [
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205'],
                ['1/1/19 - 3/30/19', 'John Smith', 'Mixed Martial Arts', 'Denver, CO', 'Brandon Buchanan/ Ext. 2205']
            ]
        }
    }

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                {/*<Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}}>*/}
                    {/*<Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>*/}
                    {/*<Rows data={state.tableData} textStyle={styles.text}/>*/}
                {/*</Table>*/}

                <DataTable
                    head={[{name:"Testing Window"}, {name:"Athlete",sort:"desc"}, {name:"Sport",sort:"desc"}, {name:"Location"}, {name:"Coordinator/Phone Number"}]} //顶部表头数据  Array 格式举个🌰 [{name:'金额(万)',sort:'desc'},{name:'预算(万)'}]  name为表头显示名称；sort为排序方式,不传不排序  [数组] [必传]
                    list={this.state.tableDatas} //表格数据 [Array]  [必传]
                    dataKeys={['line1','line2','line3','line4','line5']} //表格中需要展示的列属性key，依次按照先后顺序展示  [必传，不传默认显示全部]
                    onClickItemCell={(item,row, column) =>{//点击右侧单元格的事件，事件回调返回行row，列column，以及点击内容 [function] [可选]
                        //事件处理
                        console.log(item,row,column);
                    }}
                    onClickHeadItemCell={(item,row, column) =>{//点击表头头部单元格的事件，事件回调返回行row，列column，以及点击内容 [function] [可选]
                        //事件处理
                        console.log(item,row,column);
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