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

      onComplete();

    }

  }, [otp]);

  const handleChange = (
    value,
    index
  ) => {

    if (
      !/^[0-9]?$/.test(
        value
      )
    ) {
      return;
    }

    const updatedOtp =
      [...otp];

    updatedOtp[index] =
      value;

    setOtp(updatedOtp);

    if (
      value &&
      index < 3
    ) {

      inputsRef.current[
        index + 1
      ].focus();

    }
  };

  const handleKeyDown = (
    e,
    index
  ) => {

    if (
      e.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {

      inputsRef.current[
        index - 1
      ].focus();

    }
  };

  const handlePaste = (
    e
  ) => {

    e.preventDefault();

    const pastedData =
      e.clipboardData
        .getData("text")
        .slice(0, 4)
        .split("");

    if (
      pastedData.every(
        (digit) =>
          /^[0-9]$/.test(
            digit
          )
      )
    ) {

      const updatedOtp =
        [
          "",
          "",
          "",
          "",
        ];

      pastedData.forEach(
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

      inputsRef.current[3]
        .focus();
    }
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
            type="text"
            value={digit}
            maxLength={1}
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