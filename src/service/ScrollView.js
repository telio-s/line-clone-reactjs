export const scrollToBottom = (dummy) => {
  dummy.current.scrollIntoView({
    behavior: "smooth",
  });
};
