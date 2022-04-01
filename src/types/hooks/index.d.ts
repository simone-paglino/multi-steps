export type useDataMultiStepReturnValue<T> = {
  dataMultiStepState: T;
  updateDataMultiStep: (updatedValue: Record<string, unknown>) => void;
  removeDataSpecificStep: (step: number) => void;
}