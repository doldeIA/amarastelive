import React from 'react';
import { applyClickAnimation } from '../../animations';
import { Screen } from '../../types';

interface ActionGridProps {
    onTalkAboutMusic: () => void;
    onOpenSignUpModal: () => void;
    onNavigate: (screen: Screen) => void;
}

const actionButtons: { label: string; action?: () => void; actionKey?: keyof Omit<ActionGridProps, 'onNavigate'>; navigateTo?: Screen }[] = [
    { label: 'Músicas', navigateTo: 'musicas' },
    { label: 'Loja', actionKey: 'onOpenSignUpModal' },
    { label: 'Tribus', action: () => window.open('https://chat.whatsapp.com/FDjQZNsS4GVKfhKQCY7Qok', '_blank', 'noopener,noreferrer') },
    { label: 'iAmarasté', actionKey: 'onTalkAboutMusic' },
];

const ActionGrid: React.FC<ActionGridProps> = ({ onTalkAboutMusic, onOpenSignUpModal, onNavigate }) => {
    
    const getAction = (item: typeof actionButtons[0]) => {
        if (item.navigateTo) {
            return () => onNavigate(item.navigateTo!);
        }
        if (item.action) return item.action;
        if (item.actionKey === 'onOpenSignUpModal') return onOpenSignUpModal;
        if (item.actionKey === 'onTalkAboutMusic') return onTalkAboutMusic;
        return () => {};
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-wrap items-stretch justify-center mt-6 home-buttons">
            {actionButtons.map(button => (
                <button
                  key={button.label}
                  onClick={(e) => {
                    applyClickAnimation(e);
                    getAction(button)();
                  }}
                  className="btn red-white-btn flex-auto text-center text-lg md:text-xl whitespace-nowrap trembling-button"
                  aria-label={button.label}
                >
                  {button.label}
                </button>
            ))}
        </div>
    );
};

export default ActionGrid;