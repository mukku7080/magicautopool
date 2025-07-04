import React, { useState, useEffect, useRef } from 'react';
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

const PhoneInput = ({
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
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({
        name: 'United States',
        code: 'US',
        dialing_code: '+1',
        flag_url: 'https://flagcdn.com/w320/us.png'
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiCalled, setApiCalled] = useState(false);
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

    // Set initial value with default USA country code
    useEffect(() => {
        if (!value || value === '') {
            console.log('🏁 Setting initial USA country code');
            onChange('+1 ');
        }
    }, []);

    // Fetch countries data from API
    const fetchCountries = async () => {
        if (apiCalled) return; // Don't call API if already called

        try {
            setLoading(true);
            setApiCalled(true);
            console.log('🌐 Calling countries API...');
            const response = await fetch('https://api.onnbit.com/api/countries/dialing-code');
            const result = await response.json();

            if (result.status && result.data) {
                console.log('✅ Countries API successful, loaded', result.data.length, 'countries');
                setCountries(result.data);

                // Find USA from API data and update selected country
                const usaCountry = result.data.find(country =>
                    country.dialing_code === '+1' && country.name.toLowerCase().includes('united states')
                ) || result.data.find(country => country.dialing_code === '+1');

                if (usaCountry) {
                    console.log('🇺🇸 Updated to USA country from API:', usaCountry.name);
                    setSelectedCountry(usaCountry);
                }
            }
        } catch (error) {
            console.error('Error fetching countries:', error);
            // Keep the default country on error
            setCountries([selectedCountry]);
        } finally {
            setLoading(false);
        }
    };

    // Handle dropdown open and fetch countries if not already done
    const handleDropdownOpen = () => {
        console.log('📱 Dropdown opened, fetching countries...');
        onOpen();
        fetchCountries();
    };

    // Update selected country when value changes externally
    useEffect(() => {
        if (value && countries.length > 0) {
            const countryCode = value.split(' ')[0];
            const country = countries.find(c => c.dialing_code === countryCode);
            if (country && country !== selectedCountry) {
                setSelectedCountry(country);
            }
        } else if (!value && countries.length > 0 && selectedCountry) {
            // If value is empty/reset, set default US country code
            const usaCountry = countries.find(country =>
                country.dialing_code === '+1' && country.name.toLowerCase().includes('united states')
            ) || countries.find(country => country.dialing_code === '+1');

            if (usaCountry && onChange) {
                onChange(usaCountry.dialing_code + ' ');
            }
        }
    }, [value, countries, selectedCountry, onChange]);

    const filteredCountries = countries.length > 0
        ? countries.filter(country =>
            country?.name?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
            country?.dialing_code?.includes(searchTerm) ||
            country?.code?.toLowerCase()?.includes(searchTerm.toLowerCase())
        )
        : [selectedCountry].filter(country =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            country.dialing_code.includes(searchTerm) ||
            country.code.toLowerCase().includes(searchTerm.toLowerCase())
        );

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        onClose();
        setSearchTerm('');
        // Update the full phone number with new country code
        const phoneNumber = value?.replace(/^\+\d+\s*/, '') || '';
        onChange(country.dialing_code + ' ' + phoneNumber);
    };

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        if (selectedCountry) {
            const fullPhoneNumber = selectedCountry.dialing_code + ' ' + phoneNumber;
            onChange(fullPhoneNumber);
        }
    };

    // Extract just the phone number part (without country code)
    const phoneNumber = value?.replace(/^\+\d+\s*/, '') || '';



    return (
        <Box position="relative">
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
                                h="auto"
                                minW="auto"
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: hoverBg }}
                                onClick={handleDropdownOpen}
                                isDisabled={!selectedCountry}
                            >
                                <HStack spacing={1}>
                                    {selectedCountry?.flag_url ? (
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
                                    )}
                                    <Box fontSize="sm" color={textColor} minW="30px">
                                        {selectedCountry?.dialing_code || '+1'}
                                    </Box>
                                    <ChevronDownIcon color={mutedTextColor} boxSize={3} />
                                </HStack>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent
                                ref={ref}
                                w="320px"
                                bg={dropdownBg}
                                border="1px"
                                borderColor={dropdownBorder}
                                shadow="lg"
                                zIndex={1000}
                            >
                                <PopoverBody p={0}>
                                    <VStack spacing={0} align="stretch">
                                        <Box p={3} borderBottom="1px" borderColor={dropdownBorder}>
                                            <Input
                                                placeholder="Search country..."
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                                size="sm"
                                                bg={bg}
                                                border="1px"
                                                borderColor={borderColor}
                                            />
                                        </Box>
                                        <Box maxH="250px" overflowY="auto">
                                            {loading ? (
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
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    pl="90px" // Adjust padding to accommodate the country code button
                    bg={bg}
                    border={border}
                    borderColor={borderColor}
                    _hover={_hover}
                    _focus={_focus}
                    fontSize={fontSize}
                    h={h}
                    isInvalid={isInvalid}
                    {...props}
                />
                <InputRightElement h={h}>
                    <AiOutlinePhone color="gray" />
                </InputRightElement>
            </InputGroup>
        </Box>
    );
};

export default PhoneInput;