interface HeaderProps {
  name: string;
}
const Header = (props: HeaderProps) => {
  return <div>{props.name}</div>;
};

export default Header;
