import React from "react";

import { prettyPrintComm } from "./util";

function Table({ countries, casesType = "cases" }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map((country) => (
            <tr key={country.country}>
              <td>{country.country}</td>
              <td>
                <strong>{prettyPrintComm(country[casesType])}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
