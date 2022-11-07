import GrantBizLogo from "../img/GrantBiz_Logo.png";
import Search from "./Search";
import BottomBar from "./BottomBar";


function NavBar() {
  return (
    <>
      <div className="bg-stone-50 min-h-screen invisible md:visible ">
        {" "}
        {/* main page */}
        <div className="elative flex flex-wrap items-center justify-center h-32 px-2 py-3 bg-white mb-3 border-b-2 border-gray-100 space-x-10">
          {" "}
          {/* Nav bar */}
          <div>
            <img src={GrantBizLogo} alt="Logo" className="w-24 h-24 ml-0 " />
          </div>
          <div className="space-x-8">
            <BottomBar/>
            <Search />
          </div>
          <div className="flex justify-center md:justify-end">
            <a href="#" className="btn rounded-full py-2 px-4 md:border-2">
              Log in
            </a>
            <a
              href="#"
              className="md: btn rounded-full py-2 px-4 ml-2  md:border-2 bg-gray-300"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavBar;
