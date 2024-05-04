export interface IPoolInfo {
  id: string;
  imageUrl: string;
  title: string;
  // total: string;
  // remaining: string;
  createdBy?: string;
  createdAt?: string;
  ticketPrice: string;
  startTime: Date;
  endTime: Date;
  totalMinted?: string;
  totalTicket?: string;

  // rewardRates: string[];
  // rewardValuePercent: string[];
}
