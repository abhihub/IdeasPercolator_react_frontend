import React, {useState, useEffect} from 'react';
import { useContext } from 'react';
import Idea from './idea';
import ListContext from './ideasContext';
import axios from "axios";

function IdeasList() {
  const styles = { fontSize: 20 };
  const {contextListItems, setContextListItems} = useContext(ListContext);
  console.log({...contextListItems});
  const [autoSaveState, setAutoSaveState] = useState({saveOnOff: false, value: '' });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://127.0.0.1:8000/ideas");
      const ideasListJson = await response.data;
      setContextListItems(ideasListJson);
    }
    fetchData().catch(console.error);;
  }, [])

  const handleDelete = (idListItem) => {
    const newIdeasList = contextListItems.filter(i => i.id !== idListItem);
    setContextListItems(newIdeasList);
    const deletedIdea = contextListItems.find(i => i.id === idListItem);
    axios.delete("http://127.0.0.1:8000/idea/"+deletedIdea.id, deletedIdea);
  }
  
  const newLocal = function (a, b) {
    return b.maturityLevel - a.maturityLevel;
  };
  
  const handleIncrement = (listItem) => {
    if(listItem.maturityLevel<=9)
    {
    const newIdeasList = contextListItems;
    const index = newIdeasList.indexOf(listItem);
    newIdeasList[index] = { ...listItem };
    console.log(newIdeasList[index].maturityLevel+1);
    newIdeasList[index].maturityLevel = parseInt(newIdeasList[index].maturityLevel)+1;
    newIdeasList.sort(newLocal);
    setContextListItems(newIdeasList);
    //Send update to backend. Optimistic update. 
    axios.put("http://127.0.0.1:8000/idea", newIdeasList[index]);
    setAutoSaveState({saveOnOff: true, value: 'Saved: Increment'+ newIdeasList[index].maturityLevel });
    clearSaveState();
    }
  }

  const handleDecrement = (listItem) => {
    if(listItem.maturityLevel>=1)
    {
    const newIdeasList = contextListItems;
    const index = newIdeasList.indexOf(listItem);
    newIdeasList[index] = { ...listItem };
    newIdeasList[index].maturityLevel = parseInt(newIdeasList[index].maturityLevel)-1;
    newIdeasList.sort(newLocal);
    //Send update to backend. Optimistic update. 
    axios.put("http://127.0.0.1:8000/idea", newIdeasList[index]);
    setContextListItems(newIdeasList);
    setAutoSaveState({saveOnOff: true, value: 'Saved: Decrement'+ newIdeasList[index].maturityLevel });
    clearSaveState();
    }
  }

  const handleNewAddition = () => {
    const newIdeasList = contextListItems;
    const newIdea =  {id: contextListItems.length+1, value: " ", maturityLevel: 1, tags:'Product', "FullText": " "};
    const newIdeaJson =  JSON.stringify({value: " ", maturityLevel: "1", tags:'Product', FullText: " "});
    newIdeasList.push(newIdea);
    axios.post("http://127.0.0.1:8000/idea", newIdeaJson, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        'Content-Type': 'application/json'
      }});
    setContextListItems(newIdeasList);
    setAutoSaveState({saveOnOff: true, value: 'Saved: New Item'});
    clearSaveState();
  }

  const handleSubmitCounterItem = (e, myItem) => {
    if(contextListItems.find(item => item === myItem).value !== e.target.value)
    {
      const newIdeasList = contextListItems;
      const index = contextListItems.indexOf(myItem);
      newIdeasList[index] = { ...myItem };
      newIdeasList[index].value = e.target.value;
      setContextListItems(newIdeasList);
      console.log(newIdeasList[index]);
      //Send update to backend. Optimistic update. 
      axios.put("http://127.0.0.1:8000/idea", newIdeasList[index]);
      setAutoSaveState({saveOnOff: true, value: 'Saved: '+ newIdeasList[index].value });
      clearSaveState();
    }
  }

  function formatMyCount(maturityLevel){
    return maturityLevel ===0?'Zero':maturityLevel;
  }

  function formatCountStyle(maturityLevel){
      return maturityLevel ===0?'col-2 badge badge-warning m-2':'col-2 badge badge-primary m-2';
  }

  function formatVisibility(saveOnOff){
    return saveOnOff ===true?'visible':'hidden';
  }
  
  function clearSaveState(){
    setTimeout(() => {
      setAutoSaveState({saveOnOff: false, value: '' });
    }, 2000);
  } 

  return (
    <div>
      <div className='row m-2'>
        <button className=' col-2 btn btn-danger' onClick={handleNewAddition}>Add new item</button>
        <label style={styles} className={formatCountStyle(0)}>{'Total count: '+formatMyCount(contextListItems.length)}</label>
        <label style={{ visibility: formatVisibility(autoSaveState.saveOnOff)}} className='col-4 badge badge-warning m-2' >{autoSaveState.value}</label>
      </div>
      <ul> {contextListItems.map(myCounterItem => <Idea 
      key={myCounterItem.id} 
      myItemKey={contextListItems.indexOf(myCounterItem)} 
      myitem={myCounterItem} 
      onDelete={handleDelete} 
      onIncrement={handleIncrement} onDecrement={handleDecrement} 
      onSubmitCounterItem={handleSubmitCounterItem}/>)} 
      </ul>
  </div>
  );

}

export default IdeasList;
