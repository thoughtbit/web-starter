export type TabOptions = {
  title: string;
  name: string;
  fullPath: string;
  query?: any;
};

export type TabBarState = {
  tabList: TabOptions[];
  cacheTabList: Set<string>;
};
