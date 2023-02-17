import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputRightAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Checkbox,
} from "@chakra-ui/react";

import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import axios from "axios";

type FormData = {
  name: string;
  description: string;
  type: string;
  heightImpact: number;
  heightLanding: number;
  lat: number;
  long: number;
  state: string;
  city: string;
  country: string;
  image: string;
  legal: boolean;
};

const INITIAL_DATA: FormData = {
  name: "",
  description: "",
  type: "",
  heightImpact: 0,
  heightLanding: 0,
  lat: 0,
  long: 0,
  state: "",
  city: "",
  country: "",
  image: "",
  legal: true,
};

type Form1Data = {
  name: string;
  type: string;
  description: string;
  image: string;
};

type Form1Props = Form1Data & {
  updateFields: (fields: Partial<Form1Data>) => void;
};

const Form1 = ({
  name,
  type,
  description,
  image,
  updateFields,
}: Form1Props) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Object Information
      </Heading>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" fontWeight={"normal"}>
            Name of Exit
          </FormLabel>
          <Input
            id="name"
            value={name}
            onChange={(e) => updateFields({ name: e.target.value })}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="type" fontWeight={"normal"}>
            Type of Object
          </FormLabel>
          <Select
            placeholder="Select type"
            value={type}
            onChange={(e) => updateFields({ type: e.target.value })}
          >
            <option value="Building">Building</option>
            <option value="Antenna">Antenna</option>
            <option value="Span">Span</option>
            <option value="Earth">Earth</option>
          </Select>
        </FormControl>
      </Flex>
      <FormControl mr="5%">
        <FormLabel htmlFor="name" fontWeight={"normal"}>
          Image link
        </FormLabel>
        <Input
          id="name"
          value={image}
          onChange={(e) => updateFields({ image: e.target.value })}
        />
      </FormControl>
      <FormControl mt="2%">
        <FormLabel htmlFor="description" fontWeight={"normal"}>
          Description
        </FormLabel>
        <Textarea
          rows={3}
          shadow="sm"
          focusBorderColor="brand.400"
          fontSize={{
            sm: "sm",
          }}
          value={description}
          onChange={(e) => updateFields({ description: e.target.value })}
        />
        <FormHelperText>
          Please describe in detail information required to jump the object.
        </FormHelperText>
      </FormControl>
    </>
  );
};

type Form2Data = {
  heightImpact: number;
  heightLanding: number;
};

type Form2Props = Form2Data & {
  updateFields: (fields: Partial<Form2Data>) => void;
};

const Form2 = ({ heightImpact, heightLanding, updateFields }: Form2Props) => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Height Data
      </Heading>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="heightImpact"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Height until impact
        </FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            name="heightImpact"
            id="heightImpact"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={heightImpact || ""}
            onChange={(e) =>
              updateFields({ heightImpact: parseInt(e.target.value) })
            }
          />
          <InputRightAddon
            bg="gray.50"
            _dark={{
              bg: "gray.800",
            }}
            color="gray.500"
            rounded="md"
          >
            feet
          </InputRightAddon>
        </InputGroup>
      </FormControl>
      <FormControl as={GridItem} colSpan={6}>
        <FormLabel
          htmlFor="heightLanding"
          fontSize="sm"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Height until landing
        </FormLabel>
        <InputGroup size="sm">
          <Input
            type="number"
            name="heightLanding"
            id="heightLanding"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={heightLanding || ""}
            onChange={(e) =>
              updateFields({ heightLanding: parseInt(e.target.value) })
            }
          />
          <InputRightAddon
            bg="gray.50"
            _dark={{
              bg: "gray.800",
            }}
            color="gray.500"
            rounded="md"
          >
            feet
          </InputRightAddon>
        </InputGroup>
      </FormControl>
    </>
  );
};

type Form3Data = {
  lat: number;
  long: number;
  state: string;
  city: string;
  country: string;
  legal: boolean;
};

type Form3Props = Form3Data & {
  updateFields: (fields: Partial<Form3Data>) => void;
};

