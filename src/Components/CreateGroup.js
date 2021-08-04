import { ListItem } from "@material-ui/core";

function CreateGroup() {
  function handleCreateGroupDialog() {}
  return (
    <div>
      <ListItem>
        <h1>Search for friends</h1>
      </ListItem>
      <ListItem button onClick={handleCreateGroupDialog}>
        <h1>Create a Group</h1>
      </ListItem>
    </div>
  );
}

export default CreateGroup;
