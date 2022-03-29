import React from "react";
import { useParams, Link } from "react-router-dom"
import { useContext } from 'react';
import ListContext from './ideasContext';

function IdeaEdit(props) {
    const ideaIndex = useParams();
    const {contextListItems, setContextListItems} = useContext(ListContext);
    const editableIdea = contextListItems[ideaIndex.id];
    const newLocal = function (a, b) {
        return b.maturityLevel - a.maturityLevel;
      };

    const handleSubmit = e => {
        e.preventDefault();
        const newIdeasList = contextListItems;
        newIdeasList[ideaIndex.id] = { ...editableIdea };
        newIdeasList[ideaIndex.id].maturityLevel = parseInt(e.target.exampleInput2.value);
        newIdeasList[ideaIndex.id].FullText = parseInt(e.target.exampleInput4.value);
        newIdeasList.sort(newLocal);
        console.log({...newIdeasList});
        setContextListItems(newIdeasList);
      };
    console.log('This is loading: '+ {...contextListItems});
    return (
        <React.Fragment>
        <form className="m-4" onSubmit={handleSubmit}>
             <div className='row'>
                <h1>{editableIdea.value + ': ' + ideaIndex.id}</h1>
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Idea summary</label>
                <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Enter email" defaultValue={editableIdea.value} />
            </div>
            <div className="form-group">
                <label for="exampleInput2">Maturity level of idea</label>
                <input type="text" className="form-control" id="exampleInput2" placeholder="Enter maturity level" defaultValue={editableIdea.maturityLevel} />
            </div>
            <div className="form-group">
                <label for="exampleInput3">Maturity level of idea</label>
                <input type="text" className="form-control" id="exampleInput3" placeholder="Enter Tags" defaultValue={editableIdea.tags} />
            </div>
            <div className="form-group">
                <label for="exampleInput4">Enter Context and validating proof of idea</label>
                <textarea type="textarea" className="form-control" id="exampleInput4" placeholder="Enter Context and validating proof of idea" defaultValue={editableIdea.FullText} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <Link to={`/`}>Back</Link>
        </React.Fragment>
      );
}
export default IdeaEdit;
