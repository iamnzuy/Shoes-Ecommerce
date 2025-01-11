function navBar() {
  return (
    <div className="flex flex-row justify-between items-center px-12 bg-white border-white border-2">
      <img src={`/logo.png`} alt="logo" className="w-36 h-14  "></img>

      {/* placeholder, change it to props once have backend service */}
      <div className="flex flex-row items-center gap-4">
        <span className="font-semibold">Welcome back, John Doe</span>
        <img
          src="/user.png"
          className="w-10 h-10 rounded-full border border-black"
        ></img>
      </div>
    </div>
  );
}
export default navBar;
