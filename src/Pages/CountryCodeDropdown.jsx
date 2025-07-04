import { useEffect, useState } from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Flex,
    Box,
    Image,
    Spinner,
    Text
} from "@chakra-ui/react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { useOther } from "../Context/OtherContext";

const CountryCodeDropdown = ({ onCountryChange }) => {
    const { countryCode, getDialingCodes, isLoading } = useOther();
    const defaultOption = countryCode?.[0]?.dialing_code || "+1";
    const [selectedCountryCode, setSelectedCountryCode] = useState(defaultOption);
    const [searchTerm, setSearchTerm] = useState("");
    const [btnName, setBtnName] = useState(defaultOption);

    const filteredItems = (countryCode || []).filter((location) =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.dialing_code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle dropdown open - fetch countries only when opened
    const handleMenuOpen = () => {
        if (countryCode.length === 0 && !isLoading) {
            getDialingCodes();
        }
    };

    useEffect(() => {
        // Update button name when countryCode data is loaded
        if (countryCode.length > 0) {
            const defaultCountry = countryCode.find(c => c.dialing_code === "+1") || countryCode[0];
            setBtnName(defaultCountry.dialing_code);
            setSelectedCountryCode(defaultCountry.dialing_code);
        }
    }, [countryCode]);


    return (
        <>
            <Menu onOpen={handleMenuOpen}>
                <MenuButton
                    as={Button}
                    rightIcon={<MdKeyboardArrowDown />}
                    borderRightRadius={0}
                    w={'100%'}
                    size={'sm'}
                    isLoading={isLoading}
                >
                    <Flex gap={2} alignItems="center">
                        {/* Find selected country to show flag */}
                        {(() => {
                            const selectedCountry = countryCode.find(c => c.dialing_code === btnName);
                            return selectedCountry?.flag_url ? (
                                <Image boxSize={4} src={selectedCountry.flag_url} alt={selectedCountry.name} />
                            ) : null;
                        })()}
                        {btnName}
                    </Flex>
                </MenuButton>

                <MenuList p={2} borderRadius={0}
                    maxHeight="300px" // Limit height
                    overflowY="auto" // Enable scrolling
                    maxW={{ base: '252px', sm: 'none' }}
                >
                    {/* Search Box */}
                    <InputGroup mb={2}>
                        <InputLeftElement pointerEvents="none" pb={'6px'}>
                            <IoMdSearch color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search countries..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            size="sm"
                        />
                    </InputGroup>

                    {/* Menu Items */}
                    <VStack align="stretch" spacing={1}>
                        {isLoading ? (
                            <Box p={4} textAlign="center">
                                <Spinner size="sm" mb={2} />
                                <Text fontSize="sm" color="gray.500">
                                    Loading countries...
                                </Text>
                            </Box>
                        ) : filteredItems.length > 0 ? (
                            filteredItems.map((location, index) => (
                                <MenuItem key={index}
                                    _hover={{ bg: "blue.100" }}
                                    onClick={() => {
                                        setSelectedCountryCode(location.dialing_code);
                                        setBtnName(location.dialing_code);
                                        // Call parent callback if provided
                                        if (onCountryChange) {
                                            onCountryChange(location);
                                        }
                                    }}
                                >
                                    <Flex justifyContent={'space-between'} gap={5} w="full">
                                        <Flex gap={2} alignItems="center">
                                            <Image boxSize={5} src={location.flag_url} alt={location.name} />
                                            <Text fontSize="sm">{location.name}</Text>
                                        </Flex>
                                        <Box pl={10}>
                                            <Text fontSize="sm" fontWeight="bold">
                                                {location.dialing_code}
                                            </Text>
                                        </Box>
                                    </Flex>
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem isDisabled>
                                <Text fontSize="sm">No countries found</Text>
                            </MenuItem>
                        )}
                    </VStack>
                </MenuList>
            </Menu>
        </>
    );
};

export default CountryCodeDropdown;