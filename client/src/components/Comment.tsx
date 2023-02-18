import { useState, FormEvent } from "react";
import { Flex, Box, Text, Textarea } from "@chakra-ui/react";
import { format } from "date-fns";
import axios from "axios";
import { mdiSquareEditOutline, mdiDelete, mdiArrowRightBold } from "@mdi/js";
import OnClickIcon from "./OnClickIcon";

interface Props {
  comment: Comment;
}

interface Comment {
  _id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  text: string;
  user_id: string;
  exit_id: string;
}

export default function Comment({ comment }: Props) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState(comment.text);
  let privileges: boolean;
  if (localStorage.getItem("user_id") == comment.user_id) {
    privileges = true;
  } else {
    privileges = false;
  }

  const url = `http://localhost:8080/exits`;

  async function updateComment(text: string) {
    try {
      //axios.put(`${url}`);
      console.log(comment.exit_id);
    } catch (err) {
      console.log(err);
    }
  }

  if (privileges && editMode) {
    return (
      <Flex borderBottom="1px solid black" p="1em" direction="column" gap="2em">
        <Textarea
          resize="none"
          value={value}
          border="1px solid #acacac"
          onChange={(e: any) => setValue(e.target.value)}
        />
        <Flex justifyContent="space-between" alignItems="end">
          <Text fontSize="0.9em">{`${comment.first_name} ${comment.last_name}`}</Text>
          <Text color="gray.500">
            {comment.created_at
              ? format(new Date(comment.created_at), "MMM do, y p")
              : null}
          </Text>
          <OnClickIcon
            path={mdiArrowRightBold}
            size={1}
            onClick={() => {
              updateComment(value);
            }}
          />
        </Flex>
      </Flex>
    );
  } else if (privileges) {
    return (
      <Flex direction="column" gap="2em" borderBottom="1px solid black" p="1em">
        <Box>{comment.text}</Box>

        <Flex justifyContent="space-between" alignItems="end">
          <Text fontSize="0.9em">{`${comment.first_name} ${comment.last_name}`}</Text>
          <Text color="gray.500">
            {comment.created_at
              ? format(new Date(comment.created_at), "MMM do, y p")
              : null}
          </Text>
          <OnClickIcon
            path={mdiSquareEditOutline}
            size={1}
            onClick={() => setEditMode(true)}
          />
          <OnClickIcon path={mdiDelete} size={1} />
        </Flex>
      </Flex>
    );
  } else {
    return (
      <Flex borderBottom="1px solid black" p="1em" direction="column" gap="2em">
        <Box>{comment.text}</Box>

        <Flex justifyContent="space-between" alignItems="end">
          <Text fontSize="0.9em">{`${comment.first_name} ${comment.last_name}`}</Text>
          <Text color="gray.500">
            {comment.created_at
              ? format(new Date(comment.created_at), "MMM do, y p")
              : null}
          </Text>
        </Flex>
      </Flex>
    );
  }
}
