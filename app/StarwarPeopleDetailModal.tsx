'use client';
import Image from "next/image";
import { People, Planet } from "./starwars-typed";
import { getRandomIntInRange } from "@/lib/utils";
import useSWR from 'swr'

export default function StarwarPeopleDetailModal({ data }: { data: People }) {

    const { data: planet, isLoading, error } = useSWR<Planet>(`${data?.homeworld}`, async (url: string) =>  {
        let res = await fetch(url)
        return await res.json()
    } )

    if(isLoading)
        return <p>Loading ...</p>

    if(error){
        return <p>Failed to load resource</p>
    }

    return <div className="relative">
        <p className="text-xl font-semibold">{data?.name}</p>
        <br/>
        
        <p className="text-lg">Planet information</p>
        <div className="bg-stone-200 p-4 rounded-lg grid grid-cols-2">
            <p className="text-sm">Name</p>
            <h1 className="text-end">{planet?.name} </h1>

            <p className="text-sm">Rotation period</p>
            <h1 className="text-end">{planet?.rotation_period} </h1>

            <p className="text-sm">Orbital period</p>
            <h1 className="text-end">{planet?.orbital_period} </h1>

            <p className="text-sm">Diameter</p>
            <h1 className="text-end">{planet?.diameter} </h1>

            <p className="text-sm">Climate</p>
            <h1 className="text-end">{planet?.climate} </h1>
               
        </div>
    </div>
}



