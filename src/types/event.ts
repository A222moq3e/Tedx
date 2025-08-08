export type Event = {
  id: string;
  name: string;
  description: string | null;
  type: string;
  date: Date;
  capacity: number;
  presenterId: string | null;
};
