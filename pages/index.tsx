import { useCallback, useEffect, useState } from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import axios from "axios";
import { BiCar } from "react-icons/bi";

const inter = Inter({ subsets: ["latin"] });

const UPDATE_INTERVAL = 2.5 * 1000;

interface ParkingData {
  isLoading: boolean;
  data: { name: string; status: string }[];
}
export default function Home() {
  const [_parkings, _setParkings] = useState<ParkingData>({
    isLoading: true,
    data: [],
  });

  const cb = useCallback(async () => {
    _setParkings((old) => ({ ...old, isLoading: true }));
    const { data } = await axios.get("/api");
    _setParkings({ isLoading: false, data });
  }, []);

  useEffect(() => {
    cb();
    const interval = setInterval(cb, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [cb]);

  return (
    <>
      <Image
        className="object-cover object-center blur"
        fill
        src={"/assets/images/parking.jpg"}
        alt=""
      />

      <nav className="bg-gray-800 relative">
        <div className="mx-auto max-w-7x1 px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center">
            <p className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium">
              Aplicacion de Estacionamiento
            </p>
          </div>
        </div>
      </nav>

      <main className={`relative mt-5 ${inter.className}`}>
        <div className="container mx-auto bg-gray-100 rounded-sm px-5 py-10">
          <ul className="grid md:grid-flow-col gap-10 w-full">
            {_parkings.data.map((p) => (
              <li className="flex flex-col items-center" key={p.name}>
                <div
                  className={`p-5 rounded-full ${
                    p.status.toLowerCase() === "libre"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  <BiCar color="#fff" size={30} />
                </div>

                <p className="mt-2 capitalize text-center">{p.name}</p>
                <p className="mt-2 capitalize text-center">{p.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
