type InstanceConfiguration = {
  version: string;
  pageSize: {
    min: number;
    default: number;
    max: number;
  };
  register: {
    enabled: boolean;
    uniqueIdentifier: string;
    uniqueIdentifierRegex: string | false;
  };
} | null;

export { InstanceConfiguration };
