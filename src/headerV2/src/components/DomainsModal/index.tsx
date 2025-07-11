import React, {FC, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {AxiosError} from 'axios';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Button, Dialog} from '../';
import {User} from '../../types/user';
import {getWidgetData, updateUserSelection} from '../../services/user';
import {DomainSelection} from '../../types/widgetModels';
import FormMultiselect from "../FormElements/FormSelect/FormMultiselect";
import './DomainsModel.scss';
import {ToastContextType} from "../../context/ToastContext";

type DomainsModalProps = {
    onClose: () => void;
    user?: User;
    toastContext: ToastContextType | null;
    setUserDomains: (domains: string[]) => void;
};

type SelectOption = { label: string, value: string, meta?: string };

const DomainsModal: FC<DomainsModalProps> = ({onClose, user, toastContext,setUserDomains}) => {
    const {t} = useTranslation();
    const toast = toastContext;
    const [renderVersion, setRenderVersion] = useState(0);
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [selectedOptions, setSelectedOptions] = useState<SelectOption[]>([]);
    const queryClient = useQueryClient();
    const {
        control,
        reset,
        handleSubmit
    } = useForm<SelectOption[]>({
        defaultValues: {
            selectedDomains: [],
        },
    });

    function mapDomainSelections(domains: DomainSelection[]): {
        options: SelectOption[];
        selectedOptions: SelectOption[];
    } {
        const options = domains.map((d) => ({
            label: d.name,
            value: d.id,
            meta: d.url
        }));

        const selectedOptions = options.filter((opt) =>
            domains.find((d) => {
                return d.id === opt.value && d.selected
            })
        );

        return {options, selectedOptions};
    }

    useEffect(() => {
        if (!user?.idCode) return;

        const fetchData = async () => {
            try {
                const data = await getWidgetData(user.idCode);
                const {options, selectedOptions} = mapDomainSelections(data);
                reset({selectedDomains: options});
                setOptions(options);
                setSelectedOptions(selectedOptions);
                setRenderVersion(prev => prev + 1);
            } catch (error) {
                console.error('Failed to fetch widget data', error);
            }
        };

        fetchData();
    }, [user?.idCode]);

    const updateDomainsSelectionMutation = useMutation({
        mutationFn: ({
                         id,
                         userDomains,
                         selectedDomains,
                     }: {
            id: string;
            userDomains: string[];
            selectedDomains: SelectOption[];
        }) => updateUserSelection(id, selectedDomains.map(s => s.value),userDomains),
        onSuccess: async (_data, variables) => {
            await queryClient.invalidateQueries([
                'accounts/edit-user-domains'
            ]);
            const domainMeta: string[] = (variables.selectedDomains || []).map(s => s.meta).filter((m): m is string => typeof m === 'string');
            setUserDomains(domainMeta);
            toast?.open({
                type: 'success',
                title: t('global.notification'),
                message: t('toast.success.userUpdated'),
            });
            console.log('Calling onClose');
            onClose();
        },
        onError: (error: AxiosError) => {
            toast?.open({
                type: 'error',
                title: t('global.notificationError'),
                message: error.message,
            });
        },
    });

    const handleUserSubmit = handleSubmit((data) => {
        const selectedOptions: SelectOption[] = data.selectedDomains || [];
        const currentUserDomains : string[] = options.map(op => op.value);


        if (user) {
            updateDomainsSelectionMutation.mutate({
                id: user.idCode.toString(),
                userDomains: currentUserDomains,
                selectedDomains: selectedOptions
            });
        }
    });

    return (
        <Dialog
            title={t('multiDomains.selectDomains')}
            onClose={onClose}
            footer={
                <>
                    <Button appearance="secondary" onClick={onClose}>
                        {t('global.cancel')}
                    </Button>
                    <Button onClick={handleUserSubmit}>
                        {t('global.save')}
                    </Button>
                </>
            }
        >
            <div style={{width: '500px'}}>
                <Controller
                    control={control}
                    name="selectedDomains"
                    rules={{}}
                    render={({field: {onChange, onBlur, name}}) => (
                        <div className="multiSelect">
                            <div className="multiSelect_wrapper">
                                <FormMultiselect
                                    name={name}
                                    key={renderVersion}
                                    mode={'static'}
                                    onBlur={onBlur}
                                    required={false}
                                    selectedOptions={selectedOptions || []}
                                    options={options || []}
                                    isMulti={true}
                                    placeholder={t('global.choose')}
                                    onSelectionChange={(val) => {
                                        onChange(val || []);
                                    }}
                                />
                            </div>
                        </div>
                    )}
                />
            </div>
        </Dialog>
    );
};

export default DomainsModal;
