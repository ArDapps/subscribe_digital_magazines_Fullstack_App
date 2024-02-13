export class CreateSubscribeDto {
  startTime: Date;
  endTime: Date;

  status: string;
  userId: string; // Assuming this is the ID of the user subscribing
  magazineId: string; // Assuming this is the ID of the magazine being subscribed to
}
