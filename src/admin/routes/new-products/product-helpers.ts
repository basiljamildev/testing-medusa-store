export const getProductStatusColor = (status: string) => {
  let modifyStatus = {
    color: "",
    text: "",
  };
  switch (status) {
    case "published":
      modifyStatus.color = "green";
      modifyStatus.text = "Published";
      break;
    case "draft":
      modifyStatus.color = "grey";
      modifyStatus.text = "Draft";
      break;
    case "rejected":
      modifyStatus.color = "red";
      modifyStatus.text = "Rejected";
      break;
    case "proposed":
      modifyStatus.color = "orange";
      modifyStatus.text = "Proposed";
      break;
    default:
      modifyStatus.color = "grey";
      modifyStatus.text = "Draft";
  }
  return modifyStatus;
};
