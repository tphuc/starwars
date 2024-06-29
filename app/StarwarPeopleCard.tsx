import Image from "next/image";
import { People } from "./starwars-typed";
import { getRandomIntInRange } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import StarwarPeopleDetailModal from "./StarwarPeopleDetailModal";

export default function StarwarPeopleCard({ data }: { data: People }) {
    return <Dialog>
        <DialogTrigger asChild>
            <div className="relative cursor-pointer bg-secondary overflow-hidden rounded-md aspect-square">

                <Image alt='' width={600} height={600} className="w-full h-full absolute top-0" style={{ objectFit: "cover" }} src={`https://picsum.photos/id/${getRandomIntInRange(20, 50)}/600/600`} />

                <div className="z-10 p-4 w-full h-full bg-gradient-to-t from-black text-secondary flex flex-col justify-end to-transparent absolute top-0 left-0">
                    <h1 className="text-lg font-bold">{data?.name}</h1>
                    <div className="grid grid-cols-2">
                        <p>Height</p>
                        <h1 className="text-end">{data?.height} cm</h1>
                        <p>Weight</p>
                        <h1 className="text-end">{data?.mass} kg</h1>
                        <p>Birth Year</p>
                        <h1 className="text-end">{data?.birth_year}</h1>
                        <p>Gender</p>
                        <h1 className="text-end">{data?.gender}</h1>
                    </div>
                </div>
            </div>
        </DialogTrigger>
        <DialogContent>
            <StarwarPeopleDetailModal data={data} />
        </DialogContent>
    </Dialog>
}


