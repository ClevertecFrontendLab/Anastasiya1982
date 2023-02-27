import { useDispatch, useSelector } from "react-redux";
import { setCurrentStepIndex } from "../../store/registration-reducer";

export function useMultistepForm() {
  const steps = useSelector((store) => store.registration.steps);
  const currentStepIndex = useSelector((store) => store.registration.currentStep);
  const dispatch=useDispatch();
  
  console.log('====================================');
  console.log(currentStepIndex);
  console.log('====================================');

  function next() {
    dispatch(setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    }));
  }

  function back() {
    dispatch(setCurrentStepIndex((i) => {
      if (i <= 0) return i;
      return i - 1;
    }));
  }

  function goTo(index) {
    dispatch( setCurrentStepIndex(index));
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}