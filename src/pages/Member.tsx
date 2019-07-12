import { Availability, RescueAvailable, StormAvailable } from '../types/availability';
import { Shift, defaultShifts } from '../types/shifts';
import moment, { Moment } from 'moment';
import React, { useState } from 'react';
import { FaBolt, FaCarSide, FaExclamationTriangle, FaInfo, FaMinus } from 'react-icons/fa';
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
  ModalProps,
  Row,
  Table,
  BadgeProps,
} from 'reactstrap';

function getShiftLabel(shift: Shift): string {
  const from = moment().set(shift.from);
  const to = moment().set(shift.to);
  return `${from.format('HHmm')} - ${to.format('HHmm')}`;
}

interface ShiftsTableProps {
  days: Array<Moment>;
  shifts: Array<Shift>;
}

const ShiftsTable: React.FC<ShiftsTableProps> = ({ days, shifts }) => (
  <Table className="shifts-select-table">
    <thead>
      <tr>
        <th />
        {days.map((day) => (
          <th key={day.unix()}>
            {day.format('ddd D/M')}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {shifts.map(shift => (
        <tr key={shift.key}>
          <th>{getShiftLabel(shift)}</th>
          {days.map(day => (
            <th key={day.unix()}>
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

const EditModal: React.FC<ModalProps> = (props) => {
  const [ui, setUI] = useState<'shifts' | 'times' | 'week'>('shifts');
  const [storm, setStorm] =  useState<StormAvailable | undefined>(undefined);
  const [rescue, setRescue] = useState<RescueAvailable | undefined>(undefined);
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

interface StormBadgeProps extends BadgeProps {
  available?: StormAvailable;
}

const StormBadge: React.FC<StormBadgeProps> = ({ available, ...props }) => {
  if (available === 'available') {
    return <Badge color="success" {...props}><FaBolt /></Badge>;
  }
  if (available === 'unavailable') {
    return <Badge color="danger" {...props}><FaBolt /></Badge>;
  }

  return null;
};

interface RescueBadgeProps extends BadgeProps {
  available?: RescueAvailable;
}

const RescueBadge: React.FC<RescueBadgeProps> = ({ available, ...props }) => {
  if (available === 'immediate') {
    return <Badge color="success" {...props}><FaExclamationTriangle /></Badge>;
  }
  if (available === 'support') {
    return <Badge color="warning" {...props}><FaExclamationTriangle /></Badge>;
  }
  if (available === 'unavailable') {
    return <Badge color="danger" {...props}><FaExclamationTriangle /></Badge>;
  }

  return null;
};

interface MemberAvailabilityTableProps {
  availabilities: Array<Availability>;
  days: Array<Moment>;
  shifts: Array<Shift>;
  toggleEditing: () => void;
}

const MemberAvailabilityTable: React.FC<MemberAvailabilityTableProps> = ({ availabilities, days, shifts, toggleEditing }) => (
  <Table className="member-availability-table">
    <thead>
      <tr>
        <th>Date</th>
        {shifts.map((shift) => (
          <th key={shift.key} className="shift">{getShiftLabel(shift)}</th>
        ))}
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th colSpan={shifts.length + 1}>
          <Button color="primary" className="mr-2" onClick={toggleEditing}>Edit Availability</Button>
          <Button color="secondary">Copy from Previous Week</Button>
        </th>
      </tr>
    </tfoot>
    <tbody>
      {days.map(day => {
        // Get all shifts which fall within this shift day.
        const from = day.clone().set(shifts[0].from);
        const to = day.clone().set(shifts[shifts.length - 1].to);
        const duration = to.unix() - from.unix();

        const entries = availabilities.filter(entry => (
          entry.from.isBefore(to) && entry.to.isSameOrAfter(from)
        ));

        return (
          <tr key={day.unix()}>
            <td>{day.format('ddd D/M')}</td>
            <td colSpan={shifts.length} style={{ position: 'relative' }}>
              <>
                {shifts.map((_, index) => (
                  <div
                    className={index !== shifts.length - 1 ? 'border-right' : undefined}
                    style={{
                      bottom: 0,
                      position: 'absolute',
                      top: 0,
                      left: (100 * (index / shifts.length)).toString() + '%',
                      right: (100 - 100 * ((index + 1) / shifts.length)).toString() + '%',
                      zIndex: 0,
                    }}
                  />
                ))}
                {entries.map(entry => {
                  const dayFrom = Math.max(entry.from.unix(), from.unix());
                  const dayTo = Math.min(entry.to.unix(), to.unix());

                  const left = (100 * (dayFrom - from.unix()) / duration).toString() + '%';
                  const right = (100 - 100 * (dayTo - from.unix()) / duration).toString() + '%';

                  let color;

                  if (entry.storm === 'available' && entry.rescue === 'immediate') {
                    color = 'success';
                  } else {
                    color = 'danger';
                  }

                  return (
                    <div
                      className={`alert alert-${color} d-flex align-items-center justify-content-center`}
                      style={{
                        left,
                        right,
                        bottom: '0.5rem',
                        top: '0.5rem',
                        margin: 0,
                        position: 'absolute',
                        zIndex: 1,
                      }}
                    >
                      <StormBadge available={entry.storm} className="mr-1" />
                      <RescueBadge available={entry.rescue} className="mr-1" />
                      {entry.vehicle && (
                        <Badge color="info" className="mr-1">
                          <FaCarSide /> <span className="d-none d-md-inline">{entry.vehicle}</span>
                        </Badge>
                      )}
                      {entry.note && (
                        <Badge color="secondary">
                          <FaInfo className="d-md-none" />
                          <span className="d-none d-md-inline">{entry.note}</span>
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </>
            </td>
          </tr>
        );
      })}
    </tbody>
  </Table>
);

const Member: React.FC = () => {
  const [isEditing, setEditing] = useState(false);
  const toggleEditing = () => setEditing(!isEditing);

  const days = [
    moment('2019-07-01'),
    moment('2019-07-02'),
    moment('2019-07-03'),
    moment('2019-07-04'),
    moment('2019-07-05'),
    moment('2019-07-06'),
    moment('2019-07-07'),
    moment('2019-07-08'),
  ];

  const availabilities = [
    {
      from: moment('2019-07-02 13:00'),
      to: moment('2019-07-05 15:00'),
      storm: 'available' as StormAvailable,
      rescue: 'immediate' as RescueAvailable,
      vehicle: 'WOL43',
    },
    {
      from: moment('2019-07-05 15:00'),
      to: moment('2019-07-10 15:00'),
      storm: 'unavailable' as StormAvailable,
      rescue: 'unavailable' as RescueAvailable,
      note: 'OOA',
    },
  ];

  return (
    <>
      <Container className="my-3">
        <h1>Member Name</h1>
        <p className="lead">Week of 1st July 2019</p>
        <MemberAvailabilityTable
          days={days}
          shifts={defaultShifts}
          availabilities={availabilities}
          toggleEditing={toggleEditing}
        />
      </Container>
      <EditModal
        isOpen={isEditing}
        toggle={toggleEditing}
        days={days}
        shifts={defaultShifts}
      />
    </>
  );
};

export default Member;
