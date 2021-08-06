import { Button, Dialog, TextField } from "@material-ui/core";

function CreateGroupDialog(props) {
  const { open, onClose } = props;
  // const [group, setGroup] = useState("");

  function handleClose() {
    onClose();
  }

  function handelCreateGroup() {
    console.log("create group");
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <h1>CreateGroup</h1>
        <form onSubmit={handelCreateGroup}>
          <TextField placeholder="Group Name" />
          <Button type="submit">Create</Button>
        </form>
      </Dialog>
    </div>
  );
}

export default CreateGroupDialog;
