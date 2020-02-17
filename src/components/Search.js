import React from "react";

const Search = (props) => {
  const {searchValue, handleChange} = props

  return (
    <div className="pa4-l">
      <form className="bg-light-dark mw7 center pa1 br2-ns ba b--black-10">
        <fieldset className="cf bn ma0 pa0">
          <div className="cf">
            <input
              onChange={handleChange}
              className="f6 f5-l input-reset bn fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
              placeholder="Search By Name" type="text" name="name" value={searchValue}/>
            <button onClick={(e) => e.preventDefault()}
                    className="pv3  bn bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
                    type="submit">
              <i className="fas fa-search "/>
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  )
};

export default Search
