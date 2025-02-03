"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";

type ButtonsProps = {
  accept: string;
  decline: string;
  onAccept: () => void;
};

const Buttons: FC<ButtonsProps> = ({ accept, decline, onAccept }) => {
  const [declineWidth, setDeclineWidth] = useState<number>(200);
  const [declineHeight, setDeclineHeight] = useState<number>(50);
  const [declineDisplay, setDeclineDiplay] = useState<string>("block");

  const [acceptWidth, setAcceptWidth] = useState<number>(200);
  const [acceptHeight, setAcceptHeight] = useState<number>(50);

  const onDecline = () => {
    setAcceptHeight((prev) => prev + 50);
    setAcceptWidth((prev) => prev + 100);

    setDeclineWidth((prev) => prev - 50);
    // setDeclineHeight((prev) => prev - 25);

    if (declineWidth < 50){
      setDeclineDiplay("none");
    }
  };

  return (
    <div className="flex gap-4 justify-between mt-4 overflow-hidden">
      <Button
        style={{ width: `${acceptWidth}px`, height: `${acceptHeight}px` }}
        className="bg-green-600 hover:bg-green-500"
        onClick={onAccept}
      >
        {accept}
      </Button>
      <Button
        style={{ width: `${declineWidth}px`, height: `${declineHeight}px`, display:`${declineDisplay}` }}
        className="bg-red-600 hover:bg-red-500"
        onClick={onDecline}
      >
        {decline}
      </Button>
    </div>
  );
};

export default Buttons;
