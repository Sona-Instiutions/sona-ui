type StepProgressProps = {
  step: number;
};
export default function StepProgress({ step }: StepProgressProps) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="mb-8">
      {/* Container */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        {/* LEFT — STEPS */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {steps.map((num, index) => {
            const isCompleted = num < step;
            const isActive = num === step;

            return (
              <div key={num} className="flex items-center gap-4 sm:gap-6">

                {/* Circle */}
                <div
                  className={`
                    w-8 h-8 flex items-center justify-center rounded-full text-white font-semibold
                    ${isActive ? "bg-yellow-400" : isCompleted ? "bg-green-600" : "bg-gray-300 text-gray-600"}
                  `}
                >
                  {num}
                </div>

                {/* Line */}
                {index !== steps.length - 1 && (
                  <div
                    className={`
                      h-1 w-8 sm:w-12 rounded
                      ${isCompleted ? "bg-green-600" : "bg-gray-300"}
                    `}
                  ></div>
                )}
              </div>
            );
          })}
        </div>

        {/* RIGHT — Step Counter */}
        <p className="text-gray-600 font-medium text-center sm:text-right">
          Step {step} of 4
        </p>
      </div>
    </div>
  );
}
