// The URL of one story, without Storybook's sidebar.
// id: "<title>--<story name>", lowercase with dashes,
// e.g. "reactcomponentlibrary-tzarthemetoggle--with-provider".
export const storyUrl = (id: string) => `/iframe.html?id=${id}&viewMode=story`
