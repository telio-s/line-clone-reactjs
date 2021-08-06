import { Dialog } from "@material-ui/core";

function AddFriendTest(props) {
  const { open, onClose } = props;

  function handleClose() {
    onClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <div></div>
    </Dialog>
  );
}

export default AddFriendTest;
