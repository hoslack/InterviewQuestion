import React from "react";
import DatePicker from "react-datepicker";

const Table = (props) => {
  const {convertDate, defaultDate, FilterCreated,
    options: {items, nameOrder, priceOrder, createdOrder, quantityOrder, lastModifiedOrder}, onSortClick} = props;
  return (
    <div className="pa4 fs-normal">
      <div className="pb3 f6 w-100 mw8 center">
        <label className="pr2">Filter Created Before:</label>
        <DatePicker
          selected={new Date(defaultDate)}
          minTime={new Date('Feb 1, 2020')}
          maxTime={new Date('Feb 29, 2020')}
          onSelect={FilterCreated}
        />
      </div>
      <div className="overflow-auto">
        <table className="f6 w-100 mw8 center border-collapse">
          <thead>
          <tr className="stripe-dark">

            <th className="fw9 tl pa3 bg-white br10">Item
              <button className="ml1" onClick={e => onSortClick(e, 'name')}>
              <i className={`fas fa-${nameOrder.class}`}/>
            </button>
            </th>

            <th className="fw9 tl pa3 bg-white">Price
              <button className="ml1" onClick={e => onSortClick(e, 'price')}>
                <i className={`fas fa-${priceOrder.class}`}/>
              </button>
            </th>

            <th className="fw9 tl pa3 bg-white">Quantity
              <button className="ml1" onClick={e => onSortClick(e, 'quantity')}>
                <i className={`fas fa-${quantityOrder.class}`}/>
              </button>
            </th>

            <th className="fw9 tl pa3 bg-white">Created
              <button className="ml1" onClick={e => onSortClick(e, 'created')}>
                <i className={`fas fa-${createdOrder.class}`}/>
              </button>
            </th>

            <th className="fw9 tl pa3 bg-white">Last Modified
              <button className="ml1" onClick={e => onSortClick(e, 'lastModified')}>
                <i className={`fas fa-${lastModifiedOrder.class}`}/>
              </button>
            </th>

          </tr>
          </thead>
          <tbody className="lh-copy">
          {!(items === undefined || items.length === 0) && items.map(row => {
            return(
            <tr className="stripe-dark br3" key={row.name}>
              <td className="pa3 f5 br--left">{row.name}</td>
              <td className="pa3 f5 ">{row.price}</td>
              <td className="pa3 f5 ">{row.quantity}</td>
              <td className="pa3 f5 ">{convertDate(row.created, 'epoch').stringDate}</td>
              <td className="pa3 f5 br--right">{convertDate(row.lastModified, 'epoch').stringDate}</td>
            </tr>
          )})}
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Table

