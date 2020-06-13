export interface EachSlotData {
  slotCount: number;
  durationOfSlots: number;
  allSlotInfo: { slot: string; id: number; booked: boolean }[];
}

export interface BookingInfo {
  slot: string;
  id: number;
  booked: boolean;
  unbooked: number;
}
