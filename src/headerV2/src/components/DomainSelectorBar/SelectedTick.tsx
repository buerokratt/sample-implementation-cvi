import React, {FC} from 'react';

const SelectedTick: FC = () => (
    <span className="domain-selector-bar__choice-check" aria-hidden>
        <svg className="domain-selector-bar__tick-svg" viewBox="0 0 15 15" width="15" height="15" focusable="false">
            <circle className="domain-selector-bar__tick-disc" cx="7.5" cy="7.5" r="7.5" />
            <path className="domain-selector-bar__tick-mark" d="M4.3 7.8L6.7 10.1L10.7 5.2" />
        </svg>
    </span>
);

export default SelectedTick;
