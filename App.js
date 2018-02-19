import React, { Component } from "react";
import {StyleSheet,Text,View,FlatList,TextInput,Button,TouchableOpacity,AsyncStorage} from "react-native";

let todos = [];

export default class TodoApp extends Component {
  constructor(props){
    super(props);
    this.state={
      text:'',
      Counter:0
    }
  }
  onChangeText = (text) => {
    this.setState({ text: text });
  };
  deleteTodo = (i) => {
    if(todos[i].key == 0){
      if(todos.length>1){
      todos.splice(i,1);
      this.setState({
        text:''
      });
    }else{
      todos = [];
      this.setState({
        text:''
      });
    }
  }else{
    todos.splice(i,1);
    this.setState({
      text:''
    });
  }
  ()=> Tasks.save(todos);
  }
  addTodos = () => {
    todos = todos.concat({ key: todos.length, text: this.state.text });
    this.setState({
      text: "",
      Counter:0
    });
    ()=>Tasks.save(todos);
  };
  showText = () =>{
    this.state.Counter == 0 ? this.setState({Counter:1}):this.setState({Counter:0});
  }
  componentDidMount(){
    Tasks.all(tasks => todos = tasks);
  }
  render() {
    var Counter = this.state.Counter;
    return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style = {styles.heading}>Todo App!</Text>
            <TouchableOpacity style={styles.AddButton} onPress={()=>this.showText()}><Text style={styles.ButtonText}>+</Text></TouchableOpacity>
          </View>
        <FlatList
          style={styles.list}
          data={todos}
          renderItem={({ item, index }) =>
            <View>
              <View style={styles.listItemCont}>
                <Text style={styles.listItem}>
                  {item.text}
                </Text>
                <Button title="X" onPress={()=>this.deleteTodo(index)} color="#6ed3cf" />
              </View>
              <View style={styles.hr} />
            </View>}
        />
          {Counter !== 0 ? (<TextInput
            style={styles.textInput}
            onChangeText={this.onChangeText}
            onSubmitEditing={this.addTodos}
            value={this.state.text}
            placeholder="Add Todos"
            autoFocus = {true}
          />):(null)}
        </View>
    );
  }
}
let Tasks = {
convertToArrayOfObject(tasks, callback) {
  return callback(
    tasks ? tasks.split("||").map((task, i) => ({ key: i, text: task })) : []
  );
},
convertToStringWithSeparators(tasks) {
  return tasks.map(task => task.text).join("||");
},
all(callback) {
  return AsyncStorage.getItem("TASKS", (err, tasks) =>
    this.convertToArrayOfObject(tasks, callback)
  );
},
save(tasks) {
  AsyncStorage.setItem("TASKS", this.convertToStringWithSeparators(tasks));
}
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e8f0"
  },
  header:{
    width:"101%",
    backgroundColor: "#9068be",
    height:60
  },
  heading:{
    color:"#FFF",
    fontSize:30,
    borderRadius: 10,
    alignSelf: 'flex-start',
    paddingTop: 20,
    marginLeft:110
  },
  list: {
    width: "100%"
  },
  listItem: {
    paddingTop: 2,
    paddingBottom: 2,
    fontSize: 18,
    width:"75%"
  },
  hr: {
    height: 1,
    backgroundColor: "gray"
  },
  listItemCont: {
    marginTop:10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e62739"
  },
  textInput: {
    height: 40,
    paddingRight: 10,
    paddingLeft: 10,
    borderColor: "gray",
    width: "100%",
    marginBottom:"80%"
  },
  AddButton:{
    borderRadius: 50,
    backgroundColor: "#9068be",
    width:30,
    height:30,
    alignSelf: 'flex-end',
    marginTop:-39,
    marginRight:10
  },
  ButtonText:{
    fontSize: 20,
    color:"#FFF",
    marginLeft:8,
    marginTop:3
  }
});
