import React, { useState } from 'react';

function Budget() {
  const [budgets, setBudgets] = useState([
    { category: 'Food', allocated: 500, spent: 300 },
    { category: 'Utilities', allocated: 200, spent: 150 },
  ]);

  return (
    <div className="budget-container">
      <h2>Budget</h2>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Allocated</th>
            <th>Spent</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget, index) => (
            <tr key={index}>
              <td>{budget.category}</td>
              <td>{budget.allocated}</td>
              <td>{budget.spent}</td>
              <td>{budget.allocated - budget.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Budget;
