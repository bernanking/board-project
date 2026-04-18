function getPostIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return Number(params.get("id"));
}
