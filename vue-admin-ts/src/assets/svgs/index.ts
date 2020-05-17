const requireAll = (requireContext: any) => requireContext.keys().map(requireContext);
const requireAnt = require.context("./ant", true, /\.svg$/);
requireAll(requireAnt);

