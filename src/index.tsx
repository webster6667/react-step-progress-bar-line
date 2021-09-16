import React, {useState} from 'react'
import {bemClassName} from 'bem-components-connector'

import { ProgressBar } from 'react-line-progress-bar';
import getArraySum from 'get-array-sum';

import {ProgressBarComponent, UseStepProgressBar} from "./types"

export const StepProgressBarLine:ProgressBarComponent = ({
    activeStep = 0,
    sections = []
}) => {

    const block = bemClassName('react-step-progress-bar-line'),
          style = `
            .${block()} {display: flex;}
            .${block()} > * {flex-grow: 1;}
          `

        return (<div className={block()} >
            <style>{style}</style>
            {sections.map(({stepsCount}, index) => {
                const prevSectionsStepsSum = getArraySum(sections.slice(0, index).map((item) => item.stepsCount)),
                      notFilledSteps = activeStep - prevSectionsStepsSum,
                      progress = notFilledSteps > stepsCount ? stepsCount : notFilledSteps


                return <ProgressBar progress={progress} maxProgress={stepsCount} key={index} />
            })}
        </div>)
}

export const useStepProgressBar:UseStepProgressBar = ({
                                       activeStep = 0,
                                       sections = [],
                                       stepChangeCallback = (currentStep) => true,
                                       finishCallback = (currentStep) => true
                                       // sectionChangeCallback = () => true,
}) => {

    const [activeStepState, setActiveStep] = useState(activeStep),
          stepsCountArray = sections.map((item) => item.stepsCount),
          stepsCount = getArraySum(stepsCountArray),
          nextStep = () => setActiveStep((currentStep) => {
              const nextStep = currentStep + 1,
                    isLastStep = nextStep === stepsCount,
                    shouldLockNextStep = currentStep === stepsCount

                    // sectionNumber = '',
                    // wasSectionChange = stepsCountArray.includes(currentStep)

              
              stepChangeCallback(currentStep)

              if (shouldLockNextStep) {
                  return stepsCount
              } else {
                // if (wasSectionChange) sectionChangeCallback(currentStep)
                if (isLastStep) finishCallback(currentStep)
                return nextStep
              }


              
          }),
          prevStep = () => setActiveStep((currentStep) => {
              const prevStep = currentStep - 1,
                    shouldLockPrevStep = currentStep === 0

              if (shouldLockPrevStep) {
                  return 0
              } else {
                  stepChangeCallback(currentStep)

                  return prevStep
              }


          })

    
    return [activeStepState, sections, nextStep, prevStep]
}