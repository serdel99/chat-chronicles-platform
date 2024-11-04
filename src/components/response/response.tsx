import React, { useEffect, useRef } from "react";
import { TrainFront } from "lucide-react";
import { useTypewriter } from "react-simple-typewriter";
import { motion, AnimatePresence } from "framer-motion";
import ReactLoading from "react-loading";
import Markdown from "react-markdown";

type Props = {
  text: string;
  children?: React.ReactElement | React.ReactElement[];
  speed?: number;
  isDataLoaded: boolean;
  isLoading: boolean;
  isLastReponse?: boolean;
};

const Response = ({
  text,
  children,
  isDataLoaded,
  isLoading,
  isLastReponse,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  const [displayText, helper] = useTypewriter({
    words: [isDataLoaded ? "" : text],
    delaySpeed: 100,
    typeSpeed: 10,

    onType: () => {
      if (isLastReponse) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    },
    onLoopDone: () => {
      if (isLastReponse) {
        ref.current?.scrollIntoView({ behavior: "smooth" });
      }
    },
  });

  return (
    <div
      ref={ref}
      className="m-auto text-base py-[18px] px-3 md:px-4 w-full  lg:px-4 xl:px-5"
    >
      <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] ">
        <div className="flex-shrink-0 ">
          <div className="w-[40px] h-[40px] flex justify-center items-center">
            <img src="/icon-64.png" />
          </div>
        </div>
        <div className="w-full">
          {isLoading && (
            <div className="flex items-center h-full">
              <ReactLoading
                type="balls"
                color="#828282"
                width={25}
                height={25}
              />
            </div>
          )}
          {!isLoading && (
            <>
              <Markdown>{isDataLoaded ? text : displayText}</Markdown>
              <AnimatePresence>
                {(helper.isDone || isDataLoaded) && (
                  <motion.div
                    initial={{ opacity: isDataLoaded ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full mt-6"
                  >
                    {children}
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export { Response };
