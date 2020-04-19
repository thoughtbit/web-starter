// Filter for article status
const articleStatus = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: "success",
    draft: "info",
    deleted: "danger"
  };
  return statusMap[status];
};

export {
  articleStatus
}
