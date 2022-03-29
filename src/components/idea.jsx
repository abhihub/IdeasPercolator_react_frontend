import React from 'react';
import { Link } from 'react-router-dom';

function Idea(props) {
  const styles = { fontSize: 18, fontWeight: "Bold" }
  const stylesInput = { width: 350}

  return (
    <div className='row'>
        <input className='col-6' defaultValue={props.myitem.value} style={stylesInput} onBlur={(e) => props.onSubmitCounterItem(e, props.myitem)}></input>
        <label style={styles} className={formatCountStyle()}>{formatCount(props.myitem.maturityLevel)}</label>
        <button style={styles} className='col btn btn-secondary btn-sm m-2' onClick={() => props.onIncrement(props.myitem)}>+</button>
        <button style={styles} className='col btn btn-secondary btn-sm m-2' onClick={() => props.onDecrement(props.myitem)}>-</button>
        <button style={styles} className='col btn btn-sm m-2' onClick={() => props.onDelete(props.myitem.id)}>X</button>
        <Link style={styles} className='col m-2' to={`/idea/${props.myItemKey}`}>Edit context</Link>
        <label style={styles} className='col-2 m-2' >{props.myitem.tags}</label>
    </div>
  );
  function formatCount(maturityLevel){
      return maturityLevel ===0?'Zero':props.myitem.maturityLevel;
  }
  function formatCountStyle(){
      return props.myitem.maturityLevel ===0?'col badge badge-warning m-2':'badge m-2';
  }
}

export default Idea;
//{ <h1><img src={user.imageUrl} alt="random thing"></img></h1> ref={props.onInputValueHandler}}
// {/* <button className='btn btn-danger btn-sm m-2' onClick={() => props.onSubmitCounterItem}>Submit</button> */}