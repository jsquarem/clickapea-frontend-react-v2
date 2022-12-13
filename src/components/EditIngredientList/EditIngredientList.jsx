import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { Form } from 'react-bootstrap';
import { PencilSquare, Check2Square } from 'react-bootstrap-icons';
import { useEffect } from 'react';

export default function EditIngredientList({
  ingredientList,
  editIngredients,
  handleEditIngredientsToggle,
  handleIngredientChange
}) {
  console.log(ingredientList, '<-ingredientList');

  const ingredientsTable = [];

  if (ingredientList.length > 0) {
    for (let i = 0; i < ingredientList.length; i += 2) {
      const row = (
        <tr key={i}>
          <td className="col-6">
            {editIngredients ? (
              <div className="row">
                <div className="col-2">
                  <Form.Control
                    type="text"
                    name={`ingedient-${i}-amount`}
                    value={Math.round(ingredientList[i].amount * 100) / 100}
                    onChange={handleIngredientChange}
                  />
                </div>
                <div className="col-2">
                  <Form.Control
                    type="text"
                    name={`ingedient-${i}-unit`}
                    value={ingredientList[i].unit}
                    onChange={handleIngredientChange}
                  />
                </div>
                <div className="col-4">
                  <Form.Control
                    type="text"
                    name={`ingedient-${i}-name`}
                    value={ingredientList[i].name}
                    onChange={handleIngredientChange}
                  />
                </div>
                <div className="col-4">{ingredientList[i].original}</div>
              </div>
            ) : (
              `${Math.round(ingredientList[i].amount * 100) / 100} ${
                ingredientList[i].unit
              } ${ingredientList[i].name}`
            )}
          </td>
          {i + 1 < ingredientList.length ? (
            <td>
              {editIngredients ? (
                <div className="row">
                  <div className="col-2">
                    <Form.Control
                      type="number"
                      name={`ingedient-${i + 1}-amount`}
                      value={
                        Math.round(ingredientList[i + 1].amount * 100) / 100
                      }
                      onChange={handleIngredientChange}
                    />
                  </div>
                  <div className="col-2">
                    <Form.Control
                      type="text"
                      name={`ingedient-${i + 1}-unit`}
                      value={ingredientList[i + 1].unit}
                      onChange={handleIngredientChange}
                    />
                  </div>
                  <div className="col-4">
                    <Form.Control
                      type="text"
                      name={`ingedient-${i + 1}-name`}
                      value={ingredientList[i + 1].name}
                      onChange={handleIngredientChange}
                    />
                  </div>
                  <div className="col-4">{ingredientList[i + 1].original}</div>
                </div>
              ) : (
                `${Math.round(ingredientList[i + 1].amount * 100) / 100} ${
                  ingredientList[i + 1].unit
                } ${ingredientList[i + 1].name}`
              )}
            </td>
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
      <h2 className="text-center">
        Ingredients{' '}
        {editIngredients ? (
          <Check2Square onClick={handleEditIngredientsToggle} />
        ) : (
          <PencilSquare onClick={handleEditIngredientsToggle} />
        )}
      </h2>

      <Table size="sm">
        <tbody>
          {editIngredients ? (
            <tr className="text-center">
              <th>
                <div className="row">
                  <div className="col-2">Amount</div>
                  <div className="col-2">Unit</div>
                  <div className="col-4">Name</div>
                  <div className="col-4">Original Text</div>
                </div>
              </th>
              <th>
                <div className="row">
                  <div className="col-2">Amount</div>
                  <div className="col-2">Unit</div>
                  <div className="col-4">Name</div>
                  <div className="col-4">Original Text</div>
                </div>
              </th>
            </tr>
          ) : (
            ''
          )}
          {ingredientsTable}
        </tbody>
      </Table>
    </div>
  );
}
