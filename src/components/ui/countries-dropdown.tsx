import React, { useCallback, useState, forwardRef, useEffect } from "react";

// shadcn
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// assets
import { ChevronDown, ChevronsUpDown, CheckIcon, Globe } from "lucide-react";
import { CircleFlag } from "react-circle-flags";

// data
import { countries } from "country-data-list";

export type Country = {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji?: string;
  ioc: string;
  languages: string[];
  name: string;
  status: string;
};

type BaseCountryDropdownProps = {
  options?: Country[];
  disabled?: boolean;
  placeholder?: string;
  slim?: boolean;
  inline?: boolean;
  className?: string;
};

type SingleCountryDropdownProps = BaseCountryDropdownProps & {
  multiple?: false;
  onChange?: (country: Country) => void;
  value?: string; // Add controlled value
  defaultValue?: string;
};

type MultipleCountryDropdownProps = BaseCountryDropdownProps & {
  multiple: true;
  onChange: (countries: Country[]) => void;
  value?: string[]; // Add controlled value
  defaultValue?: string[];
};

type CountryDropdownProps =
  | SingleCountryDropdownProps
  | MultipleCountryDropdownProps;

const CountryDropdownComponent = (
  {
    options = countries.all.filter(
      (country: Country) =>
        country.emoji && country.status !== "deleted" && country.ioc !== "PRK"
    ),
    onChange,
    value, // Add value prop
    defaultValue,
    disabled = false,
    placeholder = "Select a country",
    slim = false,
    inline = false,
    multiple = false,
    className,
    ...props
  }: CountryDropdownProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  const [open, setOpen] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);

  // Professional approach: Handle both controlled and uncontrolled behavior
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : defaultValue;

  useEffect(() => {
    if (!currentValue) {
      if (selectedCountries.length > 0) {
        setSelectedCountries([]);
      }
      return;
    }

    // For multiple selection - support both alpha2 and alpha3
    if (multiple && Array.isArray(currentValue)) {
      const currentCodes = selectedCountries.map((c) => c.alpha2);
      const hasChanges =
        currentValue.length !== currentCodes.length ||
        !currentValue.every((v) => currentCodes.includes(v));

      if (hasChanges) {
        // Try alpha2 first (most common in forms), then alpha3
        const initialCountries = options.filter((country) =>
          currentValue.includes(country.alpha2) || currentValue.includes(country.alpha3)
        );
        setSelectedCountries(initialCountries);
      }
    }
    // For single selection - support both alpha2 and alpha3
    else if (!multiple && typeof currentValue === "string") {
      const currentCode = selectedCountries[0]?.alpha2;
      if (currentValue !== currentCode) {
        const initialCountry = options.find(
          (country) => country.alpha2 === currentValue || country.alpha3 === currentValue
        );
        setSelectedCountries(initialCountry ? [initialCountry] : []);
      }
    }
  }, [currentValue, options, multiple, selectedCountries]);

  const handleSelect = useCallback(
    (country: Country) => {
      if (multiple) {
        const newSelection = selectedCountries.some(
          (c) => c.alpha2 === country.alpha2
        )
          ? selectedCountries.filter((c) => c.alpha2 !== country.alpha2)
          : [...selectedCountries, country];

        // Only update internal state if uncontrolled
        if (!isControlled) {
          setSelectedCountries(newSelection);
        }
        (onChange as MultipleCountryDropdownProps["onChange"])?.(newSelection);
      } else {
        // Only update internal state if uncontrolled
        if (!isControlled) {
          setSelectedCountries([country]);
        }
        (onChange as SingleCountryDropdownProps["onChange"])?.(country);
        setOpen(false);
      }
    },
    [onChange, multiple, selectedCountries, isControlled]
  );

  const triggerClasses = cn(
    "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 hover:bg-secondary/80",
    slim === true && "gap-1 w-min",
    inline && "rounded-r-none border-r-0 gap-1 pr-1 w-min",
    className
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        ref={ref}
        className={triggerClasses}
        disabled={disabled}
        {...props}
      >
        {selectedCountries.length > 0 ? (
          <div className="flex items-center flex-grow gap-2 overflow-hidden">
            {multiple ? (
              <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                {selectedCountries.length} selected
              </span>
            ) : (
              <>
                <div className="inline-flex items-center justify-center w-4 h-4 shrink-0 overflow-hidden rounded-full">
                  <CircleFlag
                    countryCode={selectedCountries[0].alpha2.toLowerCase()}
                    height={16}
                  />
                </div>
                {slim === false && !inline && (
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                    {selectedCountries[0].name}
                  </span>
                )}
              </>
            )}
          </div>
        ) : (
          <span className="flex items-center gap-2">
            {inline || slim ? <Globe size={16} /> : placeholder}
          </span>
        )}

        {!inline ? (
          <ChevronDown size={16} />
        ) : (
          <ChevronsUpDown size={16} className="text-muted-foreground" />
        )}
      </PopoverTrigger>
      <PopoverContent
        collisionPadding={10}
        side="bottom"
        className="min-w-[--radix-popper-anchor-width] p-0"
      >
        <Command className="w-full max-h-[200px] sm:max-h-[270px]">
          <CommandList>
            <div className="sticky top-0 z-10 bg-popover">
              <CommandInput placeholder="Search country..." />
            </div>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {options
                .filter((x) => x.name)
                .map((option, key: number) => (
                  <CommandItem
                    className="flex items-center w-full gap-2"
                    key={key}
                    onSelect={() => handleSelect(option)}
                  >
                    <div className="flex flex-grow space-x-2 overflow-hidden">
                      <div className="inline-flex items-center justify-center w-5 h-5 shrink-0 overflow-hidden rounded-full">
                        <CircleFlag
                          countryCode={option.alpha2.toLowerCase()}
                          height={20}
                        />
                      </div>
                      <span className="overflow-hidden text-ellipsis whitespace-nowrap">
                        {option.name}
                      </span>
                    </div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4 shrink-0",
                        selectedCountries.some((c) => c.alpha2 === option.alpha2)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

CountryDropdownComponent.displayName = "CountryDropdownComponent";

export const CountriesDropdown = forwardRef(CountryDropdownComponent);