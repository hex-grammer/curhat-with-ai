import { Chat } from "../components/Chat";

function Home() {
  return (
    <div className="flex flex-col gap-12 overflow-hidden bg-gray-700">
      <section className="flex flex-col lg:px-[35%] shadow-lg max-h-screen">
        <h1 className="font-bold text-2xl bg-green-800 text-gray-200 p-4 py-2 h-[8vh] flex items-center">
          CurHat With A.I:
        </h1>
        <div className="flex-1">
          <Chat />
        </div>
      </section>
    </div>
  );
}

// Home.Layout = Layout;

export default Home;
