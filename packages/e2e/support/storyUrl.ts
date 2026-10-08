// The URL of one story, without Storybook's sidebar.
// id: "<title>--<story name>", lowercase with dashes,
// e.g. "reactcomponentlibrary-tzarthemetoggle--default".
export const storyUrl = (id: string) => `/iframe.html?id=${id}&viewMode=story`
