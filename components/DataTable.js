
import React, { PureComponent } from 'react';
import {
    StyleSheet, Text, View, ScrollView, FlatList,TouchableOpacity, Animated, Image
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
// import CheckBox from 'react-native-checkbox';
import Checkbox from 'react-native-custom-checkbox';
import Circle  from './shapes/Circle';



let leftFlat = null;

let rightFlat = null;

let totalColumsProgress = null;

export default class DataTable extends PureComponent {
    static propTypes= {

        head: PropTypes.array,

        list: PropTypes.array,

        dataKeys:PropTypes.array,

        leftKey:PropTypes.string,

        showProgressBarKeys:PropTypes.array,

        unstatisticsRows:PropTypes.array,

        onClickItemCell:PropTypes.func,

        onClickHeadItemCell:PropTypes.func,
    };
    constructor(props){
        super(props);
        this.state = {
            headerCheckbox: false
        }
    }
    rightdata = [];
    _keyExtractor = (item, index) => index.toString();

    // _leftHeadRender(leftTitles) {
    //     if (leftTitles.length === 0) {
    //         return null;
    //     }
    //     return (
    //         <View style={styles.firstCell}>
    //             {leftTitles.map((item, i) => (
    //                 <View key={`lhead${i}`} style={styles.cellView}>
    //                     <Text>{item["name"]}</Text>
    //                 </View>
    //             ))}
    //         </View>
    //     );
    // }

    _rightHeadRender(rightTitles) {
        if (rightTitles.length === 0) {
            return null;
        }

        return (
            <View style={styles.rightTitleListRow}>
                {rightTitles.map((item, i) => (

                    <TouchableOpacity activeOpacity={0.5}
                                      key={`rhead${i}`}
                                      onPress={() => {
                                          let sort = item["sort"];
                                          if(sort !== undefined && sort !== ''){
                                              sort = (item["sort"]==='desc' ? "asc":"desc");
                                              this.props.head[i]["sort"] = sort;
                                              this._sortDataListByColumn(i,sort);
                                              this.setState({
                                                  sort:new Date().getTime(),
                                              });
                                          }

                                          this._onClickHeadItemCell(item,0,i);
                                      }}>
                        <View  style={styles.cellView}>

                            {
                                item["name"] === 'checkbox' ? <Checkbox
                                        style={styles.checkbox}
                                        checked={this.state.headerCheckbox}
                                        onChange={(name, checked) => {
                                            this.props.list.forEach(l => {
                                                l.isChecked = checked
                                            });
                                            this.setState({
                                                headerCheckbox: checked
                                            });
                                            console.log(this.props.list)
                                        }}
                                    />
                                    : null

                            }



                            <Text>{item["name"] === 'checkbox' ? null : item["name"]}</Text>
                            {
                                item["sort"]!==undefined &&
                                <Icon name={item["sort"]==='desc'?"caret-down":"caret-up"} size={20} style={styles.sortIconTransform}/>
                            }

                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    }

    // _leftRenderRow(rowData) {
    //     return (
    //         <View style={[styles.leftListRow,rowData.index%2 && styles.tableCellBackground]}>
    //             {Object.keys(rowData.item).map(key => (
    //                 <View key={`llist${key}`} style={styles.cellView}>
    //                     <Text>{rowData.item[key]}</Text>
    //                 </View>
    //             ))}
    //         </View>
    //     );
    // }


    determineTableData(key, rowData) {
                    switch (key) {
                        case "testingType":
                           if ((rowData.item[key].includes('blood') && rowData.item[key].includes('urine'))) {
                               return(
                                   <Image style={{width: 20, height: 20}} source={require('../assets/urine_blood.png')}/>
                               )
                           } else if ((rowData.item[key].includes('urine'))) {
                                       return(
                                           <Image style={{width: 20, height: 20}} source={require('../assets/urine.png')}/>
                                       )
                           } else if ((rowData.item[key].includes('blood'))) {
                                       return (
                                           <Image style={{width: 20, height: 20}} source={require('../assets/blood.jpg')}/>
                                       )
                           } else {
                                               return null;
                           }
                        case "isChecked":
                            return (
                                <Checkbox
                                    style={styles.checkbox}
                                    checked={rowData.item[key]}
                                    onChange={(name, checked) => {
                                        rowData.item[key] = !rowData.item[key];
                                    }
                                    }
                                />
                            )
                        default:
                            return (
                                <Text>{rowData.item[key]}</Text>
                            )

                    }
    }

    _rightRenderRow(rowData) {
        // console.log('logging row data: - ', rowData);
        const dataKeys = this.props.dataKeys;

        return (
            <View style={styles.rightListRow}>

                {(dataKeys !== undefined) && dataKeys.map((key, i) => (
                    <TouchableOpacity activeOpacity={0.5}
                                      key={`rlist${key}`}
                                      onPress={() => {
                                          this._onClickItemCell(rowData.item[key],rowData.index+1,i+1);
                                      }}>
                        <View  style={[styles.cellRightView, styles.tableCellBackground]}>
                            {this.determineTableData(key, rowData)}
                        </View>
                    </TouchableOpacity>
                ))}


            </View>
        );
    }


    _onClickItemCell(value,row,column){
        this.props.onClickItemCell(value,row,column);
    }

    _onClickHeadItemCell(value,row,column, headerCheckbox){
        if(this.props.onClickHeadItemCell !== undefined)
            this.props.onClickHeadItemCell(value,row,column, headerCheckbox);
    }


    rightScroll(e) {
        const newScrollOffset = e.nativeEvent.contentOffset.y;
        leftFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
    }


    // leftScroll(e) {
    //     const newScrollOffset = e.nativeEvent.contentOffset.y;
    //     rightFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
    // }

    _sortDataListByColumn(column,sort){

        const list = this.props.list;
        let columnName = this.props.dataKeys[column];
        list.sort(function(a,b){

            if(sort === 'desc'){

                return (b[columnName].toLowerCase() > a[columnName].toLowerCase()) ? 1 : -1;
            }else{
                return (a[columnName].toLowerCase()-b[columnName].toLowerCase()) ? 1 : -1;
            }

        });
    }

    render() {
        const list = this.props.list;

        if(list === undefined || list.length===0){
            return null;
        }
        const rightHead = this.props.head;

        totalColumsProgress = new Map();



        const leftList = [];
        const rightList = [];

        list.map((item, r) => {

            Object.keys(item).map((key, i) => {
                if (i === 0) {
                    rightList.push(item);
                }
            });
            this.rightdata = rightList;
        });


        return (
            <View style={styles.container}>
                <View style={styles.left}>

                    <FlatList
                        ref={ref => leftFlat = ref}
                        data={leftList}
                        renderItem={item => this._leftRenderRow(item)}
                        keyExtractor={this._keyExtractor}
                        scrollEnabled={false}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
                    <View style={styles.right}>
                        {this._rightHeadRender(rightHead)}
                        <FlatList
                            ref={ref => rightFlat = ref}
                            data={rightList}
                            renderItem={item => this._rightRenderRow(item)}
                            onScroll={e => this.rightScroll(e)}
                            scrollEventThrottle={1}
                            keyExtractor={this._keyExtractor}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        // marginTop: 20,
        flex: 1,
        width: "100%",
        backgroundColor: 'white',
    },
    left: {
        // backgroundColor: 'yellow',
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    right: {
        backgroundColor: 'white',
    },

    leftListRow: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#DCD7CD',
    },

    firstCell: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        backgroundColor:'#C8C8C8'
    },
    rightListRow: {
        width: '100%',
        flexDirection: 'row',
    },
    rightTitleListRow:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'#E8E8E8'
    },
    cellView: {
        width: 142,
        height: 30,
        // backgroundColor: '#db384c',
        borderColor: 'white',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellRightView:{
        width: 142,
        // marginRight: 20,
        height: 30,
        borderColor: 'white',

        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellBackground:{
        backgroundColor: 'white'
    },

    sortIconTransform:{
        marginLeft:3,
        // transform: [{rotate:'180deg'}]
    },
    checkbox: {
        backgroundColor: 'white',
        color:'black'
    },
    circleRed: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'red'
    },
    circleBlue: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'blue'
    }
});