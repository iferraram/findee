export const getMediaType = (urlString) => {
  const types = new Map([
    ["jpg", "img"],
    ["gif", "img"],
    ["mp4", "video"],
    ["3gp", "video"],
  ]);

  const url = new URL(urlString);
  const extension = url.pathname.split(".")[1];

  const element = types.get(extension);
  element.src = url;
};
