import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Table, NavBar} from './components';
import _ from 'lodash'
import 'react-datepicker/dist/react-datepicker.css';
import Search from "./components/Search";
import moment from 'moment';

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
        const styledItems = res.data && res.data.map(item => {
          return {...item, class: 'normal'}
        });
      setItems(styledItems);
      setStaticItems(styledItems);
      })
      .catch(err => {
      console.log(err)
    })}, []);

  function handleBold(id) {
    let newItemsArray = [...items];
    newItemsArray[id].class = 'bold';
    setItems(newItemsArray)
  }

  function sortItems(e, currentColumn){
    e.preventDefault();
    const column = `${ currentColumn }Order`;
    let newOrder = Object.create({});

    // Minor: Have space between blocks e.g if statement or functions
    // This helps with the readability of the code.
    const columnState = {
      nameOrder:{class:'sort',sorted:false},
      priceOrder:{class:'sort',sorted:false},
      createdOrder:{class:'sort',sorted:false},
      quantityOrder:{class:'sort',sorted:false},
      lastModifiedOrder:{class:'sort',sorted:false}
    };

    // Major:  Do not mix types. For example, sorted is a boolean. Use that. Or converted it to a string
    // with three states, neutral, desc, asc. You can also use that to control the css table class.
    // Mixing types is the easiest way to shoot yourself in the foot.
    if (columns[column].sorted === 'desc'){
      setItems(_.orderBy(items, [currentColumn], ['asc']));
      newOrder[column] = {class: 'sort-down', sorted: 'asc'};
      const newState = {...columnState, ...newOrder};
      setColumnOrder(newState);
    }else {
      // Not sure why you did String(currentColumn)
      setItems(_.orderBy(items, [currentColumn], ['desc']));
      newOrder[column] = {class: 'sort-up', sorted: 'desc'};
      const newState = {...columnState, ...newOrder};
      setColumnOrder(newState);
    }
  }

  // Date in js is messed up. Use a library like moment which can make work way easier.

  // Use a consistent case e.f for functions, stick with one e.g camel case.
  function filterCreated(date) {
    setDefaultDate(moment(date).format('LL'));

    const filtered = staticItems.filter((dateCreated) => {
      return dateCreated.created <= moment(date).unix();
    });

    setItems(filtered)
  }

  // Name this as something like handleSearch or processSearch
  // Naming is important if you have to come look at the code in a few months time
  // Think of it as a form of documentation.
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
        handleBold={handleBold}
        options={{
          items,
          nameOrder,
          priceOrder,
          createdOrder,
          quantityOrder,
          lastModifiedOrder}}
        defaultDate={defaultDate}
        filterCreated={filterCreated}
      />
    </div>
  );
};

export default App;
