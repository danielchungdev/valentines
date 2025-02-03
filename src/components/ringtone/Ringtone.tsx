"use client";
import { FC, useEffect, useRef, useState } from "react";
import Buttons from "../buttons/Buttons";
import Image from "next/image";
import { Card } from "../ui/card";

type RingtoneProps = {
  nextStep: () => void;
}

const Ringtone: FC<RingtoneProps> = ({nextStep}) => {
  return (
    <Card>
      <div className="mb-4">
        <p className="text-2xl text-center">Incoming message from</p>
        <p className="text-7xl font-bold text-center">Chung</p>
      </div>
      <Image
        className="m-auto"
        src={"/gifs/welcomedoggo.gif"}
        alt={"A happy dogo"}
        width={250}
        height={250}
      />
      <Buttons accept={"Accept"} decline={"Decline"} onAccept={nextStep} />
    </Card>
  );
};

export default Ringtone;
