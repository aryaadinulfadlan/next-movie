"use client";

import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { get500Image, getOriginalImage } from "@/config";
import { StarFilledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Movie } from "@/types/root";
import { ExtendedUser } from "@/next-auth";
import BuyMovieAlert from "./BuyMovieAlert";

interface Props {
  movies: Array<Movie>;
  user: ExtendedUser | undefined;
}
export default function MovieHeroSlider({ movies, user }: Props) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  const router = useRouter();
  return (
    <Carousel opts={{ loop: true }} plugins={[autoplayPlugin.current]}>
      <CarouselContent>
        {movies.map((el) => (
          <CarouselItem
            key={el.id}
            className="h-[calc(100vh-2.5rem)] xl:h-[calc(100vh-3.5rem)]"
          >
            <div
              style={{
                backgroundImage: `url(${
                  !el.backdrop_path
                    ? "https://placehold.co/1600x800"
                    : getOriginalImage(el.backdrop_path)
                })`,
              }}
              className="p-6 h-full bg-no-repeat bg-cover bg-center relative before:absolute before:inset-0 before:bg-black/40"
            >
              <div className="h-[90%] flex items-center justify-center">
                <div className="h-[85%] md:h-[90%] xl:h-[70%] flex items-center justify-center">
                  <div className="relative h-full w-full max-w-[1400px] mx-auto grid grid-rows-[2fr_1fr] gap-y-8 sm:gap-y-12 xl:grid-rows-1 xl:grid-cols-[0.8fr_1fr]">
                    <div
                      className="w-[60%] max-w-[250px] md:max-w-[280px] xl:max-w-[350px] mx-auto rounded-xl bg-no-repeat bg-cover bg-center"
                      style={{
                        backgroundImage: `url(${
                          !el.poster_path
                            ? "https://placehold.co/400x600"
                            : get500Image(el.poster_path)
                        })`,
                      }}
                    />
                    <div className="grid gap-4 content-start sm:px-8 lg:px-[10rem] xl:px-0 xl:pr-8 xl:content-center xl:gap-10">
                      <div className="grid gap-1 lg:gap-2 xl:gap-4">
                        <h2 className="font-bold lg:text-lg xl:text-4xl">
                          {el.title}
                        </h2>
                        <div className="flex items-center gap-2">
                          <StarFilledIcon className="text-yellow-300 lg:w-5 lg:h-5 xl:w-7 xl:h-7" />
                          <p className="text-sm font-bold lg:text-base xl:text-xl">
                            {Math.round(el.vote_average * 10) / 10}
                          </p>
                          <span className="w-2 h-2 rounded-full bg-slate-300 mx-2 lg:w-2.5 lg:h-2.5 xl:w-3 xl:h-3" />
                          <span className="font-medium underline text-sm lg:text-base xl:text-xl">
                            {el.vote_count} reviews
                          </span>
                        </div>
                      </div>
                      <p className="text-sm font-medium lg:text-base xl:text-xl">
                        {el.overview && el.overview.length > 250
                          ? el.overview.substring(0, 250) + "..."
                          : el.overview}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={() => router.push(`/movie/${el.id}`)}
                          className="capitalize w-fit bg-red-600 rounded-full font-bold xl:text-xl xl:p-[1.5rem_2rem]"
                        >
                          watch now
                        </Button>
                        {!user && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="capitalize w-fit bg-green-700 rounded-full font-bold xl:text-xl xl:p-[1.5rem_2rem]">
                                make it yours
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                <DialogTitle>Cannot Buy This Movie</DialogTitle>
                              </DialogHeader>
                              <div className="text-sm lg:text-base my-6 mx-4 lg:w-[80%]">
                                You need to login first to purchase this movie.
                              </div>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button
                                    type="button"
                                    className="bg-green-700"
                                  >
                                    OK
                                  </Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        )}
                        {user && <BuyMovieAlert movie={el} user={user} />}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
        z
      </CarouselContent>
    </Carousel>
  );
}
