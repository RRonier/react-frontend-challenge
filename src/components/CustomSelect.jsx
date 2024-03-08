import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useTranslation} from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

// eslint-disable-next-line react/prop-types
export default function MultipleSelect({handleChange, userRole}) {
    const theme = useTheme();
    const {t} = useTranslation()

    const roles = [
        t("admin_role"),
        t("user_role")
    ];
    return (
        <div>
            <FormControl sx={{ pt: 1, mt: 1, width: 300 }}>
                <InputLabel>{t('roles')}</InputLabel>
                <Select
                    labelId="multiple-select"
                    id="multiple-select"
                    name="multiple-select"
                    multiple
                    value={userRole}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                    size="small"
                >
                    {roles.map((role) => (
                        <MenuItem
                            key={role}
                            value={role}
                            style={getStyles(role, userRole, theme)}
                        >
                            {role}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}