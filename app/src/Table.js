import React from "react";

import { prettyPrintComm } from "./util";

function Table({ countries, casesType = "cases" }) {
  return (
    <div className="table">
      {countries.map((country) => (
        <tr>
          <td>{country.country}</td>
          <td>
            <strong>{prettyPrintComm(country[casesType])}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
