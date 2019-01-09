
import React, { PureComponent } from 'react';
import {
    StyleSheet, Text, View, ScrollView, FlatList,TouchableOpacity, Animated
} from 'react-native';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/FontAwesome';


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
    }

    _keyExtractor = (item, index) => index.toString();

    _leftHeadRender(leftTitles) {
        if (leftTitles.length === 0) {
            return null;
        }
        return (
            <View style={styles.firstCell}>
                {leftTitles.map((item, i) => (
                    <View key={`lhead${i}`} style={styles.cellView}>
                        <Text>{item["name"]}</Text>
                    </View>
                ))}
            </View>
        );
    }

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
                            <Text>{item["name"]}</Text>
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

    _leftRenderRow(rowData) {
        return (
            <View style={[styles.leftListRow,rowData.index%2 && styles.tableCellBackground]}>
                {Object.keys(rowData.item).map(key => (
                    <View key={`llist${key}`} style={styles.cellView}>
                        <Text>{rowData.item[key]}</Text>
                    </View>
                ))}
            </View>
        );
    }


    _rightRenderRow(rowData) {
        const dataKeys = this.props.dataKeys;
        const showProgressBarKeys = this.props.showProgressBarKeys;

        return (
            <View style={styles.rightListRow}>

                {(dataKeys !== undefined) && dataKeys.map((key, i) => (

                    <TouchableOpacity activeOpacity={0.5}
                                      key={`rlist${key}`}
                                      onPress={() => {
                                          this._onClickItemCell(rowData.item[key],rowData.index+1,i+1);
                                      }}>
                        <View  style={[styles.cellRightView, rowData.index%2 && styles.tableCellBackground]}>
                            {(showProgressBarKeys!=undefined && showProgressBarKeys.indexOf(key)>-1) &&
                            <Progress.Bar progress={rowData.item[key]/totalColumsProgress.get(key)} width={99} borderWidth={0} height={38} borderRadius={0} style={{position:'absolute'}} color={"#6495ED"}/>
                            }

                            <Text>{rowData.item[key]}</Text>
                        </View>
                    </TouchableOpacity>
                ))}


            </View>
        );
    }


    _onClickItemCell(value,row,column){
        this.props.onClickItemCell(value,row,column);
    }

    _onClickHeadItemCell(value,row,column){
        if(this.props.onClickHeadItemCell !== undefined)
            this.props.onClickHeadItemCell(value,row,column);
    }


    rightScroll(e) {
        const newScrollOffset = e.nativeEvent.contentOffset.y;
        leftFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
    }


    leftScroll(e) {
        const newScrollOffset = e.nativeEvent.contentOffset.y;
        rightFlat.scrollToOffset({ offset: newScrollOffset, animated: false });
    }

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
        //防止重复进入render
        if(list === undefined || list.length===0){
            return null;
        }
        const leftHead = this.props.head.slice(0, 1);
        const rightHead = this.props.head;

        const showProgressBarKeys = this.props.showProgressBarKeys;
        totalColumsProgress = new Map();



        const leftKey = this.props.leftKey;
        const leftList = [];
        const rightList = [];

        list.map((item, r) => {
            //是否统计该行的总数
            Object.keys(item).map((key, i) => {
                if (i === 0) {

                    rightList.push(item);
                }

            });
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
        backgroundColor: '#F5FCFF',
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
        borderColor: '#DCD7CD',
        backgroundColor:'#c1c1c1'
    },
    rightListRow: {
        width: '100%',
        flexDirection: 'row',
    },
    rightTitleListRow:{
        width: '100%',
        flexDirection: 'row',
        backgroundColor:'#c1c1c1'
    },
    cellView: {
        width: 150,
        height: 40,
        // backgroundColor: '#db384c',
        borderColor: '#DCD7CD',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cellRightView:{
        width: 150,
        height: 40,
        borderColor: '#DCD7CD',
        borderRightWidth: 1,
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableCellBackground:{
        backgroundColor: '#F7F6E7'
    },

    sortIconTransform:{
        marginLeft:3,
        // transform: [{rotate:'180deg'}]
    },
});