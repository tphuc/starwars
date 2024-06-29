import Image from "next/image";


import { Suspense } from "react"
import { People } from './starwars-typed'
import { getRandomIntInRange } from "@/lib/utils";
import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import StarwarPeopleCard from "./StarwarPeopleCard";




async function getStarwarsPeople({ page }: { page: number }) {

  try {
    // create url search params to manage query params of request with ease
    let urlSearchParams = new URLSearchParams()
    urlSearchParams.set('page', page ? `${page}` : '1')

    let res = await fetch(`https://swapi.dev/api/people?${urlSearchParams.toString()}`)

    let data = await res.json()
    return {
      isError: false,
      data
    }

  } catch (e) {
    return {
      isError: JSON.stringify(e),
      data: null
    }
  }

}


export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {

  const page = parseInt(searchParams?.page || '1')
  const res = await getStarwarsPeople({ page })

  // I couldn't find the document how to change the array size per page
  const perPage = 10

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams ?? '');
    params.set('page', pageNumber.toString());
    return `?${params.toString()}`;
};



  return <main className="relative flex min-h-screen flex-col max-w-[100vw] overflow-hidden  gap-4 p-4">
    <div className="w-full fixed top-0 left-0 z-20 bg-white ">
      <div className="max-w-screen-2xl mx-auto flex justify-between flex-wrap items-center py-2 px-4 md:px-0">
        <span className=" flex gap-4 text-xl font-bold min-w-[300px]">

          Starwars Characters
        </span>
        <h1 className="flex gap-4 items-center ">
          <Link prefetch={false} href={page > 1 ? createPageURL(page - 1) : '#'} className="flex gap-2 items-center px-4 py-2 hover:bg-secondary transition-all rounded-lg text-sm">
            <ArrowLeftIcon className="w-4 h-4" />
            Previous
          </Link>
          <span className="text-sm">{page} of { Math.ceil(res?.data?.count / perPage)}</span>
          <Link prefetch={false} href={res?.data?.next ? createPageURL(page + 1) : '#'}  className="flex gap-2 items-center px-4 py-2 hover:bg-secondary transition-all rounded-lg text-sm">

            Next
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </h1>
      </div>


    </div>
    <br />
    <Suspense fallback={<p>Loading...</p>}>
      <div className="flex items-center max-w-screen-2xl grid grid-cols-1 md:grid-cols-4 gap-4 mx-auto w-full justify-between py-3 md:py-4">
        {res?.data?.results?.map?.((people: People, id: number) =>
          <StarwarPeopleCard data={people} key={id} />
        )}
      </div>
    </Suspense>
  </main>


}


