import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { City, ListParams } from 'models';
import { ChangeEvent } from 'react';

export interface StudentFiltersProps {
    filter: ListParams;
    cityList: City[];

    onChange?: (newFilter: ListParams) => void;
    onSearchChange?: (newFilter: ListParams) => void;
}

export default function StudentFilters({
    filter, cityList, onChange, onSearchChange
}: StudentFiltersProps) {
    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!onSearchChange) return;

        const newFilter: ListParams = {
            ...filter,
            name_like: e.target.value,
            _page: 1,
        }
        onSearchChange(newFilter);
    }

    const handleCityChange = (e: ChangeEvent<{ name?: string; value: unknown }>) => {
        if (!onChange) return;

        const newFilter: ListParams = {
            ...filter,
            _page: 1,
            city: e.target.value || undefined,
        }
        onChange(newFilter);
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="searchByName">Search by Name</InputLabel>
                        <OutlinedInput
                            id="searchByName"
                            label="Search by Name"
                            endAdornment={<Search />}
                            defaultValue={filter.name_like}
                            onChange={handleSearchChange}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth size="small" variant="outlined">
                        <InputLabel id="filterByCity">Filter by City</InputLabel>
                        <Select
                            labelId="filterByCity"
                            value={filter.city || ''}
                            onChange={handleCityChange}
                            label="Filter by City"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>

                            {cityList.map((city) => (
                                <MenuItem key={city.code} value={city.code}>
                                    {city.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box >
    );
}
