import Img from "@/public/footer.jpg";

export default function Footer() {
  // https://image.tmdb.org/t/p/original/fqv8v6AycXKsivp1T5yKtLbGXce.jpg
  return (
    <div
      style={{
        backgroundImage: `url('${Img.src}')`,
      }}
      className="bg-no-repeat bg-cover bg-center h-[30vh] flex items-center flex-col justify-center gap-4 text-sm lg:text-base xl:text-xl"
    >
      <div className="flex items-center gap-2">
        API By:
        <a
          className="underline"
          href="https://www.themoviedb.org"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          The Movie Database
        </a>
      </div>
      <div className="flex items-center gap-2">
        <span className="2xl:text-2xl">&copy;</span>
        <a
          className="text-blue-300"
          href="https://aryaaf.vercel.app"
          target={"_blank"}
          rel="noopener noreferrer"
        >
          Arya Adinul Fadlan
        </a>
      </div>
    </div>
  );
}