const Form3 = ({
  lat,
  long,
  state,
  city,
  country,
  legal,
  updateFields,
}: Form3Props) => {
  const [isLegal, setIsLegal] = useState(true);

  function handleCheckbox() {
    const legality = isLegal;
    setIsLegal(!legality);
    updateFields({ legal: !legality });
  }

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Location Data
      </Heading>
      <SimpleGrid columns={2} spacing={6}>
        <FormControl as={GridItem}>
          <FormLabel
            htmlFor="city"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            City
          </FormLabel>
          <Input
            type="text"
            name="city"
            id="city"
            autoComplete="city"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={city}
            onChange={(e) => updateFields({ city: e.target.value })}
          />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel
            htmlFor="state"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            State / Province
          </FormLabel>
          <Input
            type="text"
            name="state"
            id="state"
            autoComplete="state"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={state}
            onChange={(e) => updateFields({ state: e.target.value })}
          />
        </FormControl>

        <FormControl as={GridItem} gridColumnEnd={4}>
          <FormLabel
            htmlFor="country"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Country
          </FormLabel>
          <Input
            type="text"
            name="country"
            id="country"
            autoComplete="country"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={country}
            onChange={(e) => updateFields({ country: e.target.value })}
          />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel
            htmlFor="lat"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Latitude
          </FormLabel>
          <Input
            type="number"
            name="lat"
            max="90"
            min="-90"
            isInvalid={true}
            id="lat"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={lat || ""}
            onChange={(e: any) =>
              updateFields({ lat: parseInt(e.target.value) })
            }
          />
        </FormControl>

        <FormControl as={GridItem}>
          <FormLabel
            htmlFor="long"
            fontSize="sm"
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
            mt="2%"
          >
            Longitude
          </FormLabel>
          <Input
            type="number"
            name="long"
            id="long"
            focusBorderColor="brand.400"
            shadow="sm"
            size="sm"
            w="full"
            rounded="md"
            value={long || ""}
            onChange={(e) => updateFields({ long: parseInt(e.target.value) })}
          />
        </FormControl>

        <FormControl>
          <Checkbox isChecked={!isLegal} onChange={() => handleCheckbox()}>
            Illegal
          </Checkbox>
        </FormControl>
      </SimpleGrid>
    </>
  );
};

const exitsURL = "http://localhost:8080/exits";

async function addExit(data: FormData) {
  console.log("Exit axios post");
  try {
    await axios.post(exitsURL, {
      headers: {
        name: data.name,
        description: data.description,
        type: data.type,
        heightImpact: data.heightImpact,
        heightLanding: data.heightLanding,
        lat: data.lat,
        long: data.long,
        city: data.city,
        state: data.state,
        country: data.country,
        image: data.image,
        legal: data.legal,
      },
    });
  } catch (err) {
    if (err) throw err;
  }
}

export default function Multistep() {
  const toast = useToast();
  const [step, setStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(33.33);
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0,0,0.3)"
        maxWidth={800}
        p={6}
        m="10px auto"
        as="form"
      >
        <Progress
          hasStripe
          value={progress}
          colorScheme="green"
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? (
          <Form1 {...data} updateFields={updateFields} />
        ) : step === 2 ? (
          <Form2 {...data} updateFields={updateFields} />
        ) : (
          <Form3 {...data} updateFields={updateFields} />
        )}
        <ButtonGroup mt="5%" w="100%">
          <Flex w="100%" justifyContent="space-between">
            <Flex>
              <Button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(progress - 33.33);
                }}
                isDisabled={step === 1}
                colorScheme="green"
                variant="solid"
                w="7rem"
                mr="5%"
              >
                Back
              </Button>
              <Button
                w="7rem"
                isDisabled={step === 3}
                onClick={() => {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }}
                colorScheme="green"
                variant="outline"
              >
                Next
              </Button>
            </Flex>
            {step === 3 ? (
              <Button
                w="7rem"
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  toast({
                    title: "Thanks!",
                    description: "We've added the new exit point.",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                  });
                  addExit(data);
                }}
              >
                Submit
              </Button>
            ) : null}
          </Flex>
        </ButtonGroup>
      </Box>
    </>
  );
}
