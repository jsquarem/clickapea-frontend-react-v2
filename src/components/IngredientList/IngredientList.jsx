import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

export default function IngredientList({ ingredientList }) {
  //const [ingredientState, setIngredientState] = useState(null);
  console.log(ingredientList, '<-ingredientList in ingredientList');

  const ingredientsTable = [];
  if (ingredientList.length > 0) {
    let row = '';
    for (let i = 0; i < ingredientList.length; i += 2) {
      row = (
        <tr key={i}>
          <td>{`${Math.round(ingredientList[i].amount * 100) / 100} ${
            ingredientList[i].unit
          } ${ingredientList[i].name}`}</td>
          {i + 1 < ingredientList.length ? (
            <td>{`${Math.round(ingredientList[i + 1].amount * 100) / 100} ${
              ingredientList[i + 1].unit
            } ${ingredientList[i + 1].name}`}</td>
          ) : (
            ''
          )}
        </tr>
      );
      ingredientsTable.push(row);
    }
  }
  return (
    <div className="col-12 mt-2">
      <h2 className="text-center">Ingredients</h2>
      <Table size="sm">
        <tbody>{ingredientsTable}</tbody>
      </Table>
    </div>
  );
}
