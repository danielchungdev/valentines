"use client";
import Ringtone from "@/components/ringtone/Ringtone";
import Question from "@/components/question/Question";
import ControlledForm from "@/components/controlled-form/ControlledForm";
import Thankyou from "@/components/thankyou/Thankyou";
import { useState } from "react";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const nextStep = () => {
    setCurrentStep((curr) => curr + 1);
  };

  return (
    <>
      {currentStep === 0 && <Ringtone nextStep={nextStep} />}
      {currentStep === 1 && <Question nextStep={nextStep} />}
      {currentStep === 2 && <ControlledForm nextStep={nextStep}/>}
      {currentStep === 3 && <Thankyou />}
    </>
  );
}
