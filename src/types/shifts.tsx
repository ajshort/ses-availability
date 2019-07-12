export interface Shift {
  key: string;
  from: { hour: number; minute: number; };
  to: { hour: number; minute: number; };
}

export const defaultShifts: Shift[] = [
  {
    key: 'morning',
    from: { hour: 6, minute: 0 },
    to: { hour: 12, minute: 0 },
  },
  {
    key: 'afternoon',
    from: { hour: 12, minute: 0 },
    to: { hour: 18, minute: 0 },
  },
  {
    key: 'night',
    from: { hour: 18, minute: 0 },
    to: { hour: 30, minute: 0 },
  },
];
