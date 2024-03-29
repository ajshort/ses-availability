import React, { useState } from 'react';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';

const Index: React.FC = () => {
  const [number, setNumber] = useState(0);
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <Container className="login my-3">
      <Form>
        <FormGroup>
          <Label for="number">Member number</Label>
          <Input
            type="number"
            name="number"
            id="number"
            value={number !== 0 ? number.toString() : ''}
            onChange={e => setNumber(e.target.value ? e.target.valueAsNumber : 0)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormGroup>
        <FormGroup check className="mb-3">
          <Label check>
            <Input
              type="checkbox"
              name="remember"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            Remember me?
          </Label>
        </FormGroup>
        <Button type="submit" color="primary" block>Log In</Button>
      </Form>
    </Container>
  );
};

export default Index;
