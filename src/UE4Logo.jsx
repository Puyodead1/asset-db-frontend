import Icon from "@material-ui/core/Icon";
import Logo from "./UE_Logo_icon-only_white.svg";

export default function UE4Logo() {
  return (
    <Icon>
      <img src={Logo} height={20} width={20} alt="ue4_logo_white" />
    </Icon>
  );
}
