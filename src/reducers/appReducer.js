export function app(
  state = {
    name: 'App React',
    lang: 'en',
    updateAt: Date.now()
  },
  action
) {
  switch (action.type) {
    default:
      return state;
  }
}
