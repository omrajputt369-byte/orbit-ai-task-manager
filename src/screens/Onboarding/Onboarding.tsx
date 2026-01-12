import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import './Onboarding.css';

interface OnboardingProps {
    onGetStarted: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onGetStarted }) => {
    return (
        <div className="onboarding">
            <div className="onboarding__illustration">
                {/* Abstract productivity illustration */}
                <div className="onboarding__cards">
                    <div className="onboarding__card onboarding__card--1">
                        <div className="onboarding__card-lines">
                            <div className="onboarding__line onboarding__line--short" />
                            <div className="onboarding__line" />
                        </div>
                    </div>
                    <div className="onboarding__card onboarding__card--2">
                        <div className="onboarding__check-icon">
                            <Check size={24} strokeWidth={3} />
                        </div>
                        <div className="onboarding__card-code">
                            <span>&lt;/&gt;</span>
                            <span>=</span>
                        </div>
                    </div>
                    <div className="onboarding__card onboarding__card--3">
                        <div className="onboarding__card-content">
                            <Check size={16} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Floating decorative elements */}
                <div className="onboarding__decoration onboarding__decoration--1" />
                <div className="onboarding__decoration onboarding__decoration--2" />
                <div className="onboarding__decoration onboarding__decoration--3" />
                <div className="onboarding__decoration onboarding__decoration--4" />
            </div>

            <div className="onboarding__content">
                <h1 className="onboarding__title">
                    Organize And Track Work In One Place
                </h1>
                <p className="onboarding__description">
                    multifunctional task manager with built-in messenger and video conferencing capabilities
                </p>
            </div>

            <button className="onboarding__cta" onClick={onGetStarted}>
                <span>Start</span>
                <div className="onboarding__cta-icon">
                    <ArrowRight size={20} />
                </div>
            </button>
        </div>
    );
};

export default Onboarding;
