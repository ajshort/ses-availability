import React from 'react';
import { Alert, Col, Container, Card, CardHeader, Row } from 'reactstrap';

const Index: React.FC = () => (
  <Container className="my-3">
    <Alert color="info" fade={false}>
      Information about shift teams.
    </Alert>
    <Row>
      <Col md={6}>
        <Card>
          <CardHeader>Storm and Support</CardHeader>
        </Card>
      </Col>
      <Col md={6}>
        <Card>
          <CardHeader>Rescue</CardHeader>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Index;
