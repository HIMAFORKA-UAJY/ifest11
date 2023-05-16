import CP from "@/components/CP";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";
import RegistrationClosed from "@/components/RegistrationClosed";
import acara from "@/data/acara.json";
import { navColors } from "@/recoil/atoms";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import parse from "html-react-parser";
import moment from "moment-timezone";
import { NextSeo } from "next-seo";
import { useRef, useState } from "react";
import { Chrono } from "react-chrono";
import { useSetRecoilState } from "recoil";

const Index = () => {
  useSetRecoilState(navColors)({ bg1: "#03082b", bg2: "#4091ba", fg: "#2CD3E1" });
  const registrationContentRef = useRef<HTMLDivElement>(null);
  const benefitsContentRef = useRef<HTMLDivElement>(null);
  const [openPoster, setOpenPoster] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  if (
    acara["sharing-alumni"].date_available == null ||
    moment()
      .tz("Asia/Jakarta")
      .diff(moment(acara["sharing-alumni"].date_available).tz("Asia/Jakarta")) < 0
  )
    return (
      <>
        <NextSeo
          description={`${acara["sharing-alumni"].name} ${acara["sharing-alumni"].description}`}
          title={`${acara["sharing-alumni"].name} - IFest#11`}
        />
        <ComingSoon date={acara["sharing-alumni"].date_available} />
      </>
    );

  return (
    <>
      {openModal ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="layout cursor-default"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <RegistrationClosed />
        </motion.div>
      ) : (
        <>
          <NextSeo
            description={`${acara["sharing-alumni"].short_description}`}
            title={`${acara["sharing-alumni"].name} - IFest#11`}
          />
          <div className="absolute top-0 -z-10 h-screen w-full bg-[url('/images/acara/sharing-alumni/bg-sharing-alumni.webp')] bg-cover bg-center bg-no-repeat">
            {/* <div className="bg-gradient-to-b from-[#4091ba]/80 to-[#217290]/80"></div> */}
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center gap-8 px-8 lg:w-8/12">
              <div className="mt-28 text-center font-retroica text-4xl font-bold text-white lg:m-0 lg:text-5xl">
                <p className="inline lg:block">{acara["sharing-alumni"].title_top}</p>
                <p className="inline lg:block">{acara["sharing-alumni"].title_bottom}</p>
              </div>
              <div className="text-center font-retroica text-white lg:text-xl">
                {acara["sharing-alumni"].short_description}
              </div>
              <div className="flex w-fit flex-col gap-8 font-retroica text-sm text-white lg:flex-row">
                <div className="rounded-full bg-[#5C469C] p-1 transition-transform hover:scale-110">
                  <motion.button
                    animate={{ opacity: 1 }}
                    className="flex w-full items-center justify-center gap-1 rounded-full bg-[#5C469C] px-5 py-3"
                    initial={{ opacity: 0 }}
                    onClick={() =>
                      registrationContentRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Cara Daftar
                  </motion.button>
                </div>
                <div className="rounded-full border-2 border-[#5C469C] p-1 transition-transform hover:scale-110">
                  <motion.button
                    animate={{ opacity: 1 }}
                    className="flex w-full items-center justify-center gap-1 rounded-full px-5 py-3"
                    initial={{ opacity: 0 }}
                    onClick={() =>
                      benefitsContentRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Narasumber
                  </motion.button>
                </div>
                <div className="rounded-full bg-[#5C469C] p-1 transition-transform hover:scale-110">
                  <motion.button
                    animate={{ opacity: 1 }}
                    className="flex w-full items-center justify-center gap-1 rounded-full bg-[#5C469C] px-5 py-3"
                    initial={{ opacity: 0 }}
                    onClick={() => setOpenPoster(true)}
                    transition={{ duration: 0.25 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    Poster
                  </motion.button>
                  <Dialog
                    className="relative z-50"
                    onClose={() => setOpenPoster(false)}
                    open={openPoster}
                  >
                    <div aria-hidden="true" className="fixed inset-0 bg-black/50" />
                    <div className="fixed inset-0 flex items-center justify-center">
                      <Dialog.Panel className="flex h-full w-11/12 flex-col items-center justify-center gap-2 overflow-auto p-8">
                        <img
                          alt="poster"
                          className="h-full w-full object-contain object-center"
                          onClick={() => setOpenPoster(false)}
                          src={acara["donor-darah"].poster}
                        />
                      </Dialog.Panel>
                    </div>
                  </Dialog>
                </div>
              </div>
            </div>

            <div className="w-full bg-gradient-to-t from-black to-[#0C134F] pt-12">
              <div className="text-center font-retroica text-3xl font-bold text-white lg:text-4xl">
                Diselenggarakan Oleh
              </div>
              <div className="grid gap-8 px-8 py-4 lg:mx-28 lg:mt-8 lg:grid-cols-2">
                {/* <div className="col-start-1"></div> */}
                {acara["sharing-alumni"].sponsors.map((sponsor, index) => {
                  return (
                    <div
                      className="flex flex-col items-center justify-center bg-[#1D267D] py-10 text-center lg:py-4"
                      key={index}
                    >
                      <img
                        alt={sponsor.name.toLowerCase()}
                        className="w-1/2 lg:w-1/4"
                        src={sponsor.img}
                      />
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-10 flex flex-col items-center justify-center bg-gradient-to-r from-[#0A4D68] to-[#088395] pt-12 text-center"
                ref={registrationContentRef}
              >
                <div className="font-retroica text-4xl font-bold text-white">
                  Tunggu apa lagi? Daftarkan diri kamu dengan cara:
                </div>
                <div className="grid gap-8 lg:grid-cols-3">
                  {acara["sharing-alumni"].steps.map((step, index) => {
                    return (
                      <div
                        className="flex flex-col items-center justify-start gap-4 p-12"
                        key={index}
                      >
                        <img alt="step" className="w-10" src={step.icon} />
                        <div className="text-center font-retroica text-2xl text-white">
                          {step.step}
                        </div>
                        <div className="text-center font-louisgeorgecafe text-sm text-white">
                          {index == 0 ? (
                            <>
                              Daftar melalui{" "}
                              <strong>
                                <a
                                  className="underline"
                                  href="http://ifestuajy.com/dash/seminar_nasional"
                                  onClick={() => setOpenModal(true)}
                                >
                                  Dashboard Puncak Sharing Alumni
                                </a>
                              </strong>
                              .
                            </>
                          ) : (
                            parse(step.description)
                          )}
                        </div>
                        <span className="underline"></span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                ref={benefitsContentRef}
              >
                <h1 className="font-retroica text-4xl font-bold text-white">Narasumber</h1>
                <div className="grid gap-8 px-8 py-4 lg:grid-cols-2">
                  {acara["sharing-alumni"].narasumber.map((narasumber, index) => {
                    return (
                      <div
                        className="flex flex-col items-center justify-center bg-[#03082b] p-10"
                        key={index}
                      >
                        <div className="items-center justify-center">
                          <div className="mt-2 text-center font-retroica text-2xl text-[#D4ADFC]">
                            {narasumber.nama}
                          </div>
                        </div>
                        <div className="items-center justify-center">
                          <div className="lg:px-18 mt-2 text-center font-louisgeorgecafe text-lg text-[#D4ADFC]">
                            {narasumber.company}
                          </div>
                        </div>
                        <div className="items-center justify-center">
                          <div className="mt-2 text-center font-louisgeorgecafe text-sm text-white lg:px-20">
                            {narasumber.keterangan}
                          </div>
                        </div>
                        <div className="items-center justify-center">
                          <div className="lg:px-18 mt-6 text-center font-louisgeorgecafe text-xl text-white">
                            {narasumber.tema}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pt-8">
                <div className="mb-5 text-center font-retroica text-4xl text-[#D4ADFC]">
                  Timeline
                </div>
                {acara["sharing-alumni"].timeline.map((timeline, index) => {
                  return (
                    <div className="flex w-full flex-col items-center justify-center" key={index}>
                      <div className="w-fit rounded-xl bg-[#241f3d] pb-1">
                        <div className="rounded-xl bg-[#5C469C] p-4 font-retroica text-white shadow-inner">
                          {timeline.name}
                        </div>
                      </div>
                      <div className="w-full lg:w-10/12 2xl:w-1/2">
                        <Chrono
                          cardHeight={50}
                          disableClickOnCircle
                          hideControls
                          items={timeline.data.map((item) => {
                            return {
                              title: item.name,
                              cardTitle: item.date,
                            };
                          })}
                          mode="VERTICAL_ALTERNATING"
                          theme={{
                            primary: "#716B90",
                            secondary: "transparent",
                            cardBgColor: "#241f3d",
                            cardForeColor: "white",
                            titleColor: "white",
                            titleColorActive: "white",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <CP get="sharing-alumni" />
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Index;
