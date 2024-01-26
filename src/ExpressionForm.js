// src/ExpressionForm.js
//anmol 
import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExpressionForm = () => {
  const [rules, setRules] = useState([
    { key: '', output: { value: '', operator: '>=', score: '' } },
  ]);
  const [combinator, setCombinator] = useState('and');

  const addExpression = () => {
    setRules([...rules, { key: '', output: { value: '', operator: '>=', score: '' } }]);
  };

  const deleteExpression = (index) => {
    const updatedRules = [...rules];
    updatedRules.splice(index, 1);
    setRules(updatedRules);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRules = [...rules];
    if (field.startsWith('output.')) {
      updatedRules[index].output[field.replace('output.', '')] = value;
    } else {
      updatedRules[index][field] = value;
    }
    setRules(updatedRules);
  };

  const handleCombinatorChange = (event) => {
    setCombinator(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const output = { rules, combinator };
    console.log(JSON.stringify(output, null, 2)); // Log the JSON structure
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="connectorType">
        <Form.Label>Connector Type</Form.Label>
        <Form.Control as="select" onChange={handleCombinatorChange} value={combinator}>
          <option value="and">AND</option>
          <option value="or">OR</option>
        </Form.Control>
      </Form.Group>

      {rules.map((rule, index) => (
        <div key={index}>
          <Form.Group controlId={`ruleKey${index}`}>
            <Form.Label>Rule Key</Form.Label>
            <Form.Control
              type="text"
              value={rule.key}
              onChange={(e) => handleInputChange(index, 'key', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={`ruleType${index}`}>
            <Form.Label>Rule Type</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => handleInputChange(index, 'output.value', e.target.value)}
            >
              <option value="age">Age</option>
              <option value="credit_score">Credit Score</option>
              <option value="account_balance">Account Balance</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId={`operator${index}`}>
            <Form.Label>Operator</Form.Label>
            <Form.Control
              as="select"
              value={rule.output.operator}
              onChange={(e) => handleInputChange(index, 'output.operator', e.target.value)}
            >
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
              <option value="=">{'='}</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId={`value${index}`}>
            <Form.Label>Value</Form.Label>
            <Form.Control
              type="text"
              value={rule.output.value}
              onChange={(e) => handleInputChange(index, 'output.value', e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId={`score${index}`}>
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="text"
              value={rule.output.score}
              onChange={(e) => handleInputChange(index, 'output.score', e.target.value)}
            />
          </Form.Group>

          <Button variant="danger" onClick={() => deleteExpression(index)}>
            Delete Expression
          </Button>
        </div>
      ))}

      <Button variant="primary" onClick={addExpression}>
        Add Expression
      </Button>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default ExpressionForm;
