import { CreateAnnonceState, StepData } from "../types/create-annonce.types";

export const formatStepData = (state: CreateAnnonceState): StepData => {
  const { currentStep } = state;
  const stepData: StepData = {
    step: currentStep,
    data: {},
  };

  switch (currentStep) {
    case "job-information":
      stepData.data = {
        baseInformation: state.baseInformation,
        jobTypeInformation: state.jobTypeInformation,
        salaryInformation: state.salaryInformation,
      };
      break;
    case "description-annonce":
      stepData.data = {
        description: state.description,
      };
      break;
    case "preferences":
      stepData.data = {
        preferences: state.preferences || undefined,
      };
      break;
    case "preview":
      stepData.data = {
        completeForm: {
          annonceType: state.annonceType,
          baseInformation: state.baseInformation,
          jobTypeInformation: state.jobTypeInformation,
          salaryInformation: state.salaryInformation,
          description: state.description,
          preferences: state.preferences,
        },
      };
      break;
  }

  return stepData;
};