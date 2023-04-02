export type AxiosSummaryObject = {
  request: null | {
    method: string | null;
    path: string | null;
    params: unknown;
    headers: unknown;
    data: object | null;
  };
  response: null | {
    status: number | null;
    headers: unknown;
    data: unknown;
  };
};
