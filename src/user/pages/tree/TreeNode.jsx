// // TreeNode.jsx
// import React from "react";
// import {
//     Box,
//     Flex,
//     Text,
//     Image,
//     VStack,
//     Tooltip,
//     useBreakpointValue,
// } from "@chakra-ui/react";

// const TreeNode = ({ user, level = 1 }) => {
//     if (!user) return null;

//     const firstChild = user.children?.[1]; // Goes to right
//     const secondChild = user.children?.[0]; // Goes to left

//     const nodeColor = ["orange.400", "purple.600", "blue.600"][(level - 1) % 3];

//     return (
//         <VStack spacing={8} position="relative">
//             <Box textAlign="center" position="relative">
//                 <Tooltip
//                     label={
//                         <Box p={2}>
//                             <Text fontWeight="bold">{user.name}</Text>
//                             <Text fontSize="sm">ID: {user.id}</Text>
//                             {user.rank && <Text fontSize="xs">Rank: {user.rank}</Text>}
//                             {user.package && <Text fontSize="xs">Package: {user.package}</Text>}
//                         </Box>
//                     }
//                     hasArrow
//                     placement="bottom"
//                     bg="gray.700"
//                     color="white"
//                 >
//                     <Flex
//                         direction="column"
//                         align="center"
//                         bg={nodeColor}
//                         color="white"
//                         p={4}
//                         borderRadius="md"
//                         boxShadow="lg"
//                         w="200px"
//                     >
//                         <Image
//                             src={user.img}
//                             boxSize="65px"
//                             borderRadius="full"
//                             border="2px solid white"
//                             mb={2}
//                             bg="white"
//                         />
//                         <Text fontSize="sm" fontWeight="bold">
//                             {user.name}
//                         </Text>
//                         <Text fontSize="xs">{user.id}</Text>
//                     </Flex>
//                 </Tooltip>
//             </Box>

//             {(firstChild || secondChild) && (
//                 <Box position="relative" w="full">
//                     {/* Vertical line */}
//                     <Box
//                         position="absolute"
//                         top={-4}
//                         left="50%"
//                         transform="translateX(-1px)"
//                         h="20px"
//                         w="2px"
//                         bg="black"
//                     />

//                     <Flex justify="center" gap={8} wrap="wrap" pt={8} position="relative">
//                         {firstChild && (
//                             <Box position="relative">
//                                 {/* Horizontal + vertical line */}
//                                 <Box
//                                     position="absolute"
//                                     top={-8}
//                                     left="50%"
//                                     transform="translateX(-50%)"
//                                     h="8px"
//                                     w="2px"
//                                     bg="black"
//                                 />
//                                 <TreeNode user={firstChild} level={level + 1} />
//                             </Box>
//                         )}

//                         {secondChild && (
//                             <Box position="relative">
//                                 <Box
//                                     position="absolute"
//                                     top={-8}
//                                     left="50%"
//                                     transform="translateX(-50%)"
//                                     h="8px"
//                                     w="2px"
//                                     bg="black"
//                                 />
//                                 <TreeNode user={secondChild} level={level + 1} />
//                             </Box>
//                         )}
//                     </Flex>
//                 </Box>
//             )}
//         </VStack>
//     );
// };

// export default TreeNode;

// TreeNode.jsx
import React from "react";
import {
    Box,
    Flex,
    Text,
    Image,
    VStack,
    Tooltip,
    useBreakpointValue,
} from "@chakra-ui/react";

const TreeNode = ({ user, level = 1 }) => {
    if (!user) return null;

    const firstChild = user.children?.[1]; // Goes to right
    const secondChild = user.children?.[0]; // Goes to left

    const nodeColor = ["orange.400", "purple.600", "blue.600"][(level - 1) % 3];

    const lineHeight = useBreakpointValue({ base: "30px", md: "50px" });
    const lineWidth = useBreakpointValue({ base: "20px", md: "60px" });

    return (
        <VStack spacing={8} position="relative" w="full">
            <Box textAlign="center" position="relative">
                <Tooltip
                    label={
                        <Box p={2}>
                            <Text fontWeight="bold">{user.name}</Text>
                            <Text fontSize="sm">ID: {user.id}</Text>
                            {user.rank && <Text fontSize="xs">Rank: {user.rank}</Text>}
                            {user.package && <Text fontSize="xs">Package: {user.package}</Text>}
                        </Box>
                    }
                    hasArrow
                    placement="bottom"
                    bg="gray.700"
                    color="white"
                >
                    <Flex
                        direction="column"
                        align="center"
                        bg={nodeColor}
                        color="white"
                        p={4}
                        borderRadius="md"
                        boxShadow="lg"
                        w="200px"
                    >
                        <Image
                            src={user.img}
                            boxSize="65px"
                            borderRadius="full"
                            border="2px solid white"
                            mb={2}
                            bg="white"
                        />
                        <Text fontSize="sm" fontWeight="bold">
                            {user.name}
                        </Text>
                        <Text fontSize="xs">{user.id}</Text>
                    </Flex>
                </Tooltip>
            </Box>

            {(firstChild || secondChild) && (
                <Box position="relative" w="full">
                    {/* Vertical line */}
                    <Box
                        position="absolute"
                        top={0}
                        left="50%"
                        transform="translateX(-50%)"
                        height={lineHeight}
                        width="2px"
                        bg="black"
                    />

                    <Flex
                        justify="space-around"
                        wrap="wrap"
                        pt={lineHeight}
                        position="relative"
                        w="full"
                    >
                        {/* Horizontal line */}
                        <Box
                            position="absolute"
                            top={0}
                            left="25%"
                            width="50%"
                            height="2px"
                            bg="black"
                        />

                        {secondChild && (
                            <Box position="relative" flexShrink={0} minW="200px">
                                <Box
                                    position="absolute"
                                    top={-lineHeight}
                                    left="50%"
                                    transform="translateX(-50%)"
                                    width="2px"
                                    height={lineHeight}
                                    bg="black"
                                />
                                <TreeNode user={secondChild} level={level + 1} />
                            </Box>
                        )}

                        {firstChild && (
                            <Box position="relative" flexShrink={0} minW="200px">
                                <Box
                                    position="absolute"
                                    top={-lineHeight}
                                    left="50%"
                                    transform="translateX(-50%)"
                                    width="2px"
                                    height={lineHeight}
                                    bg="black"
                                />
                                <TreeNode user={firstChild} level={level + 1} />
                            </Box>
                        )}
                    </Flex>
                </Box>
            )}
        </VStack>
    );
};

export default TreeNode;

