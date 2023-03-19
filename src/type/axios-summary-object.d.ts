export type AxiosSummaryObject = {
  request: {
    method: string | null;
    path: string | null;
    params: unknown;
    headers: unknown;
    data: object | null;
  };
  response: {
    status: number | null;
    headers: unknown;
    data: unknown;
  };
};
