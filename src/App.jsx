import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import IdeasList from './components/ideasList';
import IdeaEdit from './components/ideaEdit';
import IdeasContext from './components/ideasContext';

function App() {
    const [contextListItems, setContextListItems] = useState([]);

    return(
        <React.StrictMode>
        <IdeasContext.Provider value={{contextListItems, setContextListItems}}>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<IdeasList />} />
                <Route path="/idea/:id" element={<IdeaEdit />} />
            </Routes>
        </BrowserRouter>
        </IdeasContext.Provider>
        </React.StrictMode>
    )
}

export default App;



// const initialList = ([
//     {id: 1, value: "Stripe of Distributed systems", maturityLevel: 4, tags:['Product'], FullText:""},
//     {id: 2, value: "Gmail/Email whitelister extension", maturityLevel: 4, tags:['Product'], FullText:""},
//     {id: 3, value: "Metrics for government", maturityLevel: 4, tags:['Product'], FullText:""},
//     {id: 4, value: "BYO Relegion", maturityLevel: 1, tags:['Product'], FullText:""},
//     {id: 5, value: "How should a modern tech based govt run", maturityLevel: 1, tags:['Question', 'Product'], FullText:""},
//     {id: 6, value: "Game -  green your city", maturityLevel: 1, tags:['Product'], FullText:""}
// ]
// );