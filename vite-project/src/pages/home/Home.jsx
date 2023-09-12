import { Link } from "react-router-dom";
import { homeLink } from "../../utils/linkConfig";
import { useEffect } from "react";
import { setIsHome } from "../../redux/home/slice";
import { useDispatch } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsHome(true));
  }, [setIsHome]);
  return (
    <>
      <header className="sticky top-0 z-40 bg-background">
        <div className="flex items-center justify-between h-16 px-4 space-x-4 md:container">
          <div className="flex gap-6 md:gap-10">
            <a className="flex items-center space-x-2" href="/">
              <svg
                class="w-6 block"
                viewBox="0 0 113 113"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M96.6747 0H16.3253C7.30909 0 0 7.30909 0 16.3253V96.6747C0 105.691 7.30909 113 16.3253 113H96.6747C105.691 113 113 105.691 113 96.6747V16.3253C113 7.30909 105.691 0 96.6747 0Z"
                  fill="url(#paint0_linear_0_4)"
                ></path>
                <path
                  d="M49.949 37.7941C51.5824 35.0573 54.5277 33.589 57.4991 33.7019C60.4705 33.589 63.4158 35.066 65.0492 37.7941L83.0166 67.9164C85.4059 71.913 84.1027 77.0826 80.1147 79.4806C76.1181 81.8698 70.9399 80.5666 68.5506 76.57L57.4991 58.0378L46.4476 76.57C44.8229 79.2894 41.9036 80.7577 38.9409 80.6708C35.9782 80.7577 33.0676 79.2894 31.4342 76.57L13.4755 46.4476C11.0862 42.451 12.3895 37.2815 16.3861 34.8835C20.3827 32.4942 25.5609 33.7975 27.9502 37.7941L38.9496 56.2394L49.949 37.7941Z"
                  fill="#F4F4F5"
                ></path>
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M90.506 32.3292C96.1534 32.3292 100.732 36.9079 100.732 42.5553C100.732 48.2027 96.1534 52.7814 90.506 52.7814C84.8586 52.7814 80.2798 48.2027 80.2798 42.5553C80.2798 36.9079 84.8499 32.3292 90.506 32.3292Z"
                  fill="#F4F4F5"
                ></path>
                <defs>
                  <linearGradient
                    id="paint0_linear_0_4"
                    x1="25.7261"
                    y1="90.9491"
                    x2="101.01"
                    y2="6.6813"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.04" stop-color="#F57F2D"></stop>
                    <stop offset="0.5" stop-color="#E47225"></stop>
                    <stop offset="0.91" stop-color="#EF452C"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <span className="inline-block font-bold">InvoiceGenius</span>
            </a>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container flex flex-col items-center px-4 pb-4 pt-16">
          <div className="pt-6 pb-8 space-y-6 md:pb-12 md:pt-10">
            <div className="flex w-full mx-auto max-w-[64rem] flex-col items-center gap-4 text-center">
              <Link
                className="px-3 py-1 text-xs font-medium whitespace-nowrap min-w-max rounded-2xl bg-[#292524] text-[#FBFCFF]"
                target="_blank"
                to={"https://www.linkedin.com/in/mateusz-potocki/"}
              >
                Follow on Linkedin
              </Link>
              <h1 className="text-[#FBFCFF] text-4xl text-foreground  font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-[4.3rem]">
                Simplify Your Invoicing Process
              </h1>
              <p className="text-[#B8B3AF] leading-snug text-sm tracking-wide max-w-lg mt-2 [text-wrap:balance] text-muted-foreground sm:text-base">
                InvoiceGenius streamlines your invoice creation, making it
                effortless to generate, manage, and send professional invoices
                for your business needs. Say goodbye to invoice hassles and
                hello to efficient billing.
              </p>
              <div className="space-x-4">
                <button className="text-[#FBFCFF] inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  text-primary-foreground  h-10 px-4 py-2 bg-[#EA580C]">
                  <Link to={`${homeLink}/signup`}>Get Started</Link>
                </button>
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  <Link to={`${homeLink}/login`}>Login</Link>
                </button>
              </div>
            </div>
          </div>
          <div className="pt-6">
            <h3 className="text-xl text-[#FBFCFF] font-semibold tracking-wide text-center text-foreground">
              About Project
            </h3>
            <div className="rounded-lg bg-card text-card-foreground shadow-sm p-4 my-3">
              <p className="text-[#FBFCFF] text-sm font-[450] max-w-md  whitespace-pre-wrap">
                My first major project, created using technologies such as
                React, Redux, NodeJS, and Tailwind CSS. The project underwent
                multiple transformations and utilized various tools and
                libraries. Developing this project was not only a valuable
                learning experience but also a great deal of fun, allowing me to
                further enhance my skills.
              </p>
            </div>
          </div>
        </div>
      </main>
      <footer className="px-4 bg-[#0C0A09] flex items-center justify-end w-full py-6 mt-auto lg:pt-24">
        <span className="text-xs font-[600] text-[#B8B3AF]">
          Build by
          <Link
            className="font-medium transition-colors duration-200 hover:text-primary"
            to={"https://github.com/potocki92"}
          >
            {" "}
            Mateusz Potocki
          </Link>
        </span>
      </footer>
    </>
  );
};

export default Home;
