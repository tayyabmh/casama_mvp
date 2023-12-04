import { ConnectButton } from '@rainbow-me/rainbowkit';


export default function ConnectBar() {
  return (
    <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16  ">
            <div className="flex-1 px-4 flex justify-between">
              <div className="flex-1 flex">
              </div>
              <div className="ml-4 flex items-center md:ml-6">
                <ConnectButton />
              </div>
            </div>
          </div>
        </div>
  );
}