import { useDispatch, useSelector } from 'react-redux';
import { setCurrentStepIndex } from '../../store/registration-reducer';

export function useMultistepForm() {
  const steps = useSelector((store) => store.registration.steps);
  const currentStepIndex = useSelector((store) => store.registration.currentStepIndex);
  const dispatch = useDispatch();

  function next() {
    if (currentStepIndex >= steps.length - 1) return;
    dispatch(setCurrentStepIndex(currentStepIndex + 1));
  }

  function back() {
    if (currentStepIndex <= 0) return;
    dispatch(setCurrentStepIndex(currentStepIndex - 1));
  }

  function goTo(index) {
    dispatch(setCurrentStepIndex(index));
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isSecondStep:currentStepIndex === 1,
    isLastStep:currentStepIndex === 2,
    isDataCollected: currentStepIndex === steps.length - 1,
    goTo,
    next,
    back,
  };
}
