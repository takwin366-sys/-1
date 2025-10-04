
export type AppStatus = 'idle' | 'loading' | 'success' | 'error';

export interface AppState {
  status: AppStatus;
  imageUrl: string | null;
  error: string | null;
}
