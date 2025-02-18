export type StepConfig<T extends string> = {
  id: T;
  title: string;
};

export interface StepperState<T extends string> {
  currentStep: T;
  nextStep: () => void;
  previousStep: () => void;
  canProceed: () => boolean;
  getCurrentStepIndex: () => number;
  reset: () => void;
}