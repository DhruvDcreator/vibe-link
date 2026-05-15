import {
  useEffect,
  useRef,
} from "react";

import { motion } from "framer-motion";

export default function OTPBoxes({
  otp,
  setOtp,
  onComplete,
  otpLocked,
}) {

  const inputsRef =
    useRef([]);

  useEffect(() => {

    if (
      otp.every(
        (digit) =>
          digit !== ""
      )
    ) {

      if (
        typeof onComplete ===
        "function"
      ) {

        onComplete();

      }

    }

  }, [otp, onComplete]);

  const handleChange = (
    value,
    index
  ) => {

    if (otpLocked) {
      return;
    }

    const digit =
      value.replace(
        /\D/g,
        ""
      );

    if (!digit) {

      const updatedOtp =
        [...otp];

      updatedOtp[index] =
        "";

      setOtp(updatedOtp);

      return;

    }

    const updatedOtp =
      [...otp];

    updatedOtp[index] =
      digit[0];

    setOtp(updatedOtp);

    if (
      index < 3
    ) {

      requestAnimationFrame(
        () => {

          inputsRef.current[
            index + 1
          ]?.focus();

        }
      );

    }

  };

  const handleKeyDown = (
    e,
    index
  ) => {

    if (otpLocked) {
      return;
    }

    if (
      e.key ===
      "Backspace"
    ) {

      if (
        otp[index]
      ) {

        const updatedOtp =
          [...otp];

        updatedOtp[index] =
          "";

        setOtp(
          updatedOtp
        );

      } else if (
        index > 0
      ) {

        requestAnimationFrame(
          () => {

            inputsRef.current[
              index - 1
            ]?.focus();

          }
        );

      }

    }

  };

  const handlePaste = (
    e
  ) => {

    if (otpLocked) {
      return;
    }

    e.preventDefault();

    const pasted =
      e.clipboardData
        .getData("text")
        .replace(
          /\D/g,
          ""
        )
        .slice(0, 4);

    if (!pasted) {
      return;
    }

    const updatedOtp =
      [
        "",
        "",
        "",
        "",
      ];

    pasted
      .split("")
      .forEach(
        (
          digit,
          index
        ) => {

          updatedOtp[
            index
          ] = digit;

        }
      );

    setOtp(updatedOtp);

  };

  return (

    <div className="
      flex
      justify-center
      gap-3
      sm:gap-4
    ">

      {otp.map(
        (
          digit,
          index
        ) => (

          <motion.input

            whileFocus={{
              scale: 1.05,
            }}

            disabled={otpLocked}

            key={index}

            ref={(el) =>
              (
                inputsRef.current[
                  index
                ] = el
              )
            }

            type="tel"

            inputMode="numeric"

            autoComplete={
              index === 0
                ? "one-time-code"
                : "off"
            }

            pattern="[0-9]*"

            value={digit}

            onChange={(e) =>
              handleChange(
                e.target.value,
                index
              )
            }

            onKeyDown={(e) =>
              handleKeyDown(
                e,
                index
              )
            }

            onPaste={
              handlePaste
            }

            className={`
              w-[68px]
              h-[82px]

              sm:w-[74px]
              sm:h-[88px]

              text-center
              text-3xl
              font-semibold

              rounded-[26px]

              outline-none

              border

              backdrop-blur-3xl

              transition-all
              duration-300

              bg-white/[0.045]

              ${
                otpLocked
                  ? "opacity-70"

                  : ""
              }

              ${
                digit

                  ? `
                    border-cyan-400/60
                    text-white
                    bg-white/[0.08]
                    shadow-[0_0_35px_rgba(0,212,255,0.18)]
                  `

                  : `
                    border-white/10
                    text-white
                    focus:border-cyan-400/60
                    hover:border-white/20
                    focus:bg-white/[0.06]
                    focus:shadow-[0_0_30px_rgba(0,212,255,0.14)]
                  `
              }
            `}
          />

        )
      )}

    </div>

  );

}