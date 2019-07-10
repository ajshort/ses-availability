import React, { useState, Children } from 'react';
import {
  Button,
  Col,
  Container,
  CustomInput,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalProps,
  ButtonGroup,
} from 'reactstrap';
import Header from '../components/Header';

type StormAvailable = boolean | undefined;
type RescueAvailable = 'immediate' | 'support' | 'unavailable' | undefined;

const EditModal: React.FC<ModalProps> = (props) => {
  const [ui, setUI] = useState<'shifts' | 'times' | 'week'>('shifts');
  const [storm, setStorm] =  useState<StormAvailable>(undefined);
  const [rescue, setRescue] = useState<RescueAvailable>(undefined);
  const [note, setNote] = useState('');

  return (
    <Modal size="lg" {...props}>
      <ModalHeader toggle={props.toggle}>Edit Availability</ModalHeader>
      <ModalBody>
          <FormGroup row>
            <Label sm={3}>Enter availability for</Label>
            <Col sm={9}>
              <ButtonGroup>
                <Button
                  color="secondary"
                  outline={ui !== 'shifts'}
                  onClick={() => setUI('shifts')}
                >
                  Shifts
                </Button>
                <Button
                  color="secondary"
                  outline={ui !== 'times'}
                  onClick={() => setUI('times')}
                >
                  Specific times
                </Button>
                <Button
                  color="secondary"
                  outline={ui !== 'week'}
                  onClick={() => setUI('week')}
                >
                  All week
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Storm and support</Label>
            <Col sm={9}>
              <ButtonGroup>
                <Button
                  color="success"
                  outline={storm !== true}
                  onClick={() => setStorm(storm === true ? undefined : true)}
                >
                  Yes
                </Button>
                <Button
                  color="danger"
                  outline={storm !== false}
                  onClick={() => setStorm(storm === false ? undefined : false)}
                >
                  No
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label sm={3}>Rescue</Label>
            <Col sm={9}>
              <ButtonGroup>
                <Button
                  color="success"
                  outline={rescue !== 'immediate'}
                  onClick={() => setRescue(rescue === 'immediate' ? undefined : 'immediate')}
                >
                  Immediate
                </Button>
                <Button
                  color="warning"
                  outline={rescue !== 'support'}
                  onClick={() => setRescue(rescue === 'support' ? undefined : 'support')}
                >
                  Support
                </Button>
                <Button
                  color="danger"
                  outline={rescue !== 'unavailable'}
                  onClick={() => setRescue(rescue === 'unavailable' ? undefined : 'unavailable')}
                >
                  Unavailable
                </Button>
              </ButtonGroup>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="vehicle" sm={3}>Covering vehicle</Label>
            <Col sm={9}>
              <CustomInput
                type="select"
                id="vehicle"
                name="vehicle"
                disabled={rescue !== 'immediate' && rescue !== 'support'}
              >
                <option value="">none</option>
              </CustomInput>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="note" sm={3}>Additional note</Label>
            <Col sm={9}>
              <Input
                type="text"
                name="note"
                id="note"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </Col>
          </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">Save Availability</Button>
      </ModalFooter>
    </Modal>
  );
};

const Member: React.FC = () => {
  const [isEditing, setEditing] = useState(true);
  const toggleEditing = () => setEditing(!isEditing);

  return (
    <>
      <Header />
      <Container className="my-3">
        <h1>Member Name</h1>
        <p className="lead">Week of 1st July 2019</p>
      </Container>
      <EditModal isOpen={isEditing} toggle={toggleEditing} />
    </>
  );
};

export default Member;
