import { Card } from "../ui/card"
import Image from "next/image"

const Thankyou = () => {
    return(
        <Card>
            <p className="text-4xl font-bold text-center mb-4">OKAAAAAY GRACIAS!</p>
            <Image src="/gifs/thanksdog.gif" alt="Cute corgi excited" width={500} height={500}/>
        </Card>
    )
}

export default Thankyou