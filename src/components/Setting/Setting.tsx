// import { useEffect, useState } from "react";
// import { Checkbox } from "../Checkbox";

// export interface SettingProps {
//   initialValue: SettingValue;
//   onComplete: (value: SettingValue) => void;
// }

// export interface SettingValue {
//   font: null | string;
//   enabledBio: boolean;
//   bioIcon: null | "Twitter" | "Instagram";
// }

// const Setting = ({ initialValue, onComplete }: SettingProps) => {
//   const [font, setFont] = useState(initialValue.font);
//   const [enabledBio, setEnabledBio] = useState(initialValue.enabledBio);
//   const [bioIcon, setBioIcon] = useState(initialValue.bioIcon);

//   useEffect(() => onComplete({ enabledBio, bioIcon, font }), [
//     enabledBio,
//     bioIcon,
//     font,
//   ]);
//   return (
//     <div>
//       <label></label>
//       <label>
//         <Checkbox
//           checked={enabledBio}
//           onChange={(e) => setEnabledBio(e.target.checked)}
//         />
//         BIO欄を追加する
//       </label>
//       <label></label>
//     </div>
//   );
// };

// export default Setting;
