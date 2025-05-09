export type TranscriptionData = {
  id: string;
  name: string;
  createdAt: number;
  audio?: string;
  viewed: boolean;
  transcription?: string;
};