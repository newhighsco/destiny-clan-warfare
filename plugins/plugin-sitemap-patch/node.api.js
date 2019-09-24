export default () => {
  return {
    afterExport: async state => {
      const {
        config: { publicPath }
      } = state

      if (!process.env.REACT_STATIC_PUBLIC_PATH) {
        process.env.REACT_STATIC_PUBLIC_PATH = publicPath
      }
    }
  }
}
