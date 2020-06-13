export interface EachSlotData {
  slotCount: number;
  durationOfSlots: number;
  allSlotInfo: { slot: string; id: number; booked: number }[];
  admissionsOnEachSlot?: number;
  breaksInBetween?: number;
}
