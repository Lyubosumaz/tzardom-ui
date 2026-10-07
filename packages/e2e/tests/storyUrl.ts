// The address of one story on its own, without Storybook's sidebar around it.
// A story's id is its title and its name in lowercase, joined by "--": the
// "WithProvider" story titled "ReactComponentLibrary/TzarThemeToggle" is
// "reactcomponentlibrary-tzarthemetoggle--with-provider".
export const storyUrl = (id: string) => `/iframe.html?id=${id}&viewMode=story`
