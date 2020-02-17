import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, NavBar} from './components';
import _ from 'lodash'
import 'react-datepicker/dist/react-datepicker.css';
import Search from "./components/Search";

const App = () => {
  let initialState = {class: 'sort', sorted: false};
  let [searchValue, setSearch] = useState('');
  let [staticItems, setStaticItems] = useState([]);
  let [items, setItems] = useState([]);
  let [defaultDate, setDefaultDate] = useState('Feb 15, 2020')
  let [columns, setColumnOrder] = useState({
    nameOrder: initialState,
    priceOrder: initialState,
    createdOrder: initialState,
    quantityOrder: initialState,
    lastModifiedOrder: initialState
  });
  let {nameOrder, priceOrder, createdOrder, quantityOrder, lastModifiedOrder} =  columns;

  useEffect( () => {
    axios.get(process.env.REACT_APP_MAIN_URL)
      .then(res => {
      setItems(res.data);
      setStaticItems(res.data);
      })
      .catch(err => {
      console.log(err)
    })}, []);

  function sortItems(e, currentColumn){
    e.preventDefault();
    const column = currentColumn+'Order';
    let newOrder = Object.create({});
    const columnState = {
      nameOrder:{class:'sort',sorted:false},
      priceOrder:{class:'sort',sorted:false},
      createdOrder:{class:'sort',sorted:false},
      quantityOrder:{class:'sort',sorted:false},
      lastModifiedOrder:{class:'sort',sorted:false}
    };
    if (columns[column].sorted===false || columns[column].sorted==='desc'){
      setItems(_.orderBy(items, [String(currentColumn)], ['asc']));
      newOrder[column] = {class: 'sort-down', sorted: 'asc'};
      const newState = {...columnState, ...newOrder};
      setColumnOrder(newState);
    }else {
      setItems(_.orderBy(items, [String(currentColumn)], ['desc']));
      newOrder[column] = {class: 'sort-up', sorted: 'desc'};
      const newState = {...columnState, ...newOrder};
      setColumnOrder(newState);
    }
  }
  function convertDate(rawDate, type) {
    let date;
    if (type==='epoch'){
     date = new Date(Number(rawDate.toString()+'000'))
    }
    else { date = new Date(rawDate)}
    return {
      stringDate :date.toLocaleDateString('en', {
      day : 'numeric',
      month : 'short',
      year : 'numeric'
    }), numDate: date
    }
  }
  function FilterCreated(date) {
    setDefaultDate(convertDate(date).stringDate);
    const filtered = staticItems.filter((dateCreated) => {
      return convertDate(dateCreated.created, 'epoch').numDate <= convertDate(date).numDate});
    setItems(filtered)
  }
  function handleChange(e) {
    setSearch(e.target.value);
    const searchResult = staticItems.filter(item => {
      return item.name.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setItems(searchResult)
  }
  return (
    <div>
      <NavBar/>
      <Search
        searchValue={searchValue}
        handleChange={handleChange}
      />
      <Table
        onSortClick={sortItems}
        options={{
          items,
          nameOrder,
          priceOrder,
          createdOrder,
          quantityOrder,
          lastModifiedOrder}}
        convertDate={convertDate}
        defaultDate={defaultDate}
        FilterCreated={FilterCreated}
      />
    </div>
  );
};

export default App;
