import React, {useState} from 'react';
import { useContext } from 'react';
import Idea from './idea';
import ListContext from './ideasContext';

function IdeasList() {
  const styles = { fontSize: 20 };
  const {contextListItems, setContextListItems} = useContext(ListContext);
  console.log({...contextListItems});
  const [autoSaveState, setAutoSaveState] = useState({saveOnOff: false, value: '' });

  const handleDelete = (idListItem) => {
    const newIdeasList = contextListItems.filter(i => i.id !== idListItem);
    setContextListItems(newIdeasList);
  }
  
  const newLocal = function (a, b) {
    return b.maturityLevel - a.maturityLevel;
  };
  
  const handleIncrement = (listItem) => {
    console.log(listItem);
    console.log(contextListItems);
    if(listItem.maturityLevel<=9)
    {
    const newIdeasList = contextListItems;
    const index = newIdeasList.indexOf(listItem);
    newIdeasList[index] = { ...listItem };
    newIdeasList[index].maturityLevel = newIdeasList[index].maturityLevel+1;
    newIdeasList.sort(newLocal);
    setAutoSaveState({saveOnOff: true, value: 'Saved: Increment'+ newIdeasList[index].maturityLevel });
    clearSaveState();
    setContextListItems(newIdeasList);
    }
  }

  const handleDecrement = (listItem) => {
    if(listItem.maturityLevel>=1)
    {
    const newIdeasList = contextListItems;
    const index = newIdeasList.indexOf(listItem);
    newIdeasList[index] = { ...listItem };
    newIdeasList[index].maturityLevel = newIdeasList[index].maturityLevel-1;
    newIdeasList.sort(newLocal);
    setAutoSaveState({saveOnOff: true, value: 'Saved: Decrement'+ newIdeasList[index].maturityLevel });
    clearSaveState();
    setContextListItems(newIdeasList);
    }
  }

  const handleNewAddition = () => {
    const newIdeasList = contextListItems;
    console.log(contextListItems.length);
    const newIdea =  {id: contextListItems.length+1, value: " ", maturityLevel: 1, tags:['Product']};
    newIdeasList.push(newIdea);
    console.log(newIdeasList);
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
