import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {AxiosError} from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {getWidgetData, updateUserSelection} from '../../services/user';
import {DomainSelection} from '../../types/widgetModels';
import {ToastContextType} from '../../context/ToastContext';
import {UserInfo} from '../../types/userInfo';
import useStore from '../../store/store';
import {isValidationsEnabled} from '../../constants/config';
import SelectedTick from './SelectedTick';
import './DomainSelectorBar.scss';

type SelectOption = {readonly label: string; readonly value: string; readonly meta?: string};

type DomainSelectorBarProps = {
    readonly user: UserInfo;
    readonly toastContext: ToastContextType | null;
    readonly setUserDomains: (domains: string[]) => void;
};

function mapDomainSelections(domains: DomainSelection[]): {
    options: SelectOption[];
    selectedOptions: SelectOption[];
} {
    const options = domains.map((d) => ({
        label: d.name,
        value: d.id,
        meta: d.url,
    }));

    const selectedOptions = options.filter((opt) =>
        domains.some((d) => d.id === opt.value && d.selected)
    );

    return {options, selectedOptions};
}

const DomainSelectorBar: FC<DomainSelectorBarProps> = ({user, toastContext, setUserDomains}) => {
    const {t} = useTranslation();
    const toast = toastContext;
    const queryClient = useQueryClient();
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selected, setSelected] = useState<SelectOption[]>([]);
    const [showWarning, setShowWarning] = useState(false);
    const [ready, setReady] = useState(false);

    const areAllSelected = options.length > 0 && selected.length === options.length;

    useEffect(() => {
        if (!user?.idCode) {
            setShowWarning(true);
            setReady(true);
            return;
        }

        const fetchData = async () => {
            try {
                const data = await getWidgetData(user.idCode);
                setShowWarning((data?.length ?? 0) < 1);
                const {options: nextOptions, selectedOptions} = mapDomainSelections(data);
                setOptions(nextOptions);
                setSelected(selectedOptions);
                const metas = selectedOptions.map((s) => s.meta).filter((m): m is string => typeof m === 'string');
                setUserDomains(metas);
            } catch (e) {
                console.error('Failed to fetch widget data', e);
                setShowWarning(true);
            } finally {
                setReady(true);
            }
        };

        void fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps -- sync widget selection once per user
    }, [user?.idCode]);

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            userDomains,
            selectedDomains,
        }: {
            id: string;
            userDomains: string[];
            selectedDomains: SelectOption[];
        }) => updateUserSelection(id, selectedDomains.map((s) => s.value), userDomains),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries(['accounts/edit-user-domains']);
            const domainMeta = (variables.selectedDomains || [])
                .map((s) => s.meta)
                .filter((m): m is string => typeof m === 'string');
            setUserDomains(domainMeta);
            useStore.getState().setUserDomains(domainMeta);
            void useStore.getState().loadActiveChats();
            void useStore.getState().loadPendingChats();
            if (isValidationsEnabled) void useStore.getState().loadValidationChats();
            toast?.open({
                type: 'success',
                title: t('global.notification'),
                message: t('toast.success.userUpdated'),
            });
        },
        onError: (error: AxiosError) => {
            toast?.open({
                type: 'error',
                title: t('global.notificationError'),
                message: error.message,
            });
        },
    });

    const persist = (next: SelectOption[]) => {
        if (!user?.idCode) return;
        const previous = selected;
        setSelected(next);
        updateMutation.mutate(
            {
                id: user.idCode.toString(),
                userDomains: options.map((o) => o.value),
                selectedDomains: next,
            },
            {
                onError: () => setSelected(previous),
            }
        );
    };

    const onToggleAll = () => {
        const next = areAllSelected ? [] : [...options];
        persist(next);
    };

    const onToggleDomain = (opt: SelectOption) => {
        const isOn = selected.some((s) => s.value === opt.value);
        const next = isOn
            ? selected.filter((s) => s.value !== opt.value)
            : [...selected, opt];
        persist(next);
    };

    if (!ready) {
        return null;
    }

    if (showWarning) {
        return (
            <section className="domain-selector-bar" aria-label={t('multiDomains.selectDomains')}>
                <div className="domain-selector-bar__inner">
                    <p className="domain-selector-bar__warn">{t('multiDomains.noDomains')}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="domain-selector-bar" aria-label={t('multiDomains.selectDomains')}>
            <div className="domain-selector-bar__inner">
            <p className="domain-selector-bar__label">{t('multiDomains.chooseDomain')}</p>
            <div className="domain-selector-bar__pills">
                <button
                    type="button"
                    className={
                        'domain-selector-bar__choice' +
                        (areAllSelected ? ' domain-selector-bar__choice--selected' : '')
                    }
                    onClick={onToggleAll}
                    disabled={updateMutation.isLoading}
                >
                    {areAllSelected ? (
                        <>
                            <SelectedTick />
                            <span className="domain-selector-bar__choice-text">
                                {t('multiDomains.allDomains')}
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="domain-selector-bar__choice-radio" aria-hidden />
                            <span className="domain-selector-bar__choice-text">
                                {t('multiDomains.allDomains')}
                            </span>
                        </>
                    )}
                </button>
                {options.map((opt) => {
                    const isOn = selected.some((s) => s.value === opt.value);
                    return (
                        <button
                            type="button"
                            key={opt.value}
                            className={
                                'domain-selector-bar__choice' + (isOn ? ' domain-selector-bar__choice--selected' : '')
                            }
                            onClick={() => onToggleDomain(opt)}
                            disabled={updateMutation.isLoading}
                        >
                            {isOn ? (
                                <>
                                    <SelectedTick />
                                    <span className="domain-selector-bar__choice-text">{opt.label}</span>
                                </>
                            ) : (
                                <>
                                    <span className="domain-selector-bar__choice-radio" aria-hidden />
                                    <span className="domain-selector-bar__choice-text">{opt.label}</span>
                                </>
                            )}
                        </button>
                    );
                })}
            </div>
            </div>
        </section>
    );
};

export default DomainSelectorBar;
