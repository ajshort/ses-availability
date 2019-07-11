import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';
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
  Row,
  Table,
} from 'reactstrap';

interface ShiftsTableProps {
  days: Array<{ date: Moment }>;
  shifts: Array<{ label: string; }>;
}

const ShiftsTable: React.FC<ShiftsTableProps> = ({ days, shifts }) => (
  <Table className="shifts-select-table">
    <thead>
      <tr>
        <th />
        {days.map(({ date }) => (
          <th key={date.unix()}>
            {date.format('ddd D/M')}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {shifts.map(shift => (
        <tr key={shift.label}>
          <th>{shift.label}</th>
          {days.map(({ date }) => (
            <th key={date.unix()}>
              <Label check>
                <input type="checkbox" />
              </Label>
            </th>
          ))}
        </tr>
      ))}
    </tbody>
  </Table>
);

const TimesTable: React.FC = () => (
  <Table>
    <thead>
      <tr>
        <th>From</th>
        <th>To</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><Input type="datetime-local" /></td>
        <td><Input type="datetime-local" /></td>
        <td><Button color="danger"><FaMinus /></Button></td>
      </tr>
      <tr>
        <td><Input type="datetime-local" /></td>
        <td><Input type="datetime-local" /></td>
        <td><Button color="danger"><FaMinus /></Button></td>
      </tr>
    </tbody>
  </Table>
);

type StormAvailable = 'available' | 'unavailable' | undefined;
type RescueAvailable = 'immediate' | 'support' | 'unavailable' | undefined;

const EditModal: React.FC<ModalProps> = (props) => {
  const [ui, setUI] = useState<'shifts' | 'times' | 'week'>('shifts');
  const [storm, setStorm] =  useState<StormAvailable>(undefined);
  const [rescue, setRescue] = useState<RescueAvailable>(undefined);
  const [note, setNote] = useState('');

  return (
    <Modal size="xl" {...props}>
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
          {ui === 'shifts' && (
            <Row>
              <Col sm={9} className="offset-sm-3">
                <ShiftsTable days={props.days} shifts={props.shifts} />
              </Col>
            </Row>
          )}
          {ui === 'times' && (
            <Row>
              <Col sm={9} className="offset-sm-3">
                <TimesTable />
              </Col>
            </Row>
          )}
          <FormGroup row>
            <Label sm={3}>Storm and support</Label>
            <Col sm={9}>
              <ButtonGroup>
                <Button
                  color="success"
                  outline={storm !== 'available'}
                  onClick={() => setStorm(storm === 'available' ? undefined : 'available')}
                >
                  Available
                </Button>
                <Button
                  color="danger"
                  outline={storm !== 'unavailable'}
                  onClick={() => setStorm(storm === 'unavailable' ? undefined : 'unavailable')}
                >
                  Unavailable
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
                <option>WOL43</option>
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

interface Props {
  days: Array<{ date: Moment; }>;
}

const MemberAvailabilityTable: React.FC<Props> = ({ days }) => (
  null
);

const Member: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!isEditing);

  const days = [
    { date: moment('2019-07-01') },
    { date: moment('2019-07-02') },
    { date: moment('2019-07-03') },
    { date: moment('2019-07-04') },
    { date: moment('2019-07-05') },
    { date: moment('2019-07-06') },
    { date: moment('2019-07-07') },
    { date: moment('2019-07-08') },
  ];

  const shifts = [
    { label: '0600 - 1200' },
    { label: '1200 - 1800' },
    { label: '1800 - 0600' },
  ];

  return (
    <>
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
        <MemberAvailabilityTable
          days={days}
        />
      </Container>
      <EditModal
        isOpen={isEditing}
        toggle={toggleEditing}
        days={days}
        shifts={shifts}
      />
    </>
  );
};

export default Member;
