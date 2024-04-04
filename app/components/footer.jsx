// @flow strict
import Link from 'next/link';
import { CgGitFork } from "react-icons/cg";
import { IoStar } from "react-icons/io5";

function Footer() {
  return (
    <div className="relative border-t bg-[#0d1224] border-[#353951] text-white">
      <div className="mx-auto px-6 sm:px-12 lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-6 lg:py-10">
        <div className="flex justify-center -z-40">
          <div className="absolute top-0 h-[1px] w-1/2  bg-gradient-to-r from-transparent via-via-via-via-via-blue-400 to-transparent"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} Babangida Tsowa. All rights reserved.
          </p>
          {/* <p className="text-sm">
             Built with <IoStar /> Portfolio by <Link target="_blank" href="https://www.linkedin.com/in/babangida-tsowa-38b1bb99" className="text-blue-700>Babangida Tsowa</Link>
          </p> */}
          <div className="flex items-center gap-5">
            {/* <Link
              target="_blank"
              href="https://github.com/said7388/developer-portfolio"
              className="flex items-center gap-2 uppercase hover:text-blue-700"
            >
              <IoStar />
              <span>Star</span>
            </Link> */}
            {/* <Link
              target="_blank"
              href="https://github.com/said7388/developer-portfolio/fork"
              className="flex items-center gap-2 uppercase hover:text-blue-700"
            >
              <CgGitFork />
              <span>Fork</span>
            </Link> */}
          </div>
        </div>
      </div>
    </div >
  );
};

export default Footer;