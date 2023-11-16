import { FC } from "react";

import './stepper.css'

interface StepperProps {
    steps: string[],
    activeStep: number
}

const Stepper: FC<StepperProps> = ({ steps, activeStep }) => {
	const getStepClass = (step: number) => {
		let cls = "step";
		if (activeStep === step) {
			cls += " step-active";
		} else if (activeStep > step) {
			cls += " step-done";
		} else {
			cls += " step-inactive";
		}
		return cls;
	}

	return (
		<div className="steps-container">
			{steps.map((label: any, index: number) => (
				<div className={getStepClass(index)} key={index}>
					<div style={{ width: "10px" }}>
						<div className="circle">{index + 1}</div>
					</div>
					{index < steps.length - 1 && <div className="line"></div>}
				</div>
			))}
		</div>
	);
}

export default Stepper
