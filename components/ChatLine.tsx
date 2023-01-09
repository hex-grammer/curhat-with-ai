import clsx from "clsx";
import Balancer from "react-wrap-balancer";

// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
};

// loading placeholder animation for the chat line
export const LoadingChatLine = () => (
  <div className="flex min-w-full animate-pulse px-4 py-5 sm:px-6">
    <div className="flex flex-grow space-x-3">
      <div className="min-w-0 flex-1">
        <p className="font-large text-xxl text-gray-900">AI</p>
        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 h-2 rounded bg-zinc-500"></div>
            <div className="col-span-1 h-2 rounded bg-zinc-500"></div>
          </div>
          <div className="h-2 rounded bg-zinc-500"></div>
        </div>
      </div>
    </div>
  </div>
);

// util helper to convert new lines to <br /> tags
const convertNewLines = (text: string) =>
  text.split("\n").map((line, i) => (
    <span key={i}>
      {line}
      <br />
    </span>
  ));

export function ChatLine({ who = "bot", message }: Message) {
  if (!message) {
    return null;
  }
  const formatteMessage = convertNewLines(message);

  return (
    <div
      className={
        who != "bot" ? "float-right clear-both" : "float-left clear-both"
      }
    >
      <BalancerWrapper>
        <div className="float-right mb-5 rounded-lg bg-white p-2 px-4 shadow-md shadow-gray-300 ring-1 ring-zinc-100">
          <div className="flex">
            <div className="flex-1 gap-4">
              <p className="font-large text-xxl text-gray-900">
                {who == "bot" ? "A.I:" : "Kamu:"}
              </p>
              <p className="font-semibold">{formatteMessage}</p>
            </div>
          </div>
        </div>
      </BalancerWrapper>
    </div>
  );
}
