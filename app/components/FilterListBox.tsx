import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from '@reach/listbox';
import VisuallyHidden from '@reach/visually-hidden';

type RegionFilter = {
  regions: Record<string, string>;
  selectedRegion: string;
  onFilterChange: (value: string) => void;
};

function FilterListBox(props: RegionFilter) {
  return (
    <>
      <VisuallyHidden id="region-filter-label">Filter by Region</VisuallyHidden>
      <ListboxInput
        name="region"
        defaultValue={props.selectedRegion}
        value={props.selectedRegion}
        onChange={props.onFilterChange}
        required={false}
      >
        <ListboxButton
          aria-labelledby="region-filter-label"
          arrow={<ChevronDownIcon className="chevron-icon" />}
        >
          {props.regions[props.selectedRegion]}
        </ListboxButton>
        <ListboxPopover portal={false}>
          <ListboxList>
            {Object.keys(props.regions)
              .sort()
              .map((region) => (
                <ListboxOption
                  key={region}
                  value={region}
                  label={props.regions[region]}
                >
                  {props.regions[region]}
                </ListboxOption>
              ))}
          </ListboxList>
        </ListboxPopover>
      </ListboxInput>
    </>
  );
}

export default FilterListBox;
