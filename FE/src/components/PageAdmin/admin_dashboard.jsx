function DashBoardVideo() {
  return (
    <div className="flex justify-center items-center mb-6 relative r">
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/69ZDBWoj5YM"
        title="YouTube video player"
        allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
}

function Revenue() {
  return (
    <div className="card">
      <div className="p-3 mr-4 bg-green-100 rounded-full">
        <svg className="w-5 h-5 " fill="green" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"></path>
        </svg>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">Revenue</p>
        <p className="text-lg font-semibold text-gray-700">12,345,678 đ</p>
      </div>
    </div>
  );
}

function Clients() {
  return (
    <div className="card">
      <div className="p-3 mr-4  bg-orange-100 rounded-full">
        <svg className="w-5 h-5" fill="orange">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
        </svg>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">Total clients</p>
        <p className="text-lg font-semibold text-gray-700">123</p>
      </div>
    </div>
  );
}

function Sold() {
  return (
    <div className="card">
      <div className="p-3 mr-4  bg-blue-100 rounded-full">
        <svg className="w-5 h-5" fill="blue" viewBox="0 0 20 20">
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
        </svg>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">Orders Sold</p>
        <p className="text-lg font-semibold text-gray-700">456</p>
      </div>
    </div>
  );
}

function Completed() {
  return (
    <div className="card">
      <div className="p-3 mr-4  bg-teal-100 rounded-full">
        <svg className="w-5 h-5" fill="teal" viewBox="0 0 20 20">
          <path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"></path>
        </svg>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">
          Completed Orders
        </p>
        <p className="text-lg font-semibold text-gray-700">789</p>
      </div>
    </div>
  );
}

function DashBoard() {
  return (
    <div className="w-full px-16 ">
      <h1 className="my-6 text-2xl font-semibold text-gray-700">Dashboard</h1>
      <DashBoardVideo />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-4 md:grid-cols-2">
        <Clients />
        <Revenue />
        <Sold />
        <Completed />
      </div>
    </div>
  );
}

export default DashBoard;
