import React from "react";

import { prettyPrintComm } from "./util";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{prettyPrintComm(cases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
