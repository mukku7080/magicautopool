import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    VStack,
    HStack,
    Text,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    useDisclosure,
    useColorModeValue,
    useOutsideClick,
    Portal,
    Image,
    Spinner,
    FormErrorMessage
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { AiOutlinePhone } from 'react-icons/ai';
import { useOther } from '../Context/OtherContext';

const PhoneInput = React.memo(({
    value,
    onChange,
    placeholder = "Phone Number",
    isInvalid,
    bg,
    border,
    borderColor,
    _hover,
    _focus,
    fontSize,
    h = "48px",
    ...props
}) => {
    const { countryCode, getDialingCodes, isLoading } = useOther();
    const [selectedCountry, setSelectedCountry] = useState({
        name: 'United States',
        code: 'US',
        dialing_code: '+1',
        flag_url: 'https://flagcdn.com/w320/us.png'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const ref = useRef();

    // Color mode values
    const dropdownBg = useColorModeValue('white', 'gray.700');
    const dropdownBorder = useColorModeValue('gray.200', 'gray.600');
    const hoverBg = useColorModeValue('gray.50', 'gray.600');
    const textColor = useColorModeValue('gray.700', 'gray.200');
    const mutedTextColor = useColorModeValue('gray.500', 'gray.400');

    useOutsideClick({
        ref: ref,
        handler: onClose,
    });

    // Initialize component with default USA country code
    useEffect(() => {
        // Set initial value with default USA country code only if needed
        if (!value || value === '') {
            console.log('🏁 Setting initial USA country code');
            // Use setTimeout to prevent blocking render
            setTimeout(() => {
                if (onChange) {
                    onChange('+1 ');
                }
            }, 0);
        }
    }, [onChange, value]);

    // Debounce search term to improve performance
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300); // 300ms delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    // Handle dropdown open and fetch countries ONLY when dropdown is clicked
    const handleDropdownOpen = useCallback(() => {
        console.log('📱 Dropdown clicked, opening...');
        onOpen();

        // Only fetch if we don't have countries data and we're not already loading
        if (countryCode.length === 0 && !isLoading) {
            console.log('🌐 Fetching countries data on dropdown open...');
            getDialingCodes();
        }
    }, [onOpen, countryCode.length, getDialingCodes, isLoading]);

    // Update selected country when value changes externally
    useEffect(() => {
        if (value && countryCode.length > 0) {
            const dialingCode = value.split(' ')[0];
            const country = countryCode.find(c => c.dialing_code === dialingCode);
            if (country && country !== selectedCountry) {
                setSelectedCountry(country);
            }
        } else if (!value && countryCode.length > 0 && selectedCountry) {
            // If value is empty/reset, set default US country code
            const usaCountry = countryCode.find(country =>
                country.dialing_code === '+1' && country.name.toLowerCase().includes('united states')
            ) || countryCode.find(country => country.dialing_code === '+1');

            if (usaCountry && onChange) {
                onChange(usaCountry.dialing_code + ' ');
            }
        }
    }, [value, countryCode, selectedCountry, onChange]);

    // Memoize filtered countries to avoid recalculation on every render
    const filteredCountries = useMemo(() => {
        const countriesToFilter = countryCode.length > 0 ? countryCode : [selectedCountry];
        return countriesToFilter.filter(country =>
            country?.name?.toLowerCase()?.includes(debouncedSearchTerm.toLowerCase()) ||
            country?.dialing_code?.includes(debouncedSearchTerm) ||
            country?.code?.toLowerCase()?.includes(debouncedSearchTerm.toLowerCase())
        );
    }, [countryCode, selectedCountry, debouncedSearchTerm]);

    const handleCountrySelect = useCallback((country) => {
        setSelectedCountry(country);
        onClose();
        setSearchTerm('');
        setDebouncedSearchTerm('');
        // Update the full phone number with new country code
        const phoneNumber = value?.replace(/^\+\d+\s*/, '') || '';
        onChange(country.dialing_code + ' ' + phoneNumber);
    }, [value, onChange, onClose]);

    const handlePhoneChange = useCallback((e) => {
        const phoneNumber = e.target.value;
        // Keep the country code and update only the phone number part
        const countryCodePart = selectedCountry.dialing_code + ' ';
        const numberPart = phoneNumber.replace(countryCodePart, '');
        onChange(countryCodePart + numberPart);
    }, [selectedCountry, onChange]);

    const handleSearchChange = useCallback((e) => {
        setSearchTerm(e.target.value);
    }, []);

    return (
        <InputGroup>
            <InputLeftElement width="auto" h={h}>
                <Popover
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    placement="bottom-start"
                >
                    <PopoverTrigger>
                        <Button
                            variant="ghost"
                            size="sm"
                            h={h}
                            px={2}
                            onClick={handleDropdownOpen}
                            leftIcon={
                                selectedCountry.flag_url ? (
                                    <Image
                                        src={selectedCountry.flag_url}
                                        alt={selectedCountry.name}
                                        w="20px"
                                        h="15px"
                                        objectFit="cover"
                                        borderRadius="2px"
                                    />
                                ) : (
                                    <Box w="20px" h="15px" bg="gray.200" borderRadius="2px" />
                                )
                            }
                            rightIcon={<ChevronDownIcon />}
                            fontSize={fontSize}
                            _hover={{ bg: 'transparent' }}
                        >
                            {selectedCountry.dialing_code}
                        </Button>
                    </PopoverTrigger>
                    <Portal>
                        <PopoverContent
                            ref={ref}
                            bg={dropdownBg}
                            border="1px"
                            borderColor={dropdownBorder}
                            boxShadow="lg"
                            borderRadius="md"
                            minW="300px"
                            maxW="400px"
                            zIndex={9999}
                        >
                            <PopoverBody p={0}>
                                <VStack spacing={0} align="stretch">
                                    <Box p={3} borderBottom="1px" borderColor={dropdownBorder}>
                                        <Input
                                            placeholder="Search countries..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                            size="sm"
                                            bg={bg}
                                            border="1px"
                                            borderColor={borderColor}
                                        />
                                    </Box>
                                    <Box maxH="250px" overflowY="auto">
                                        {isLoading ? (
                                            <Box p={4} textAlign="center">
                                                <Spinner size="sm" mb={2} />
                                                <Text fontSize="sm" color={mutedTextColor}>
                                                    Loading countries...
                                                </Text>
                                            </Box>
                                        ) : filteredCountries.length > 0 ? (
                                            filteredCountries.map((country, index) => (
                                                <Button
                                                    key={index}
                                                    variant="ghost"
                                                    w="full"
                                                    h="auto"
                                                    p={3}
                                                    justifyContent="flex-start"
                                                    borderRadius="none"
                                                    _hover={{ bg: hoverBg }}
                                                    onClick={() => handleCountrySelect(country)}
                                                    bg={selectedCountry?.code === country.code ? hoverBg : 'transparent'}
                                                >
                                                    <HStack spacing={3} w="full">
                                                        {country.flag_url ? (
                                                            <Image
                                                                src={country.flag_url}
                                                                alt={country.name}
                                                                w="24px"
                                                                h="18px"
                                                                objectFit="cover"
                                                                borderRadius="2px"
                                                                flexShrink={0}
                                                            />
                                                        ) : (
                                                            <Box w="24px" h="18px" bg="gray.200" borderRadius="2px" flexShrink={0} />
                                                        )}
                                                        <VStack align="start" spacing={0} flex={1} minW={0}>
                                                            <Box
                                                                fontSize="sm"
                                                                fontWeight="medium"
                                                                color={textColor}
                                                                isTruncated
                                                                w="full"
                                                            >
                                                                {country.name}
                                                            </Box>
                                                            <Box fontSize="xs" color={mutedTextColor}>
                                                                {country.dialing_code}
                                                            </Box>
                                                        </VStack>
                                                    </HStack>
                                                </Button>
                                            ))
                                        ) : (
                                            <Box p={4} textAlign="center">
                                                <Text fontSize="sm" color={mutedTextColor}>
                                                    No countries found
                                                </Text>
                                            </Box>
                                        )}
                                    </Box>
                                </VStack>
                            </PopoverBody>
                        </PopoverContent>
                    </Portal>
                </Popover>
            </InputLeftElement>
            <Input
                type="tel"
                placeholder={placeholder}
                value={value}
                onChange={handlePhoneChange}
                pl="120px" // Space for country selector
                bg={bg}
                border={border}
                borderColor={isInvalid ? 'red.500' : borderColor}
                _hover={_hover}
                _focus={_focus}
                fontSize={fontSize}
                h={h}
                {...props}
            />
            <InputRightElement h={h} pointerEvents="none">
                <AiOutlinePhone color="gray" />
            </InputRightElement>
        </InputGroup>
    );
});

PhoneInput.displayName = 'PhoneInput';

export default PhoneInput;