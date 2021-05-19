export interface Setting {
  font: null | string;
  enabledBio: boolean;
  bioIcon: null | "Twitter" | "Instagram";
}

type SettingInputProps = {
  value: Setting;
  onChange: (nextValue: Setting) => void;
};

const SettingInput = () => {};

const SettingContent = () => {};
