import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    Card,
    CardHeader,
    CardBody,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Grid,
    GridItem,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    useToast,
    useColorModeValue,
    Badge,
    Divider,
    Alert,
    AlertIcon,
    Icon,
    Flex,
    Link,
    Avatar,
    AvatarGroup,
    Progress,
    SimpleGrid,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
} from '@chakra-ui/react';
import {
    FiUsers,
    FiCopy,
    FiShare2,
    FiDollarSign,
    FiTrendingUp,
    FiGift,
    FiExternalLink,
    FiStar,
    FiAward,
} from 'react-icons/fi';
import { BiMoney, BiQrScan } from 'react-icons/bi';
import { AiOutlineLink, AiOutlineQrcode } from 'react-icons/ai';
import { useUser } from '../../Context/UserContext';

const Referrals = () => {
    const [copied, setCopied] = useState(false);
    const [shareMethod, setShareMethod] = useState('');
    const toast = useToast();
    const { profile, getUserName, isProfileLoaded } = useUser();
    const { isOpen: isQROpen, onOpen: onQROpen, onClose: onQRClose } = useDisclosure();

    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.200', 'gray.700');
    const bgGradient = useColorModeValue(
        'linear(to-br, blue.50, purple.50, pink.50)',
        'linear(to-br, gray.900, blue.900, purple.900)'
    );

    // Get referral code from profile
    const referralCode = profile?.USER?.my_code || 'LOADING';
    const referralLink = `${window.location.origin}/login?invitecode=${referralCode}`;

    // QR Code URL (using qr-server.com free service)
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(referralLink)}`;

    // Mock data - replace with real data from API
    const referralStats = {
        totalReferrals: 15,
        activeReferrals: 12,
        totalEarnings: 2450.75,
        monthlyEarnings: 180.50,
        pendingRewards: 95.25,
        conversionRate: 75,
    };

    // Mock referral list - replace with real data
    const recentReferrals = [
        { id: 1, name: 'John Smith', email: 'john@example.com', joinDate: '2024-01-15', status: 'Active', earnings: 25.50 },
        { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', joinDate: '2024-01-10', status: 'Active', earnings: 18.75 },
        { id: 3, name: 'Mike Brown', email: 'mike@example.com', joinDate: '2024-01-08', status: 'Pending', earnings: 0 },
    ];

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(referralLink);
            setCopied(true);
            toast({
                title: 'Link Copied!',
                description: 'Referral link has been copied to your clipboard.',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            toast({
                title: 'Copy Failed',
                description: 'Failed to copy link. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const shareViaMethod = (method) => {
        const message = `Join NessanForex and start earning! Use my referral link: ${referralLink}`;

        switch (method) {
            case 'whatsapp':
                window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'telegram':
                window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent('Join NessanForex and start earning!')}`, '_blank');
                break;
            case 'twitter':
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
                break;
            default:
                copyToClipboard();
        }

        toast({
            title: `Sharing via ${method}`,
            description: 'Opening share dialog...',
            status: 'info',
            duration: 2000,
            isClosable: true,
        });
    };

    return (
        <Box minH="100vh" bg={bgGradient}>
            <Container maxW="7xl" py={8}>
                <VStack spacing={8}>
                    {/* Header Section */}
                    <VStack spacing={4} textAlign="center">
                        <HStack spacing={3}>
                            <Icon as={FiUsers} boxSize={10} color="blue.500" />
                            <Heading size="xl" bgGradient="linear(to-r, blue.400, purple.500)" bgClip="text">
                                Referral Program
                            </Heading>
                        </HStack>
                        <Text fontSize="lg" color="gray.600" maxW="2xl">
                            Earn rewards by inviting friends to join NessanForex. Share your unique referral link and get rewarded for every successful signup!
                        </Text>
                        <Badge colorScheme="purple" fontSize="md" px={3} py={1}>
                            Earn up to $50 per referral
                        </Badge>
                    </VStack>

                    {/* Profile Not Loaded Alert */}
                    {!isProfileLoaded() && (
                        <Alert status="warning" borderRadius="lg" maxW="4xl">
                            <AlertIcon />
                            <Box>
                                <Text fontWeight="bold">Profile Not Loaded</Text>
                                <Text fontSize="sm">
                                    Please wait while we load your profile to generate your referral link.
                                </Text>
                            </Box>
                        </Alert>
                    )}

                    {/* Referral Link Card */}
                    <Card bg={cardBg} border="1px" borderColor={borderColor} shadow="xl" w="full" maxW="4xl">
                        <CardHeader>
                            <HStack justify="space-between">
                                <HStack spacing={3}>
                                    <Icon as={AiOutlineLink} color="blue.500" boxSize={6} />
                                    <VStack align="start" spacing={0}>
                                        <Heading size="md">Your Referral Link</Heading>
                                        <Text fontSize="sm" color="gray.600">
                                            Share this link to start earning rewards
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Badge colorScheme="green" variant="subtle">
                                    Code: {referralCode}
                                </Badge>
                            </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                            <VStack spacing={4}>
                                <HStack spacing={2}>
                                    <InputGroup size="lg" flex="1">
                                        <Input
                                            value={referralLink}
                                            isReadOnly
                                            bg="gray.50"
                                            border="2px"
                                            borderColor="blue.200"
                                            _focus={{ borderColor: 'blue.400' }}
                                            fontSize="sm"
                                            fontFamily="mono"
                                        />
                                        <InputRightElement width="4.5rem">
                                            <Button
                                                h="1.75rem"
                                                size="sm"
                                                colorScheme={copied ? 'green' : 'blue'}
                                                onClick={copyToClipboard}
                                                leftIcon={<FiCopy />}
                                            >
                                                {copied ? 'Copied!' : 'Copy'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <Button
                                        size="lg"
                                        colorScheme="purple"
                                        leftIcon={<AiOutlineQrcode />}
                                        onClick={onQROpen}
                                        isDisabled={referralCode === 'LOADING'}
                                    >
                                        QR Code
                                    </Button>
                                </HStack>

                                <Divider />

                                <VStack spacing={3}>
                                    <Text fontWeight="semibold" color="gray.700">
                                        Share via social media
                                    </Text>
                                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={3} w="full">
                                        <Button
                                            colorScheme="whatsapp"
                                            leftIcon={<FiShare2 />}
                                            onClick={() => shareViaMethod('whatsapp')}
                                            size="sm"
                                        >
                                            WhatsApp
                                        </Button>
                                        <Button
                                            colorScheme="telegram"
                                            leftIcon={<FiShare2 />}
                                            onClick={() => shareViaMethod('telegram')}
                                            size="sm"
                                        >
                                            Telegram
                                        </Button>
                                        <Button
                                            colorScheme="twitter"
                                            leftIcon={<FiShare2 />}
                                            onClick={() => shareViaMethod('twitter')}
                                            size="sm"
                                        >
                                            Twitter
                                        </Button>
                                        <Button
                                            colorScheme="facebook"
                                            leftIcon={<FiShare2 />}
                                            onClick={() => shareViaMethod('facebook')}
                                            size="sm"
                                        >
                                            Facebook
                                        </Button>
                                    </SimpleGrid>
                                </VStack>
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Stats Cards */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <Icon as={FiUsers} color="blue.500" />
                                            <Text>Total Referrals</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber fontSize="3xl" color="blue.500">
                                        {referralStats.totalReferrals}
                                    </StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        {referralStats.activeReferrals} active
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>

                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <Icon as={FiDollarSign} color="green.500" />
                                            <Text>Total Earnings</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber fontSize="3xl" color="green.500">
                                        ${referralStats.totalEarnings}
                                    </StatNumber>
                                    <StatHelpText>
                                        <StatArrow type="increase" />
                                        ${referralStats.monthlyEarnings} this month
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>

                        <Card bg={cardBg} border="1px" borderColor={borderColor}>
                            <CardBody>
                                <Stat>
                                    <StatLabel>
                                        <HStack>
                                            <Icon as={FiTrendingUp} color="purple.500" />
                                            <Text>Conversion Rate</Text>
                                        </HStack>
                                    </StatLabel>
                                    <StatNumber fontSize="3xl" color="purple.500">
                                        {referralStats.conversionRate}%
                                    </StatNumber>
                                    <StatHelpText>
                                        <Progress value={referralStats.conversionRate} colorScheme="purple" size="sm" />
                                    </StatHelpText>
                                </Stat>
                            </CardBody>
                        </Card>
                    </SimpleGrid>

                    {/* How it Works */}
                    <Card bg={cardBg} border="1px" borderColor={borderColor} w="full">
                        <CardHeader>
                            <HStack spacing={3}>
                                <Icon as={FiGift} color="orange.500" boxSize={6} />
                                <Heading size="md">How It Works</Heading>
                            </HStack>
                        </CardHeader>
                        <CardBody>
                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                                <VStack spacing={3} textAlign="center">
                                    <Box p={4} bg="blue.100" borderRadius="full">
                                        <Icon as={FiShare2} color="blue.500" boxSize={8} />
                                    </Box>
                                    <VStack spacing={1}>
                                        <Text fontWeight="bold" fontSize="lg">1. Share Your Link</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Copy and share your unique referral link with friends and family
                                        </Text>
                                    </VStack>
                                </VStack>

                                <VStack spacing={3} textAlign="center">
                                    <Box p={4} bg="green.100" borderRadius="full">
                                        <Icon as={FiUsers} color="green.500" boxSize={8} />
                                    </Box>
                                    <VStack spacing={1}>
                                        <Text fontWeight="bold" fontSize="lg">2. Friend Signs Up</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Your friend registers using your referral link and becomes active
                                        </Text>
                                    </VStack>
                                </VStack>

                                <VStack spacing={3} textAlign="center">
                                    <Box p={4} bg="purple.100" borderRadius="full">
                                        <Icon as={FiAward} color="purple.500" boxSize={8} />
                                    </Box>
                                    <VStack spacing={1}>
                                        <Text fontWeight="bold" fontSize="lg">3. Earn Rewards</Text>
                                        <Text fontSize="sm" color="gray.600">
                                            Get your reward instantly when your friend completes their first transaction
                                        </Text>
                                    </VStack>
                                </VStack>
                            </SimpleGrid>
                        </CardBody>
                    </Card>

                    {/* Recent Referrals */}
                    <Card bg={cardBg} border="1px" borderColor={borderColor} w="full">
                        <CardHeader>
                            <HStack justify="space-between">
                                <HStack spacing={3}>
                                    <Icon as={FiUsers} color="blue.500" boxSize={6} />
                                    <Heading size="md">Recent Referrals</Heading>
                                </HStack>
                                <Button size="sm" variant="outline" rightIcon={<FiExternalLink />}>
                                    View All
                                </Button>
                            </HStack>
                        </CardHeader>
                        <CardBody pt={0}>
                            <VStack spacing={4} align="stretch">
                                {recentReferrals.map((referral) => (
                                    <Box key={referral.id} p={4} bg="gray.50" borderRadius="lg">
                                        <HStack justify="space-between">
                                            <HStack spacing={3}>
                                                <Avatar size="sm" name={referral.name} />
                                                <VStack align="start" spacing={0}>
                                                    <Text fontWeight="semibold">{referral.name}</Text>
                                                    <Text fontSize="sm" color="gray.600">{referral.email}</Text>
                                                </VStack>
                                            </HStack>
                                            <VStack align="end" spacing={1}>
                                                <Badge colorScheme={referral.status === 'Active' ? 'green' : 'orange'}>
                                                    {referral.status}
                                                </Badge>
                                                <Text fontSize="sm" fontWeight="bold" color="green.500">
                                                    ${referral.earnings}
                                                </Text>
                                            </VStack>
                                        </HStack>
                                    </Box>
                                ))}
                            </VStack>
                        </CardBody>
                    </Card>

                    {/* Rewards Info */}
                    <Alert status="info" borderRadius="lg">
                        <AlertIcon />
                        <Box>
                            <Text fontWeight="bold">Bonus Rewards Available!</Text>
                            <Text fontSize="sm">
                                Refer 5 friends this month and get an extra $25 bonus. Current progress: {referralStats.activeReferrals}/5
                            </Text>
                            <Progress value={(referralStats.activeReferrals / 5) * 100} colorScheme="blue" size="sm" mt={2} />
                        </Box>
                    </Alert>
                </VStack>
            </Container>

            {/* QR Code Modal */}
            <Modal isOpen={isQROpen} onClose={onQRClose} size="md" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <HStack spacing={3}>
                            <Icon as={AiOutlineQrcode} color="purple.500" />
                            <Text>QR Code - Referral Link</Text>
                        </HStack>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Box p={4} bg="white" borderRadius="lg" shadow="md">
                                <Image
                                    src={qrCodeUrl}
                                    alt="Referral QR Code"
                                    fallback={<Box w="200px" h="200px" bg="gray.200" borderRadius="md" />}
                                />
                            </Box>
                            <VStack spacing={2} textAlign="center">
                                <Text fontWeight="bold" fontSize="lg">
                                    Scan to Register
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Anyone can scan this QR code to register with your referral link
                                </Text>
                                <Badge colorScheme="purple" fontSize="sm">
                                    Code: {referralCode}
                                </Badge>
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={copyToClipboard}>
                            Copy Link
                        </Button>
                        <Button variant="ghost" onClick={onQRClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default Referrals;