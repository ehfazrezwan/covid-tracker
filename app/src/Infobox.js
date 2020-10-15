import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

function Infobox({ title, cases, total }) {
  return (
    <Card className="infoBox">
      <CardContent>
        {/* Title */}
        <Typography color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        {/* No. of cases  */}
        <h2 className="infoBox__cases">{cases}</h2>
        {/* Totals  */}
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Infobox;
