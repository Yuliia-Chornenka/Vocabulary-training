import React from 'react';
import './index.scss';

const MAIN_LIGHT = '#b0ead7';
const RED_LIGHT = '#ffdbdc';
const MUSTARD_LIGHT = '#fdf8e3';
const GREEN_LIGHT = '#d2f9de';
const MAIN = '#00AA72';
const RED = '#fd171e';
const MUSTARD = '#f3d449';
const GREEN = '#138b37';

const getBackgroundColor = (percent, colored) => {
    if (!colored) {
        return MAIN_LIGHT;
    }

    if (percent < 33) {
        return RED_LIGHT;
    }

    if (percent < 66) {
        return MUSTARD_LIGHT;
    }

    return GREEN_LIGHT;
};

const getProgressColor = (percent, colored) => {
    if (!colored) {
        return MAIN;
    }

    if (percent < 33) {
        return RED;
    }

    if (percent < 66) {
        return MUSTARD;
    }

    return GREEN;
};

export const ProgressBar = ({ height, marginTop, percent, colored }) => {
    return (
        <div
            style={{
                backgroundColor: getBackgroundColor(percent, colored),
                height: height,
                marginTop: marginTop
            }}
        >
            <div
                style={{
                    backgroundColor: getProgressColor(percent, colored),
                    width: `${Math.min(percent, 100)}%`,
                    transition: 'width .1s ease-in-out',
                    height: height,
                    marginTop: marginTop
                }}
            />
        </div>
    );
};
