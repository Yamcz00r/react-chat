import React from "react";

const LazyLoadedLoginPanel = React.lazy(() => import('./pages/Login'));

export default LazyLoadedLoginPanel;

