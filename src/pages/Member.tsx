import React, { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
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
  Table,
} from 'reactstrap';
import { FaBolt, FaExclamationTriangle } from 'react-icons/fa';
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
            <Label for="note" sm={3}>Note</Label>
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
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!isEditing);

  return (
    <>
      <Header />
      <Container className="my-3">
        <div className="d-md-flex flex-md-row justify-content-md-between">
          <div>
            <h1>Member Name</h1>
            <p className="lead">Week of 1st July 2019</p>
          </div>
          <div className="mb-1">
            <Button color="primary" onClick={toggleEditing}>Edit Availability</Button>
          </div>
        </div>
        <Table className="member-availability">
          <thead>
            <tr>
              <th>Date</th>
              <th>0600 - 1200</th>
              <th>1200 - 1800</th>
              <th>1800 - 0600</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mon 1st July</td>
              <td className="table-secondary"></td>
              <td className="table-secondary"></td>
              <td></td>
            </tr>
            <tr>
              <td>Tue 2st July</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Wed 3st July</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Thu 4st July</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Fri 5th July</td>
              <td>
                <Badge color="success"><FaBolt /></Badge>
                <Badge color="warning"><FaExclamationTriangle /></Badge>
                <Badge color="success"><FaExclamationTriangle /> (WOL43)</Badge>
              </td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Sat 6th July</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Sun 7th July</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Mon 8th July</td>
              <td></td>
              <td></td>
              <td className="table-secondary"></td>
            </tr>
          </tbody>
        </Table>
      </Container>
      <EditModal isOpen={isEditing} toggle={toggleEditing} />
    </>
  );
};

export default Member;
