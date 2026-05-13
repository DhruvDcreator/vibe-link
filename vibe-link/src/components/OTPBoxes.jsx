import {
  useEffect,
  useRef,
} from "react";

export default function OTPBoxes({
  otp,
  setOtp,
  onComplete,
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

    <div className="flex justify-center gap-4">

      {otp.map(
        (
          digit,
          index
        ) => (

          <input
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

            className={`w-16 h-20 text-center text-3xl font-bold rounded-3xl outline-none border-2 transition-all duration-300 bg-white/10 backdrop-blur-xl shadow-lg ${
              digit
                ? "border-purple-400 shadow-[0_0_30px_rgba(168,85,247,0.6)] text-white scale-105"
                : "border-cyan-400 focus:border-cyan-300 focus:shadow-[0_0_30px_rgba(0,255,255,0.6)] text-white"
            }`}
          />

        )
      )}

    </div>

  );

}