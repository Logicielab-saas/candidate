import { CreateAnnonceState, StepData } from "../types/create-annonce.types";

export const formatStepData = (state: CreateAnnonceState): StepData => {
  const { currentStep } = state;
  const stepData: StepData = {
    step: currentStep,
    data: {},
  };

  switch (currentStep) {
    case "type":
      stepData.data = {
        annonceType: state.annonceType,
      };
      break;
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
    case "preview":
      stepData.data = {
        completeForm: {
          annonceType: state.annonceType,
          baseInformation: state.baseInformation,
          jobTypeInformation: state.jobTypeInformation,
          salaryInformation: state.salaryInformation,
          description: state.description,
        },
      };
      break;
  }

  return stepData;
};