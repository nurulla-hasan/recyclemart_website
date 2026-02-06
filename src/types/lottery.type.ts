export interface ILottery {
  _id: string;
  title: string;
  description?: string;
  drawDate: string;
  ticketPrice: number;
  totalTickets: number;
  participantsCount: number;
  prize: string;
  image: string;
  status: "ACTIVE" | "COMPLETED";
  winnerToken?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LotteryResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ILottery[];
}
