import Image from "next/image";
import Buttons from "../buttons/Buttons";
import { Card } from "../ui/card";
import { FC } from "react";

type QuestionProps = {
  nextStep: () => void;
}

const Question: FC<QuestionProps> = ({nextStep}) => {
  return (
    <Card>
      <p className="text-4xl mb-4 text-center">Quieres ser mi valentines?</p>
      <Image
        className="m-auto"
        src={"/gifs/cutedog.gif"}
        alt={"Cute dog pleading"}
        width={250}
        height={250}
      />
      <Buttons accept="SI" decline="NO" onAccept={nextStep}/>
    </Card>
  );
};

export default Question;
