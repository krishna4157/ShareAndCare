const tintColor = '#2f95dc';
var theme = 'dark'
const  DarkTheme = {
  appBackground: 'black',
  headerTabColor: 'red',
  // theme=='dark'?'#3498DB':'red',
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  FamilyHeader: '#F2F2F2',
  FriendsHeader: 'white',
  OthersHeader: '#F2F2F2'
};

const WhiteTheme = {
  appBackground: 'white',
  headerTabColor: 'red',
  // theme=='dark'?'#3498DB':'red',
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
  FamilyHeader: '#F2F2F2',
  FriendsHeader: 'white',
  OthersHeader: '#F2F2F2'
};
var Colors = theme == 'dark' ? DarkTheme : WhiteTheme;
export default Colors;

